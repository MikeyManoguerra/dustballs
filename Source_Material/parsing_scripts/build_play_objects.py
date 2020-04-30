import re
import json

from play_title_setup import setup_play_titles
from play_parser import read_parse_dump_play

play_titles = setup_play_titles()

for play in play_titles:
    try:
        read_parse_dump_play(play)
    except:
        print(play)
