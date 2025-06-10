import json
import re

CONTROL_CHARS = ''.join(chr(i) for i in range(32)) + chr(127)
control_re = re.compile('[%s]' % re.escape(CONTROL_CHARS))

with open('hellPrompts.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

cleaned = [control_re.sub('', item) for item in data]

with open('hellPrompts.json', 'w', encoding='utf-8') as f:
    json.dump(cleaned, f, ensure_ascii=False, indent=2)
    f.write('\n')

print('Removed control characters from %d prompts.' % len(data))

