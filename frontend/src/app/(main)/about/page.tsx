// app/about/page.tsx
import Image from "next/image";
import { Cpu, ShieldCheck, Zap } from "lucide-react";
import OurJourney from "@/components/about/OurJourney";

export const metadata = {
    title: "About Us | NANYA CNC – Precision Engineering & Innovation",
    description:
        "NANYA CNC is a global leader in precision CNC manufacturing, driven by innovation, quality, and smart manufacturing solutions.",
};

const AboutPage = () => {
    return (

        <main className="bg-black text-white">

            {/* HERO */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-black">

                {/* GRID BACKGROUND */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.09)_1px,transparent_1px)] bg-size-[60px_60px] opacity-30 animate-gridMove transform"></div>

                {/* ORANGE RADIAL CENTER GLOW */}
                <div className="absolute inset-0 flex justify-center items-center">
                    <div className="h-150 w-150 bg-[radial-gradient(circle,rgba(255,140,0,0.45),transparent_70%)] blur-3xl animate-glowMove transform"></div>
                </div>

                {/* LEFT GLOW */}
                <div className="absolute bottom-0 left-0 h-100 w-100 bg-[radial-gradient(circle,rgba(255,140,0,0.25),transparent_70%)] blur-3xl animate-glowMove2 transform"></div>

                {/* RIGHT GLOW */}
                <div className="absolute bottom-0 right-0 h-100 w-100 bg-[radial-gradient(circle,rgba(255,140,0,0.25),transparent_70%)] blur-3xl animate-glowMove3 transform"></div>


                {/* HERO CONTENT */}
                <div className="relative z-10 max-w-5xl px-6 text-center">

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tighter leading-tight">
                        Our <span className="text-orange-500">Story</span>
                    </h1>

                    <p className="mt-6 text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        NANYA CNC was founded with a clear and powerful vision: to make
                        world-class CNC technology accessible to industries across the
                        globe. What began as a modest operation has evolved into an
                        ultra-modern manufacturing enterprise equipped with advanced
                        production facilities and strict quality control systems.
                    </p>

                    <div className="mt-10 flex justify-center gap-4">
                        <button className="cursor-pointer px-8 py-3 rounded-full bg-orange-500 text-black font-medium hover:bg-orange-500/80 transition">
                            Contact Us
                        </button>

                        <button className="cursor-pointer px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition">
                            Our Services
                        </button>
                    </div>

                </div>

            </section>




            {/* WHY WE EXIST (ZIGZAG BLOCKS) */}
            <section className="space-y-20 px-6 max-w-6xl mx-auto py-16 bg-black">

                {/* Mission */}
                <div className="md:flex md:items-center md:gap-12">
                    <div className="md:w-1/2 order‑2 md:order‑1">
                        <h2 className="text-2xl font-semibold text-(--primary) mb-4 font-serif">
                            Our Mission
                        </h2>
                        <p className="text-gray-300 leading-relaxed max-sm:mb-10 max-md:mb-5">
                            Our mission at NANYA CNC is to empower manufacturers across the globe to reach their full potential with superior CNC solutions.
                            We combine precision engineering with cutting-edge technology to deliver machines that are both reliable and highly productive.
                            Through smart manufacturing and AI-driven automation, we help our partners reduce downtime and increase efficiency.
                            We are committed to providing sustainable, innovative solutions that adapt to the evolving needs of modern industries.
                            Our goal is to enable manufacturers to consistently achieve excellence, transforming challenges into growth opportunities.
                        </p>
                    </div>
                    <div className="md:w-1/2 relative h-60 md:h-96 order‑1 md:order‑2">
                        <Image
                            src="/about/mission-img.jpg"
                            alt="Our Mission"
                            fill
                            className="object-cover rounded-2xl shadow-lg"
                        />
                    </div>
                </div>


                {/* Vision */}
                <div className="md:flex md:items-center md:gap-12 md:flex-row-reverse">
                    <div className="md:w-1/2">
                        <h2 className="text-2xl font-semibold text-orange-500 mb-4 font-serif">
                            Our Vision
                        </h2>
                        <p className="text-gray-300 leading-relaxed max-sm:mb-10 max-md:mb-5">
                            At NANYA CNC, our vision is to set the global benchmark in CNC manufacturing by integrating cutting-edge innovation with unmatched precision.
                            We leverage intelligent automation and smart manufacturing technologies to elevate industrial productivity worldwide.
                            Our solutions are designed to empower every partner to optimize efficiency and maximize operational excellence.
                            By continuously advancing engineering practices, we aim to redefine what manufacturers can achieve.
                            Ultimately, we strive to create a world where precision, reliability, and innovation drive every production process.
                        </p>
                    </div>
                    <div className="md:w-1/2 relative h-60 md:h-96">
                        <Image
                            src="/about/vision-img.jpg"
                            alt="Our Vision"
                            fill
                            className="object-cover rounded-2xl shadow-lg"
                        />
                    </div>
                </div>

            </section>


            <OurJourney/>



            {/* WHAT WE STAND FOR */}
            <section className="pt-20 bg-black">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-semibold text-(--primary) mb-12 font-serif">
                        What We Stand For
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Precision",
                                desc: "Every machine we build is engineered to deliver pinpoint accuracy, meeting the strictest standards.",
                                icon: Cpu,
                                color: "text-orange-500/90",
                            },
                            {
                                title: "Reliability",
                                desc: "Machines you can count on day after day, built for long-term performance and minimal downtime.",
                                icon: ShieldCheck,
                                color: "text-green-400/90",
                            },
                            {
                                title: "Innovation",
                                desc: "Smart CNC solutions designed to solve modern manufacturing challenges efficiently.",
                                icon: Zap,
                                color: "text-blue-400/90",
                            },
                        ].map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.title}
                                    className=" bg-white/5 backdrop-blur-xl
            border border-white/20 rounded-2xl p-8 shadow-lg flex flex-col items-center text-center transition duration-300"
                                >
                                    {/* Icon */}
                                    <div
                                        className={`mb-4 w-16 h-16 flex items-center justify-center bg-white/10 rounded-full backdrop-blur-md shadow-md ${item.color}`}
                                    >
                                        <Icon size={28} strokeWidth={1.5} />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-white mb-3 font-serif">{item.title}</h3>

                                    {/* Description */}
                                    <p className="text-gray-300">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>


        </main>
    );
};

export default AboutPage;
