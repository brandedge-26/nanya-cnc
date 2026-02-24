"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Product, useProductStore } from "@/store/productStore";
import { useSearchParams } from "next/navigation";


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



/* ---------- Product Card ---------- */
const ProductCard = ({ product }: { product: Product }) => {
    const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];
    const imageSrc = primaryImage?.url;

    return (
        <div className="relative rounded-2xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg transition-shadow duration-300 hover:shadow-2xl p-3">

            {/* Image */}
            <div className="h-55 w-full overflow-hidden group border border-white/20 rounded-xl bg-black">
                <Image
                    src={imageSrc}
                    alt={primaryImage?.altText || product.modelName}
                    width={500}
                    height={300}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 rounded-xl"
                />
            </div>

            {/* Content */}
            <div className="pt-6">
                {/* Category Badge */}
                <span className="inline-block text-xs font-medium text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full mb-3">
                    {categoryLabels[product.category] || product.category}
                </span>

                <h3 className="text-white text-xl font-semibold mb-1">
                    {product.modelName}
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed line-clamp-1">
                    {product.tagline}
                </p>

                {product.subCategory && (
                    <p className="text-gray-500 text-xs mt-1">{product.subCategory}</p>
                )}
            </div>

            {/* View Details Button */}
            <Link href={`/products/${product.slug}`}>
                <button className="mt-4 w-full cursor-pointer items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-amber-500 hover:bg-warning-light relative bg-linear-to-b from-orange-500 to-orange-600 border-orange-600 text-stone-50 rounded-lg hover:bg-linear-to-b hover:from-orange-600 hover:to-orange-600 hover:border-orange-600 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.35),inset_0_-2px_0px_rgba(0,0,0,0.18)] after:pointer-events-none transition antialiased">
                    View Details
                </button>
            </Link>

            {/* Soft Glow */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-(--primary)/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
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


    // Filter products by active tab
    const filteredProducts =
        activeTab === "All"
            ? products
            : products.filter((p) => p.category === activeTab);

    const tabs = ["All", ...categories];

    return (
        <div className="max-w-7xl mx-auto px-5 py-16">

            {/* Tabs */}
            <div className="flex flex-wrap gap-3 justify-center mb-10">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2 rounded-full backdrop-blur-lg bg-white/10 text-sm font-medium cursor-pointer transition-colors duration-300 hover:bg-white/20 hover:text-white ${activeTab === tab
                            ? "bg-white/20 text-white shadow-lg border"
                            : "text-gray-300 border border-white/10"
                            }`}
                    >
                        {categoryLabels[tab] || tab}
                    </button>
                ))}
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
                    <p className="text-gray-400 text-lg">No products found in this category.</p>
                </div>
            )}

            {/* Product Cards Grid */}
            {!isLoading && filteredProducts.length > 0 && (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}

        </div>
    );
};

export default ProductsClient;
