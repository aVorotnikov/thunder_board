#!/usr/bin/python3

import psycopg
from flask import g
import config


def get_db():
    if 'db' not in g:
        name = config.DB_NAME
        user = config.DB_USER
        password = config.DB_PASSWORD
        host = config.DB_HOST
        port = config.DB_PORT
        g.db = psycopg.connect(dbname=name, user=user, password=password, host=host, port=port)
    return g.db


def close_db(e=None):
    """
    Close database connection if exists
    """
    db = g.pop('db', None)
    if db is not None:
        db.close()


def get_password_hash(user_email):
    with get_db().cursor() as cursor:
        cursor.execute('SELECT userId, userPasswordHash FROM Users WHERE userEmail=%s', (user_email,))
        res = cursor.fetchone()
        if not res:
            return None
        return res


def get_user_info(user_id):
    with get_db().cursor() as cursor:
        cursor.execute('SELECT userId, userName, userEmail, userIsAdmin FROM Users WHERE userId=%s', (user_id,))
        res = cursor.fetchone()
        if not res:
            return None
        return res


def get_users(page, per_page):
    with get_db().cursor() as cursor:
        cursor.execute('SELECT userId, userName, userEmail, userIsAdmin FROM Users LIMIT %s OFFSET %s', (per_page, page * per_page))
        res = cursor.fetchall()
        return res
