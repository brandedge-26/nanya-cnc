import Advantage from "@/components/home/Advantage";
import CardList from "@/components/home/CardList";
import HeroSection from "@/components/home/HeroSection";
import TrustedCompany from "@/components/home/TrustedCompany";
import SmartFactory from "@/components/home/SmartFactory";
import StatsSection from "@/components/home/StatsSection";
import IndustriesPreview from "@/components/home/IndustriesPreview";
import ConsultationCTA from "@/components/home/ConsultationCTA";
import DealerSection from "@/components/home/DealerSection";
import BlogsSection from "@/components/home/BlogsSection";

export const metadata = {
  title: "Nanya CNC | AI-Powered CNC Manufacturing for the Next Industrial Era",
  description:
    "Nanya CNC combines precision engineering with intelligent automation to deliver faster production, higher accuracy, and smarter manufacturing solutions.",
  openGraph: {
    title: "Nanya CNC | AI-Powered CNC Manufacturing for the Next Industrial Era",
    description:
      "Nanya CNC combines precision engineering with intelligent automation to deliver faster production, higher accuracy, and smarter manufacturing solutions.",
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
    title: "Nanya CNC | AI-Powered CNC Manufacturing for the Next Industrial Era",
    description:
      "Nanya CNC combines precision engineering with intelligent automation to deliver faster production, higher accuracy, and smarter manufacturing solutions.",
    images: ["/logo-primary.png"],
  },
};

const HomePage = () => {
  return (
    <>
      {/* DARK BACKGROUND WRAPPER */}
      <section className="bg-black min-h-screen relative overflow-hidden">

        {/* 1. HERO SECTION */}
        <HeroSection />

        {/* MAIN CONTENT */}
        <div className="px-5">

          {/* 2. WHY NANYA CNC */}
          <Advantage />

          {/* 3. SMART MACHINES (Featured Products) */}
          <CardList />

        </div>

        {/* 4. INDUSTRIES PREVIEW */}
        <IndustriesPreview />

        {/* 5. SMART FACTORY SYSTEM */}
        <SmartFactory />

        {/* 6. STATS */}
        <StatsSection />

        {/* TRUSTED COMPANIES */}
        {/* <div className="px-5">
          <TrustedCompany />
        </div> */}

        {/* 7. BLOGS / INSIGHTS */}
        <BlogsSection />

        {/* 8. DEALER PORTAL SECTION */}
        <DealerSection />

        {/* 9. CONSULTATION CTA */}
        <ConsultationCTA />

      </section>
    </>
  );
};

export default HomePage;
