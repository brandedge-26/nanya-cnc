import IndustryCard from "@/components/industry/IndustryCard";
import Link from "next/link";

export const metadata = {
    title: "Industries | Nanya CNC – Intelligent CNC Solutions for Every Industry",
    description:
        "From automotive to aerospace, Nanya CNC delivers precision-driven, AI-powered manufacturing solutions tailored to the unique demands of every industry.",
};

const IndustryPage = () => {
    return (
        <>
            <main className="bg-black text-white">
                {/* HERO */}
                <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-black">
                    {/* GRID BACKGROUND */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.09)_1px,transparent_1px)] bg-size-[60px_60px] opacity-30 animate-gridMove transform"></div>

                    {/* ORANGE RADIAL CENTER GLOW */}
                    <div className="absolute inset-0 flex justify-center items-center">
                        <div className="h-150 w-150 bg-[radial-gradient(circle,rgba(255,140,0,0.45),transparent_70%)] blur-3xl animate-glowMove transform"></div>
                    </div>

                    {/* HERO CONTENT */}
                    <div className="relative z-10 max-w-5xl px-6 text-center">

                        <p className="text-sm uppercase tracking-widest text-orange-500 mb-4 font-medium">
                            Industries We Serve
                        </p>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tighter leading-tight">
                            Intelligent CNC Solutions for <span className="text-orange-500">Every Industry</span>
                        </h1>

                        <p className="mt-6 text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            From automotive to aerospace, Nanya CNC delivers precision-driven, AI-powered manufacturing solutions tailored to the unique demands of every industry.
                        </p>

                        <div className="mt-10 flex justify-center gap-4 flex-wrap">
                            <Link
                                href="#industries"
                                className="px-8 py-3 rounded-full bg-orange-500 text-black font-semibold hover:bg-orange-600 transition shadow-lg shadow-orange-500/20 inline-block"
                            >
                                Explore Industries
                            </Link>

                            <Link
                                href="/get-quote"
                                className="px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition inline-block"
                            >
                                Get Consultation
                            </Link>
                        </div>
                    </div>
                </section>

                {/* INDUSTRY CARDS */}
                <div id="industries">
                    <div className="max-w-7xl mx-auto px-6 pt-6 pb-4">
                        <div className="text-center mb-4">
                            <p className="text-gray-400 text-sm max-w-xl mx-auto">
                                Our CNC systems are built to meet the unique demands of multiple industries.
                            </p>
                        </div>
                    </div>
                    <IndustryCard />
                </div>

                {/* CTA SECTION */}
                <section className="py-20 bg-black">
                    <div className="max-w-2xl mx-auto px-6 text-center">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-10 hover:border-orange-500/20 transition-all duration-300">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-serif">
                                Not Sure Which Solution Fits Your Industry?
                            </h2>
                            <p className="text-gray-400 mb-8 text-sm">
                                Our experts will guide you to the perfect CNC system tailored to your production needs.
                            </p>
                            <Link
                                href="/get-quote"
                                className="inline-block px-8 py-3 rounded-full bg-orange-500 text-black font-semibold hover:bg-orange-500/80 transition shadow-lg shadow-orange-500/20"
                            >
                                Get Free Consultation
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default IndustryPage;
