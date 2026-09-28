"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function ContactSection() {
  const [visitorTime, setVisitorTime] = useState<Date | null>(null);

  useEffect(() => {
    setVisitorTime(new Date());
  }, []);

  const weekdayName = (date: Date | null) => {
    if (!date) return null;
    try {
      return date
        .toLocaleDateString(undefined, { weekday: "long" })
        .toLowerCase();
    } catch {
      return null;
    }
  };

  const socialLinks = [
    {
      href: "https://github.com/JaswanthRemiel",
      label: "GitHub",
      icon: Github,
      color: "text-gray-300 hover:text-white",
    },
    {
      href: "https://linkedin.com/in/jaswanthremiel",
      label: "LinkedIn",
      icon: Linkedin,
      color: "text-gray-300 hover:text-blue-400",
    },
    {
      href: "https://twitter.com/jaswanthremiel",
      label: "Twitter",
      icon: Twitter,
      color: "text-gray-300 hover:text-sky-400",
    },
    {
      href: "mailto:work.remiel@gmail.com",
      label: "Email",
      icon: Mail,
      color: "text-gray-300 hover:text-orange-400",
    },
  ];

  return (
    <section>
      <h2 className="text-lg mb-4 font-medium text-gray-300">contact</h2>
      <p className="text-l sm:text-l">thanks for hanging around till the very end.</p> 
      <p className="text-l sm:text-l"> and if you're a recruiter, well, the "say hello" button is right up there ;) </p>
      <div className="flex flex-col gap-y-2 mb-2">
        <a className="font-sf-regular text-l text-muted-foreground text-gray-100">
          {visitorTime ? (
            <>have a nice {weekdayName(visitorTime)} ahead.</>
          ) : (
            "have a nice day ahead."
          )}
        </a>
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-4 justify-start">
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link
                key={index}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : "_self"}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : ""}
                aria-label={link.label}
              >
                <Icon
                  size={20}
                  strokeWidth={1.5}
                  className={`${link.color} transition-colors duration-300`}
                />
              </Link>
            );
          })}
        </div>
        <div className="flex justify-start mt-3">
          <Image
            src="https://cdn.jsdelivr.net/gh/JaswanthRemiel/portfolio-assests@main/images/signre.png"
            alt="Logo"
            width={40}
            height={40}
            className="opacity-70 hover:opacity-100 transition-opacity dark:invert"
          />
        </div>
      </div>
    </section>
  );
}
