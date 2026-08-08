import Header from "@/components/Header";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import FounderMessage from "@/components/home/FounderMessage";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900">
      <Header />
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts/>
      <FounderMessage/>
      <Footer/>
    </main>
  );
}