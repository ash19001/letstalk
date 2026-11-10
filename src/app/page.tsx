import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { FindUs } from "@/components/home/FindUs";
import { Free } from "@/components/home/Free";
import { Help } from "@/components/home/Help";
import { Hero } from "@/components/home/Hero";
import { News } from "@/components/home/News";
import { Stories } from "@/components/home/Stories";
import { Week } from "@/components/home/Week";
import { getAnnouncements, getStories } from "@/lib/content";

export default async function Home() {
  const [announcements, stories] = await Promise.all([getAnnouncements(), getStories()]);
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Week />
        <Free />
        <FindUs />
        <Stories stories={stories} />
        <News items={announcements.slice(0, 4)} />
        <Help />
      </main>
      <SiteFooter />
    </>
  );
}
