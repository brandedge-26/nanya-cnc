import Advantage from "@/components/home/Advantage";
import CardList from "@/components/home/CardList";
import Faq from "@/components/home/Faq";
import HeroSection from "@/components/home/HeroSection";
import TrustedCompany from "@/components/home/TrustedCompany";
import YouTubeEmbed from "@/components/home/YoutubeCard";


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
          <YouTubeEmbed videoid="o2J_jdKBLI4"/>

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
