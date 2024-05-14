#!/usr/bin/python3

import db

from flask import jsonify


def get(project_id, page, per_page, not_final):
    res = {}
    statusesInfo = db.get_statuses(project_id)
    res["statuses"] = []
    for statusInfo in statusesInfo:
        res["statuses"].append({
            "name": statusInfo[0],
            "type": statusInfo[1]
        })
    res["tasks"] = []
    tasks = db.get_tasks(project_id, page, per_page, not_final)
    for task in tasks:
        user = {
            "id": task[6],
            "name": task[7],
            "email": task[8]
        }
        res["tasks"].append({
            "id": task[0],
            "name": task[1],
            "description": task[2],
            "proposedTime": task[3],
            "remainingTime": task[4],
            "status": task[5],
            "user": user
        })
    return jsonify(res)
