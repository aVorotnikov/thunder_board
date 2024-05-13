#!/usr/bin/python3

from flask import jsonify, make_response
import db

from result_code import *
from hash import get_hashed_password


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


def post(name, email, is_admin, password):
    if db.get_user_info_by_email(email) is not None:
        return GetResponse(ResultCode.EmailAlreadyExists)
    db.insert_user(name, email, is_admin, get_hashed_password(password))
    res = db.get_user_info_by_email(email)
    if res is None:
        return GetResponse(ResultCode.InternalError)
    response = make_response(jsonify({
            "id": res[0]
        }))
    response.headers['Location'] = res[0]
    return response
