import { Suspense } from "react";
import { getAllPosts, getAllTags, getTagCounts } from "@/lib/blog";
import { BlogContent } from "@/components/blog-content";

export const revalidate = 3600; // ISR: revalidate every hour

export default async function BlogPage() {
  const posts = await getAllPosts();
  const tags = await getAllTags();
  const tagCounts = await getTagCounts();

  return (
    <Suspense>
      <BlogContent
        posts={posts}
        tags={tags}
        tagCounts={tagCounts}
      />
    </Suspense>
  );
}
