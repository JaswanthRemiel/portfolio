import { fetchMediumArticles, MediumArticle } from "./medium";

export interface BlogPost extends MediumArticle {
  slug: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags?: string[];
  featured?: boolean;
  href?: string;
  thumbnail?: string;
  link: string;
}

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  try {
    const articles = await fetchMediumArticles();
    
    return articles.map((article, index) => ({
      slug: `article-${index}`,
      title: article.title,
      date: article.pubDate,
      description: article.description,
      tags: article.categories || [],
      featured: index === 0,
      href: article.link,
      thumbnail: article.thumbnail,
      link: article.link,
    }));
  } catch (error) {
    console.error("Error getting blog posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllPosts();
  const postMeta = posts.find((p) => p.slug === slug);
  
  if (!postMeta) {
    return null;
  }

  try {
    const articles = await fetchMediumArticles();
    const articleIndex = parseInt(slug.split("-")[1]);
    const article = articles[articleIndex];

    if (!article) {
      return null;
    }

    return {
      slug,
      ...article,
    };
  } catch (error) {
    console.error("Error getting post by slug:", error);
    return null;
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((post) => post.slug);
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tags = new Set<string>();

  posts.forEach((post) => {
    if (post.tags && post.tags.length > 0) {
      post.tags.forEach((tag) => tags.add(tag));
    }
  });

  return Array.from(tags).sort();
}

export async function getTagCounts(): Promise<Record<string, number>> {
  const posts = await getAllPosts();
  const counts: Record<string, number> = {};

  posts.forEach((post) => {
    if (post.tags && post.tags.length > 0) {
      post.tags.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    }
  });

  return counts;
}

export async function getPostsByTag(tag: string): Promise<BlogPostMeta[]> {
  const posts = await getAllPosts();
  if (tag === "all" || !tag) {
    return posts;
  }

  return posts.filter((post) => post.tags && post.tags.includes(tag));
}
