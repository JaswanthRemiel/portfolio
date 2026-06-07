"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getDetails } from "@/lib/data";
interface Song {
  title: string;
  artist: string;
  url: string;
  albumCover: string;
}

export default function ListeningSection() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    getDetails().then((data) => {
      const songData = data.songs || [];
      setSongs(songData);

      if (songData.length > 0) {
        const imagePromises = songData.map((song: Song) => {
          return new Promise((resolve, reject) => {
            const img = new window.Image();
            img.src = song.albumCover;
            img.onload = resolve;
            img.onerror = reject;
          });
        });

        Promise.all(imagePromises)
          .then(() => setImagesLoaded(true))
          .catch(() => setImagesLoaded(true));
      }
    });
  }, []);

  useEffect(() => {
    if (songs.length === 0) return;
    const rotateInterval = setInterval(() => {
      setCurrentSongIndex((i) => (i + 1) % songs.length);
    }, 15000);

    return () => clearInterval(rotateInterval);
  }, [songs.length]);

  if (songs.length === 0 || !imagesLoaded) return null;

  const currentSong = songs[currentSongIndex % songs.length];

  return (
    <section>
      <div className="mt-3">
        <a
          href={currentSong.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-block w-fit"
        >
          <div className="text-gray-300 rounded-lg border border-gray-50 border-opacity-15 from-card/80 to-card/40   overflow-hidden flex h-12 w-48">
            <div className="relative w-12 h-12 align-middle bg-muted flex-shrink-0 overflow-hidden">
              <Image
                src={currentSong.albumCover}
                alt={`${currentSong.title} album cover`}
                fill
                className="object-cover  transition-transform duration-300"
                priority
                quality={75}
                sizes="48px"
              />
            </div>

            <div className="flex-1 px-3 py-2 flex flex-col justify-between">
              <div className="min-w-0">
                <p className="font-semibold text-foreground text-xs truncate group-hover:text-green-400 transition-colors">
                  {currentSong.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {currentSong.artist}
                </p>
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
