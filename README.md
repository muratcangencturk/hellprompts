# HellPrompts

![License](https://img.shields.io/github/license/ianstormtaylor/slate)
![CI](https://github.com/yourusername/hellprompts/actions/workflows/ci.yml/badge.svg)

HellPrompts is an open source horror, dystopian and AI writing prompt generator. It runs entirely in the browser and delivers thousands of spooky ideas for storytellers and prompt engineers. Prompts live in language‑specific JSON files (e.g. `hellPrompts.en.json`) so you can add new languages or edit the existing ones with ease.

## Features

- Random prompt generation with a click
- English and Turkish translations out of the box
- No build step or server required – just open `index.html`
- Easily extendable JSON based prompt lists
- Share prompts using the Web Share API or copy them to your clipboard
- Works offline thanks to a simple service worker

## Offline usage

The service worker caches all assets and prompt files so you can generate ideas even without an internet connection. Serve the project locally or host it on any static site to enable the PWA features.

When deploying updates you might still see an older version because the browser
is using a previous cache. The service worker now removes outdated caches on
activation. If needed you can also bump the `CACHE_NAME` constant in
`service-worker.js` to force clients to refresh.


## Running locally

1. Clone the repository.
2. Serve the folder with a local web server (e.g. `python -m http.server`) and open `index.html`. This registers the service worker for offline use.
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

`translate_prompts.py` uses `googletrans` to generate new language files. Pass
the source file, target language and an optional index range:

```bash
python translate_prompts.py -i hellPrompts.en.json -l tr -s 1600 -e 3100
```

This reads `hellPrompts.en.json` and writes translated lines to
`hellPrompts.tr.json`.
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

Format the code before committing:

```bash
npx prettier --write .
flake8 .
```
Configuration lives in [.prettierrc](.prettierrc) and [.flake8](.flake8).

## License

Distributed under the [Apache License 2.0](LICENSE).
<!-- keywords: horror prompts, ai prompt generator, creative writing, dystopian prompts, open source -->
