"use client";

import { Calendar, Globe, Rocket, TrendingUp } from "lucide-react";

const OurJourney = () => {
    const milestones = [
        {
            year: "2010",
            title: "Foundation",
            desc: "NANYA CNC was founded and began manufacturing operations in Wuxi, Jiangsu, China, with strong technical collaboration and influence from Taiwanese engineering expertise.",
            icon: Calendar,
        },
        {
            year: "2014",
            title: "Global Expansion",
            desc: "Achieved our first international exports, providing customized CNC solutions to overseas clients and marking the beginning of our global footprint.",
            icon: TrendingUp,
        },
        {
            year: "2018",
            title: "Innovation Milestone",
            desc: "Introduced multiple advanced machine solutions, including Horizontal, Vertical, Slant-Bed, and Flat-Bed Lathe machines, along with the development of 5-Axis Machining Centers.",
            icon: Rocket,
        },
        {
            year: "2025",
            title: "Global Presence & Smart Manufacturing",
            desc: "Serving customers in 50+ countries worldwide, integrated AI-driven technologies into CNC machines, offering real-time monitoring, smart diagnostics, and robotic integration.",
            icon: Globe,
        },
    ];

    return (

        <section className="py-20 bg-black">
            <div className="max-w-6xl mx-auto px-6 text-center">

                <h2 className="text-4xl font-bold text-orange-500 mb-12 font-serif">
                    Our Journey
                </h2>

                <div className="grid md:grid-cols-4 gap-4">
                    {milestones.map((item) => {
                        const Icon = item.icon;
                        return (

                            <div
                                key={item.year}
                                className="bg-white/5 backdrop-blur-xl border border-white/20  rounded-2xl p-8 shadow-lg flex flex-col items-center text-center transition duration-300"
                            >

                                {/* Icon */}

                                <div className="mb-4 flex items-center gap-3 p-3 rounded-lg justify-center bg-(--primary)/20">
                                    <Icon size={28} className="text-orange-500" />
                                    <div className=" text-white font-bold text-lg rounded-lg">
                                        {item.year}
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-semibold text-white mb-2 mt-2 font-serif">{item.title}</h3>

                                {/* Description */}
                                <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">{item.desc}</p>

                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default OurJourney;
