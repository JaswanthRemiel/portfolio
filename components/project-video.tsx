"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ProjectVideoProps {
  src: string;
  poster?: string;
  className?: string;
  title?: string;
}

export function ProjectVideo({
  src,
  poster,
  className = "pointer-events-none mx-auto h-40 w-full object-cover object-top",
  title = "Project preview",
}: ProjectVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Auto-detect poster if matching standard video naming, or use provided poster
  const posterSrc =
    poster || (src.endsWith(".mp4") ? src.replace(/\.mp4$/, "-poster.jpg") : undefined);

  // Lazy loading observer: only attach and load video when within 300px of viewport
  // This prevents multiple videos from competing for bandwidth on mobile initial load
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const loadObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setShouldLoad(true);
          loadObserver.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );

    loadObserver.observe(el);

    return () => {
      loadObserver.disconnect();
    };
  }, []);

  // Viewport playback observer: play only when visible to free mobile hardware decoders
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !shouldLoad) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const viewObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    viewObserver.observe(el);

    return () => {
      viewObserver.disconnect();
    };
  }, [shouldLoad]);

  // Handle play/pause based on viewport visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    if (isInView) {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay was prevented by mobile browser policy (e.g. low-power mode)
        });
      }
    } else {
      if (!video.paused) {
        video.pause();
      }
    }
  }, [isInView, shouldLoad]);

  // Pause playback when tab / browser is in the background
  useEffect(() => {
    const handleVisibilityChange = () => {
      const video = videoRef.current;
      if (!video || !shouldLoad) return;

      if (document.hidden) {
        if (!video.paused) {
          video.pause();
        }
      } else if (isInView) {
        video.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isInView, shouldLoad]);

  return (
    <div
      ref={containerRef}
      className="relative h-40 w-full overflow-hidden bg-neutral-900"
    >
      {/* Instant poster placeholder image so mobile users never see a blank/black space */}
      {posterSrc && (
        <Image
          src={posterSrc}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover object-top transition-opacity duration-300 ${
            isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          priority={false}
        />
      )}

      {/* Shimmer skeleton behind poster / video during initial buffer */}
      {!isLoaded && !posterSrc && (
        <div className="absolute inset-0 bg-neutral-800/60 animate-pulse" />
      )}

      {/* Video element: lazy loaded & viewport-managed */}
      {shouldLoad && (
        <video
          ref={(node) => {
            if (node) {
              node.muted = true;
            }
            videoRef.current = node;
          }}
          src={src}
          poster={posterSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          onLoadedData={() => setIsLoaded(true)}
          onPlaying={() => setIsLoaded(true)}
          className={`${className} transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
