#!/usr/bin/python3

from flask import Flask, jsonify, request
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

from hash import get_hashed_password, check_password
import db
import config
from result_code import *
from checkers.users import *
from checkers.projects import *
from commands import *
from status_types import *

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = config.SECRET_KEY
jwt = JWTManager(app)


@app.teardown_appcontext
def down(e=None):
    db.close_db(e)


@app.post('/log-in')
def log_in():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    res = db.get_user_info_by_email(email)
    if res is None:
        return "", 401
    user_id, user_password_hash = res
    if not check_password(password, user_password_hash):
        return "", 401
    access_token = create_access_token(identity=[user_id, email])
    return jsonify(token=access_token)

@app.get('/log-out')
@jwt_required()
def log_out():
    return GetResponse(ResultCode.NotSupported)

@app.get('/users')
@jwt_required()
def get_users():
    args = request.args
    only_admins = "onlyAdmins" in args
    pattern = None if "pattern" not in args else args.get("pattern", type=str)
    project_id = None if "projectId" not in args else args.get("projectId", type=int)
    page = args.get("page", default=0, type=int)
    per_page = args.get("per_page", default=10, type=int)
    if page < 0 or per_page <= 0 or per_page > 100:
        return GetResponse(ResultCode.IncorrectData)
    return commands.users.get(only_admins, page, per_page, pattern, project_id)

@app.post('/user')
@jwt_required()
def add_user():
    if not user_is_admin(get_jwt_identity()[0]):
        return GetResponse(ResultCode.OnlyAdmins)
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    is_admin = request.json.get("isAdmin", None)
    return commands.user.post(name, email, is_admin, password)

@app.get('/user')
@jwt_required()
def get_user_self():
    return commands.user.get_self(get_jwt_identity()[0])

@app.get('/user/<int:userId>')
@jwt_required()
def get_user(userId):
    return commands.user.get(userId)

@app.delete('/user/<int:userId>')
@jwt_required()
def delete_user(userId):
    return GetResponse(ResultCode.NotSupported)

@app.get('/projects')
@jwt_required()
def get_projects():
    args = request.args
    pattern = None if "pattern" not in args else args.get("pattern", type=str)
    if "users" not in args:
        users = None
    else:
        users = [int(userId) for userId in request.args.getlist("users")]
    page = args.get("page", default=0, type=int)
    per_page = args.get("per_page", default=10, type=int)
    if page < 0 or per_page <= 0 or per_page > 100:
        return GetResponse(ResultCode.IncorrectData)
    return commands.projects.get(page, per_page, pattern, users)

@app.post('/project')
@jwt_required()
def add_project():
    initiator_id = get_jwt_identity()[0]
    if not user_is_admin(initiator_id):
        return GetResponse(ResultCode.OnlyAdmins)
    jsonContent = request.json
    name = jsonContent.get("name", None)
    if check_project_by_name(name):
        return GetResponse(ResultCode.ProjectNameAlreadyExists)
    description = jsonContent.get("description", None)

    usersRaw = jsonContent.get("users", None)
    users = []
    hasManager = False
    for user in usersRaw:
        if not check_user(user["id"]):
            return GetResponse(ResultCode.UnknownUser)
        role = UserRole(user["role"])
        if UserRole.Manager == role:
            hasManager = True
        users.append({"id": user["id"], "role": role})
    if not hasManager:
        return GetResponse(ResultCode.ProjectNeedsManager)

    statusesRaw = jsonContent.get("statuses", None)
    statuses = []
    statusTypesInfo = {
        StatusTypes.Initial: 0,
        StatusTypes.Intermediate: 0,
        StatusTypes.Final: 0
    }
    for status in statusesRaw:
        statusType = StatusTypes(status["type"])
        statusTypesInfo[statusType] += 1
        statuses.append({"name": status["name"], "type": statusType})
    if statusTypesInfo[StatusTypes.Initial] != 1 or statusTypesInfo[StatusTypes.Final] == 0:
        return GetResponse(ResultCode.IncorrectStatuses)

    return commands.project.post(name, description, users, statuses)

