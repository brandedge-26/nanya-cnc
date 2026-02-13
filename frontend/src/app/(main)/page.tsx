import Advantage from "@/components/home/Advantage";
import CardList from "@/components/home/CardList";
import Faq from "@/components/home/Faq";
import HeroSection from "@/components/home/HeroSection";
import TrustedCompany from "@/components/home/TrustedCompany";


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
