import Header from "@/components/Header";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
// import FeaturedProducts from "@/components/home/FeaturedProducts";
import FounderMessage from "@/components/home/FounderMessage";
import InternshipSection from "@/components/home/InternshipSection";
import WeServeSection from "@/components/home/WeServeSection";
import VolunteerSection from "@/components/home/VolunteerSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900">
      <Header />
      <HeroSection />
      <CategoriesSection />
      {/* <FeaturedProducts/> */}
 <InternshipSection />
   <WeServeSection />
      <FounderMessage/>
      <VolunteerSection/>
      <Footer/>
    </main>
  );
}