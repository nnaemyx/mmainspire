import Collections from "@/components/Homepage/Collections";
import Footer from "@/components/Homepage/Footer";
import Hero from "@/components/Homepage/Hero";
import Newarrivals from "@/components/Homepage/Newarrivals";
import Newsletter from "@/components/Homepage/Newsletter";
import ProgressBar from "@/components/Homepage/Progressbar";

export default function Home() {
  return (
    <div>
      <Hero/>
      <Newarrivals/>
      <ProgressBar/>
      <Collections/>
      <Newsletter/>
      <Footer/>
    </div>
  );
}
