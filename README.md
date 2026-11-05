# The QED Room website

Built with [Astro](https://astro.build). Lessons are Markdown files in `src/content/lessons/`, and the design system is in `qed-design/`.

## Add a lesson

Every lesson is already listed in `src/data/grade-10-outline.json`, and shows as Coming soon until its file exists.

1. Find the lesson's `slug` in the outline, then add a `.md` file with that name to the chapter's folder. For example, `src/content/lessons/grade-10/laws-of-sines-and-cosines/law-of-cosines.md`.
2. Copy the top section (between the `---` lines) from an existing lesson and set `title` and `description`.
3. Write maths in LaTeX. Use `$x^2$` inside a sentence. For a centred equation, put `$$` on its own line above and below the equation.

The file `src/data/grade-10.tsv` is the planning sheet, and it supplies the DepEd wording. The outline groups its competencies into chapters and lessons.

## Run it on your computer

```
npm install
npm run dev
```
