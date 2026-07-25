/**
 * Article system — markdown files on disk, no backend.
 *
 * To publish: drop a .md file into src/content/articles/, commit, push.
 * Vite picks it up at build time via import.meta.glob, so there is no runtime
 * fetch and no CMS to go down. The filename becomes the URL slug.
 *
 * Every file needs a frontmatter block:
 *
 *   ---
 *   title: Writing a scheduler that does not lie to you
 *   description: On why round-robin is a trap
 *   date: 2026-07-14
 *   tags: [systems, os]
 *   lang: en
 *   draft: false
 *   ---
 */

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  /** Parsed from `date`, used for sorting. */
  timestamp: number;
  tags: string[];
  lang: 'en' | 'ar';
  draft: boolean;
  body: string;
  readingMinutes: number;
}

const files = import.meta.glob('../content/articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

/**
 * Minimal YAML frontmatter reader. Deliberately not a full YAML parser — it
 * handles `key: value`, quoted strings, and `[a, b]` lists, which is all the
 * frontmatter here ever needs. Anything fancier belongs in the body.
 */
function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw.trim());
  if (!match) return { meta: {}, body: raw };

  const meta: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (key) meta[key] = value;
  }
  return { meta, body: match[2] };
}

function parseList(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .replace(/^\[|\]$/g, '')
    .split(',')
    .map((s) => s.trim().replace(/^["']|["']$/g, ''))
    .filter(Boolean);
}

/** ~200 wpm, which is a fair pace for technical prose. */
function estimateReading(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function build(): Article[] {
  return Object.entries(files)
    .map(([path, raw]) => {
      const slug = path.split('/').pop()!.replace(/\.md$/, '');
      const { meta, body } = parseFrontmatter(raw);
      const date = meta.date ?? '';
      const parsed = Date.parse(date);

      return {
        slug,
        title: meta.title || slug,
        description: meta.description || '',
        date,
        timestamp: Number.isNaN(parsed) ? 0 : parsed,
        tags: parseList(meta.tags),
        lang: meta.lang === 'ar' ? 'ar' : 'en',
        draft: meta.draft === 'true',
        body,
        readingMinutes: estimateReading(body),
      } satisfies Article;
    })
    .filter((a) => !a.draft || import.meta.env.DEV)
    .sort((a, b) => b.timestamp - a.timestamp);
}

export const articles: Article[] = build();

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function formatDate(date: string, lang: 'en' | 'ar'): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat(lang === 'ar' ? 'ar-EG' : 'en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(parsed);
}
