# Invariantsmith-site

Static project website for InvariantSmith. No build step.

## Structure

- `index.html`: the whole site, one page.
- `404.html`: not-found page.
- `css/style.css`: all styles. Colours are CSS custom properties on `:root`, with `[data-theme="light"]` and `[data-theme="dark"]` overrides.
- `js/`: one responsibility per file, no inline scripts or inline event handlers.
  - `theme.js`: theme before first paint, toggle, and the `T` shortcut. Choice is stored in localStorage.
  - `motion.js`: scroll progress, header shrink, reveal-on-scroll, hero stagger, counters for real numbers.
  - `nav.js`: highlights the section currently in view.
  - `copy.js`: copy buttons on every code block.
  - `diff-demo.js`: play/replay for the scanf before/after diff.
  - `tabs.js`: Windows / macOS / Linux tabs with arrow-key support.
- `assets/`: favicon and Open Graph card.
- `.nojekyll`: tells GitHub Pages to serve files without Jekyll processing.

## Editing content

- All copy is in `index.html`. Items marked `[FILL: ...]` are unverified or missing and must be filled in before publishing.
- The fix-accuracy figure stays a placeholder until `eval_model.py` output is available for the held-out set.
- The development journey section needs one-line summaries from the CHANGELOG files.
- Colour changes go in the `:root` block of `css/style.css`. Edit the light and dark overrides together.

## Preview locally

Open `index.html` in a browser. It works from file:// with no server.

## Deploy to GitHub Pages

1. Create a repo named `Invariantsmith-site` under the same account.
2. Push the contents of this folder to the `main` branch.
3. In Settings > Pages, set the source to `main` and `/ (root)`.
4. The site works at the root domain and under `/Invariantsmith-site/`, because all paths are relative.

## Checks before publishing

- Every link and copy button works, including the Drive link and the clone URL.
- Theme toggle works in both directions and persists across reloads.
- Reduced-motion mode disables the heavy animation.
- Layout works at 360, 768 and 1440 px.
- No console errors.
- Lighthouse performance and accessibility are both 90 or higher.
