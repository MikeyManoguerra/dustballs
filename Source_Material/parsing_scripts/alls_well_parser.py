import re
import json
import pprint

with open('Source_Material/plays/plays_raw/alls_well_that_ends_well.json', 'r') as p:
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
    try:
        direct = re.split(r'(?<=_\])\n', line)
        dir_text = build_direct_dict(direct[0])
        # TODO:  might have a problem with multiple stage directions in a monolouge!
        if direct[1] != '':
            current_speaker = previous_line['character']
            multi_dict_line.append(build_dialogue_dict(current_speaker, direct[1]))
            multi_dict_line.append(dir_text)
            return multi_dict_line
    except: 
        pass

def parse_enter_and_dialogue(previous_line, line):
    multi_dict_line = []
    try:
        direct = re.search(r'Enter\s+\w+\.', line).group(0)
        direct_and_line= re.split(r'(?<={})\n'.format(direct),line)
        
        dir_text = build_direct_dict(direct_and_line[0])
        if direct_and_line[1] != '':
            current_speaker = previous_line['character']
            multi_dict_line.append(dir_text)
            multi_dict_line.append(build_dialogue_dict(current_speaker, direct_and_line[1]))
            return multi_dict_line
    except: 
            pass

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
            except :
                try:
                    # TODO use while loop here
                    previous_line =parsed_scene[index-1]
                    if previous_line['type'] == 'direction':
                        previous_line = parsed_scene[index-2]

                    multi_dict_line = parse_enter_and_dialogue(previous_line, line)
                    for line_dict in multi_dict_line:
                        parsed_scene.append(line_dict) 
                except :
                    parsed_scene.append(parse_stage_direction_only(line))
    
    # pp =pprint.PrettyPrinter(indent=4)
    # pp.pprint(parsed_scene)
    return parsed_scene

def prep_raw_json(play):
    # TODO pass title as argument
    return re.split(
        r'(?<=Tuscany\.)\n', play, maxsplit=1)

intro_prep = prep_raw_json(json_play)
intro = intro_prep[0]
work_body = intro_prep[1]

def restucture_play_body(body):
    play_body = []
    acts = re.split(r'ACT\s\w+\.\s*\n', body)

    # VVV to access asingle scene, run this only VVV
    # scenes = re.split(r'\n+(?=SCENE)', acts[0])
    # parse_scene(scenes[2])


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
            print(scene_dict['title'])    
        play_body.append({
            'Act {}'.format(act_index+1) :assembled_act
        })
    return play_body

assembled_play_body = restucture_play_body(work_body)

full_play = {
    'table_of_contents': intro,
    'body': assembled_play_body
}

pp =pprint.PrettyPrinter(indent=4)
# pp.pprint(assembled_play_body)

with open('Source_Material/plays/plays_parsed/alls_well_that_ends_well.json', 'w') as sp:
  json.dump(full_play, sp)
