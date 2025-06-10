# HellPrompts

HellPrompts is a small website that serves up creepy and creative prompts for writers and AI enthusiasts. The prompts are stored in `hellPrompts.json` and displayed through `index.html`. No build step is required; everything runs in the browser.

## Project Overview

The page randomly selects a line from the JSON file and shows it in the browser. A list of recently generated prompts is displayed underneath so you can easily copy your favorites. You can try it online at [hellprompts.com](https://hellprompts.com).


## Using Locally

1. Clone this repository or download the files.
2. Open `index.html` in any modern web browser. You can double‑click the file or serve it via a simple local web server.
3. Click the **Generate Hellprompt** button to create a new random prompt. Click it again any time you want to regenerate a new prompt.

The page will keep a short history of previously generated prompts during your session.

## Regenerating Prompts Data

If you want to change the set of prompts, edit `hellPrompts.json` and reload `index.html`. The page will automatically use your updated prompt list.

### Sanitizing the JSON

Run the helper script to clean control characters from the prompts:

```bash
python3 sanitize_prompts.py
```

## Contributing

Pull requests are welcome! Fork the repository, create a feature branch and send a PR describing your changes. You can add new prompts by editing `hellPrompts.json` or improve the site in any other way.

## License

This project is distributed under the [Apache License 2.0](LICENSE).

