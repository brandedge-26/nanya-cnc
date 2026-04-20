"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
    { value: 5000, suffix: "+", label: "Machines Delivered" },
    { value: 30, suffix: "+", label: "Countries Served" },
    { value: 98, suffix: "%", label: "Precision Accuracy" },
    { value: 16, suffix: "+", label: "Years Industry Experience" },
];

const useCountUp = (target: number, duration = 2000, start = false) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) return;
        let startTime: number | null = null;
        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [start, target, duration]);

    return count;
};

const StatCard = ({ value, suffix, label, animate }: { value: number; suffix: string; label: string; animate: boolean }) => {
    const count = useCountUp(value, 1800, animate);
    return (
        <div className="text-center p-6">
            <div className="text-4xl md:text-5xl font-bold text-orange-500 font-serif mb-2">
                {animate ? count : 0}{suffix}
            </div>
            <div className="text-gray-400 text-sm">{label}</div>
        </div>
    );
};

const StatsSection = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={ref} className="py-20 bg-black border-y border-white/5">
            <div className="max-w-6xl mx-auto px-6">

                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white font-serif">
                        Proven Performance. <span className="text-orange-500">Trusted Worldwide.</span>
                    </h2>
                    <p className="mt-3 text-gray-400 text-sm max-w-xl mx-auto">
                        Delivering consistent performance and long-term reliability across global industries.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((s) => (
                        <div
                            key={s.label}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-orange-500/30 transition-all duration-300"
                        >
                            <StatCard {...s} animate={animate} />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default StatsSection;
