import os
from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient

from server.config import Config
from server.app.database.connection import Database

db = Database()


def create_app(config_class=Config):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)

    app.config.from_object(config_class)
    cors = CORS(app, resources={r"/*": {"origins": "*"}})
    db.init_app(app)

    @app.route('/')
    def hello():
        return 'Hello, World!'

    @app.route('/ping')
    def pow():
        return 'pong!'

    from .routes import sonnets, plays

    app.register_blueprint(sonnets.bp)
    app.register_blueprint(plays.bp)

    return app



