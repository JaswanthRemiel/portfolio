"use client";

import { useEffect, useRef, useState } from "react";

// A muted, looping preview clip for a project card. The poster shows at once;
// the video itself is only fetched once the card is near the viewport, plays
// only while on screen and while the tab is visible, and never autoplays for
// people who ask for reduced motion (they keep the still poster).
export default function ProjectVideo({ src, poster }: { src: string; poster?: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);

  // Start fetching when within 300px of the viewport; track visibility after that.
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const near = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLoad(true);
          near.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    const seen = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.15 });
    near.observe(el);
    seen.observe(el);
    return () => {
      near.disconnect();
      seen.disconnect();
    };
  }, []);

  // Play while visible on screen and the tab is in the foreground; pause otherwise.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !load) return;
    const sync = () => {
      if (inView && !document.hidden) v.play().catch(() => {});
      else v.pause();
    };
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, [inView, load]);

  return (
    <div ref={boxRef} className="video">
      {/* eslint-disable-next-line @next/next/no-img-element -- static poster frame shown until the clip plays */}
      {poster && <img className="poster" src={poster} alt="" aria-hidden="true" />}
      {load && (
        <video
          ref={videoRef}
          className="poster"
          data-ready={ready}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onPlaying={() => setReady(true)}
        />
      )}
    </div>
  );
}
