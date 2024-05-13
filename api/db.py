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
        g.db = psycopg.connect(dbname=name, user=user, password=password, host=host, port=port, autocommit=True)
    return g.db


def close_db(e=None):
    """
    Close database connection if exists
    """
    db = g.pop('db', None)
    if db is not None:
        db.close()


def get_user_info_by_email(user_email):
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


def get_users(only_admins, page, per_page, pattern):
    with get_db().cursor() as cursor:
        query = 'SELECT userId, userName, userEmail, userIsAdmin FROM Users {} LIMIT %s OFFSET %s'
        where_string = ''
        if only_admins == True or pattern is not None:
            cond = 0
            where_string = 'WHERE '
            if only_admins == True:
                where_string = where_string + 'userIsAdmin=TRUE '
                cond = cond + 1
            if pattern is not None:
                if 0 != cond:
                    where_string += 'AND '
                where_string = where_string + "(userName LIKE %s OR userEmail LIKE %s) "
                cond = cond + 1
        if pattern is None:
            cursor.execute(query.format(where_string), (per_page, page * per_page))
        else:
            cursor.execute(query.format(where_string), (pattern, pattern, per_page, page * per_page))
        res = cursor.fetchall()
        return res


def get_users_with_project(only_admins, page, per_page, pattern, project_id):
    with get_db().cursor() as cursor:
        query = 'SELECT Users.userId, userName, userEmail, userIsAdmin ' \
            'FROM Users ' \
            'LEFT JOIN UsersProjects ON UsersProjects.userId=Users.userId ' \
            'WHERE UsersProjects.projectId=%s {} ' \
            'LIMIT %s OFFSET %s'
        where_string = ''
        if only_admins == True or pattern is not None:
            if only_admins == True:
                where_string = where_string + 'AND userIsAdmin=TRUE '
            if pattern is not None:
                where_string = where_string + "AND (userName LIKE %s OR userEmail LIKE %s) "
        if pattern is None:
            cursor.execute(query.format(where_string), (project_id, per_page, page * per_page))
        else:
            cursor.execute(query.format(where_string), (project_id, pattern, pattern, per_page, page * per_page))
        res = cursor.fetchall()
        return res


def get_user_role(user_id, project_id):
    with get_db().cursor() as cursor:
        cursor.execute('SELECT Roles.roleName '
            'FROM UsersProjects '
            'LEFT JOIN Roles ON UsersProjects.roleId = Roles.roleId '
            'WHERE userId=%s AND projectId=%s', (user_id, project_id))
        res = cursor.fetchone()
        if not res:
            return None
        return res


def get_task_owner(task_id):
    with get_db().cursor() as cursor:
        cursor.execute('SELECT userId FROM Tasks WHERE taskId=%s', (task_id,))
        res = cursor.fetchone()
        if not res:
            return None
        return res


def insert_user(name, email, is_admin, password_hash):
    with get_db().cursor() as cursor:
        cursor.execute('INSERT INTO Users (userName, userEmail, userPasswordHash, userIsAdmin) VALUES '
            '(%s, %s, %s, %s)', (name, email, password_hash, is_admin))


def get_projects(page, per_page, pattern):
    with get_db().cursor() as cursor:
        query = 'SELECT projectId, projectName, projectDescription FROM Projects {} LIMIT %s OFFSET %s'
        where_string = ''
        if pattern is not None:
            where_string = 'WHERE (projectName LIKE %s OR projectDescription LIKE %s) '
        if pattern is None:
            cursor.execute(query.format(where_string), (per_page, page * per_page))
        else:
            cursor.execute(query.format(where_string), (pattern, pattern, per_page, page * per_page))
        res = cursor.fetchall()
        return res


def get_projects_with_users(page, per_page, pattern, users):
    with get_db().cursor() as cursor:
        query = f'SELECT innerSelect.pId, innerSelect.projectName, innerSelect.projectDescription FROM (' \
            'SELECT Projects.projectId AS pId, projectName, projectDescription, COUNT(UsersProjects.userId) AS userCount ' \
            'FROM Projects ' \
            'LEFT JOIN UsersProjects ON UsersProjects.projectId=Projects.projectId ' \
            f'WHERE UsersProjects.userId=ANY(ARRAY{str(users)}) ' \
            '{} ' \
            'GROUP BY UsersProjects.projectId, pId, projectName, projectDescription ' \
            'LIMIT %s OFFSET %s) innerSelect ' \
            'WHERE userCount=%s'
        where_string = ''
        if pattern is not None:
            where_string = 'AND "(projectName LIKE %s OR projectDescription LIKE %s) '
        if pattern is None:
            cursor.execute(query.format(where_string), (per_page, page * per_page, len(set(users))))
        else:
            cursor.execute(query.format(where_string), (pattern, pattern, per_page, page * per_page, len(set(users))))
        res = cursor.fetchall()
        return res


