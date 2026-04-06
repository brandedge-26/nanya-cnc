"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader, Send, CheckCircle2, ChevronRight } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useProductStore, Product } from "@/store/productStore";
import { useDealerOrderStore } from "@/store/dealerOrderStore";
import toast from "react-hot-toast";


const DealerOrderPage = () => {

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


    // Redirect if not authenticated or not a dealer
    useEffect(() => {
        if (isCheckingAuth) return;
        if (!isAuthenticated || !user) {
            router.replace("/");
            return;
        }
        if (user.role !== "dealer") {
            router.replace("/dealer-request");
        }
    }, [isAuthenticated, isCheckingAuth, user, router]);


    // Fetch products on mount
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
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
        setFormData({
            email: "",
            companyName: "",
            companyEmail: "",
            productName: "",
            productId: "",
            message: "",
        });
        setSelectedProduct(null);
    };


    if (isCheckingAuth) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader className="animate-spin w-12 h-12 text-orange-500" />
            </div>
        );
    }

    if (!isAuthenticated || !user || user.role !== "dealer") {
        return null;
    }


    // Success state
    if (orderPlaced) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center px-6">
                <div className="max-w-md w-full text-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 relative overflow-hidden">

                    <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                        <div className="h-64 w-64 bg-[radial-gradient(circle,rgba(255,140,0,0.15),transparent_70%)] blur-2xl" />
                    </div>

                    <div className="relative z-10">
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
                                <CheckCircle2 size={40} className="text-green-400" />
                            </div>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold font-serif text-white mb-3">
                            Order Placed!
                        </h2>
                        <p className="text-gray-400 mb-2">
                            Your order has been placed successfully.
                        </p>
                        <p className="text-gray-500 text-sm mb-8">
                            Our team will get in touch with you shortly.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={handleNewOrder}
                                className="cursor-pointer px-6 py-2.5 rounded-full bg-orange-500 text-black font-semibold hover:bg-orange-400 transition text-sm inline-flex items-center gap-2 whitespace-nowrap"
                            >
                                Place Another Order
                                <ChevronRight size={16} />
                            </button>
                            <button
                                onClick={() => router.push("/dealer-portal")}
                                className="cursor-pointer px-6 py-2.5 rounded-full border border-white/20 text-white hover:bg-white/10 transition text-sm whitespace-nowrap"
                            >
                                Back to Portal
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-black">
            <div className="max-w-3xl mx-auto px-5 py-10">

                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white font-serif">
                        Place an <span className="text-orange-500">Order</span>
                    </h2>
                    <p className="text-gray-400 mt-2">Fill in the details to submit your dealer order.</p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl space-y-6"
                >

                    {/* Name (readonly) & Email (manual) */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 ml-1">Full Name</label>
                            <input
                                type="text"
                                value={user?.name || ""}
                                readOnly
                                className="w-full bg-black/20 border border-white/10 outline-none px-4 py-3 rounded-xl text-white cursor-not-allowed opacity-70"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 ml-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-black/20 border border-white/10 outline-none px-4 py-3 rounded-xl focus:ring-1 focus:ring-orange-500 transition text-white"
                            />
                        </div>
                    </div>

                    {/* Company Name & Company Email */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 ml-1">Company Name</label>
                            <input
                                type="text"
                                name="companyName"
                                placeholder="Your Business Name"
                                value={formData.companyName}
                                onChange={handleChange}
                                className="w-full bg-black/20 border border-white/10 outline-none px-4 py-3 rounded-xl focus:ring-1 focus:ring-orange-500 transition text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 ml-1">Company Email</label>
                            <input
                                type="email"
                                name="companyEmail"
                                placeholder="business@company.com"
                                value={formData.companyEmail}
                                onChange={handleChange}
                                className="w-full bg-black/20 border border-white/10 outline-none px-4 py-3 rounded-xl focus:ring-1 focus:ring-orange-500 transition text-white"
                            />
                        </div>
                    </div>

                    {/* Product Select */}
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 ml-1">Select Product</label>
                        <select
                            value={formData.productId}
                            onChange={handleProductSelect}
                            className="w-full bg-black/40 border border-white/10 outline-none px-4 py-3 rounded-xl focus:ring-1 focus:ring-orange-500 transition text-white cursor-pointer"
                        >
                            <option value="" className="bg-gray-900">-- Select a product --</option>
                            {products.map((product) => (
                                <option key={product._id} value={product._id} className="bg-gray-900">
                                    {product.modelName} — {product.category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Selected Product Details */}
                    {selectedProduct && (
                        <div className="rounded-2xl bg-orange-500/5 border border-orange-500/20 p-5 space-y-3">
                            <h3 className="font-semibold text-orange-400 font-serif text-lg">
                                {selectedProduct.modelName}
                            </h3>
                            {selectedProduct.tagline && (
                                <p className="text-gray-400 text-sm">{selectedProduct.tagline}</p>
                            )}
                            <div className="flex flex-wrap gap-2 text-xs">
                                <span className="px-3 py-1 rounded-full bg-white/10 text-gray-300">
                                    {selectedProduct.category}
                                </span>
                                {selectedProduct.subCategory && (
                                    <span className="px-3 py-1 rounded-full bg-white/10 text-gray-300">
                                        {selectedProduct.subCategory}
                                    </span>
                                )}
                                {selectedProduct.machineWeight && (
                                    <span className="px-3 py-1 rounded-full bg-white/10 text-gray-300">
                                        Weight: {selectedProduct.machineWeight}
                                    </span>
                                )}
                                {selectedProduct.machineDimensions && (
                                    <span className="px-3 py-1 rounded-full bg-white/10 text-gray-300">
                                        Dims: {selectedProduct.machineDimensions}
                                    </span>
                                )}
                                {selectedProduct.powerRequirement && (
                                    <span className="px-3 py-1 rounded-full bg-white/10 text-gray-300">
                                        Power: {selectedProduct.powerRequirement}
                                    </span>
                                )}
                            </div>
                            {selectedProduct.specifications && selectedProduct.specifications.length > 0 && (
                                <div className="mt-3">
                                    <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Key Specs</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                        {selectedProduct.specifications[0]?.items?.slice(0, 6).map((spec, i) => (
                                            <div key={i} className="flex justify-between text-xs bg-white/5 rounded-lg px-3 py-2">
                                                <span className="text-gray-400">{spec.label}</span>
                                                <span className="text-white font-medium ml-2">{spec.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Message */}
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400 ml-1">Message / Requirements</label>
                        <textarea
                            name="message"
                            placeholder="Describe your requirements, quantity, delivery preferences..."
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            className="w-full bg-black/20 border border-white/10 outline-none px-4 py-3 rounded-xl focus:ring-1 focus:ring-orange-500 transition text-white resize-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="h-12 w-full flex items-center gap-3 cursor-pointer justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:cursor-not-allowed text-sm py-2 px-4 shadow-sm bg-linear-to-b from-orange-500 to-orange-600 border-orange-600 text-stone-50 rounded-lg transition antialiased whitespace-nowrap"
                    >
                        {isLoading ? (
                            <Loader className="animate-spin" size={24} />
                        ) : (
                            <>
                                <span>Send Order</span>
                                <Send size={18} />
                            </>
                        )}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default DealerOrderPage;
