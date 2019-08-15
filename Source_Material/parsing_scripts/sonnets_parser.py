import re
import json
import pprint

with open('Source_Material/works_of_json/the_sonnets.json', 'r') as s:
    sonnets = json.load(s)

sonnet_dicts = []

sonnet_list = re.split(r'\s+(?=\d)', sonnets['THE SONNETS'])
 

for sonnet in sonnet_list:
  p = re.split(r'(?<=\d)\n+', sonnet)
  try:
    lines = re.split(r'\n', p[1])
    poem_info = {
        'type': 'sonnet',
        'title': p[0],
        'text': lines,
        'length': len(lines)
    }
    sonnet_dicts.append(poem_info)
  except IndexError:
    pass
 

pp = pprint.PrettyPrinter(indent=3)

pp.pprint(sonnet_dicts)