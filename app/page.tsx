import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";

const ProductsSection = dynamic(() => import("@/components/ProductsSection"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[40vh] bg-pure-black flex items-center justify-center">
      <div className="w-px h-16 bg-gold opacity-20" />
    </div>
  ),
});

const HeritageSection = dynamic(() => import("@/components/HeritageSection"), {
  ssr: false,
});

const StorySection = dynamic(() => import("@/components/StorySection"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <CustomCursor />
      <FilmGrain />
      <Navbar />
      <main>
        <HeroSection />
        <ProductsSection />
        <HeritageSection />
        <StorySection />
      </main>
      <Footer />
    </>
  );
}
