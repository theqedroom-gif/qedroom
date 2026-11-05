import { getCollection } from 'astro:content';
import sheet from '../data/grade-10.tsv?raw';
import outline from '../data/grade-10-outline.json';

// The planning sheet supplies the DepEd wording. The outline groups its competencies
// into chapters and lessons. A lesson goes live once its Markdown file exists in
// src/content/lessons/<grade>/<chapter>/. Until then it shows as Coming soon.

function readSheet() {
  const rows = new Map();
  const lines = sheet.split(/\r?\n/).slice(1).filter((line) => line.trim());
  for (const line of lines) {
    const cols = line.split('\t');
    const match = cols[5].match(/^(\d+)\.\s*(.*)$/);
    if (!match) throw new Error(`Sheet row has no competency number: ${line}`);
    rows.set(`${cols[1]}.${match[1]}`, {
      strand: cols[2],
      standard: cols[3].replace(/^demonstrates knowledge and understanding of\s*/, ''),
      competency: match[2],
      code: cols[6] ?? '',
    });
  }
  return rows;
}

let cached;

export async function getCurriculum() {
  if (cached) return cached;
  const rows = readSheet();
  const entries = new Map((await getCollection('lessons')).map((entry) => [entry.id, entry]));
  const used = new Set();

  const grade = { id: outline.id, title: outline.title, url: `/lessons/${outline.id}/`, periods: [] };

  for (const period of outline.periods) {
    const chapters = period.chapters.map((chapter) => {
      const id = `${outline.id}/${chapter.slug}`;
      const url = `/lessons/${id}/`;
      const lessons = chapter.lessons.map((lesson) => {
        const key = `${period.number}.${lesson.competency}`;
        const row = rows.get(key);
        if (!row) throw new Error(`Outline uses competency ${key}, which is not in the sheet`);
        used.add(key);
        const lessonId = `${id}/${lesson.slug}`;
        const entry = entries.get(lessonId);
        return {
          ...lesson,
          id: lessonId,
          url: `/lessons/${lessonId}/`,
          entry,
          live: Boolean(entry),
          title: entry?.data.title ?? lesson.title,
          competencyText: lesson.competencyText ?? row.competency,
          code: row.code,
          strand: row.strand,
          standard: row.standard,
        };
      });
      const first = lessons[0];
      return {
        ...chapter,
        id,
        url,
        period: period.number,
        strand: first.strand,
        standard: first.standard,
        entry: entries.get(id),
        lessons,
        readyCount: lessons.filter((lesson) => lesson.live).length,
      };
    });
    grade.periods.push({ number: period.number, url: `${grade.url}#period-${period.number}`, chapters });
  }

  for (const key of rows.keys()) {
    if (!used.has(key)) throw new Error(`Competency ${key} from the sheet is not in the outline`);
  }

  grade.chapters = grade.periods.flatMap((period) => period.chapters);
  grade.lessons = grade.chapters.flatMap((chapter) => chapter.lessons);
  cached = { grades: [grade] };
  return cached;
}
