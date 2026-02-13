"use client";

import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";

const IndustrBanner = () => {

    const params = useParams();
    const searcParams = useSearchParams();
    
    const { name } = params;
    const image: string | null = searcParams.get("img");

    const formattedName = decodeURIComponent(name as string)
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    return (
        <section className="relative w-full h-75 rounded-xl overflow-hidden">

            {/* Background Image */}
            <Image
                src={image as string}
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
                    {formattedName}
                </h1>
            </div>

        </section>
    );
};

export default IndustrBanner;
