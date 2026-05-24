"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { GitHubContributions } from "@/components/github-contributions";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export function Header() {
  return (
    <motion.div>
      <header className="space-y-3">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start">
            <div className="mr-4 rounded-xl w-[85px] h-[85px] md:w-[70px] md:h-[70px] overflow-hidden border border-white/10">
              <Image
                src="https://cdn.jsdelivr.net/gh/JaswanthRemiel/portfolio-assests@main/images/remieldp.png"
                alt="Jaswanth Remiel"
                width={82}
                height={82}
                className="w-full h-full object-cover scale-[1.3] translate-y-3 md:translate-y-2"
                suppressHydrationWarning
                unoptimized
              />
            </div>
          </div>
          <AnimatedThemeToggler />
        </div>

        <h1 className="font-sf-regular text-xl sm:text-2xl md:text-4xl text-gray-100 font-normal leading-snug tracking-tight">
          building things for the web.
          <br />
          <span className="hidden sm:inline">design-obsessed, full-stack, dabbling in ml.</span>
          <span className="sm:hidden">full-stack, design-focused, into ml.</span>
          <br />
          currently at{" "}
          <Link
            href="https://ncompass.inc"
            target="_blank"
            className="text-gray-100 decoration-gray-500 underline underline-offset-4 decoration-dashed hover:opacity-70 transition-opacity duration-200"
          >
            NCompass
          </Link>
          .
        </h1>
      </header>
    </motion.div>
  );
}
