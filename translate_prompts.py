import argparse
import json
import os
import time
from googletrans import Translator


parser = argparse.ArgumentParser(
    description="Translate prompt files using googletrans"
)
parser.add_argument(
    "-i",
    "--input",
    default="hellPrompts.en.json",
    help="Source JSON file",
)
parser.add_argument(
    "-l",
    "--lang",
    default="tr",
    help="Target language code (e.g. 'tr')",
)
parser.add_argument(
    "-s",
    "--start",
    type=int,
    default=0,
    help="Start index (0-based)",
)
parser.add_argument(
    "-e",
    "--end",
    type=int,
    help="End index (inclusive, defaults to last prompt)",
)
args = parser.parse_args()


with open(args.input, "r", encoding="utf-8") as f:
    en_prompts = json.load(f)

end_index = args.end if args.end is not None else len(en_prompts) - 1
slice_prompts = en_prompts[args.start : end_index + 1]

base = args.input.rsplit(".", 2)[0]
output_file = f"{base}.{args.lang}.json"

if os.path.exists(output_file):
    with open(output_file, "r", encoding="utf-8") as f:
        translated_prompts = json.load(f)
else:
    translated_prompts = []

translator = Translator()

for idx, text in enumerate(slice_prompts, start=args.start + 1):
    attempt = 0
    while True:
        try:
            translated = translator.translate(text, src="en", dest=args.lang).text
            break
        except Exception:
            attempt += 1
            if attempt >= 5:
                raise
            time.sleep(1)
    print(f"{idx}: {translated}")
    translated_prompts.append(translated)
    time.sleep(0.3)

with open(output_file, "w", encoding="utf-8") as f:
    json.dump(translated_prompts, f, ensure_ascii=False, indent=2)
    f.write("\n")
