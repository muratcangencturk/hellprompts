# HellPrompts

![License](https://img.shields.io/github/license/ianstormtaylor/slate)
![CI](https://github.com/yourusername/hellprompts/actions/workflows/ci.yml/badge.svg)

HellPrompts is an open source horror, dystopian and AI writing prompt generator. It runs entirely in the browser and delivers thousands of spooky ideas for storytellers and prompt engineers. Prompts live in language‑specific JSON files (e.g. `hellPrompts.en.json`) so you can add new languages or edit the existing ones with ease.

## Features

- Random prompt generation with a click
- English and Turkish translations out of the box
- No build step or server required – just open `index.html`
- Easily extendable JSON based prompt lists


## Running locally

1. Clone the repository.
2. Open `index.html` in your favourite browser. The site works offline.
3. Click **Generate Hellprompt** to get a new creepy idea and use the **EN/TR** toggle to switch languages.

## Customizing prompts

Prompts are stored in JSON files named `hellPrompts.<lang>.json`. Edit `hellPrompts.en.json` to modify English text or create files like `hellPrompts.tr.json` for translations.

### Sanitizing prompt files

Remove control characters after editing to keep the data clean. By default the
script reads and writes `hellPrompts.en.json`:

```bash
python sanitize_prompts.py
```

### Translating prompt files

`translate_prompts.py` uses `googletrans` to generate new language files. Example:

```bash
python translate_prompts.py
```

The script reads `hellPrompts.en.json` and writes updates to `hellPrompts.tr.json`.
Install the dependencies first:

```bash
pip install -r requirements.txt
```

## Requirements

- Python 3.11
- Packages listed in [requirements.txt](requirements.txt) (`googletrans`)

Install them with:

```bash
pip install -r requirements.txt
```

## Contributing

Contributions are welcome! Please open a pull request with your improvements or new prompts. Make sure the scripts compile by running:

```bash
python -m py_compile sanitize_prompts.py translate_prompts.py
```

## License

Distributed under the [Apache License 2.0](LICENSE).
<!-- keywords: horror prompts, ai prompt generator, creative writing, dystopian prompts, open source -->
