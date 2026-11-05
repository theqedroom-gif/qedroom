import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// A file's folder path must match its chapter and lesson in the outline.
// Chapters and lessons come from src/data/grade-10-outline.json; these files add their written content.
//   grade-10/laws-of-sines-and-cosines/index.md         -> a chapter introduction
//   grade-10/laws-of-sines-and-cosines/law-of-sines.md  -> a lesson
const lessons = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/lessons',
    generateId: ({ entry }) => entry.replace(/\.md$/, '').replace(/(^|\/)index$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lead: z.string().optional(),
  }),
});

export const collections = { lessons };
