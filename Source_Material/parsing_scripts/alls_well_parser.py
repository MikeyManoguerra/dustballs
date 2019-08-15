import re
import json
import pprint

with open('Source_Material/works_of_json/alls_well_that_ends_well.json', 'r') as p:
    play = json.load(p)
p.close()

act_dicts = []
intro_prep = re.split(
    r'(?<=Tuscany\.)\n', play['ALL\u2019S WELL THAT ENDS WELL'], maxsplit=1)
intro = intro_prep[0]
work_body = intro_prep[1]

acts = re.split(r'\n+(?=ACT)', work_body)

# for act in acts:
scenes = re.split(r'\n+(?=SCENE)', acts[2])
lines = re.split(
    r'\n+(?=[A-Z\s]+\.)|\n+\s{2,}(?=\[_)|\n+\s+(?=Enter)', scenes[2])

parsed_scene = []


def build_dialogue_dict(character, line):
    return {
        'type': 'dialouge',
        'character': character,
        'line': line
    }


def build_direct_dict(direction):
    return {
        'type': 'direction',
        'direction': direct[0]
    }


for index, line in enumerate(lines):
    player_or_direct = re.split(r'(?<=[A-Z]\.)\n+', line)

    try:
        text = build_dialogue_dict(player_or_direct[0], player_or_direct[1])

    except IndexError:
        try:
            direct = re.split(r'(?<=_\])\n', player_or_direct[0])
            dir_text = build_direct_dict(direct[0])
            # print(dir_text)
            if direct[1] != '':
                current_speaker = parsed_scene[index-1]['character']
                text = build_dialogue_dict(current_speaker, direct[1])
            parsed_scene.append(dir_text)
        except IndexError:
            try:
                direct = re.split(r'(?<=_\])$', player_or_direct[0])
                text = build_direct_dict(direct[0])
            except IndexError:
                text = direct

    parsed_scene.append(text)

    # try:
    #   parsed_scene.append(post_dir_text)
    # except:
    #   pass

pp = pprint.PrettyPrinter(indent=4)
pp.pprint(parsed_scene)

# print(len(lines))
