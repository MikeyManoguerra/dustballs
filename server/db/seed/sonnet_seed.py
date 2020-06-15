from pymongo import MongoClient
import json

with open("Source_Material/poems_etc/poems_etc_parsed/the_sonnets.json", "r") as s:
    sonnets = json.load(s)
s.close()

client = MongoClient()
sonnet_collection = MongoClient().dustball_db.sonnets
sonnet_collection.drop()


def add_author(s):
    s["author_first_name"] = "william"
    s["author_last_name"] = "shakespeare"
    return s


prepped_sonnets = list(map(add_author, sonnets))
sonnet_collection.insert_many(prepped_sonnets)
sonnet_collection.create_index([("text", "text")])
client.close()
