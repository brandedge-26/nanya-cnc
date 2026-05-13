"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Product, useProductStore } from "@/store/productStore";
import { useSearchParams } from "next/navigation";
import { ArrowRight } from "lucide-react";


/* ---------- Category short labels for tabs ---------- */
const categoryLabels: Record<string, string> = {
    "All": "All",
    "CNC Vertical Machine Center": "Vertical",
    "CNC Horizontal Machine Center": "Horizontal",
    "CNC Slant-Bed Lathe Machine": "Slant-Bed Lathe",
    "CNC Vertical Lathe Machine": "Vertical Lathe",
    "CNC Double Column Machine Center": "Double Column",
    "Industrial Device": "Industrial Device",
    "Industrial Robotic Technology": "Robotics",
};


/* ---------- Futuristic Product Card ---------- */
const ProductCard = ({ product }: { product: Product }) => {
    const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];
    const rawUrl = primaryImage?.url ?? "";
    const imageSrc = rawUrl.replace("/products/", "/machines/");

    return (
        <div className="group relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* Image */}
            <div className="px-2 pt-2">
                <div className="relative h-56 w-full overflow-hidden rounded-lg bg-white/5 flex items-center justify-center">
                    {imageSrc ? (
                        <Image
                            src={imageSrc}
                            alt={primaryImage?.altText || product.modelName}
                            fill
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                    ) : (
                        <span className="text-gray-600 text-xs">Image coming soon</span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Category */}
                <span className="inline-block text-xs font-medium text-gray-500 mb-2">
                    {categoryLabels[product.category] || product.category}
                </span>

                <h3 className="text-white text-lg font-semibold mb-1">
                    {product.modelName}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-1">
                    {product.tagline}
                </p>

                {product.subCategory && (
                    <p className="text-gray-600 text-xs">{product.subCategory}</p>
                )}
            </div>

            {/* Action Buttons */}
            <div className="px-5 pb-5 flex gap-2">
                <Link href={`/get-quote`} className="flex-1">
                    <button className="w-full py-2 text-sm font-semibold rounded-lg bg-orange-500 text-black hover:bg-orange-500/80 transition cursor-pointer">
                        Get a Quote
                    </button>
                </Link>
                <Link href={`/products/${product.slug}`} className="flex-1">
                    <button className="w-full py-2 text-sm font-semibold rounded-lg bg-white/10 border border-white/10 text-white hover:bg-white/15 transition cursor-pointer flex items-center justify-center gap-1.5">
                        View Details
                        <ArrowRight size={14} />
                    </button>
                </Link>
            </div>
        </div>
    );
};



/* ---------- Main Component ---------- */
const ProductsClient = () => {

    const searchParams = useSearchParams();
    const { products, categories, isLoading, fetchProducts, fetchCategories } = useProductStore();
    const [activeTab, setActiveTab] = useState("All");

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [fetchProducts, fetchCategories]);

    useEffect(() => {
        const category = searchParams.get("category");
        if (!category) return;
        const decodedCategory = decodeURIComponent(category.replace(/\+/g, " "));
        setActiveTab(decodedCategory);
    }, [searchParams]);

    const filteredProducts =
        activeTab === "All"
            ? products
            : products.filter((p) => p.category === activeTab);

    const tabs = ["All", ...categories];

    return (
        <div className="max-w-7xl mx-auto px-5 py-10">

            {/* Smart Filter System */}
            <div className="mb-8">
                <p className="text-center text-xs text-gray-500 uppercase tracking-widest mb-5">Smart Filter</p>
                <div className="flex flex-wrap gap-3 justify-center">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-5 py-2 rounded-full backdrop-blur-lg text-sm font-medium cursor-pointer transition-all duration-300 border ${activeTab === tab
                                ? "bg-orange-500 text-black border-orange-500 shadow-lg shadow-orange-500/20"
                                : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20"
                                }`}
                        >
                            {categoryLabels[tab] || tab}
                        </button>
                    ))}
                </div>

                {/* Result count */}
                {!isLoading && (
                    <p className="text-center text-xs text-gray-600 mt-4">
                        {filteredProducts.length} machine{filteredProducts.length !== 1 ? "s" : ""} found
                    </p>
                )}
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex justify-center items-center py-20">
                    <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}

            {/* No Products */}
            {!isLoading && filteredProducts.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-gray-400 text-lg">No machines found in this category.</p>
                </div>
            )}

            {/* Product Cards Grid */}
            {!isLoading && filteredProducts.length > 0 && (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}

            {/* Bottom CTA */}
            {!isLoading && filteredProducts.length > 0 && (
                <div className="text-center mt-16 py-10 border-t border-white/5">
                    <h3 className="text-xl font-bold text-white mb-3 font-serif">
                        Need help choosing the right machine?
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
                        Our engineers will guide you to the perfect CNC system for your production needs.
                    </p>
                    <Link
                        href="/get-quote"
                        className="inline-block px-8 py-3 rounded-full bg-orange-500 text-black font-semibold hover:bg-orange-500/80 transition shadow-lg shadow-orange-500/20"
                    >
                        Get Free Consultation
                    </Link>
                </div>
            )}

        </div>
    );
};

export default ProductsClient;
