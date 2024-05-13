#!/usr/bin/python3

import db
from user_role import UserRole


def user_is_admin(user_id):
    return db.get_user_info(user_id)[3]


def get_user_role(user_id, project_id):
    role = db.get_user_role(user_id, project_id)
    if role is None:
        return UserRole.No
    return UserRole(role[0])


def get_task_owner(task_id):
    return db.get_task_owner(task_id)[0]


def check_user(user_id):
    return db.get_user_info(user_id) is not None
