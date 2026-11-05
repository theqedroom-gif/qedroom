import { existsSync, readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// Coming soon lessons stay out of search results until their Markdown file exists.
const outline = JSON.parse(readFileSync('./src/data/grade-10-outline.json', 'utf8'));
const comingSoon = new Set();
for (const period of outline.periods) {
  for (const chapter of period.chapters) {
    for (const lesson of chapter.lessons) {
      const path = `${outline.id}/${chapter.slug}/${lesson.slug}`;
      if (!existsSync(`./src/content/lessons/${path}.md`)) comingSoon.add(`/lessons/${path}/`);
    }
  }
}

export default defineConfig({
  site: 'https://qedroom.pages.dev',
  integrations: [sitemap({ filter: (page) => !comingSoon.has(new URL(page).pathname) })],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