@app.get('/project/<int:projectId>')
@jwt_required()
def get_project(projectId):
    return commands.project.get(projectId)

@app.patch('/project/<int:projectId>')
@jwt_required()
def change_project(projectId):
    if not check_project(projectId):
        return "", 404
    initiator_id = get_jwt_identity()[0]
    if not user_is_admin(initiator_id) and UserRole.Manager != get_user_role(initiator_id, projectId):
        return GetResponse(ResultCode.OnlyAdminsAndManagers)
    jsonContent = request.json
    name = None if "name" not in jsonContent else jsonContent.get("name", None)
    if name is not None and check_project_by_name(name):
        return GetResponse(ResultCode.ProjectNameAlreadyExists)
    description = None if "description" not in jsonContent else jsonContent.get("description", None)
    return commands.project.update_project(projectId, name, description)

@app.put('/project/<int:projectId>/user/<int:userId>')
@jwt_required()
def add_user_to_project(projectId, userId):
    if not check_user(userId) or not check_project(projectId):
        return "", 404
    initiator_id = get_jwt_identity()[0]
    if not user_is_admin(initiator_id) and UserRole.Manager != get_user_role(initiator_id, projectId):
        return GetResponse(ResultCode.OnlyAdminsAndManagers)
    if UserRole.No != get_user_role(userId, projectId):
        return GetResponse(ResultCode.AlreadyInTeam)
    return commands.project.add_user(projectId, userId, UserRole(request.json.get("role", None)))

@app.delete('/project/<int:projectId>/user/<int:userId>')
@jwt_required()
def delete_user_from_project(projectId, userId):
    return GetResponse(ResultCode.NotSupported)

@app.get('/project/<int:projectId>/tasks')
@jwt_required()
def get_tasks(projectId):
    args = request.args
    not_final = False if "notFinal" else True
    page = args.get("page", default=0, type=int)
    per_page = args.get("per_page", default=10, type=int)
    if page < 0 or per_page <= 0 or per_page > 100:
        return GetResponse(ResultCode.IncorrectData)
    return commands.tasks.get(projectId, page, per_page, not_final)

@app.post('/project/<int:projectId>/task')
@jwt_required()
def add_task(projectId):
    if UserRole.Manager != get_user_role(get_jwt_identity()[0], projectId):
        return GetResponse(ResultCode.OnlyManagers)
    name = request.json.get("name", None)
    description = request.json.get("description", None)
    user_id = request.json.get("userId", None)
    proposed_time = request.json.get("proposedTime", None)
    remaining_time = request.json.get("remainingTime", None)
    return commands.task.post(projectId, user_id, name, description, proposed_time, remaining_time)

@app.get('/project/<int:projectId>/task/<int:taskId>')
@jwt_required()
def get_task(projectId, taskId):
    return commands.task.get(taskId, projectId)

@app.patch('/project/<int:projectId>/task/<int:taskId>')
@jwt_required()
def change_task(projectId, taskId):
    if not check_project(projectId):
        return "", 404
    initiator_id = get_jwt_identity()[0]
    if UserRole.Manager != get_user_role(initiator_id, projectId) and initiator_id != get_task_owner(taskId):
        return GetResponse(ResultCode.OnlyManagersAndExecutor)
    jsonContent = request.json
    name = None if "name" not in jsonContent else jsonContent.get("name", None)
    description = None if "description" not in jsonContent else jsonContent.get("description", None)
    user_id = None if "userId" not in jsonContent else jsonContent.get("userId", None)
    proposed_time = None if "proposedTime" not in jsonContent else jsonContent.get("proposedTime", None)
    remaining_time = None if "remainingTime" not in jsonContent else jsonContent.get("remainingTime", None)
    status = None if "status" not in jsonContent else jsonContent.get("status", None)
    if user_id is not None and UserRole.No == get_user_role(user_id, projectId):
        return GetResponse(ResultCode.IncorrectData)
    return commands.task.patch(projectId, taskId, user_id, name, description, proposed_time, remaining_time, status)
