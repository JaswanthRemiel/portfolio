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

export async function fetchMediumArticles(): Promise<MediumArticle[]> {
  try {
    const feedUrl = `https://medium.com/feed/@${MEDIUM_USERNAME}`;
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;

    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error(`RSS2JSON API error: ${response.status} ${response.statusText}`);
      return [];
    }

    const data = await response.json();

    if (!data.items || !Array.isArray(data.items)) {
      console.warn("No items found in RSS feed response");
      return [];
    }

    return data.items.map((item: any) => {
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
