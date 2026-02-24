import Advantage from "@/components/home/Advantage";
import CardList from "@/components/home/CardList";
import Faq from "@/components/home/Faq";
import HeroSection from "@/components/home/HeroSection";
import TrustedCompany from "@/components/home/TrustedCompany";
import YouTubeEmbed from "@/components/home/YoutubeCard";

export const metadata = {
  title: "NANYA CNC Machines | Precision CNC Manufacturing Solutions",
  description:
    "Explore NANYA CNC’s advanced vertical machining centers, lathes, robotics, and automation solutions for high-performance manufacturing.",
  openGraph: {
    title: "NANYA CNC Machines | Precision CNC Manufacturing Solutions",
    description:
      "Explore NANYA CNC’s advanced vertical machining centers, lathes, robotics, and automation solutions for high-performance manufacturing.",
    type: "website",
    images: [
      {
        url: "/logo-primary.png",
        width: 1200,
        height: 630,
        alt: "NANYA CNC logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NANYA CNC Machines | Precision CNC Manufacturing Solutions",
    description:
      "Explore NANYA CNC’s advanced vertical machining centers, lathes, robotics, and automation solutions for high-performance manufacturing.",
    images: ["/logo-primary.png"],
  },
};

const HomePage = () => {
  return (
    <>
    
      {/* DARK BACKGROUND WRAPPER */}
      <section className="bg-black min-h-screen relative overflow-hidden ">

        {/* HERO SECTION */}
        <HeroSection />

        {/* MAIN CONTENT */}
        <div className="px-5">

          <CardList />

          {/* Youtube placeholder */}
          <YouTubeEmbed videoid="o2J_jdKBLI4" />

          <Advantage />
          <TrustedCompany />

          <div className="mt-10">
            <Faq />
          </div>

        </div>

      </section>
    </>
  );
};

export default HomePage;
