import re
import json

with open('Source_Material/text_files/collectedWorks.txt', 'r') as works:
    collected_works = works.read()
works.close()

with open('Source_Material/text_files/titles.txt', 'r') as t:
    titles = t.read()
t.close()

list_of_titles = re.split(r'\n+', titles)
text_to_split = collected_works

for index, title in enumerate(list_of_titles):

    try:
        next_title = list_of_titles[index+1]
    except IndexError:
        next_title = '___CONTENT NOTE added in 2017___'

    regex = r'\n(?={})'.format(next_title)
    big_list = re.split(regex, text_to_split,  maxsplit=1)
    play_dict = {
        '{}'.format(title): big_list[0]
    }

    try:
      text_to_split = big_list[1]
    except IndexError:
      pass
      
    underscored_title = re.sub(r'\s', r'[_]', title)
    underscored_title = re.sub(r'\W', '', underscored_title)

    with open('Source_Material/works_of_json/{}.json'.format(underscored_title), 'w') as play:
        json.dump(play_dict, play)

print('\t!\nsuccessfully split text\n\t!')