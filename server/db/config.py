import click
import os
from pymongo import MongoClient
from flask import current_app, g
from flask.cli import with_appcontext
# MONGODB_URI = os.getenv('MONGODB_URI')
client = MongoClient("localhost", 27017)
# client = MongoClient(MONGODB_URI, 27017)


def get_db():
    if "db" not in g:
        g.db = client.dustball_db
    return g.db


def close_db(e=None):
    db = g.pop("db", None)

    if db is not None:
        db.close()


# def init_app(app):
#     app.teardown_appcontext(close_db)
#     app.cli.add_command(init_db_command)

# def init_db_command():
#     """Clear the existing data and create new tables."""
#     init_db()
#     click.echo('Initialized the database.')
