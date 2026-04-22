"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useProductStore } from "@/store/productStore";
import Link from "next/link";
import Image from "next/image";
import { Box, ShoppingCart, FileText, ChevronRight } from "lucide-react";


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
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(249,133,19,0.12)", color: "#f98513" }}>
                        <Box size={18} strokeWidth={2} />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white">Products</h1>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                            {isLoading ? "Loading..." : `${products.length} CNC machines available`}
                        </p>
                    </div>
                </div>
                <Link href="/dealer-portal/catalogue"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                    style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}>
                    <FileText size={14} strokeWidth={2} />
                    View Catalogue
                </Link>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-24 gap-3">
                    <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Loading products…</span>
                </div>
            ) : products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-3 rounded-2xl"
                    style={{ border: "1px dashed rgba(255,255,255,0.08)" }}>
                    <Box size={36} style={{ color: "rgba(255,255,255,0.1)" }} />
                    <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>No products available yet</p>
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product) => {
                        const primaryImage = product.images?.find((img) => img.isPrimary) || product.images?.[0];
                        const specs = product.specifications?.[0]?.items?.slice(0, 3) || [];
                        return (
                            <div key={product._id}
                                className="rounded-2xl overflow-hidden flex flex-col"
                                style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(249,133,19,0.3)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; }}>

                                {/* Image */}
                                <div className="relative h-44 w-full"
                                    style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                    {primaryImage ? (
                                        <Image
                                            src={primaryImage.url}
                                            alt={primaryImage.altText || product.modelName}
                                            fill className="object-contain p-5"
                                        />
                                    ) : (
                                        <div className="h-full flex items-center justify-center">
                                            <Box size={40} style={{ color: "rgba(255,255,255,0.08)" }} />
                                        </div>
                                    )}
                                    {/* Category badge overlaid */}
                                    <div className="absolute top-3 left-3">
                                        <span className="text-[10px] font-semibold px-2 py-1 rounded-lg"
                                            style={{ background: "rgba(249,133,19,0.15)", color: "#f98513", border: "1px solid rgba(249,133,19,0.25)" }}>
                                            {product.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="p-4 flex flex-col flex-1">
                                    <h3 className="text-sm font-bold text-white leading-snug mb-0.5">{product.modelName}</h3>
                                    {product.tagline && (
                                        <p className="text-xs mb-3 line-clamp-2" style={{ color: "rgba(255,255,255,0.4)" }}>{product.tagline}</p>
                                    )}

                                    {/* Specs preview */}
                                    {specs.length > 0 && (
                                        <div className="space-y-1 mb-3">
                                            {specs.map((spec, i) => (
                                                <div key={i} className="flex justify-between text-[11px] rounded-lg px-2.5 py-1.5"
                                                    style={{ background: "rgba(255,255,255,0.03)" }}>
                                                    <span style={{ color: "rgba(255,255,255,0.4)" }}>{spec.label}</span>
                                                    <span className="text-white font-medium ml-2">{spec.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="mt-auto flex gap-2">
                                        <Link
                                            href="/dealer-portal/place-order"
                                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold text-black transition-all"
                                            style={{ background: "linear-gradient(135deg, #f98513, #e06e00)" }}>
                                            <ShoppingCart size={12} strokeWidth={2.5} />
                                            Order
                                        </Link>
                                        <Link
                                            href="/dealer-portal/quotation"
                                            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all"
                                            style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}
                                            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#fff"; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}>
                                            <ChevronRight size={12} strokeWidth={2.5} />
                                            Quote
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
