import re
import json

with open("Source_Material/poems_etc/poems_etc_raw/the_sonnets.json", "r") as s:
    sonnets = json.load(s)

sonnet_dicts = []
sonnet_list = re.split(r"\s+(?=\d)", sonnets)

for sonnet in sonnet_list:
    p = re.split(r"(?<=\d)\n+", sonnet)
    try:
        lines = re.split(r"\n", p[1])
        poem_info = {
            "type": "sonnet",
            "title": p[0],
            "text": lines,
            "length": len(lines),
        }
        sonnet_dicts.append(poem_info)
    except IndexError:
        pass

with open("Source_Material/poems_etc/poems_etc_parsed/the_sonnets.json", "w") as sp:
    json.dump(sonnet_dicts, sp)
