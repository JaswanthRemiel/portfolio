"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Timeline } from "@/components/ui/timeline";

export function ExperienceDemo() {
  const data = [
    {
      title: "2025",
      content: (
        <div>
          <p className="mb-2 text-sm text-white font-medium">
            SDE-1 at NCompass
          </p>
          <p className="mb-2 text-sm text-gray-400">
            Currently working as a Software Development Engineer at NCompass
          </p>
          <p className="mb-4 text-sm text-justify text-gray-400">
            at NCompass, collaborating with a tight-knit team, i get to blend
            tech skills with creativity, shipping features that power real
            business results.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Image
              src="https://cdn.jsdelivr.net/gh/JaswanthRemiel/portfolio-assests@main/images/ncompass.png"
              alt="NCompass work"
              width={500}
              height={500}
              className="h-full w-full rounded-lg object-cover shadow-lg "
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              quality={80}
            />
          </div>
          <div className="mt-4">
            <p className="mb-2 text-sm text-white font-medium">
              Design Jury at Awwwards
            </p>
            <p className="mb-4 text-sm text-gray-400">
              Serving as a design jury member at Awwwards
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Image
                src="https://cdn.jsdelivr.net/gh/JaswanthRemiel/portfolio-assests@main/images/awwwards.png"
                alt="Awwwards jury"
                width={500}
                height={500}
                className="h-full w-full rounded-lg object-cover shadow-lg"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                quality={80}
              />
              <Image
                src="https://cdn.jsdelivr.net/gh/JaswanthRemiel/portfolio-assests@main/images/awwwards2.png"
                alt="Awwwards event"
                width={500}
                height={500}
                className="h-full w-full rounded-lg object-cover shadow-lg"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                quality={80}
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div>
          <p className="mb-2 text-sm text-white font-medium">
            Research & AI Intern at Samsung R&D India
          </p>
          <p className="mb-4 text-sm text-gray-400 text-justify">
            March 2024 - Worked on cutting-edge AI and research projects at
            Samsung Research & Development India
          </p>
          <div className="mb-4 space-y-1">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              • AI research and development
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              • Machine learning implementations
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              • Collaborated with research teams
            </div>
          </div>
          <div className="mt-6 ">
            <p className="mb-2 text-sm text-white font-medium">
              Summer Intern at IIT Palakkad Technology IHub Foundation (IPTIF)
            </p>
            <p className="mb-4 text-sm text-gray-400">
              May 2024 - Contributed to technology innovation projects at IPTIF
            </p>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                • Technology innovation projects
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                • Research and development
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                • Collaboration with IIT Palakkad
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Early 2024",
      content: (
        <div>
          <p className="mb-2 text-sm text-white font-medium">
            Ambassador at Microsoft
          </p>
          <p className="mb-4 text-sm text-gray-400">
            Previously served as a Microsoft Ambassador, representing Microsoft
            technologies and engaging with the developer community
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Image
              src="https://cdn.jsdelivr.net/gh/JaswanthRemiel/portfolio-assests@main/images/microsoft1.png"
              alt="Microsoft ambassador"
              width={500}
              height={500}
              className="h-full w-full rounded-lg object-cover shadow-lg"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              quality={80}
            />
            <Image
              src="https://cdn.jsdelivr.net/gh/JaswanthRemiel/portfolio-assests@main/images/microsoft2.png"
              alt="Microsoft event"
              width={500}
              height={500}
              className="h-full w-full rounded-lg object-cover shadow-lg"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              quality={80}
            />
          </div>
        </div>
      ),
    },
  ];
  return (
    <motion.div
    >
      <Timeline data={data} />
    </motion.div>
  );
}
