import re
import json
import pprint

with open('Source_Material/works_of_json/alls_well_that_ends_well.json', 'r') as p:
    play = json.load(p)

act_dicts = []
intro_prep = re.split(
    r'(?<=Tuscany\.)\n', play['ALL\u2019S WELL THAT ENDS WELL'], maxsplit=1)
intro = intro_prep[0]
work_body = intro_prep[1]

acts = re.split(r'\n+(?=ACT)', work_body)

# for act in acts:
scenes = re.split(r'\n+(?=SCENE)', acts[5])
lines = re.split(
    r'\n+(?=[A-Z\s]+\.)|\n+\s{2,}(?=\[_)|\n+\s+(?=Enter)', scenes[2])

parsed_scene = []

for line in lines:
  player_or_direct = re.split(r'(?<=[A-Z]\.)\n+', line)

  try:
    text = {
      'type': 'dialouge',
      'character': player_or_direct[0],
      'line': player_or_direct[1]
    }
  except IndexError:
    try:
      direct = re.split(r'(?<=_\])$|\n+', player_or_direct[0])
      text = {
        'type': 'direction',
        'direction': direct[0],
        'leftover': direct[1]

      }
    except IndexError:
      text = direct
    
  parsed_scene.append(text)  


pp = pprint.PrettyPrinter(indent=4)
pp.pprint(parsed_scene)

# print(len(lines))
