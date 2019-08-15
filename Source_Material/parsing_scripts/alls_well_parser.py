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
        'direction': direction
    }

def parse_player_dialouge(line):
    player_or_direct = re.split(r'(?<=[A-Z]\.)\n+', line)
    return build_dialogue_dict(player_or_direct[0], player_or_direct[1])

def parse_direction_and_dialogue(index, line):
    multi_dict_line = []
    direct = re.split(r'(?<=_\])\n', line)
    dir_text = build_direct_dict(direct[0])
    # TODO:  might have a problem with multiple stage directions in a monolouge!
    if direct[1] != '':
        current_speaker = parsed_scene[index-1]['character']
        multi_dict_line.append(build_dialogue_dict(current_speaker, direct[1]))
        multi_dict_line.append(dir_text)
        return multi_dict_line

def parse_stage_direction_only(line):  
    direct = re.split(r'(?<=_\])$', line)
    return build_direct_dict(direct[0])  

for index, line in enumerate(lines):
    try:
        parsed_scene.append(parse_player_dialouge(line))
    except IndexError:
        try:
            multi_dict_line = parse_direction_and_dialogue(index, line)
            for line_dict in multi_dict_line:
                parsed_scene.append(line_dict)
        except IndexError:
            # try:
            parsed_scene.append(parse_stage_direction_only(line))
            # except IndexError:
            #     text = direct

   

pp = pprint.PrettyPrinter(indent=4)
pp.pprint(parsed_scene)

# print(len(lines))
