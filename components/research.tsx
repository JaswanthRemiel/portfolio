"use client";

import Link from "next/link";
import Markdown from "react-markdown";
import { Badge } from "@/components/ui/badge";

interface Research {
  title: string;
  href?: string;
  links?: string[];
  description: string;
  dates: string;
  technologies: string[];
}

interface ResearchItemProps {
  href?: string;
  title: string;
  description: string;
  dates: string;
  technologies: string[];
}

interface ResearchContentProps {
  research: Research[];
}

function ResearchItem({
  href,
  title,
  description,
  dates,
  technologies,
}: ResearchItemProps) {
  return (
    <div>
      {href ? (
        <Link
          href={href}
          target="_blank"
          className="group inline-flex items-center space-x-1 text-white hover:text-gray-300 transition-colors"
        >
          <span className="text-sm underline underline-offset-4">{title}</span>
        </Link>
      ) : (
        <span className="text-sm text-white underline underline-offset-4">
          {title}
        </span>
      )}
      <div className="text-xs text-gray-500 mt-1">{dates}</div>
      <div className="text-sm text-justify font-mono text-gray-400 mt-1">
        <Markdown>{description}</Markdown>
      </div>
      {technologies && technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs text-gray-300 bg-white/2 border border-gray-800 rounded-sm px-3 py-0.5"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function ResearchContent({ research }: ResearchContentProps) {
  return (
    <section className="space-y-7">
      <div className="space-y-7">
        {research.map((item: Research) => (
          <ResearchItem
            key={item.title}
            href={item.href || item.links?.[0]}
            title={item.title}
            description={item.description}
            dates={item.dates}
            technologies={item.technologies}
          />
        ))}
      </div>
    </section>
  );
}
