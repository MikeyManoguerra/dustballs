import os
from flask import Flask
from .routes import sonnets, auth, plays
from flask_cors import CORS
from server.config import Config
from pymongo import MongoClient
from server.db import db

db = db

def create_app(config_class=Config, test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)

    app.config.from_object(config_class)
    cors = CORS(app, resources={r"/*": {"origins": "*"}})

    db.init_app(app)

    # if test_config is None:
    #     # load the instance config, if it exists, when not testing
    #     # app.config.from_pyfile("config.py", silent=True)
    # else:
    #     # load the test config if passed in
    #     app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    app.register_blueprint(sonnets.bp)
    app.register_blueprint(plays.bp)
    app.register_blueprint(auth.bp)

    return app
