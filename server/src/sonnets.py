import functools
import random

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)

from server.src.db.config import get_db

bp = Blueprint('sonnets', __name__, url_prefix='/sonnets')

@bp.route('/', methods=('POST','GET'))
def random_sonnet():
    db = get_db()
    random_number = str(random.randint(1, 155))
    sonnet = db.sonnets.find_one({"title": random_number})
    print(sonnet)
    return sonnet['text'][0]