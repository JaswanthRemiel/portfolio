'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function Footer() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const distanceFromBottom = scrollHeight - scrolled;
      
      // Calculate opacity based on distance from bottom
      // When near bottom (< 500px), opacity increases
      const opacity = Math.max(0, Math.min(1, (500 - distanceFromBottom) / 500));
      setScrollOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = resolvedTheme === 'dark';

  const gradientStyle = isDark
    ? {
        background: 'radial-gradient(1920px 100% at 50% 100%, rgba(59, 130, 246, 0.6) 0%, rgba(80, 56, 255, 0.5) 50%, transparent 100%)',
      }
    : {
        background: 'radial-gradient(1920px 100% at 50% 100%, rgba(251, 146, 60, 0.6) 0%, rgba(249, 115, 22, 0.5) 50%, transparent 100%)',
      };

  if (!mounted) return null;

  return (
    <footer className="w-full items-center justify-center z-10 relative mt-0 sm:mt-0 md:mt-0">
      {/* Background gradient with noise effect */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full -z-[10] blur-gradient-bottom after:content-[''] after:fixed after:inset-0 after:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')] after:opacity-40 after:mix-blend-overlay after:pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollOpacity }}
        transition={{ duration: 0.3 }}
        style={{
          ...gradientStyle,
          maskImage: 'radial-gradient(1920px 100% at 50% 100%, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 50%, transparent 100%)',
          height: 'clamp(200px, 30vh, 320px)',
        }}
      ></motion.div>

      {/* Content container */}
      <div className="w-full items-center justify-center z-10 relative max-w-screen-sm mx-auto px-4">
        <div className="relative overflow-hidden w-full flex items-start" style={{ height: 'clamp(120px, 20vh, 280px)' }}>
          {/* Large gradient text logo - responsive sizing */}
          <h2 
            className="absolute bottom-0 left-0 right-0 text-center text-white/65 tracking-tighter mx-auto"
            style={{ 
              fontFamily: "'VT323', monospace",
              fontSize: 'clamp(50px, 10vw, 140px)',
              lineHeight: '0.9',
              transform: 'translateY(25%)',
              letterSpacing: '0.1em',
            }}
          >
          </h2>
        </div>
      </div>
    </footer>
  );
}
