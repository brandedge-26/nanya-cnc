"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useProductStore } from "@/store/productStore";
import Link from "next/link";
import Image from "next/image";
import { Box, ShoppingCart } from "lucide-react";


const ProductsPage = () => {

    const router = useRouter();
    const { user, isAuthenticated, isCheckingAuth } = useAuthStore();
    const { products, fetchProducts, isLoading } = useProductStore();

    useEffect(() => {
        if (isCheckingAuth) return;
        if (!isAuthenticated || !user) { router.replace("/"); return; }
        if (user.role !== "dealer") { router.replace("/dealer-request"); return; }
    }, [isAuthenticated, isCheckingAuth, user, router]);

    useEffect(() => { fetchProducts(); }, [fetchProducts]);

    if (isCheckingAuth || !user) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (user.role !== "dealer") return null;

    return (
        <div className="space-y-5">

            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(168,85,247,0.12)", color: "#a855f7" }}>
                    <Box size={18} strokeWidth={2} />
                </div>
                <div>
                    <h1 className="text-lg font-bold text-white">Products</h1>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {isLoading ? "Loading..." : `${products.length} machines available`}
                    </p>
                </div>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-24 gap-3">
                    <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Loading products…</span>
                </div>
            ) : products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-3">
                    <Box size={36} style={{ color: "rgba(255,255,255,0.12)" }} />
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>No products available yet</p>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product) => {
                        const primaryImage = product.images?.find((img) => img.isPrimary) || product.images?.[0];
                        return (
                            <div key={product._id}
                                className="rounded-2xl overflow-hidden flex flex-col transition-all"
                                style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(249,133,19,0.3)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}>

                                {/* Image */}
                                <div className="relative h-44 w-full overflow-hidden"
                                    style={{ background: "rgba(255,255,255,0.03)" }}>
                                    {primaryImage ? (
                                        <Image
                                            src={primaryImage.url}
                                            alt={primaryImage.altText || product.modelName}
                                            fill className="object-contain p-4"
                                        />
                                    ) : (
                                        <div className="h-full flex items-center justify-center">
                                            <Box size={40} style={{ color: "rgba(255,255,255,0.1)" }} />
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="p-4 flex flex-col flex-1">
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <h3 className="text-sm font-bold text-white leading-snug">{product.modelName}</h3>
                                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                                            style={{ background: "rgba(168,85,247,0.1)", color: "#a855f7", border: "1px solid rgba(168,85,247,0.2)" }}>
                                            {product.category}
                                        </span>
                                    </div>
                                    {product.tagline && (
                                        <p className="text-xs mb-3 line-clamp-2" style={{ color: "rgba(255,255,255,0.4)" }}>{product.tagline}</p>
                                    )}
                                    <div className="mt-auto">
                                        <Link
                                            href={`/dealer-portal/place-order`}
                                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-black transition-all"
                                            style={{ background: "linear-gradient(135deg, #f98513, #e06e00)" }}>
                                            <ShoppingCart size={13} strokeWidth={2.5} />
                                            Order This Machine
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ProductsPage;
