import re

def parse_enter_and_dialogue(previous_line, line):
    multi_dict_line = []
    direct = re.search(r'Enter\s+\w+\.', line)
    direct_and_line = re.split(r'{}'.format(direct), line)
    dir_text = build_direct_dict(direct_and_line[0])
    if direct[1] != '':
        current_speaker = previous_line['character']
        multi_dict_line.append(build_dialogue_dict(current_speaker, direct[1]))
        multi_dict_line.append(dir_text)
        return multi_dict_line

json_str=    {'direction': 'Enter '
            'Helena.\n'
            '\n'
            'Even so it '
            'was with me '
            'when I was '
            'young;\n'
            'If ever we '
            'are '
            'nature’s, '
            'these are '
            'ours; this '
            'thorn\n'
            'Doth to our '
            'rose of '
            'youth '
            'rightly '
            'belong;\n'
            'Our blood '
            'to us, this '
            'to our '
            'blood is '
            'born;\n'
            'It is the '
            'show and '
            'seal of '
            'nature’s '
         'truth,\n'
         'Where '
         'love’s '
         'strong '
         'passion is '
         'impress’d '
         'in youth.\n'
         'By our '
         'remembrances '
         'of days '
         'foregone,\n'
         'Such were '
         'our faults, '
         'or then we '
         'thought '
         'them none.\n'
         'Her eye is '
         'sick on’t; '
         'I observe '
         'her now.',
            'type': 'direction'},


text = """Enter Helena.

Even so it was with me when I was young;
If ever we are nature’s, these are ours; this thorn
Doth to our rose of youth rightly belong;
Our blood to us, this to our blood is born;
It is the show and seal of nature’s truth,
Where love’s strong passion is impress’d in youth.
By our remembrances of days foregone,
Such were our faults, or then we thought them none.
Her eye is sick on’t; I observe her now."""

direct = re.search(r'Enter\s+\w+\.', text).group(0)
print(direct)