# from flask import Flask
# from flask import jsonify
# from pymongo import MongoClient
# import random
# client = MongoClient('localhost', 27017)
# db = client.dustball_db
# sonnets = db.sonnets

# # http://flask.palletsprojects.com/en/1.1.x/tutorial/layout/
# app = Flask(__name__)

# @app.route('/')
# def hello_world():
#     random_number = str(random.randint(1, 155))
#     sonnet = sonnets.find_one({"title": random_number})

#     # https://stackoverflow.com/questions/16586180/typeerror-objectid-is-not-json-serializable
#     return jsonify({"text":sonnet['text'],'title': sonnet['title']})
# if __name__ == "__main__":
#     app.run(debug=True)