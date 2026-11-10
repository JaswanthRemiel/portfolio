// Loads all site content from details.md at the repo root. Edit that file, not
// this one: the YAML front matter holds the structured data and the Markdown
// body is the bio. It is re-read on every render, so in dev a refresh picks up
// changes without restarting the server.

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

export type Link = { label: string; href: string };

export type Profile = {
  name: string;
  title: string;
  description: string;
  email: string;
  resume: string;
  socials: Link[];
};

export type Project = {
  name: string;
  href: string;
  period: string;
  description: string;
  tech: string[];
  links: Link[];
  image: string;
  /** Looping preview clip; shown instead of the image when set. */
  video: string;
  /** Still frame for the clip: `<name>-poster.jpg` beside the video, else the image. */
  poster: string;
};

export type Role = {
  role: string;
  org: string;
  href?: string;
  when?: string;
  description: string;
  photos: { src: string; alt: string }[];
};

export type Post = { title: string; date: string; image: string; href: string };

export type Paper = {
  title: string;
  when: string;
  href?: string;
  description: string;
  tech: string[];
};

export type Certification = { issuer: string; name: string; badge: string; href: string };

/** A bio paragraph: plain text runs and links, parsed from Markdown `[text](url)`. */
export type Inline = { text: string; href?: string };

export type Content = {
  profile: Profile;
  bio: Inline[][];
  projects: Project[];
  experience: { year: string; roles: Role[] }[];
  posts: Post[];
  research: Paper[];
  certifications: Certification[];
};

// ---- raw shape of details.md ----

type Raw = {
  profile: Profile;
  projects?: {
    title: string;
    href?: string;
    dates?: string;
    description?: string;
    technologies?: string[];
    links?: { type: string; href: string }[];
    image?: string;
    video?: string;
  }[];
  experience?: {
    year: string | number;
    title: string;
    company: string;
    href?: string;
    dates?: string;
    description?: string;
    photos?: { src: string; alt?: string }[];
  }[];
  blog?: { title: string; dates?: string; image: string; href: string }[];
  research?: {
    title: string;
    href?: string;
    dates?: string | number;
    description?: string;
    technologies?: string[];
    links?: string[];
  }[];
  certifications?: { issuer: string; title: string; href: string; image: string }[];
};

const FILE = path.join(process.cwd(), "details.md");

const MONTHS: Record<string, string> = {
  January: "Jan", February: "Feb", March: "Mar", April: "Apr", June: "Jun", July: "Jul",
  August: "Aug", September: "Sep", October: "Oct", November: "Nov", December: "Dec",
};

/** "November 2025 - Present" → "Nov 2025 – Present", so dates fit on one line in a card. */
function shortDates(s = "") {
  return s
    .replace(/\b(January|February|March|April|June|July|August|September|October|November|December)\b/g, (m) => MONTHS[m])
    .replace(/\s+-\s+/g, " – ")
    .trim();
}

/** First letter upper-cased, trailing space trimmed. */
function sentence(s = "") {
  const t = s.trim();
  return t.charAt(0).toUpperCase() + t.slice(1);
}

/** A video's poster is `<name>-poster.jpg` next to it when that file exists. */
function posterFor(video = "", image = "") {
  if (video.endsWith(".mp4")) {
    const poster = video.replace(/\.mp4$/, "-poster.jpg");
    if (existsSync(path.join(process.cwd(), "public", poster))) return poster;
  }
  return image;
}

function parseInline(paragraph: string): Inline[] {
  const out: Inline[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  for (let m = re.exec(paragraph); m; m = re.exec(paragraph)) {
    if (m.index > last) out.push({ text: paragraph.slice(last, m.index) });
    out.push({ text: m[1], href: m[2] });
    last = m.index + m[0].length;
  }
  if (last < paragraph.length) out.push({ text: paragraph.slice(last) });
  return out;
}

function split(source: string) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(source);
  if (!m) throw new Error("details.md must start with YAML front matter between --- lines");
  return { data: yaml.load(m[1]) as Raw, body: m[2] };
}

export function getContent(): Content {
  const { data, body } = split(readFileSync(FILE, "utf8"));

  const experience: Content["experience"] = [];
  for (const e of data.experience ?? []) {
    const year = String(e.year);
    let group = experience.find((g) => g.year === year);
    if (!group) experience.push((group = { year, roles: [] }));
    group.roles.push({
      role: e.title,
      org: e.company,
      href: e.href || undefined,
      when: e.dates || undefined,
      description: e.description ?? "",
      photos: (e.photos ?? []).map((p) => ({ src: p.src, alt: p.alt ?? "" })),
    });
  }

  return {
    profile: data.profile,
    bio: body
      .split(/\n\s*\n/)
      .map((p) => p.replace(/\s*\n\s*/g, " ").trim())
      .filter(Boolean)
      .map(parseInline),
    projects: (data.projects ?? []).map((p) => ({
      name: p.title,
      href: p.href ?? "",
      period: shortDates(p.dates),
      description: sentence(p.description),
      tech: p.technologies ?? [],
      links: (p.links ?? []).map((l) => ({ label: l.type, href: l.href })),
      image: p.image ?? "",
      video: p.video ?? "",
      poster: posterFor(p.video, p.image),
    })),
    experience,
    posts: (data.blog ?? []).map((b) => ({ title: b.title, date: b.dates ?? "", image: b.image, href: b.href })),
    research: (data.research ?? []).map((r) => ({
      title: r.title,
      when: String(r.dates ?? ""),
      href: r.href || r.links?.[0] || undefined,
      description: sentence(r.description),
      tech: r.technologies ?? [],
    })),
    certifications: (data.certifications ?? []).map((c) => ({
      issuer: c.issuer,
      name: c.title,
      badge: c.image,
      href: c.href,
    })),
  };
}
