import argparse
import json
import re

CONTROL_CHARS = ''.join(chr(i) for i in range(32)) + chr(127)
control_re = re.compile('[%s]' % re.escape(CONTROL_CHARS))

parser = argparse.ArgumentParser(description="Remove control characters from a JSON list of prompts")
parser.add_argument('-i', '--input', default='hellPrompts.en.json',
                    help='Input JSON file')
parser.add_argument('-o', '--output', default='hellPrompts.en.json',
                    help='Output JSON file')
args = parser.parse_args()

with open(args.input, 'r', encoding='utf-8') as f:
    data = json.load(f)

cleaned = [control_re.sub('', item) for item in data]

with open(args.output, 'w', encoding='utf-8') as f:
    json.dump(cleaned, f, ensure_ascii=False, indent=2)
    f.write('\n')

print('Removed control characters from %d prompts.' % len(data))
