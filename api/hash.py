#!/usr/bin/python3

import bcrypt


def get_hashed_password(plain_text_password):
    return bcrypt.hashpw(plain_text_password.encode(), bcrypt.gensalt()).decode()

def check_password(plain_text_password, hashed_password):
    return bcrypt.checkpw(plain_text_password.encode(), hashed_password.encode())


if __name__ == '__main__':
    password = input("Password: ")
    hashed_password = get_hashed_password(password)
    print("Hashed password: {}".format(hashed_password))
    print("Result of check: {}".format(check_password(password, hashed_password)))
