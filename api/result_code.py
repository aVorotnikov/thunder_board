#!/usr/bin/python3

from flask import jsonify
from enum import Enum


class ResultCode(Enum):
    InternalError = 100
    NotSupported = 101
    IncorrectData = 102
    EmailAlreadyExists = 103
    OnlyAdmins = 104


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
    return "Неизвестный код"


def GetResponse(rc, httpCode=400):
    return jsonify(code=rc.value, message=GetResultCodeTextDescription(rc)), httpCode
