import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash

from server.db.config import get_db

bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route('/register', methods=('GET', 'POST'))
def register():
    if request.method == 'POST':

        username = request.json['username']
        password = request.json['password']
        db = get_db()
        error = None

        if not username:
            error = 'Username is required.'
        elif not password:
            error = 'Password is required.'
        elif db.users.find_one({"username": username}) is not None:
            error = 'User {} is already registered.'.format(username)

        if error is None:
            db.users.insert({
                'username': username,
                'password': generate_password_hash(password)
            })

            # return redirect(url_for('auth.login'))

        flash(error)

    return 'hooray'
