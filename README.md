# Bias Beacon

Bias Beacon is a minimal Chrome Extension prototype that scans visible paragraph text on a webpage and highlights sentences containing simple rule-based bias keywords.

## Files

- `manifest.json`
- `popup.html`
- `popup.js`
- `content.js`
- `styles.css`

## Load in Chrome

1. Open `chrome://extensions`.
2. Enable Developer Mode.
3. Click **Load unpacked**.
4. Select this folder: `/home/tywang/eecs497/biasbeacon`.

## Demo behavior

- Click the **Bias Beacon** extension icon.
- Click **Analyze Page**.
- Sentences containing keywords like `outrageous`, `shocking`, `obviously`, or `those people` are highlighted in yellow.
- Hover highlighted text to see the tooltip explanation.
