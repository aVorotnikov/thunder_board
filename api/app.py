from flask import Flask

app = Flask(__name__)

@app.route('/boards')
def get_current_time():
    return {'boards_list': ['test_board']}
