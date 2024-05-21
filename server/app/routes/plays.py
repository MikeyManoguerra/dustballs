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


from server.app import db as connection

bp = Blueprint("plays", __name__, url_prefix="/plays")
#  curl -i http://localhost:5000/plays\?query\=implacable


def get_interaction(scene, query):
    """
    helper fn to loop over a scene
    """
    for i, line in enumerate(scene):
        try:
            if re.search(query, line["line"], re.IGNORECASE):
                index = i
                break
        except KeyError:
            # ignore type: 'direction' queries for now
            continue

    if index < 2:
        print("beginning")
        interaction = scene[0:6]
    elif index > len(scene) - 3:
        print("end")
        interaction = scene[-6:]
    else:
        interaction = scene[(index - 2) : (index + 3)]

    return {"interaction": interaction, "query_index": index}


def title_case(title):
    articles = ["a", "the", "an", "in", "and", "if", "but", "of"]
    title = title.split(" ")


    capitalized = []
    for i, word in enumerate(title):
        if i == 0 or (word not in articles):
            word = word.capitalize()
        capitalized.append(word)

    return " ".join(capitalized)


@bp.route("", methods=("POST", "GET"))
def search_scenes():
    try:
        db = connection.get_db()
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

    db = connection.get_db()
    random_number = str(random.randint(1, 155))
    sonnet = db.plays.find_one({"title": random_number})
    return dumps([])

# TODO: return title/slug object array below
# content for linkedin of query

@bp.route("/titles", methods=["GET"])
def play_titles():
    db = connection.get_db()
    titles = db.scenes.distinct('title')
    titles = [title_case(title) for title in titles]
    return dumps(titles)

# {'type': 'dialouge',
# 'character': 'FABIAN.',
# 'line': 'A coward, a most devout coward, religious in it.'},
#  {'type': 'dialouge', 'character': 'SIR ANDREW.', 'line': '’Slid, I’ll after him again and beat him.'},
# {'type': 'dialouge', 'character': 'SIR TOBY.', 'line': 'Do, cuff him soundly, but never draw thy sword.'},
#  {'type': 'dialouge', 'character': 'SIR ANDREW.', 'line': 'And I do not—'},
#  {'type': 'direction', 'direction': '[_Exit._]'},
#  {'type': 'dialouge', 'character': 'FABIAN.', 'line': 'Come, let’s see the event.'},
# {'type': 'dialouge', 'character': 'SIR TOBY.', 'line': 'I dare lay any money ’twill be nothing yet.'},
# {'type': 'direction', 'direction': '[_Exeunt._]\n\n\n\n'}]}
