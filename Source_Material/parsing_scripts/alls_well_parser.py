import re
import json
import pprint

with open('Source_Material/works_of_json/alls_well_that_ends_well.json', 'r') as p:
    json_play = json.load(p)
p.close()

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

def parse_direction_and_dialogue(previous_line, line):
    multi_dict_line = []
    direct = re.split(r'(?<=_\])\n', line)
    dir_text = build_direct_dict(direct[0])
    # TODO:  might have a problem with multiple stage directions in a monolouge!
    if direct[1] != '':
        current_speaker = previous_line['character']
        multi_dict_line.append(build_dialogue_dict(current_speaker, direct[1]))
        multi_dict_line.append(dir_text)
        return multi_dict_line

def parse_stage_direction_only(line):  
    direct = re.split(r'(?<=_\])$', line)
    return build_direct_dict(direct[0])  

def parse_scene(scene):
    parsed_scene = []

    lines = re.split(
    r'\n+(?=[A-Z\s]+\.)|\n+\s{2,}(?=\[_)|\n+\s+(?=Enter)', scene)
    
    for index, line in enumerate(lines):
        try:
            parsed_scene.append(parse_player_dialouge(line))
        except IndexError:
            try:
                previous_line =parsed_scene[index-1]
                multi_dict_line = parse_direction_and_dialogue(previous_line, line)
                for line_dict in multi_dict_line:
                    parsed_scene.append(line_dict)
            except IndexError:
                parsed_scene.append(parse_stage_direction_only(line))

    return parsed_scene

def prep_raw_json(play):
    # TODO pass title as argument
    return re.split(
        r'(?<=Tuscany\.)\n', play['ALL\u2019S WELL THAT ENDS WELL'], maxsplit=1)

play_body = []

intro_prep = prep_raw_json(json_play)
intro = intro_prep[0]
work_body = intro_prep[1]

acts = re.split(r'ACT\s\w{1,}\.\n+', work_body)


for act_index, act in enumerate(acts):
    scenes = re.split(r'\n+(?=SCENE)', act)

    assembled_act = []
    for scene_index, scene in enumerate(scenes):
        parsed_scene = parse_scene(scene)
        scene_dict = {
            'text': parsed_scene,
            'act' : act_index + 1,
            'scene': scene_index+ 1,
            'title': parsed_scene[0]['direction']
        }
        assembled_act.append(scene_dict)
    print(len(assembled_act))    
    play_body.append({
        'Act {}'.format(act_index+1) :assembled_act
    })

