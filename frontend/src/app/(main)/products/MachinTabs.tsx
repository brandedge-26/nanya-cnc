"use client";

import Image from "next/image";
import { useState } from "react";


/* ---------- Types ---------- */
type Category =
    | "All"
    | "Vertical"
    | "Horizontal"
    | "5 Axis"
    | "Turning"
    | "Surface Grinder";

interface Product {
    id: number;
    title: string;
    description: string;
    category: Category;
    image: string;
}



/* ---------- Tabs ---------- */
const tabs: Category[] = [
    "All",
    "Vertical",
    "Horizontal",
    "5 Axis",
    "Turning",
    "Surface Grinder",
];

/* ---------- Machine images from /machines/ folder ---------- */
const machineImages = [
    "/machines/nv-855.jpeg",
    "/machines/NV-855.png",
    "/machines/nv-1165.jpeg",
    "/machines/nv-1370.jpeg",
    "/machines/HMC-800A.png",
    "/machines/hmc-630A.jpeg",
    "/machines/5AX-C60.jpeg",
    "/machines/nano-x8.jpeg",
    "/machines/nano-x8-second-variant.jpeg",
    "/machines/3105S.jpeg",
    "/machines/3605M.jpeg",
    "/machines/vlt-550.jpeg",
    "/machines/vlt-750.jpeg",
];

/* ---------- Products (30) ---------- */
const products: Product[] = Array.from({ length: 30 }, (_, i) => {
    const categories: Category[] = [
        "Vertical",
        "Horizontal",
        "5 Axis",
        "Turning",
        "Surface Grinder",
    ];

    const category = categories[i % 5];

    return {
        id: i + 1,
        title: `${category} Machine Model ${i + 1}`,
        description:
            "High performance industrial machine designed for precision and reliability.",
        category,
        image: machineImages[i % machineImages.length],
    };
});

/* ---------- Glass Card Component ---------- */
interface CardProps {
    image: string;
    title: string;
    description: string;
}

const Card = ({ image, title, description }: CardProps) => {
    return (
        <div className="relative rounded-2xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg transition-all duration-300 p-3">
            {/* Image Wrapper */}
            <div className="machine-neon-wrapper rounded-xl">
              <div className="h-55 w-full overflow-hidden group rounded-xl">
                <Image
                    src={image}
                    alt={title}
                    width={500}
                    height={300}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 rounded-xl"
                />
              </div>
            </div>

            {/* Content */}
            <div className="pt-6">
                <h3 className="text-white text-xl font-semibold mb-3 font-serif">{title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">{description}</p>
            </div>

            <button className="mt-4 w-full cursor-pointer items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-amber-500 hover:bg-warning-light relative bg-linear-to-b from-orange-500 to-orange-600 border-orange-600 text-stone-50 rounded-lg hover:bg-linear-to-b hover:from-orange-600 hover:to-orange-600 hover:border-orange-600 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.35),inset_0_-2px_0px_rgba(0,0,0,0.18)] after:pointer-events-none transition antialiased">
                Read more
            </button>

            {/* Soft Glow */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-(--primary)/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
        </div>
    );
};



/* ---------- Component ---------- */
const MachineTabs = () => {

    const [activeTab, setActiveTab] = useState<Category>("All");

    const filteredProducts =
        activeTab === "All"
            ? products
            : products.filter((p) => p.category === activeTab);

    return (
        <div className="max-w-7xl mx-auto px-5 py-16">
            {/* Tabs */}
            <div className="flex flex-wrap gap-3 justify-center mb-10">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 rounded-full backdrop-blur-lg bg-white/10 text-sm font-medium cursor-pointer transition-colors duration-300 hover:bg-white/20 hover:text-white ${activeTab === tab
                            ? "bg-white/20 text-white shadow-lg border "
                            : "text-gray-300 border border-white/10"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Cards */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <Card
                        key={product.id}
                        image={product.image}
                        title={product.title}
                        description={product.description}
                    />
                ))}
            </div>
        </div>
    );
};

export default MachineTabs;
