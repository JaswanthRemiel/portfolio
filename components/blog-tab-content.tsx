"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";

interface BlogTabContentProps {
  posts: BlogPostMeta[];
}

function BlogItem({ title, description, date, tags, thumbnail, link }: BlogPostMeta) {
  const formattedDate = date ? new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }) : "";

  return (
    <div className="relative group/blog w-full">
      <div className="flex justify-between items-baseline gap-4">
        <Link
          href={link}
          target="_blank"
          className="inline-flex items-center text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 underline underline-offset-4 decoration-gray-300 dark:decoration-gray-700 hover:decoration-gray-500 dark:hover:decoration-gray-400 transition-colors"
        >
          <span className="text-sm">{title}</span>
        </Link>
        <span className="text-xs text-gray-500 shrink-0">{formattedDate}</span>
      </div>
      
      {/* Hover Popup Widget */}
      <div className="hidden sm:block absolute left-1/4 -translate-x-1/2 bottom-full mb-2 opacity-0 invisible group-hover/blog:opacity-100 group-hover/blog:visible transition-all duration-300 z-50 w-72 bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl overflow-hidden pointer-events-none translate-y-2 group-hover/blog:translate-y-0">
        {thumbnail && (
          <div className="relative w-full h-32 overflow-hidden bg-gray-100 dark:bg-gray-900">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover"
              sizes="288px"
            />
          </div>
        )}
        <div className="p-3">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">{title}</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1.5 leading-relaxed">{description}</p>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-1.5 py-0.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-800 rounded text-gray-700 dark:text-gray-300"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="text-[10px] text-gray-500">+{tags.length - 3}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function BlogTabContent({ posts }: BlogTabContentProps) {
  return (
    <section className="space-y-7">
      <div className="space-y-7">
        {posts.length === 0 ? (
          <p className="text-gray-400 py-8">Loading articles...</p>
        ) : (
          posts.map((post) => (
            <BlogItem key={post.slug} {...post} />
          ))
        )}

        <div className="flex justify-start mt-8">
          <Link href="/blog">
            <button className="group px-3 py-1.5 text-xs font-medium text-orange-500 border border-orange-500/30 rounded hover:bg-orange-500/10 hover:border-orange-400/50 hover:text-orange-400 transition-all duration-200 inline-flex items-center gap-2">
              more articles
              <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
