import Link from "next/link";
import Markdown from "react-markdown";
import { getDetails } from "@/lib/data";
import Image from "next/image";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

interface Research {
    title: string;
    href?: string;
    description: string;
    dates: string;
    technologies: string[];
    links?: string[];
}

interface ResearchItemProps {
    href?: string;
    title: string;
    description: string;
    dates: string;
    technologies: string[];
}

function ResearchItem({ href, title, description, dates, technologies }: ResearchItemProps) {
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
                <span className="text-sm text-white underline underline-offset-4">{title}</span>
            )}
            <div className="text-xs text-gray-500 mt-1">{dates}</div>
            <div className="text-sm md:text-justify font-mono text-gray-400 mt-1">
                <Markdown>{description}</Markdown>
            </div>
            {technologies && technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {technologies.map((tech) => (
                        <span key={tech} className="text-xs text-gray-500">
                            {tech}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

export const revalidate = 3600; // ISR: revalidate every hour

export default async function ResearchPage() {
    const data = await getDetails();
    const research = (data.research as Research[]) || [];

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
                                <BreadcrumbPage className="text-white">research</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <AnimatedThemeToggler />
                </div>

                <section className="space-y-7">
                    <div className="flex items-start">
                        <Image
                            src="https://cdn.jsdelivr.net/gh/JaswanthRemiel/portfolio-assests@main/images/sign-research.png"
                            alt="Jaswanth Remiel"
                            width={180}
                            height={180}
                            className="mr-4 invert dark:invert-0"
                        />
                    </div>
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
            </main>


        </div>
    );
}

