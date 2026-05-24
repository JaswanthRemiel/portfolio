"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlogCard from "@/components/blog-card";
import type { BlogPostMeta } from "@/lib/blog";

interface BlogTabContentProps {
  posts: BlogPostMeta[];
}

export function BlogTabContent({ posts }: BlogTabContentProps) {
  return (
    <section className="space-y-7">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.length === 0 ? (
            <p className="text-center text-gray-400 col-span-full py-8">Loading articles...</p>
          ) : (
            posts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))
          )}
        </div>

        <div className="flex justify-end">
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
