"use client";

import { useEffect, useState } from "react";

interface EmbeddedMediumProps {
  url: string;
  title: string;
}

export function EmbeddedMedium({ url, title }: EmbeddedMediumProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load the Medium embed script
    const script = document.createElement("script");
    script.src = "https://medium.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Set a timeout to hide the loader
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full">
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-pulse text-gray-400">Loading article...</div>
        </div>
      )}
      <div
        className="medium-embed-frame"
        data-src={url}
        style={{
          visibility: isLoading ? "hidden" : "visible",
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      ></div>
    </div>
  );
}
