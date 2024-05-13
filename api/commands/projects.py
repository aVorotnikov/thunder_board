#!/usr/bin/python3

import db

from flask import jsonify


def get(page, per_page, pattern, users):
    projects = []
    if users is None:
        projects = db.get_projects(page, per_page, pattern)
    else:
        projects = db.get_projects_with_users(page, per_page, pattern, users)
    res = []
    for project in projects:
        res.append({
            "id": project[0],
            "name": project[1],
            "description": project[2],
        })
    return jsonify(res)
