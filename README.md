# HellPrompts

HellPrompts is a small website that serves up creepy and creative prompts for writers and AI enthusiasts. The prompts are stored in language specific JSON files (e.g. `hellPrompts.en.json`) and displayed through `index.html`. No build step is required; everything runs in the browser.

## Using Locally

1. Clone this repository or download the files.
2. Open `index.html` in any modern web browser. You can double‑click the file or serve it via a simple local web server.
3. Click the **Generate Hellprompt** button to create a new random prompt. Click it again any time you want to regenerate a new prompt.
4. Use the **EN/TR** toggle in the top-left corner to switch languages. Your choice is remembered in the browser.

The page will keep a short history of previously generated prompts during your session.

## Regenerating Prompts Data

If you want to change the set of prompts, edit the prompt file for the appropriate language such as `hellPrompts.en.json`. You can create additional files like `hellPrompts.tr.json` for new translations. Reload `index.html` and the page will automatically use your updated prompt list.

### Sanitizing Prompts

Use `sanitize_prompts.py` to remove control characters from your prompt list.

```
python sanitize_prompts.py
```

By default it reads from `hellPrompts.json` and writes the cleaned prompts back to the same file. You can specify custom input and output files:

```
python sanitize_prompts.py -i my_prompts.json -o cleaned.json
```

### Translating Prompts

To provide new languages, create a copy of `hellPrompts.en.json` and translate each string. Name the file using the `<lang>` code, e.g. `hellPrompts.tr.json` for Turkish. The language toggle will automatically load a file that matches its code.

## License

This project is distributed under the [Apache License 2.0](LICENSE).
