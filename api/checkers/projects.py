#!/usr/bin/python3

import db


def check_project(project_id):
    return db.get_project_info(project_id) is not None

