"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useProductStore, Product } from "@/store/productStore";
import { useDealerQuotationStore } from "@/store/dealerQuotationStore";
import Image from "next/image";
import { FileText, Send, CheckCircle2, ChevronRight, Box, ChevronDown } from "lucide-react";


const QuotationPage = () => {

    const router = useRouter();
    const { user, isAuthenticated, isCheckingAuth } = useAuthStore();
    const { products, fetchProducts } = useProductStore();
    const { isLoading, submitted, submitQuotation, resetSubmitted } = useDealerQuotationStore();

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (isCheckingAuth) return;
        if (!isAuthenticated || !user) { router.replace("/"); return; }
        if (user.role !== "dealer") { router.replace("/dealer-request"); return; }
    }, [isAuthenticated, isCheckingAuth, user, router]);

    useEffect(() => { fetchProducts(); }, [fetchProducts]);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest("#product-dropdown")) setDropdownOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedProduct) return;
        await submitQuotation({
            productName: selectedProduct.modelName,
            productId: selectedProduct._id,
            message: message.trim() || undefined,
        });
    };

    const handleReset = () => {
        resetSubmitted();
        setSelectedProduct(null);
        setMessage("");
    };

    if (isCheckingAuth || !user) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (user.role !== "dealer") return null;

    // Success state
    if (submitted) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="max-w-md w-full text-center rounded-2xl p-12 relative overflow-hidden"
                    style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="absolute inset-0 pointer-events-none" style={{
                        background: "radial-gradient(circle at 50% 40%, rgba(34,197,94,0.1) 0%, transparent 70%)"
                    }} />
                    <div className="relative z-10">
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 rounded-full flex items-center justify-center"
                                style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.2)" }}>
                                <CheckCircle2 size={40} className="text-green-400" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Quotation Sent!</h2>
                        <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>
                            Our team will review your request and send a quotation shortly.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button onClick={handleReset}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-black cursor-pointer"
                                style={{ background: "linear-gradient(135deg, #f98513, #e06e00)" }}>
                                New Request <ChevronRight size={14} />
                            </button>
                            <button onClick={() => router.push("/dealer-portal")}
                                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer"
                                style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = ""; }}>
                                Back to Overview
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const primaryImage = (p: Product) => p.images?.find((i) => i.isPrimary) || p.images?.[0];

    return (
        <div className="max-w-2xl mx-auto space-y-5">

            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(249,133,19,0.12)", color: "#f98513" }}>
                    <FileText size={18} strokeWidth={2} />
                </div>
                <div>
                    <h1 className="text-lg font-bold text-white">Request a Quotation</h1>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Select a product and we'll send you a price quote</p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="rounded-2xl p-6 space-y-5"
                style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>

                {/* Name + Email (readonly) */}
                <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">Your Details</p>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-400">Full Name</label>
                        <input type="text" value={user.name || ""} readOnly
                            className="w-full bg-black/20 border border-white/10 outline-none px-4 py-3 rounded-xl text-white cursor-not-allowed opacity-60 text-sm" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-400">Email</label>
                        <input type="email" value={user.email || ""} readOnly
                            className="w-full bg-black/20 border border-white/10 outline-none px-4 py-3 rounded-xl text-white cursor-not-allowed opacity-60 text-sm" />
                    </div>
                </div>

                <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />

                {/* Product select with image */}
                <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">Select Product <span className="text-red-500">*</span></p>

                <div id="product-dropdown" className="relative">
                    {/* Trigger */}
                    <button type="button" onClick={() => setDropdownOpen((v) => !v)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition text-left"
                        style={{
                            background: "rgba(255,255,255,0.05)",
                            border: dropdownOpen ? "1px solid rgba(249,133,19,0.5)" : "1px solid rgba(255,255,255,0.1)",
                        }}>
                        {selectedProduct ? (
                            <>
                                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
                                    {primaryImage(selectedProduct) ? (
                                        <Image src={primaryImage(selectedProduct)!.url}
                                            alt={selectedProduct.modelName} width={40} height={40}
                                            className="w-full h-full object-contain p-1" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Box size={16} style={{ color: "rgba(255,255,255,0.2)" }} />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-white truncate">{selectedProduct.modelName}</p>
                                    <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.4)" }}>{selectedProduct.category}</p>
                                </div>
                            </>
                        ) : (
                            <span style={{ color: "rgba(255,255,255,0.3)" }}>— Select a product —</span>
                        )}
                        <ChevronDown size={16} className="flex-shrink-0 ml-auto transition-transform"
                            style={{ color: "rgba(255,255,255,0.3)", transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                    </button>

                    {/* Dropdown list */}
                    {dropdownOpen && (
                        <div className="absolute left-0 right-0 mt-2 rounded-2xl overflow-hidden z-30 shadow-2xl max-h-72 overflow-y-auto"
                            style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.1)" }}>
                            {products.length === 0 ? (
                                <div className="py-8 text-center text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>No products available</div>
                            ) : products.map((p) => {
                                const img = primaryImage(p);
                                const isSelected = selectedProduct?._id === p._id;
                                return (
                                    <button key={p._id} type="button"
                                        onClick={() => { setSelectedProduct(p); setDropdownOpen(false); }}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-left transition"
                                        style={{
                                            background: isSelected ? "rgba(249,133,19,0.12)" : "",
                                            borderBottom: "1px solid rgba(255,255,255,0.05)",
                                        }}
                                        onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                                        onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = ""; }}>
                                        {/* Product image */}
                                        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center"
                                            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                                            {img ? (
                                                <Image src={img.url} alt={p.modelName} width={48} height={48}
                                                    className="w-full h-full object-contain p-1.5" />
                                            ) : (
                                                <Box size={18} style={{ color: "rgba(255,255,255,0.15)" }} />
                                            )}
                                        </div>
                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold truncate" style={{ color: isSelected ? "#f98513" : "#fff" }}>
                                                {p.modelName}
                                            </p>
                                            <p className="text-xs truncate mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                                                {p.category}{p.subCategory ? ` · ${p.subCategory}` : ""}
                                            </p>
                                        </div>
                                        {isSelected && (
                                            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                                                style={{ background: "#f98513" }}>
                                                <CheckCircle2 size={12} className="text-black" />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Selected product preview */}
                {selectedProduct && (
                    <div className="rounded-xl p-4 flex items-center gap-4"
                        style={{ background: "rgba(249,133,19,0.05)", border: "1px solid rgba(249,133,19,0.2)" }}>
                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center"
                            style={{ background: "rgba(255,255,255,0.04)" }}>
                            {primaryImage(selectedProduct) ? (
                                <Image src={primaryImage(selectedProduct)!.url}
                                    alt={selectedProduct.modelName} width={64} height={64}
                                    className="w-full h-full object-contain p-2" />
                            ) : (
                                <Box size={24} style={{ color: "rgba(255,255,255,0.15)" }} />
                            )}
                        </div>
                        <div>
                            <p className="font-bold text-orange-400">{selectedProduct.modelName}</p>
                            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                                {selectedProduct.category}{selectedProduct.subCategory ? ` · ${selectedProduct.subCategory}` : ""}
                            </p>
                            {selectedProduct.tagline && (
                                <p className="text-xs mt-1 line-clamp-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                                    {selectedProduct.tagline}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />

                {/* Message (optional) */}
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-400">
                        Message <span className="text-white/20 font-normal">(optional)</span>
                    </label>
                    <textarea rows={4}
                        placeholder="Any specific requirements, quantities, or questions for this quotation..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 outline-none px-4 py-3 rounded-xl text-white placeholder-white/25 text-sm transition focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 resize-none"
                    />
                </div>

                {/* Submit */}
                <button type="submit"
                    disabled={isLoading || !selectedProduct}
                    className="w-full h-12 flex items-center justify-center gap-2.5 rounded-xl font-semibold text-sm text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    style={{ background: "linear-gradient(135deg, #f98513, #e06e00)" }}>
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                    ) : (
                        <><Send size={16} strokeWidth={2.5} /> Request Quotation</>
                    )}
                </button>
            </form>
        </div>
    );
};

export default QuotationPage;
