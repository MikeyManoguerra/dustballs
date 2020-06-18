
import re
import random
from bson.json_util import loads, dumps
from flask import (
    g,
    request,
    session,
    url_for,
    Blueprint,
)

from server.app import db as connection



bp = Blueprint("sonnets", __name__, url_prefix="/sonnets")
# curl -i http://localhost:5000/sonnets?query=fool


@bp.route("", methods=("POST", "GET"))
def search_sonnets():
    try:
        db = connection.get_db()
        query = request.args.get("query")
        queryset = list(db.sonnets.find({"$text": {"$search": query}}))

        # find the query in each sonnet and add the index as a field to the object
        for sonnet in queryset:
            for index, line in enumerate(sonnet["text"]):
                if re.search(query, line, re.IGNORECASE):
                    line_num = index
                    sonnet["query_index"] = index

        return dumps(queryset)
    except IndexError as err:
        print(err)
        return dumps([])


@bp.route("/random", methods=("POST", "GET"))
def random_sonnet():
    db = connection.get_db()
    random_number = str(random.randint(1, 155))
    sonnet = db.sonnets.find_one({"title": random_number})
    return dumps(sonnet)
