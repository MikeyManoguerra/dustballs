import functools
import random
import re
from bson.json_util import loads, dumps

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, jsonify
)

from server.src.db.config import get_db

bp = Blueprint('sonnets', __name__, url_prefix='/sonnets')
# curl -i http://localhost:5000/sonnets?query=fool

@bp.route('', methods=('POST', 'GET'))
def search_sonnets():
    db = get_db()
    query = request.args.get('query')
    queryset = list(db.sonnets.find({"$text": {"$search": query}}))
    line_num = None
    for index, line in enumerate(queryset[0]['text']):
        if re.search(query, line):
            line_num = index
          
    print(len(queryset))
    return queryset[0]['text'][line_num]


@bp.route('/random', methods=('POST', 'GET'))
def random_sonnet():
    db = get_db()
    random_number = str(random.randint(1, 155))
    sonnet = db.sonnets.find_one({"title": random_number})
    full_poem = ''
    for line in sonnet['text']:
       full_poem = full_poem + (line+'\n')
    print(dumps(sonnet))

    return dumps(sonnet)
