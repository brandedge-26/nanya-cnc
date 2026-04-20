import Link from "next/link";
import { industries } from "@/data/nidustry-products";
import { ArrowRight } from "lucide-react";

const IndustriesPreview = () => {
    return (
        <section className="py-24 bg-black">
            <div className="max-w-6xl mx-auto px-6">

                {/* Heading */}
                <div className="text-center mb-16">
                    <p className="text-xs uppercase tracking-widest text-orange-500 mb-3 font-medium">Industries We Serve</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-white font-serif">
                        Solutions for <span className="text-orange-500">Every Industry</span>
                    </h2>
                    <p className="mt-4 text-gray-400 max-w-xl mx-auto">
                        Our CNC systems are built to meet the unique demands of multiple industries.
                    </p>
                </div>

                {/* Industry Cards Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {industries.map((industry) => (
                        <Link
                            key={industry.slug}
                            href={`/industry/${industry.slug}`}
                            className="group relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 p-6 transition-all duration-300 hover:bg-white/10 hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/5 hover:-translate-y-1"
                        >
                            {/* Glow on hover */}
                            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Icon */}
                            <div className="mb-4">
                                <industry.icon size={44} className="text-orange-500/70 group-hover:text-orange-500 transition-colors duration-300" />
                            </div>

                            {/* Title */}
                            <h3 className="text-white text-lg font-semibold mb-2 group-hover:text-orange-400 transition-colors font-serif">
                                {industry.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-2">
                                {industry.description}
                            </p>

                            {/* Machine tags */}
                            <div className="flex flex-wrap gap-2 mb-5">
                                {industry.machineTypes.slice(0, 2).map((mt, idx) => (
                                    <span
                                        key={idx}
                                        className="text-xs px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20"
                                    >
                                        {mt.name.length > 22 ? mt.name.slice(0, 22) + "…" : mt.name}
                                    </span>
                                ))}
                            </div>

                            {/* Arrow */}
                            <div className="flex items-center gap-2 text-sm text-orange-500 group-hover:gap-3 transition-all">
                                Explore Industry
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View All */}
                <div className="text-center mt-10">
                    <Link
                        href="/industry"
                        className="inline-block px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition text-sm font-medium"
                    >
                        View All Industries
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default IndustriesPreview;
