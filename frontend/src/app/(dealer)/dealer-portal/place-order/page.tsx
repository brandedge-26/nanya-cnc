"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Send, CheckCircle2, ChevronRight } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useProductStore, Product } from "@/store/productStore";
import { useDealerOrderStore } from "@/store/dealerOrderStore";
import toast from "react-hot-toast";


const inputClass =
    "w-full bg-white/5 border border-white/10 outline-none px-4 py-3 rounded-xl text-white placeholder-white/25 text-sm transition focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30";


const PlaceOrderPage = () => {

    const router = useRouter();
    const { user, isAuthenticated, isCheckingAuth } = useAuthStore();
    const { products, fetchProducts } = useProductStore();
    const { isLoading, orderPlaced, submitOrder, resetOrderPlaced } = useDealerOrderStore();

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState({
        email: "",
        companyName: "",
        companyEmail: "",
        productName: "",
        productId: "",
        message: "",
    });

    useEffect(() => {
        if (isCheckingAuth) return;
        if (!isAuthenticated || !user) { router.replace("/"); return; }
        if (user.role !== "dealer") { router.replace("/dealer-request"); return; }
    }, [isAuthenticated, isCheckingAuth, user, router]);

    useEffect(() => { fetchProducts(); }, [fetchProducts]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleProductSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const productId = e.target.value;
        const product = products.find((p) => p._id === productId) || null;
        setSelectedProduct(product);
        setFormData((prev) => ({
            ...prev,
            productName: product?.modelName || "",
            productId: product?._id || "",
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const name = user?.name || "";
        if (!name || !formData.email || !formData.companyName || !formData.companyEmail || !formData.productName || !formData.message) {
            toast.error("All fields are required!");
            return;
        }
        await submitOrder({
            name,
            email: formData.email,
            companyName: formData.companyName,
            companyEmail: formData.companyEmail,
            productName: formData.productName,
            productId: formData.productId || undefined,
            message: formData.message,
        });
    };

    const handleNewOrder = () => {
        resetOrderPlaced();
        setFormData({ email: "", companyName: "", companyEmail: "", productName: "", productId: "", message: "" });
        setSelectedProduct(null);
    };

    if (isCheckingAuth || !user) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (user.role !== "dealer") return null;

    if (orderPlaced) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="max-w-md w-full text-center rounded-2xl p-12 relative overflow-hidden"
                    style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="absolute inset-0 pointer-events-none" style={{
                        background: "radial-gradient(circle at 50% 40%, rgba(34,197,94,0.12) 0%, transparent 70%)"
                    }} />
                    <div className="relative z-10">
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 rounded-full flex items-center justify-center"
                                style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.2)" }}>
                                <CheckCircle2 size={40} className="text-green-400" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Order Placed!</h2>
                        <p className="text-sm mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>Your order has been submitted successfully.</p>
                        <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.35)" }}>Our team will contact you shortly.</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button onClick={handleNewOrder}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-black cursor-pointer"
                                style={{ background: "linear-gradient(135deg, #f98513, #e06e00)" }}>
                                Place Another Order <ChevronRight size={14} />
                            </button>
                            <button onClick={() => router.push("/dealer-portal")}
                                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer transition"
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

    return (
        <div className="max-w-3xl mx-auto">

            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">Place an Order</h2>
                <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>Fill in the details to submit your dealer order.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="rounded-2xl p-6 md:p-8 space-y-5"
                style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>

                {/* Section: Contact */}
                <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">Contact Details</p>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>Full Name</label>
                        <input type="text" value={user?.name || ""} readOnly
                            className="w-full border outline-none px-4 py-3 rounded-xl text-white cursor-not-allowed text-sm opacity-50"
                            style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }} />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>Email <span className="text-orange-500">*</span></label>
                        <input type="email" name="email" placeholder="your@email.com"
                            value={formData.email} onChange={handleChange} className={inputClass} />
                    </div>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />

                {/* Section: Company */}
                <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">Company Details</p>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>Company Name <span className="text-orange-500">*</span></label>
                        <input type="text" name="companyName" placeholder="Your Business Name"
                            value={formData.companyName} onChange={handleChange} className={inputClass} />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>Company Email <span className="text-orange-500">*</span></label>
                        <input type="email" name="companyEmail" placeholder="business@company.com"
                            value={formData.companyEmail} onChange={handleChange} className={inputClass} />
                    </div>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />

                {/* Section: Product */}
                <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">Product Selection</p>
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-400">Select Product <span className="text-orange-500">*</span></label>
                    <select value={formData.productId} onChange={handleProductSelect}
                        className="w-full bg-white/5 border border-white/10 outline-none px-4 py-3 rounded-xl text-white text-sm cursor-pointer transition focus:border-orange-500/60">
                        <option value="" className="bg-[#0A0A0A]">-- Select a product --</option>
                        {products.map((product) => (
                            <option key={product._id} value={product._id} className="bg-[#0A0A0A]">
                                {product.modelName} — {product.category}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedProduct && (
                    <div className="rounded-xl p-4 space-y-3"
                        style={{ background: "rgba(249,133,19,0.05)", border: "1px solid rgba(249,133,19,0.2)" }}>
                        <h3 className="font-semibold text-orange-400 text-base">{selectedProduct.modelName}</h3>
                        {selectedProduct.tagline && (
                            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>{selectedProduct.tagline}</p>
                        )}
                        <div className="flex flex-wrap gap-2 text-xs">
                            {[selectedProduct.category, selectedProduct.subCategory, selectedProduct.machineWeight && `Weight: ${selectedProduct.machineWeight}`, selectedProduct.powerRequirement && `Power: ${selectedProduct.powerRequirement}`]
                                .filter(Boolean).map((tag, i) => (
                                    <span key={i} className="px-3 py-1 rounded-full"
                                        style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)" }}>
                                        {tag}
                                    </span>
                                ))}
                        </div>
                        {selectedProduct.specifications?.[0]?.items && selectedProduct.specifications[0].items.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-2">
                                {selectedProduct.specifications[0].items.slice(0, 6).map((spec, i) => (
                                    <div key={i} className="flex justify-between text-xs rounded-lg px-3 py-2"
                                        style={{ background: "rgba(255,255,255,0.04)" }}>
                                        <span style={{ color: "rgba(255,255,255,0.4)" }}>{spec.label}</span>
                                        <span className="text-white font-medium ml-2">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Divider */}
                <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />

                {/* Message */}
                <div className="space-y-1.5">
                    <label className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>Message / Requirements <span className="text-orange-500">*</span></label>
                    <textarea name="message" rows={5}
                        placeholder="Describe your requirements, quantity, delivery preferences..."
                        value={formData.message} onChange={handleChange}
                        className={`${inputClass} resize-none`} />
                </div>

                {/* Submit */}
                <button type="submit" disabled={isLoading}
                    className="w-full h-12 flex items-center justify-center gap-2.5 rounded-xl font-semibold text-sm text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    style={{ background: isLoading ? "#f98513" : "linear-gradient(135deg, #f98513, #e06e00)" }}>
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                    ) : (
                        <><Send size={16} strokeWidth={2.5} /> Send Order</>
                    )}
                </button>
            </form>
        </div>
    );
};

export default PlaceOrderPage;
