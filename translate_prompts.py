import json
import time
from googletrans import Translator

START_INDEX = 1600
END_INDEX = 3100  # inclusive

translator = Translator()

with open("hellPrompts.en.json", "r", encoding="utf-8") as f:
    en_prompts = json.load(f)

# slice prompts
slice_prompts = en_prompts[START_INDEX : END_INDEX + 1]

# load existing turkish prompts
with open("hellPrompts.tr.json", "r", encoding="utf-8") as f:
    tr_prompts = json.load(f)

for idx, text in enumerate(slice_prompts, start=START_INDEX + 1):
    attempt = 0
    while True:
        try:
            translated = translator.translate(text, src="en", dest="tr").text
            break
        except Exception:
            attempt += 1
            if attempt >= 5:
                raise
            time.sleep(1)
    print(f"{idx}: {translated}")
    tr_prompts.append(translated)
    time.sleep(0.3)

with open("hellPrompts.tr.json", "w", encoding="utf-8") as f:
    json.dump(tr_prompts, f, ensure_ascii=False, indent=2)
    f.write("\n")