def get_project_info(project_id):
    with get_db().cursor() as cursor:
        cursor.execute('SELECT projectId, projectName, projectDescription FROM Projects WHERE projectId=%s', (project_id,))
        res = cursor.fetchone()
        if not res:
            return None
        return res


def get_statuses(project_id):
    with get_db().cursor() as cursor:
        cursor.execute('SELECT Statuses.statusName, StatusTypes.statusTypeName '
            'FROM Statuses '
            'LEFT JOIN StatusTypes ON StatusTypes.statusTypeId=Statuses.statusTypeId '
            'WHERE Statuses.projectId=%s '
            'ORDER BY Statuses.statusNumber', (project_id,))
        res = cursor.fetchall()
        if not res:
            return None
        return res


def get_project_team(project_id):
    with get_db().cursor() as cursor:
        cursor.execute('SELECT Users.userId, Users.userName, Users.userEmail, Roles.roleName '
            'FROM UsersProjects '
            'LEFT JOIN Users ON Users.userId=UsersProjects.userId '
            'LEFT JOIN Roles ON Roles.roleId=UsersProjects.roleId '
            'WHERE UsersProjects.projectId=%s', (project_id,))
        res = cursor.fetchall()
        if not res:
            return None
        return res


def insert_project(name, description):
    with get_db().cursor() as cursor:
        cursor.execute('INSERT INTO Projects (projectName, projectDescription) VALUES (%s, %s)', (name, description))


def get_project_id_by_name(project_name):
    with get_db().cursor() as cursor:
        cursor.execute('SELECT projectId FROM Projects WHERE projectName=%s', (project_name,))
        res = cursor.fetchone()
        if not res:
            return None
        return res[0]


def get_status_type_id_by_name(status_type):
    with get_db().cursor() as cursor:
        cursor.execute('SELECT statusTypeId FROM StatusTypes WHERE statusTypeName=%s', (status_type.value,))
        res = cursor.fetchone()
        if not res:
            return None
        return res[0]


def get_role_id_by_name(user_role):
    with get_db().cursor() as cursor:
        cursor.execute('SELECT roleId FROM Roles WHERE roleName=%s', (user_role.value,))
        res = cursor.fetchone()
        if not res:
            return None
        return res[0]


def insert_statuses(project_id, statuses):
    with get_db().cursor() as cursor:
        number = 0
        for status in statuses:
            cursor.execute('INSERT INTO Statuses (statusName, statusNumber, projectId, statusTypeId) VALUES '
                '(%s, %s, %s, %s)', (status["name"], number, project_id, get_status_type_id_by_name(status["type"])))
            number = number + 1


def insert_user_in_project(project_id, user_id, role):
    with get_db().cursor() as cursor:
        cursor.execute('INSERT INTO UsersProjects (userId, projectId, roleId) VALUES '
            '(%s, %s, %s)', (user_id, project_id, get_role_id_by_name(role)))


def update_project(project_id, name, desciption):
    if name is None and desciption is None:
        return
    with get_db().cursor() as cursor:
        if name is not None:
            cursor.execute('UPDATE Projects SET projectName=%s WHERE projectId=%s', (name, project_id))
        if desciption is not None:
            cursor.execute('UPDATE Projects SET projectDescription=%s WHERE projectId=%s', (desciption, project_id))


def get_tasks(project_id, page, per_page, not_final):
    with get_db().cursor() as cursor:
        query = 'SELECT Tasks.taskId, taskName, taskDescription, taskTimeEstimation, taskTimeSpent, ' \
            'Statuses.statusName, Users.userId, Users.userName, Users.userEmail ' \
            'FROM Tasks ' \
            'LEFT JOIN Users ON Users.userId=Tasks.userId ' \
            'LEFT JOIN Statuses ON Statuses.statusId=Tasks.statusId ' \
            'WHERE Statuses.projectId=%s {} ' \
            'LIMIT %s OFFSET %s'
        if not_final:
            where_string = 'AND Statuses.statusTypeId!=%s '
            cursor.execute(
                query.format(where_string),
                (project_id, get_status_type_id_by_name(StatusTypes.Type), per_page, page * per_page))
        else:
            cursor.execute(query.format(""), (project_id, per_page, page * per_page))
        res = cursor.fetchall()
        return res
