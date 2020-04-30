
import re
import json

def setup_play_titles():
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

    return play_titles
