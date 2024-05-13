#!/usr/bin/python3

import db

from flask import jsonify, make_response


def get(task_id, project_id):
    task = db.get_task(task_id)
    if task is None:
        return "", 404
    if project_id != task[9]:
        return "", 404

    user = {
        "id": task[6],
        "name": task[7],
        "email": task[8]
    }
    res = {
        "name": task[1],
        "description": task[2],
        "proposedTime": task[3],
        "remainingTime": task[4],
        "status": task[5],
        "user": user
    }
    return jsonify(res)


def post(project_id, user_id, name, description, proposed_time, remaining_time):
    id = db.insert_task(project_id, user_id, name, description, proposed_time, remaining_time)
    response = make_response(jsonify({
        "id": id
    }))
    response.headers['Location'] = id
    return response
