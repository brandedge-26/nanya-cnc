import { Zap, Monitor, Brain } from "lucide-react";
import Link from "next/link";

const SmartFactory = () => {
    const features = [
        {
            icon: Zap,
            title: "Integrated Automation",
            desc: "Seamless machine-to-system communication for optimized workflows.",
        },
        {
            icon: Monitor,
            title: "Real-Time Monitoring",
            desc: "Track performance, efficiency, and output with live data insights.",
        },
        {
            icon: Brain,
            title: "AI Optimization",
            desc: "Smart algorithms improve speed, reduce waste, and maximize productivity.",
        },
    ];

    return (
        <section className="py-24 bg-black relative overflow-hidden">

            {/* Subtle background glow */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                <div className="h-96 w-96 bg-[radial-gradient(circle,rgba(255,140,0,0.08),transparent_70%)] blur-3xl"></div>
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10">

                {/* Heading */}
                <div className="text-center mb-16">
                    <p className="text-xs uppercase tracking-widest text-orange-500 mb-3 font-medium">Smart Factory System</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-white font-serif">
                        Building Smart Factories with{" "}
                        <span className="text-orange-500">Intelligent CNC Systems</span>
                    </h2>
                    <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
                        Transform your production line into a fully connected, data-driven smart factory.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {features.map((f, i) => {
                        const Icon = f.icon;
                        return (
                            <div
                                key={i}
                                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center hover:border-orange-500/30 hover:bg-white/10 transition-all duration-300"
                            >
                                <div className="mb-5 flex justify-center">
                                    <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                                        <Icon size={26} strokeWidth={1.5} />
                                    </div>
                                </div>
                                <h3 className="text-white font-semibold text-lg mb-3 font-serif">{f.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Closing line */}
                <div className="text-center">
                    <p className="text-gray-400 text-sm max-w-2xl mx-auto mb-6">
                        From standalone machines to complete smart manufacturing ecosystems — we power the future of production.
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
    );
};

export default SmartFactory;
