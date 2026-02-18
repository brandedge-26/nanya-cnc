"use client";

import Link from "next/link";
import { industries } from "@/data/nidustry-products";
import { ArrowRight } from "lucide-react";


const IndustryCard = () => {

    return (
        <div className="max-w-7xl mx-auto px-5 py-16">

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {industries.map((industry) => (
                    <Link
                        key={industry.slug}
                        href={`/industry/${industry.slug}`}
                        className="group relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 p-6 transition-all duration-300 hover:bg-white/10 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/5"
                    >

                        {/* Icon */}
                        <div className="mb-4">
                            <industry.icon size={50} className="text-gray-500" />
                        </div>

                        {/* Title */}
                        <h3 className="text-white text-xl font-semibold mb-2 group-hover:text-orange-400 transition-colors">
                            {industry.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            {industry.description}
                        </p>

                        {/* Machine types preview */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {industry.machineTypes.slice(0, 2).map((mt, idx) => (
                                <span
                                    key={idx}
                                    className="text-xs px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20"
                                >
                                    {mt.name.length > 25 ? mt.name.slice(0, 25) + "..." : mt.name}
                                </span>
                            ))}
                        </div>

                        {/* Arrow */}
                        <div className="flex items-center gap-2 text-sm text-orange-500 group-hover:gap-3 transition-all">
                            Explore
                            <ArrowRight className="w-4 h-4" />
                        </div>

                        {/* Glow effect */}
                        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default IndustryCard;
