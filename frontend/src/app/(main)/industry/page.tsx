import IndustryCard from "@/components/industry/IndustryCard";
import Link from "next/link";

export const metadata = {
    title: "Trusted Industries | NANYA CNC – Engineering Excellence Since 2010",
    description:
        "Learn about NANYA CNC, a global manufacturer of high-precision CNC machines, driven by innovation, quality, and smart manufacturing solutions.",
};

const IndustryPage = () => {
    return (
        <>
            <main className="bg-black text-white">
                {/* HERO */}
                <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-black">
                    {/* GRID BACKGROUND */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.09)_1px,transparent_1px)] bg-size-[60px_60px] opacity-30 animate-gridMove transform"></div>

                    {/* ORANGE RADIAL CENTER GLOW */}
                    <div className="absolute inset-0 flex justify-center items-center">
                        <div className="h-150 w-150 bg-[radial-gradient(circle,rgba(255,140,0,0.45),transparent_70%)] blur-3xl animate-glowMove transform"></div>
                    </div>

                    {/* HERO CONTENT */}
                    <div className="relative z-10 max-w-5xl px-6 text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tighter leading-tight">
                            Our Trusted <span className="text-orange-500">Industries</span>
                        </h1>

                        <p className="mt-6 text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            NANYA CNC machines are the backbone of modern manufacturing, delivering unmatched precision to the worlds most demanding sectors since 2010.
                        </p>

                        <div className="mt-10 flex justify-center gap-4">
                            {/* Link Tag Use Kiya Hai Bro */}
                            <Link
                                href="/get-quote"
                                className="px-8 py-3 rounded-full bg-orange-500 text-black font-medium hover:bg-orange-600 transition inline-block"
                            >
                                Get Quote
                            </Link>

                            <Link
                                href="/products"
                                className="px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition inline-block"
                            >
                                Our Products
                            </Link>
                        </div>
                    </div>
                </section>

                {/* INDUSTRY CARDS */}
                <IndustryCard />
            </main>
        </>
    );
};

export default IndustryPage;
