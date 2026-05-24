import { notFound, redirect } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Redirect directly to Medium article
  redirect(post.link);
}
