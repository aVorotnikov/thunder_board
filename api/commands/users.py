#!/usr/bin/python3

from enum import Enum
import db

from flask import jsonify


def get(only_admins, page, per_page, pattern, project_id):
    users = []
    if project_id is None:
        users = db.get_users(only_admins, page, per_page, pattern)
    else:
        users = db.get_users_with_project(only_admins, page, per_page, pattern, project_id)
    res = []
    for user in users:
        res.append({
            "id": user[0],
            "name": user[1],
            "email": user[2],
            "isAdmin": user[3]
        })
    return jsonify(res)
