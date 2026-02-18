"use client";

import { useParams } from "next/navigation";
import { industries } from "@/data/nidustry-products";
import { useEffect } from "react";
import { useProductStore } from "@/store/productStore";
import Image from "next/image";
import Link from "next/link";

const IndustryProducts = () => {

    const { name } = useParams();
    const { products, isLoading, fetchProducts } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const industrySlug = decodeURIComponent(name as string).toLowerCase();
    const industry = industries.find((i) => i.slug === industrySlug);

    const filteredProducts = products.filter((product) =>
        industry?.recommendedCategories.includes(product.category)
    );

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-3 gap-6 mt-10">
            {filteredProducts.map((product) => {
                const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];
                return (
                    <div key={product._id} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                        <Image
                            src={primaryImage?.url || ""}
                            alt={primaryImage?.altText || product.modelName}
                            height={200}
                            width={400}
                            className="w-full h-44 object-cover rounded-xl"
                        />
                        <div className="pt-4">
                            <h3 className="text-white font-semibold">{product.modelName}</h3>
                            <p className="text-gray-400 text-sm mt-1">{product.tagline}</p>
                        </div>
                        <Link href={`/products/${product.slug}`}>
                            <button className="mt-3 w-full text-sm py-2 px-4 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-lg hover:bg-orange-500/30 transition cursor-pointer">
                                View Details
                            </button>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

export default IndustryProducts;
