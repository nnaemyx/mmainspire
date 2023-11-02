import Collections from "@/components/Homepage/Collections";
import Hero from "@/components/Homepage/Hero";
import Newarrivals from "@/components/Homepage/Newarrivals";
import ProgressBar from "@/components/Homepage/Progressbar";

export default function Home() {
  return (
    <div>
      <Hero/>
      <Newarrivals/>
      <ProgressBar/>
      <Collections/>
    </div>
  );
}
