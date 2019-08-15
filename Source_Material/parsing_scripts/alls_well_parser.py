import re
import json
import pprint

with open('Source_Material/works_of_json/alls_well_that_ends_well.json', 'r') as p:
    play = json.load(p)

act_dicts = []
intro_prep = re.split(
    r'(?<=Tuscany\.)\n', play['ALL\u2019S WELL THAT ENDS WELL'], maxsplit=1)
intro = intro_prep[0]
dialogue = intro_prep[1]

acts = re.split(r'\n+(?=ACT)' , dialogue)

# for act in acts:
scenes = re.split(r'\n+(?=SCENE)', acts[3])

pp = pprint.PrettyPrinter(indent=3)
pp.pprint(scenes[0])
