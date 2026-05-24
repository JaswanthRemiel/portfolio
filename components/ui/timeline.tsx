"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 40%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full font-sans relative isolate" ref={containerRef}>
      <div className="mx-auto py-2 px-0 max-w-4xl">
        {/* <h2 className="text-lg mb-4 text-muted-foreground font-medium">experience</h2> */}
        <p className="font-sf-regular text-foreground text-justify">
          always curious and ready for a challenge, i&apos;ve ventured through
          design, development, and ai, collecting unusual skills along the way.
          my journey connects creative storytelling with hands-on engineering,
          all powered by an unstoppable urge to learn. from building cool
          digital products to moderating wild content, every project has
          sharpened my problem-solving superpowers.
        </p>
      </div>

      <div ref={ref} className="relative mx-auto pb-8 overflow-hidden pt-8">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-8 md:pt-12 md:gap-1 relative z-10"
          >
            <div className="sticky flex flex-col md:flex-row z-20 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-8 absolute left-0 md:left-0 w-8 rounded-full bg-background flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-orange-500 border-2 border-orange-400 p-1.5" />
              </div>
              <h3 className="hidden md:block text-base md:pl-16 md:text-xl font-medium text-foreground">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-16 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-lg mb-4 text-left font-medium text-muted-foreground">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-4 left-4 top-0 overflow-hidden w-[2px] z-0"
        >
          <div className="absolute inset-x-0 top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-orange-500 to-transparent opacity-40" style={{
            maskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 65%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 65%)",
          }} />
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
              maskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 65%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 65%)",
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-orange-500 via-orange-400 to-transparent rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
