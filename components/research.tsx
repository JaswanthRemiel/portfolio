"use client";

import { useState, useRef, TouchEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface Research {
  title: string;
  href?: string;
  links?: string[];
  description: string;
  dates: string;
  technologies: string[];
  images?: string[];
  image?: string;
}

interface ResearchImageSliderProps {
  images: string[];
  title: string;
}

export function ResearchImageSlider({ images, title }: ResearchImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  if (!images || images.length === 0) return null;

  const total = images.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 40) {
      nextSlide();
    } else if (diff < -40) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-950/70 backdrop-blur-sm group my-3 select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slider viewport */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <div
          className="flex h-full w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, idx) => (
            <div key={idx} className="relative h-full w-full shrink-0">
              <Image
                src={src}
                alt={`${title} - Figure ${idx + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 60vw"
                className="object-cover object-center"
                quality={85}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Controls (visible if > 1 image) */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              prevSlide();
            }}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white/90 backdrop-blur-md border border-white/15 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 hover:bg-black/90 active:scale-95"
            aria-label="Previous figure"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              nextSlide();
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white/90 backdrop-blur-md border border-white/15 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 hover:bg-black/90 active:scale-95"
            aria-label="Next figure"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Counter pill */}
          <div className="absolute top-2.5 right-2.5 z-10 rounded-full bg-black/70 px-2 py-0.5 text-[10px] font-mono text-white/80 backdrop-blur-md border border-white/10">
            {currentIndex + 1} / {total}
          </div>

          {/* Slide Indicator Dots */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? "w-5 bg-white"
                    : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export interface ResearchItemProps {
  href?: string;
  title: string;
  description: string;
  dates: string;
  technologies: string[];
  images?: string[];
  image?: string;
}

export function ResearchItem({
  href,
  title,
  description,
  dates,
  technologies,
  images,
  image,
}: ResearchItemProps) {
  const allImages = images && images.length > 0 ? images : image ? [image] : [];

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between flex-wrap gap-2">
        {href ? (
          <Link
            href={href}
            target="_blank"
            className="group inline-flex items-center space-x-1 text-white hover:text-gray-300 transition-colors"
          >
            <span className="text-sm font-medium underline underline-offset-4">{title}</span>
          </Link>
        ) : (
          <span className="text-sm font-medium text-white underline underline-offset-4">
            {title}
          </span>
        )}
        <div className="text-xs text-gray-500 font-mono">{dates}</div>
      </div>

      {allImages.length > 0 && (
        <ResearchImageSlider images={allImages} title={title} />
      )}

      <div className="text-sm text-justify font-mono text-gray-400">
        <p className="leading-relaxed">{description}</p>
      </div>

      {technologies && technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs text-gray-300 bg-white/5 border border-gray-800 rounded-sm px-3 py-0.5"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

interface ResearchContentProps {
  research: Research[];
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
            images={item.images}
            image={item.image}
          />
        ))}
      </div>
    </section>
  );
}
