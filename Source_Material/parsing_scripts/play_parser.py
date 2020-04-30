"""
parses a play into mongodb friendly objects
"""

import re
import json
import pprint


def build_dialogue_dict(character, line):
    return {"type": "dialouge", "character": character, "line": line}


def build_direct_dict(direction):
    return {"type": "direction", "direction": direction}


def parse_player_dialouge(line):
    """
    handles lines of dialouge, when not seperated by stage direction
    """
    player_or_direct = re.split(r"(?<=[A-Z]\.)\n+", line)
    return build_dialogue_dict(player_or_direct[0], player_or_direct[1])


def parse_direction_and_dialogue(previous_line, line):
    """
    handles a line that contains stage direction type /[_._]/ otherwise pass None
    """
    multi_dict_line = []
    try:
        direct = re.split(r"(?<=_\])\n", line)
        dir_text = build_direct_dict(direct[0])
        # TODO:  might have a problem with multiple stage directions in a monolouge! use a while loop
        if direct[1] != "":
            current_speaker = previous_line["character"]
            multi_dict_line.append(build_dialogue_dict(current_speaker, direct[1]))
            multi_dict_line.append(dir_text)
            return multi_dict_line
    except:
        pass


def parse_enter_and_dialogue(previous_line, line):
    """
    handles 'Enter' stage direction
    """
    multi_dict_line = []
    try:
        direct = re.search(r"Enter\s+\w+\.", line).group(0)
        direct_and_line = re.split(r"(?<={})\n".format(direct), line)

        dir_text = build_direct_dict(direct_and_line[0])
        if direct_and_line[1] != "":
            current_speaker = previous_line["character"]
            multi_dict_line.append(dir_text)
            multi_dict_line.append(
                build_dialogue_dict(current_speaker, direct_and_line[1])
            )
            return multi_dict_line
    except:
        pass


def parse_stage_direction_only(line):
    """
    handles stage direction that is not encapulated by dialouge
    """
    direct = re.split(r"(?<=_\])$", line)
    return build_direct_dict(direct[0])


def parse_scene(scene):
    """
    function handling parsing of an entire scene
    """

    parsed_scene = []
    lines = re.split(r"\n+(?=[A-Z\s]+\.)|\n+\s{2,}(?=\[_)|\n+\s+(?=Enter)", scene)

    for index, line in enumerate(lines):
        try:
            parsed_scene.append(parse_player_dialouge(line))
        except IndexError:
            try:
                previous_line = parsed_scene[index - 1]

                multi_dict_line = parse_direction_and_dialogue(previous_line, line)
                for line_dict in multi_dict_line:
                    parsed_scene.append(line_dict)
            except:
                try:
                    # TODO use while loop here
                    previous_line = parsed_scene[index - 1]
                    if previous_line["type"] == "direction":
                        previous_line = parsed_scene[index - 2]

                    multi_dict_line = parse_enter_and_dialogue(previous_line, line)
                    for line_dict in multi_dict_line:
                        parsed_scene.append(line_dict)
                except:
                    parsed_scene.append(parse_stage_direction_only(line))

    # pp =pprint.PrettyPrinter(indent=4)
    # pp.pprint(parsed_scene)
    return parsed_scene


def prep_raw_text(play):
    # TODO, handle end of intro univerally
    return re.split(r"\n(?=ACT\sI\.)", play, maxsplit=1)


def restucture_play_body(body, title):
    """
    runs parse_scene on each ACT
    """

    play_body = []
    acts = re.split(r"ACT\s\w+\..*\n", body)

    # this can be better but i dont feel like figuring it out right now
    if acts[0] == '':
        acts = acts[1:]

    # VVV to access asingle scene, run this only VVV
    # scenes = re.split(r'\n+(?=SCENE)', acts[0])
    # parse_scene(scenes[2])

    for act_index, act in enumerate(acts):
        scenes = re.split(r"\n+(?=SCENE)", act)

        assembled_act = []
        for scene_index, scene in enumerate(scenes):
            parsed_scene = parse_scene(scene)
            scene_dict = {
                "title": title,
                "author_first_name": "william",
                "author_last_name": "shakespeare",
                "act": act_index + 1,
                "scene": scene_index + 1,
                "direction": parsed_scene[0]["direction"],
                "text": parsed_scene,
            }
            assembled_act.append(scene_dict)
            # VVV for checking scenes split successfully VVVV
            # print(scene_dict['title'])
        play_body.append(assembled_act)
    return play_body


def read_parse_dump_play(play_title):
    """
    function to export, receives tuple
    """

    with open("Source_Material/plays/plays_raw/{}.txt".format(play_title[1]), "r") as p:
        json_play = json.load(p)
    p.close()

    intro_prep = prep_raw_text(json_play)
    intro = {
        "play": play_title[0],
        "author_first_name": "william",
        "author_last_name": "shakespeare",
        "text": intro_prep[0],
    }
    work_body = intro_prep[1]

    assembled_play_body = restucture_play_body(work_body, play_title[0])

    full_play = {"table_of_contents": intro, "body": assembled_play_body}

    pp = pprint.PrettyPrinter(indent=4)
    # pp.pprint(assembled_play_body)

    with open(
        "Source_Material/plays/plays_parsed/{}.json".format(play_title[1]), "w"
    ) as sp:
        json.dump(full_play, sp)

    print("success")
