# The QED Room website

<!-- Add this section to the project's CLAUDE.md (or use this file as it is if the project has none). -->

## Design system: always follow it

This site uses The QED Room design system in `qed-design/`.

- Before building or changing any UI, read `qed-design/DESIGN.md` and follow it.
- Use only the variables in `qed-design/tokens.css` (or the Tailwind preset `qed-design/tailwind.preset.js`). Never hard-code colours, fonts, sizes or radii.
- **All maths is LaTeX rendered with KaTeX** (`qed-design/katex-setup.html`). Never write maths with Unicode symbols or monospace text, and never put maths in Amaranth headings.
- Logos live in `qed-design/assets/brand/`. Use the files as they are, never recreate the logo.
- Yellow (#E8C544) is never text on a light background. Check contrast for every new colour pair.
- `qed-design/examples/lesson.html` is the reference page. Match its structure and patterns for new pages.
- Content follows the DepEd mathematics curriculum. Grade levels and topic names must match it.
