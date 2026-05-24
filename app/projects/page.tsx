import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import { getDetails } from "@/lib/data";
import { Globe, Github } from "lucide-react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const Icons = {
  Globe: <Globe className="size-3" />,
  Github: <Github className="size-3" />,
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

function ProjectCard({
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
          />
        )}
      </Link>
      <CardHeader className="px-2">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-base">{title}</CardTitle>
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

export default async function ProjectsPage() {
  const data = await getDetails();
  const projects = (data.projects as Project[]) || [];

  return (
    <div className="flex flex-col min-h-screen bg-[#1c1c1c] text-white">
      <main className="flex-grow max-w-3xl mx-auto px-10 sm:px-6 py-20 space-y-12 w-full">

        <div className="flex items-center justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-gray-600" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">projects</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <AnimatedThemeToggler />
        </div>

        <section className="space-y-7">
          <div className="flex items-start">
            <Image
              src="https://cdn.jsdelivr.net/gh/JaswanthRemiel/portfolio-assests@main/images/sign-projects.png"
              alt="Jaswanth Remiel"
              width={180}
              height={180}
              className="mr-4 invert dark:invert-0"
            />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 mx-auto">
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
        </section>
      </main>

    </div>
  );
}
