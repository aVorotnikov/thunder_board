#!/usr/bin/python3

import db


def check_project(project_id):
    return db.get_project_info(project_id) is not None


def check_project_by_name(project_name):
    return db.get_project_id_by_name(project_name) is not None
