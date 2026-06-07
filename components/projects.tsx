"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import { Globe, Github, ArrowRight } from "lucide-react";

const Icons = {
  Globe: <Globe className="size-3" suppressHydrationWarning />,
  Github: <Github className="size-3" suppressHydrationWarning />,
};

interface ProjectLink {
  type: string;
  href: string;
  icon: string;
}

interface Project {
  title: string;
  href?: string;
  description: string;
  dates: string;
  technologies: string[];
  image?: string;
  video?: string;
  links?: ProjectLink[];
}


interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <Card
      className={
        "flex flex-col overflow-hidden border border-gray-500 border-opacity-30 hover:shadow-lg transition-all duration-300 ease-out h-full"
      }
    >
      <Link
        href={href || "#"}
        className={cn("block cursor-pointer", className)}
      >
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none mx-auto h-40 w-full object-cover object-top"
          />
        )}
        {image && (
          <Image
            src={image}
            alt={title}
            width={500}
            height={300}
            className="h-40 w-full overflow-hidden object-cover object-top"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={80}
          />
        )}
      </Link>
      <CardHeader className="px-2">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-base font-medium">{title}</CardTitle>
          <time className="font-sans text-xs">{dates}</time>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <div className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            <Markdown>{description}</Markdown>
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-2">
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags?.map((tag) => (
              <Badge
                className="px-1 border rounded-sm border-opacity-25 border-gray-500 py-0 text-[10px]"
                variant="secondary"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-2 pb-2">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links?.map((link, idx) => (
              <Link href={link?.href} key={idx} target="_blank">
                <Badge
                  key={idx}
                  className="flex gap-2 border border-white border-opacity-20 px-2 py-1 text-[10px]"
                >
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

export function Projects({ projects }: { projects: Project[] }) {
  return (
    <section className="space-y-7">
      {/* <h2 className="max-w-4xl mx-auto text-lg mb-4 font-medium text-gray-300">projects</h2> */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project: Project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              href={project.href}
              description={project.description}
              dates={project.dates}
              tags={project.technologies}
              image={project.image}
              video={project.video}
              links={project.links?.map((link: ProjectLink) => ({
                ...link,
                icon: Icons[link.icon as keyof typeof Icons] || null,
              }))}
            />
          ))}
        </div>

        <div className="flex justify-end">
          <Link href="/projects">
            <button className="group px-3 py-1.5 text-xs font-medium text-orange-500 border border-orange-500/30 rounded hover:bg-orange-500/10 hover:border-orange-400/50 hover:text-orange-400 transition-all duration-200 inline-flex items-center gap-2">
              more projects
              <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
