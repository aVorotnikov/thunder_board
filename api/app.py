from flask import Flask

app = Flask(__name__)

@app.route('/boards')
def get_boards():
    return {'boards_list': ['test_board']}
