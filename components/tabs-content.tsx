"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Projects } from "@/components/projects";
import { ExperienceDemo } from "@/components/experience";
import { BlogTabContent } from "@/components/blog-tab-content";
import { ResearchContent } from "@/components/research";
import { CertificationsContent } from "@/components/certifications";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import type { BlogPostMeta } from "@/lib/blog";

interface Research {
  title: string;
  href?: string;
  description: string;
  dates: string;
  technologies: string[];
}

interface Certification {
  issuer: string;
  title: string;
  href?: string;
  image?: string;
}

interface ProjectData {
  title: string;
  href?: string;
  description: string;
  dates: string;
  technologies: string[];
  image?: string;
  video?: string;
  links?: { type: string; href: string; icon: string }[];
}

interface TabsSectionProps {
  blogPosts: BlogPostMeta[];
  research: Research[];
  certifications: Certification[];
  projects: ProjectData[];
}

export function TabsSection({ blogPosts, research, certifications, projects }: TabsSectionProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const [showLeftBlur, setShowLeftBlur] = useState(false);
  const [showRightBlur, setShowRightBlur] = useState(true);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const updateBlur = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setShowLeftBlur(scrollLeft > 4);
      setShowRightBlur(scrollLeft < scrollWidth - clientWidth - 4);
    };
    el.addEventListener("scroll", updateBlur, { passive: true });
    window.addEventListener("resize", updateBlur);
    updateBlur();
    return () => {
      el.removeEventListener("scroll", updateBlur);
      window.removeEventListener("resize", updateBlur);
    };
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    if (navRef.current && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      navRef.current.scrollLeft += e.deltaY;
    }
  };

  const handleTabChange = (value: string) => {
    requestAnimationFrame(() => {
      const trigger = navRef.current?.querySelector(`[value="${value}"]`);
      if (trigger) {
        trigger.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
      }
    });
  };

  return (
    <Tabs defaultValue="projects" onValueChange={handleTabChange} className="max-w-4xl mx-auto">
      <div className="relative mb-8 inline-flex max-w-full">
        <TabsList
          ref={navRef}
          onWheel={handleWheel}
          className="w-[315px] max-w-full overflow-x-auto no-scrollbar scroll-smooth gap-0.5 justify-start sm:w-auto sm:max-w-none sm:overflow-visible"
        >
          <TabsTrigger value="projects">projects</TabsTrigger>
          <TabsTrigger value="experience">experience</TabsTrigger>
          <TabsTrigger value="blog">blog</TabsTrigger>
          <TabsTrigger value="research">research</TabsTrigger>
          <TabsTrigger value="certifications">certifications</TabsTrigger>
        </TabsList>

        {/* Left blur overlay when scrolled (mobile only) */}
        <div
          className={cn(
            "pointer-events-none absolute left-0 top-0 bottom-0 w-8 rounded-l-lg transition-opacity duration-200 sm:hidden",
            "tabs-fade-left",
            showLeftBlur ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Right side blur overlay: cuts off after research with blur (mobile only) */}
        <div
          className={cn(
            "pointer-events-none absolute right-0 top-0 bottom-0 w-12 rounded-r-lg transition-opacity duration-200 sm:hidden",
            "tabs-fade-right",
            showRightBlur ? "opacity-100" : "opacity-0"
          )}
        />
      </div>

      <TabsContent value="projects">
        <Projects projects={projects} />
      </TabsContent>
      <TabsContent value="experience">
        <ExperienceDemo />
      </TabsContent>
      <TabsContent value="blog">
        <BlogTabContent posts={blogPosts} />
      </TabsContent>
      <TabsContent value="research">
        <ResearchContent research={research} />
      </TabsContent>
      <TabsContent value="certifications">
        <CertificationsContent certifications={certifications} />
      </TabsContent>
    </Tabs>
  );
}
