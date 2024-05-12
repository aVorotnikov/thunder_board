#!/usr/bin/python3

from flask import Flask, jsonify, request
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

from hash import get_hashed_password, check_password
import db
import config
from result_code import *
from checkers.users import *
from commands import *

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
    res = db.get_password_hash(email)
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
        return GetResponse(ResultCode.NotSupported)
    return commands.users.get(only_admins, page, per_page, pattern, project_id)

@app.post('/user')
@jwt_required()
def add_user():
    return "Request to add user"

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
    return "Request to get projects"

@app.post('/project')
@jwt_required()
def add_project():
    return "Request to add project"

@app.get('/project/<int:projectId>')
@jwt_required()
def get_project(projectId):
    return f"Request to get project: {projectId}"

@app.patch('/project/<int:projectId>')
@jwt_required()
def change_project(projectId):
    return f"Request to change project: {projectId}"

@app.put('/project/<int:projectId>/user/<int:userId>')
@jwt_required()
def add_user_to_project(projectId, userId):
    return f"Request to add user {userId} to project {projectId}"

@app.delete('/project/<int:projectId>/user/<int:userId>')
@jwt_required()
def delete_user_from_project(projectId, userId):
    return f"Request to delete user {userId} from project {projectId}"

@app.get('/project/<int:projectId>/tasks')
@jwt_required()
def get_tasks(projectId):
    return f"Request to get tasks from project {projectId}"

@app.post('/project/<int:projectId>/task')
@jwt_required()
def add_task(projectId):
    return f"Request to add task to project {projectId}"

@app.get('/project/<int:projectId>/task/<int:taskId>')
@jwt_required()
def get_task(projectId, taskId):
    return f"Request to get task {taskId} to project {projectId}"

@app.patch('/project/<int:projectId>/task/<int:taskId>')
@jwt_required()
def change_task(projectId, taskId):
    return f"Request to change task {taskId} to project {projectId}"
