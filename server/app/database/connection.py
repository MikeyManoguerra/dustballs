from pymongo import MongoClient
from flask import current_app, g


class Database:
    """
    class to create database instance, then make connection when app factory is run
    #
    """

    def __init__(self):
        self.db = {}
        self.client = {}

    def init_app(self, app):
        try:
            self.client = MongoClient(app.config["MONGODB_URI"], 27017)
            self.db = self.client[app.config["DATABASE_NAME"]]

        except KeyError:
            raise KeyError("Database Name missing from config")

    def get_db(self):
        if "db" not in g:
            g.db = self.db
        return g.db
