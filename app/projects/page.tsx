import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import Link from "next/link";
import { getDetails } from "@/lib/data";
import { Globe, Github } from "lucide-react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { ProjectCard } from "@/components/projects";

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

export const revalidate = 3600; 

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
              priority
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
