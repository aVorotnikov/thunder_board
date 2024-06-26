#!/usr/bin/python3

from flask import jsonify
from enum import Enum


class ResultCode(Enum):
    InternalError = 100
    NotSupported = 101
    IncorrectData = 102
    EmailAlreadyExists = 103
    OnlyAdmins = 104
    OnlyAdminsAndManagers = 105
    AlreadyInTeam = 106
    ProjectNameAlreadyExists = 107
    OnlyManagers = 108
    OnlyManagersAndExecutor = 109
    UnknownUser = 110
    IncorrectStatuses = 111
    ProjectNeedsManager = 112


def GetResultCodeTextDescription(rc):
    if ResultCode.InternalError == rc:
        return "Внутренняя ошибка сервера"
    elif ResultCode.NotSupported == rc:
        return "Команда не поддерживается"
    elif ResultCode.IncorrectData == rc:
        return "Некорретные данные"
    elif ResultCode.EmailAlreadyExists == rc:
        return "Такая почта уже есть в системе"
    elif ResultCode.OnlyAdmins == rc:
        return "Доступно только администраторам"
    elif ResultCode.OnlyAdminsAndManagers == rc:
        return "Доступно только администраторам и менеджерам"
    elif ResultCode.AlreadyInTeam == rc:
        return "Пользователь уже в команде"
    elif ResultCode.ProjectNameAlreadyExists == rc:
        return "Проект с таким названием уже существует"
    elif ResultCode.OnlyManagers == rc:
        return "Доступно только менеджерам"
    elif ResultCode.OnlyManagersAndExecutor == rc:
        return "Доступно только менеджерам и исполнителям"
    elif ResultCode.UnknownUser == rc:
        return "Пользователь неизвестный"
    elif ResultCode.IncorrectStatuses == rc:
        return "Не соблюдены требования к статусам"
    elif ResultCode.ProjectNeedsManager == rc:
        return "В проекте должен быть менеджер"
    return "Неизвестный код"


def GetResponse(rc, httpCode=400):
    return jsonify(code=rc.value, message=GetResultCodeTextDescription(rc)), httpCode
