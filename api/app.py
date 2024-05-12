#!/usr/bin/python3

from flask import Flask, jsonify, request
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

from hash import get_hashed_password, check_password
import db
import config
from result_code import *
from checkers.users import *


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
def get_users():
    return "Request to get users"

@app.post('/user')
def add_user():
    return "Request to add user"

@app.get('/user')
@jwt_required()
def get_user_self():
    return f"Request to get user: {get_jwt_identity()[0]}"

@app.get('/user/<int:userId>')
def get_user(userId):
    return f"Request to get user: {userId}"

@app.delete('/user/<int:userId>')
def delete_user(userId):
    return GetResponse(ResultCode.NotSupported)

@app.get('/projects')
def get_projects():
    return "Request to get projects"

@app.post('/project')
def add_project():
    return "Request to add project"

@app.get('/project/<int:projectId>')
def get_project(projectId):
    return f"Request to get project: {projectId}"

@app.patch('/project/<int:projectId>')
def change_project(projectId):
    return f"Request to change project: {projectId}"

@app.put('/project/<int:projectId>/user/<int:userId>')
def add_user_to_project(projectId, userId):
    return f"Request to add user {userId} to project {projectId}"

@app.delete('/project/<int:projectId>/user/<int:userId>')
def delete_user_from_project(projectId, userId):
    return f"Request to delete user {userId} from project {projectId}"

@app.get('/project/<int:projectId>/tasks')
def get_tasks(projectId):
    return f"Request to get tasks from project {projectId}"

@app.post('/project/<int:projectId>/task')
def add_task(projectId):
    return f"Request to add task to project {projectId}"

@app.get('/project/<int:projectId>/task/<int:taskId>')
def get_task(projectId, taskId):
    return f"Request to get task {taskId} to project {projectId}"

@app.patch('/project/<int:projectId>/task/<int:taskId>')
def change_task(projectId, taskId):
    return f"Request to change task {taskId} to project {projectId}"
