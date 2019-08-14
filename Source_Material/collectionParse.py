import re
import json

with open('Source_Material/text_files/collectedWorks.txt', 'r') as works:
  collected_works = works.read()

big_list = re.split(r'\n(ALL’S WELL THAT ENDS WELL)', collected_works,  maxsplit=1)
sonnets_dict = {
  'sonnets': big_list[0]
}

with open('Source_Material/works_of_json/the_sonnets.json', 'w') as sonnets:
  json.dump(sonnets_dict, sonnets)