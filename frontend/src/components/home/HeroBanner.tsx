"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface HeroBannerProps {
    text: string;
    spanText?: string;
    description: string;
}

const images = [
    "/01-NYE.jpg",
    "/02-NYE.jpg",
    "/03-NYE.jpg",
];

const HeroBanner = ({ text, spanText, description }: HeroBannerProps) => {

    const router = useRouter();

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-full rounded-xl h-[calc(100vh-130px)] overflow-hidden">

            {/* Background Slider */}
            {images.map((img, index) => (
                <Image
                    key={img}
                    src={img}
                    alt="Hero Background"
                    fill
                    priority={index === 0}
                    className={`object-cover rounded-xl transition-opacity duration-1000 ease-in-out
                        ${index === current ? "opacity-100" : "opacity-0"}`}
                />
            ))}

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50 rounded-xl z-10"></div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center z-20">
                <div className="max-w-7xl mx-auto px-6 text-white">

                    <h1 className="text-4xl md:text-6xl font-bold leading-tighter tracking-tight">
                        {text} <br />
                        <span className="text-(--primary)">{spanText}</span>
                    </h1>

                    <p className="mt-5 max-w-xl text-lg text-gray-200">
                        {description}
                    </p>

                    <button className="mt-8 px-6 py-3 rounded-lg bg-(--primary) text-white font-semibold hover:bg-(--surface-primary) cursor-pointer transition" onClick={() => router.push("/get-quote")}>
                        Get Instant Quote
                    </button>

                </div>
            </div>

        </section>
    );
};

export default HeroBanner;
