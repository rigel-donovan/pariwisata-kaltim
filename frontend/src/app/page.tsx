import Navbar from "@/components/Navbar";
import CarouselHero from "@/components/CarouselHero";
import Destinations from "@/components/Destinations";
import LatestNews from "@/components/LatestNews";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

async function getCarousels() {
  try {
    const res = await fetch(`${API}/api/carousels`);
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    return [];
  }
}

async function getDestinations() {
  try {
    const res = await fetch(`${API}/api/destinations`);
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    return [];
  }
}

async function getNews() {
  try {
    const res = await fetch(`${API}/api/news`);
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    return [];
  }
}

export default async function Home() {
  const [carousels, destinations, news] = await Promise.all([
    getCarousels(),
    getDestinations(),
    getNews(),
  ]);

  return (
    <main className="min-h-screen">
      <Navbar />
      <CarouselHero items={carousels} />
      <Destinations items={destinations} />
      <LatestNews items={news} />
      <ContactSection />
      <Footer />
    </main>
  );
}
