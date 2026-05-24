"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import BlogCard from "@/components/blog-card";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import type { BlogPostMeta } from "@/lib/blog";

interface BlogContentProps {
  posts: BlogPostMeta[];
  tags: string[];
  tagCounts: Record<string, number>;
}

export function BlogContent({ posts, tags, tagCounts }: BlogContentProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#1c1c1c] text-white">
      <main className="flex-grow w-full max-w-4xl lg:max-w-7xl mx-auto px-10 sm:px-6 lg:px-12 py-20 space-y-12">
          {/* Header Section */}
          <div className="space-y-6 mb-12">
            <div className="flex items-center justify-between">
              <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                      home
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-gray-600" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white">blog</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
              <AnimatedThemeToggler />
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
                blog
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl">
                thoughts on development, design, and everything in between.
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
              />
              <svg
                className="absolute right-3 top-3.5 w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Blog Posts */}
          {filteredPosts.length === 0 ? (
            <div className="text-gray-500 py-12 text-center">
              <p className="text-lg font-medium">no articles found</p>
              {searchQuery && (
                <p className="text-sm mt-2 text-gray-600">
                  try different keywords or{" "}
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-orange-400 hover:text-orange-300"
                  >
                    clear search
                  </button>
                </p>
              )}
            </div>
          ) : (
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </section>
          )}
      </main>
    </div>
  );
}
