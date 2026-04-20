import ProductsClient from "./ProductsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Smart CNC Machines | Nanya CNC – AI-Optimized Manufacturing",
    description:
        "Explore Nanya CNC's AI-optimized machine range. Find the perfect CNC machine using smart filters, real-time comparisons, and intelligent recommendations.",
};


const ProductsPage = () => {
    return (
        <div className="bg-black min-h-screen text-white">

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-24 pb-8">

                {/* Subtle grid background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[60px_60px] opacity-40"></div>

                {/* Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-64 bg-[radial-gradient(circle,rgba(255,140,0,0.15),transparent_70%)] blur-3xl pointer-events-none"></div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <p className="text-xs uppercase tracking-widest text-orange-500 mb-3 font-medium">
                        AI-Optimized Product Range
                    </p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
                        Explore AI-Optimized <span className="text-orange-500">CNC Machines</span>
                    </h1>
                    <p className="mt-6 text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
                        Find the perfect machine using smart filters, real-time comparisons, and intelligent recommendations.
                    </p>
                </div>
            </section>

            {/* Products Client (filters + grid) */}
            <div className="px-5">
                <ProductsClient />
            </div>

        </div>
    );
};

export default ProductsPage;
