import { Header } from "@/components/header";
import ContactSection from "@/components/contact";
import { TabsSection } from "@/components/tabs-content";
import { getAllPosts } from "@/lib/blog";
import { Footer } from "@/components/footer";
import { getDetails } from "@/lib/data";

export const revalidate = 3600; // Revalidate every hour (ISR)

export default async function Page() {
  const [details, blogPosts] = await Promise.all([
    getDetails(),
    getAllPosts(),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-[#1c1c1c] text-white">
      <main className="flex-grow w-full max-w-4xl lg:max-w-7xl mx-auto px-10 sm:px-6 lg:px-12 py-20 pb-6 space-y-12">
        <div className="max-w-4xl mx-auto">
          <Header />
        </div>
        <div suppressHydrationWarning>
          <TabsSection
            blogPosts={blogPosts.slice(0, 6)}
            research={details.research || []}
            projects={(details.projects || []).slice(0, 3)}
          />
        </div>

        <div className="max-w-4xl mx-auto">
          <ContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
