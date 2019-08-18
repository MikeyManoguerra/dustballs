from play_parser import read_parse_dump_play
import re
import json

with open('Source_Material/text_files/titles.txt', 'r') as t:
    titles = t.read()
t.close()

list_of_titles = re.split(r'\n+', titles)

play_titles = []

non_plays = [
    'the_passionate_pilgrim',
    'the_pheonix_and_the_turtle',
    'the_sonnets',
    'venus_and_adonis'
]


for index, title in enumerate(list_of_titles):
    underscored_title = re.sub(r'\s', r'[_]', title)
    underscored_title = re.sub(r'\W', '', underscored_title).lower()
    if underscored_title not in non_plays:
        play_titles.append(underscored_title)
print(play_titles)

for play in play_titles:
  try:
    read_parse_dump_play(play)
  except:
    print(play)