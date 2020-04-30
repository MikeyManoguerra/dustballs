from pymongo import MongoClient
import json
import re

with open("Source_Material/text_files/titles.txt", "r") as t:
    titles = t.read()
t.close()

list_of_titles = re.split(r"\n+", titles)

play_titles = []

non_plays = [
    "the_passionate_pilgrim",
    "the_pheonix_and_the_turtle",
    "the_sonnets",
    "venus_and_adonis",
]


for index, title in enumerate(list_of_titles):
    underscored_title = re.sub(r"\s", r"[_]", title)
    underscored_title = re.sub(r"\W", "", underscored_title).lower()
    if underscored_title not in non_plays:
        play_titles.append((title.lower(), underscored_title))


# these fail in build_play_objects.py for various reasons.
temp_leave_out = [
    "the_third_part_of_king_henry_the_sixth",
    "the_tragedy_of_titus_andronicus",
    "the_two_noble_kinsmen",
    "a_lovers_complaint",
    "the_phoenix_and_the_turtle",
    "the_rape_of_lucrece",
]

client = MongoClient()
scenes = MongoClient().dustball_db.scenes
scenes.drop()

table_of_contents = MongoClient().dustball_db.table_of_contents
table_of_contents.drop()


for play in play_titles:
    if play[1] in temp_leave_out:
        print(play[0], 'left out')
        continue

    try:
        with open(f"Source_Material/plays/plays_parsed/{play[1]}.json", "r") as p:
            json_play = json.load(p)
        p.close()

        if len(json_play["body"]) == 1:
            # these need debugging
            print(play[0], 'bad seperation')
            continue

        table_of_contents.insert_one(json_play["table_of_contents"])
        for act in json_play["body"]:
            scenes.insert_many(act)
    except:
        print(play)


scenes.create_index([("text", "text")])
client.close()
