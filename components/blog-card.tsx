import Image from "next/image";
import { BlogPostMeta } from "@/lib/blog";

interface BlogCardProps extends BlogPostMeta {}

export default function BlogCard({
  title,
  description,
  date,
  tags,
  thumbnail,
  link,
}: BlogCardProps) {
  const formattedDate = date ? new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }) : "";

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full hover:no-underline"
    >
      <div className="flex flex-col h-full bg-white/5 border border-gray-800 rounded-lg overflow-hidden hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20">
        {/* Thumbnail */}
        {thumbnail && (
          <div className="relative w-full h-48 overflow-hidden bg-gray-900">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col p-4">
          <h3 className="text-base font-semibold text-white group-hover:text-orange-400 transition-colors line-clamp-2 leading-snug">
            {title}
          </h3>
          
          {formattedDate && (
            <div className="text-xs text-gray-500 mt-2">{formattedDate}</div>
          )}
          
          <p className="text-sm text-gray-400 mt-3 line-clamp-2 flex-1 leading-relaxed">
            {description}
          </p>

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-gray-700">
              {tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-orange-500/10 text-orange-400 border border-orange-500/30 rounded"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 2 && (
                <span className="text-xs text-gray-500">+{tags.length - 2}</span>
              )}
            </div>
          )}

          {/* Read on Medium indicator */}
          <div className="mt-4 flex items-center gap-1 text-xs text-orange-400 group-hover:text-orange-300 opacity-0 group-hover:opacity-100 transition-opacity">
            Read on Medium <span>↗</span>
          </div>
        </div>
      </div>
    </a>
  );
}
