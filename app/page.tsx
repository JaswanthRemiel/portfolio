import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Header } from "@/components/header";
import ContactSection from "@/components/contact";
import { TabsSection } from "@/components/tabs-content";
import { getAllPosts } from "@/lib/blog";

function getDetailsSync() {
  const fullPath = path.join(process.cwd(), "content", "details.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);
  return data;
}

export default async function Page() {
  const details = getDetailsSync();
  const blogPosts = await getAllPosts();

  return (
    <div className="flex flex-col min-h-screen bg-[#1c1c1c] text-white">
      <main className="flex-grow w-full max-w-4xl lg:max-w-7xl mx-auto px-10 sm:px-6 lg:px-12 py-20 space-y-12">
        <div className="max-w-4xl mx-auto">
          <Header />
        </div>
        <TabsSection
          blogPosts={blogPosts.slice(0, 6)}
          research={details.research || []}
          projects={(details.projects || []).slice(0, 6)}
        />

        <div className="max-w-4xl mx-auto">
          <ContactSection />
        </div>
      </main>
    </div>
  );
}
