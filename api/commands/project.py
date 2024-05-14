#!/usr/bin/python3

import db

from flask import jsonify, make_response


def get(project_id):
    projectInfo = db.get_project_info(project_id)
    res = {
        "name": projectInfo[1],
        "description": projectInfo[2],
    }

    statusesInfo = db.get_statuses(project_id)
    res["statuses"] = []
    for statusInfo in statusesInfo:
        res["statuses"].append({
            "name": statusInfo[0],
            "type": statusInfo[1]
        })

    teamInfo = db.get_project_team(project_id)
    res["users"] = []
    for user in teamInfo:
        res["users"].append({
            "id": user[0],
            "name": user[1],
            "email": user[2],
            "role": user[3]
        })
    return jsonify(res)


def post(name, description, users, statuses):
    id = db.insert_project(name, description)
    db.insert_statuses(id, statuses)
    for user in users:
        db.insert_user_in_project(id, user["id"], user["role"])
    response = make_response(jsonify({
        "id": id
    }))
    response.headers['Location'] = id
    return response


def add_user(project_id, user_id, role):
    db.insert_user_in_project(project_id, user_id, role)
    return "", 200


def update_project(project_id, name, desciption):
    db.update_project(project_id, name, desciption)
    return "", 200
