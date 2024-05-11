from flask import Flask

app = Flask(__name__)

@app.post('/log-in')
def log_in():
    return "Request to login"

@app.get('/log-out')
def log_out():
    return "Request to logout"

@app.get('/users')
def get_users():
    return "Request to get users"

@app.post('/user')
def add_user():
    return "Request to add user"

@app.get('/user/<int:userId>')
def get_user(userId):
    return f"Request to get user: {userId}"

@app.delete('/user/<int:userId>')
def delete_user(userId):
    return f"Request to delete user: {userId}"

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
