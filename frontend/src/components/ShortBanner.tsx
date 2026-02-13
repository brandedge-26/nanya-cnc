"use client";

import Image from "next/image";


interface ShortBannerProps {
    text: string;
}


const ShortBanner = ({ text }: ShortBannerProps) => {

    return (
        <section className="relative w-full h-75 rounded-xl overflow-hidden">

            {/* Background Image */}
            <Image
                src={"/01-NYE.jpg"}
                alt="Industry Banner"
                width={700}
                height={300}
                className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Center Text */}
            <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-(--primary) text-3xl md:text-4xl font-semibold tracking-tight">
                    {text}
                </h1>
            </div>

        </section>
    );
};

export default ShortBanner;