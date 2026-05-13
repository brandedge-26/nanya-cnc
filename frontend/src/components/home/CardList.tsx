
"use client"

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useProductStore } from "@/store/productStore";


const CardList = () => {

    const { products, isLoading, fetchProducts } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const FEATURED_MODELS = ["3605M", "NV-855", "NANO-X8"];
    const displayProducts = FEATURED_MODELS
        .map((name) => products.find((p) => p.modelName === name))
        .filter(Boolean) as typeof products;

    return (
        <section className="mx-auto px-6 py-20 bg-black">

            {/* Section Title */}
            <div className="mb-16 text-center">
                <h2 className="font-bold text-[38px] leading-tight text-white font-serif">
                    Explore Our <span className="text-(--primary)">Smart CNC Machines</span>
                </h2>
                <p className="text-gray-400 mx-auto mt-4 max-w-xl">
                    Designed for modern manufacturing, our machines deliver performance, precision, and intelligent control.
                </p>
            </div>

            {/* Loading */}
            {isLoading && (
                <div className="flex justify-center items-center py-20">
                    <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {/* Product Cards Grid */}
            {!isLoading && displayProducts.length > 0 && (
                <div className="grid grid-cols-3 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
                    {displayProducts.map((product) => {
                        const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];
                        const rawUrl = primaryImage?.url ?? "";
                        const resolvedUrl = rawUrl.replace("/products/", "/machines/");
                        return (
                            <div
                                key={product._id}
                                className="relative rounded-2xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg transition-shadow duration-300 hover:shadow-2xl p-3"
                            >
                                {/* Image */}
                                <div className="h-55 w-full overflow-hidden group bg-black rounded-xl border border-white/20">
                                    <Image
                                        src={resolvedUrl}
                                        alt={primaryImage?.altText || product.modelName}
                                        width={500}
                                        height={300}
                                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 rounded-xl hover:rounded-xl"
                                    />
                                </div>

                                {/* Content */}
                                <div className="pt-6">
                                    <h3 className="text-white text-xl font-semibold mb-3">
                                        {product.modelName}
                                    </h3>
                                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                                        {product.tagline}
                                    </p>
                                </div>

                                <div className="flex gap-2 mt-4">
                                    <Link href={`/get-quote`} className="flex-1">
                                        <button className="w-full cursor-pointer font-medium text-center text-sm py-2 px-4 bg-linear-to-b from-orange-500 to-orange-600 border border-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-600 transition">
                                            Request a Quote
                                        </button>
                                    </Link>
                                    <Link href={`/products/${product.slug}`} className="flex-1">
                                        <button className="w-full cursor-pointer font-medium text-center text-sm py-2 px-4 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition">
                                            View Details
                                        </button>
                                    </Link>
                                </div>

                                {/* Soft Glow */}
                                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-(--primary)/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                        );
                    })}
                </div>
            )}

        </section>
    );
};

export default CardList;
