import functools
import random
import re
from bson.json_util import loads, dumps

from flask import (
    Blueprint,
    flash,
    g,
    redirect,
    render_template,
    request,
    session,
    url_for,
    jsonify,
)

from server.src.db.config import get_db

bp = Blueprint("plays", __name__, url_prefix="/plays")
#  curl -i http://localhost:5000/plays\?query\=implacable


def get_interaction(scene, query):
    for i, line in enumerate(scene):
        try:
            if re.search(query, line["line"], re.IGNORECASE):
                index = i
                break
        except KeyError:
            # ignore type: 'direction' queries for now
            continue

    if index < 2:
        print('beginning')
        interaction = scene[0:6]
    elif index > len(scene) - 3:
        print('end')
        interaction = scene[-6:]
    else:
        interaction = scene[(index - 2) : (index + 3)]

    return {"interaction": interaction, "query_index": index}


@bp.route("", methods=("POST", "GET"))
def search_scenes():
    try:
        db = get_db()
        query = request.args.get("query")
        # exact matches only for now
        queryset = db.scenes.find({"$text": {"$search": f'"{query}"'}})
        f_queryset = []
        for i, doc in enumerate(queryset):
            text = doc.pop("text")
            try:
                indexed_interaction = get_interaction(text, query)
                doc["interaction"] = indexed_interaction["interaction"]
                doc["query_index"] = indexed_interaction["query_index"]
                f_queryset.append(doc)

            except NameError:
                print("query not spoken")
                continue

        return dumps(f_queryset)

    except IndexError as err:
        print(err)
        return dumps([])


@bp.route("/random", methods=("POST", "GET"))
def random_scene():

    db = get_db()
    random_number = str(random.randint(1, 155))
    sonnet = db.sonnets.find_one({"title": random_number})
    return dumps([])


# {'type': 'dialouge',
# 'character': 'FABIAN.',
# 'line': 'A coward, a most devout coward, religious in it.'},
#  {'type': 'dialouge', 'character': 'SIR ANDREW.', 'line': '’Slid, I’ll after him again and beat him.'}, {'type': 'dialouge', 'character': 'SIR TOBY.', 'line': 'Do, cuff him soundly, but never draw thy sword.'}, {'type': 'dialouge', 'character': 'SIR ANDREW.', 'line': 'And I do not—'}, {'type': 'direction', 'direction': '[_Exit._]'}, {'type': 'dialouge', 'character': 'FABIAN.', 'line': 'Come, let’s see the event.'}, {'type': 'dialouge', 'character': 'SIR TOBY.', 'line': 'I dare lay any money ’twill be nothing yet.'}, {'type': 'direction', 'direction': '[_Exeunt._]\n\n\n\n'}]}
