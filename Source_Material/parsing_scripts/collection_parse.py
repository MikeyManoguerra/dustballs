import re
import json

with open("Source_Material/text_files/collectedWorks.txt", "r") as works:
    collected_works = works.read()
works.close()

with open("Source_Material/text_files/titles.txt", "r") as t:
    titles = t.read()
t.close()

list_of_titles = re.split(r"\n+", titles)
text_to_split = collected_works

for index, title in enumerate(list_of_titles):

    try:
        next_title = list_of_titles[index + 1]
    except IndexError:
        next_title = "___CONTENT NOTE added in 2017___"

    regex = r"\n(?={})".format(next_title)
    big_list = re.split(regex, text_to_split, maxsplit=1)
    single_play = big_list[0]

    try:
        text_to_split = big_list[1]
    except IndexError:
        pass

    underscored_title = re.sub(r"\s", r"[_]", title)
    underscored_title = re.sub(r"\W", "", underscored_title).lower()

    non_plays = [
        "the_passionate_pilgrim",
        "the_pheonix_and_the_turtle",
        "the_sonnets",
        "venus_and_adonis",
    ]

    if underscored_title in non_plays:
        with open(
            "Source_Material/poems_etc/poems_etc_raw/{}.json".format(underscored_title),
            "w",
        ) as poem:
            json.dump(single_play, poem)

    else:
        with open(
            "Source_Material/plays/plays_raw/{}.json".format(underscored_title), "w"
        ) as play:
            json.dump(single_play, play)

print("*********\nsuccessfully split text\n********")

