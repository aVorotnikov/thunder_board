#!/usr/bin/python3

from enum import Enum
import db

from flask import jsonify
from result_code import *


def get(user_id):
    res = db.get_user_info(user_id)
    if res is None:
        return "", 404
    return jsonify({
            "name": res[1],
            "email": res[2],
            "isAdmin": res[3]
        })


def get_self(user_id):
    res = db.get_user_info(user_id)
    if res is None:
        return "", 404
    return jsonify({
            "id": res[0],
            "name": res[1],
            "email": res[2],
            "isAdmin": res[3]
        })
