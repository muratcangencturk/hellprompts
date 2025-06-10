# HellPrompts

HellPrompts is a small website that serves up creepy and creative prompts for writers and AI enthusiasts. The prompts are stored in `hellPrompts.json` and displayed through `index.html`. No build step is required; everything runs in the browser.

## Using Locally

1. Clone this repository or download the files.
2. Open `index.html` in any modern web browser. You can double‑click the file or serve it via a simple local web server.
3. Click the **Generate Hellprompt** button to create a new random prompt. Click it again any time you want to regenerate a new prompt.

The page will keep a short history of previously generated prompts during your session.

## Regenerating Prompts Data

If you want to change the set of prompts, edit `hellPrompts.json` and reload `index.html`. The page will automatically use your updated prompt list.

### Sanitizing Prompts

Use `sanitize_prompts.py` to remove control characters from your prompt list.

```
python sanitize_prompts.py
```

By default it reads from `hellPrompts.json` and writes the cleaned prompts back to the same file. You can specify custom input and output files:

```
python sanitize_prompts.py -i my_prompts.json -o cleaned.json
```

## License

This project is distributed under the [Apache License 2.0](LICENSE).
