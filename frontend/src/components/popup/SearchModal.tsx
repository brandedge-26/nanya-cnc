"use client";

import { useState, useEffect } from "react";
import { X, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/config/axios";
import Image from "next/image";



interface ProductImage {
    url: string;
    altText: string;
    isPrimary: boolean;
}



interface Product {
    _id: string;
    slug: string;
    modelName: string;
    tagline?: string;
    category?: string;
    images: ProductImage[];
}



interface SearchModalProps {
    onClose: () => void;
}


const SearchModal = ({ onClose }: SearchModalProps) => {

    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);


    // Fetch all products on mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get("/products/all");
                setProducts(res.data.data);
            } catch (err) {
                console.error("Failed to fetch products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);


    // Filter products based on search query
    useEffect(() => {

        if (searchQuery.trim() === "") {
            setFilteredProducts([]);
            return;
        }

        const query = searchQuery.toLowerCase();
        const filtered = products.filter(
            (product) =>
                product.modelName?.toLowerCase().includes(query) ||
                product.tagline?.toLowerCase().includes(query) ||
                product.category?.toLowerCase().includes(query)
        );

        setFilteredProducts(filtered);
        
    }, [searchQuery, products]);

    const handleProductClick = (slug: string) => {
        router.push(`/product-test/${slug}`);
        onClose();
    };

    // Close modal on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [onClose]);

    return (
        <>
            {/* Backdrop with animation */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-100 animate-fadeIn"
                onClick={onClose}
            />

            {/* Modal with slide-down animation */}
            <div className="fixed top-0 left-0 right-0 z-101 animate-slideDown">
                <div className="max-w-3xl mx-auto mt-20 px-4">
                    <div className="glass bg-black/90 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center gap-3 p-6 border-b border-white/10">
                            <Search className="text-orange-500" size={24} />
                            <input
                                type="text"
                                placeholder="Search products by name, tagline, or category..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 bg-transparent text-white outline-none placeholder:text-gray-400 text-lg"
                                autoFocus
                            />
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-white transition"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Results */}
                        <div className="max-h-[60vh] overflow-y-auto">
                            {loading ? (
                                <div className="p-8 text-center text-gray-400">
                                    Loading products...
                                </div>
                            ) : searchQuery.trim() === "" ? (
                                <div className="p-8 text-center text-gray-400">
                                    Start typing to search products
                                </div>
                            ) : filteredProducts.length === 0 ? (
                                <div className="p-8 text-center text-gray-400">
                                    No products found for {searchQuery}
                                </div>
                            ) : (
                                <div className="divide-y divide-white/10">
                                    {filteredProducts.map((product) => {
                                        const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];
                                        
                                        return (
                                            <div
                                                key={product._id}
                                                onClick={() => handleProductClick(product.slug)}
                                                className="p-4 hover:bg-white/5 cursor-pointer transition group"
                                            >
                                                <div className="flex items-center gap-4">
                                                    {primaryImage?.url && (
                                                        <Image
                                                            src={primaryImage.url}
                                                            alt={primaryImage.altText || product.modelName}
                                                            className="w-16 h-16 object-cover rounded-lg"
                                                            width={64}
                                                            height={64}
                                                        />
                                                    )}
                                                    <div className="flex-1">
                                                        <h3 className="text-white font-semibold group-hover:text-orange-500 transition">
                                                            {product.modelName}
                                                        </h3>
                                                        {product.tagline && (
                                                            <p className="text-sm text-gray-400 mt-1">
                                                                {product.tagline}
                                                            </p>
                                                        )}
                                                        {product.category && (
                                                            <span className="inline-block mt-2 text-xs px-2 py-1 bg-orange-500/20 text-orange-500 rounded">
                                                                {product.category}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }

                .animate-slideDown {
                    animation: slideDown 0.3s ease-out;
                }
            `}</style>
        </>
    );
};

export default SearchModal;