#!/usr/bin/python3

from flask import jsonify
from enum import Enum


class ResultCode(Enum):
    InternalError = 100,
    NotSupported = 101


def GetResultCodeTextDescription(rc):
    if ResultCode.InternalError == rc:
        return "Внутренняя ошибка сервера"
    elif ResultCode.NotSupported == rc:
        return "Команда не поддерживается"
    return "Неизвестный код"


def GetResponse(rc, httpCode=400):
    return jsonify(code=rc.value, message=GetResultCodeTextDescription(rc)), httpCode
