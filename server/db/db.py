import click
import os
from pymongo import MongoClient
from flask import current_app, g
from flask.cli import with_appcontext


def init_db(app=current_app):
    client = MongoClient(app.config["MONGODB_URI"] or "localhost", 27017)
    print(client.dustball_db)
    return client.dustball_db


def get_db():
    if "db" not in g:
        g.db = init_db()
    return g.db


def close_db(e=None):
    db = g.pop("db", None)

    if db is not None:
        db.close()


def init_app(app):
    db = init_db(app)
