export interface MediumArticle {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  thumbnail?: string;
  author?: string;
  categories?: string[];
  content?: string;
}

const MEDIUM_USERNAME = "jaswanthremiel"; // Change this to your Medium username

// Cache for Medium articles in memory
let cachedArticles: MediumArticle[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

export async function fetchMediumArticles(): Promise<MediumArticle[]> {
  // Return cached articles if fresh
  if (cachedArticles && Date.now() - lastFetchTime < CACHE_DURATION) {
    return cachedArticles;
  }

  try {
    const feedUrl = `https://medium.com/feed/@${MEDIUM_USERNAME}`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;

    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 }, // ISR cache for 1 hour
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      console.error(`RSS2JSON API error: ${response.status} ${response.statusText}`);
      return cachedArticles || [];
    }

    const data = await response.json();

    if (!data.items || !Array.isArray(data.items)) {
      console.warn("No items found in RSS feed response");
      return cachedArticles || [];
    }

    const articles = data.items.map((item: any) => {
      // Extract thumbnail from description or content
      let thumbnail = null;
      const descThumbnail = item.description?.match(/<img[^>]+src="([^">]+)"/);
      const contentThumbnail = item.content?.match(/<img[^>]+src="([^">]+)"/);
      thumbnail = descThumbnail?.[1] || contentThumbnail?.[1] || null;

      // Clean description
      const rawDescription = item.description || item.content || "";
      const cleanDescription = rawDescription
        .replace(/<[^>]*>/g, "")
        .replace(/&[a-z]+;/g, " ")
        .trim()
        .substring(0, 160)
        .concat("...");

      return {
        title: item.title || "Untitled",
        description: cleanDescription,
        link: item.link || "",
        pubDate: item.pubDate || new Date().toISOString(),
        thumbnail: thumbnail,
        author: item.author,
        categories: Array.isArray(item.categories) ? item.categories : [],
        content: item.content || "",
      };
    });

    // Update cache
    cachedArticles = articles;
    lastFetchTime = Date.now();
    
    return articles;
  } catch (error) {
    console.error("Error fetching Medium articles:", error instanceof Error ? error.message : String(error));
    return [];
  }
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "Unknown date";
  }
}
