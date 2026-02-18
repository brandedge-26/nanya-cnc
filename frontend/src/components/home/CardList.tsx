
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

    const displayProducts = products.slice(0, 3);

    return (
        <section className="mx-auto px-6 py-20 bg-black">

            {/* Section Title */}
            <div className="mb-16 text-center">
                <h1 className="font-bold text-[38px] leading-tight text-white font-serif">
                    Manufacturing Expertise <br />
                    <span className="text-(--primary)">That Delivers Results</span>
                </h1>
                <p className="text-gray-400 mx-auto mt-4 max-w-xl">
                    Working with a manufacturing partner who understands your product needs makes all the difference.
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
                        return (
                            <div
                                key={product._id}
                                className="relative rounded-2xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg transition-shadow duration-300 hover:shadow-2xl p-3"
                            >
                                {/* Image */}
                                <div className="h-55 w-full overflow-hidden group bg-black rounded-xl border border-white/20">
                                    <Image
                                        src={primaryImage?.url || ""}
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

                                <Link href={`/products/${product.slug}`}>
                                    <button className="mt-4 w-full cursor-pointer items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-amber-500 hover:bg-warning-light relative bg-linear-to-b from-orange-500 to-orange-600 border-orange-600 text-stone-50 rounded-lg hover:bg-linear-to-b hover:from-orange-600 hover:to-orange-600 hover:border-orange-600 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.35),inset_0_-2px_0px_rgba(0,0,0,0.18)] after:pointer-events-none transition antialiased">
                                        View Details
                                    </button>
                                </Link>

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
