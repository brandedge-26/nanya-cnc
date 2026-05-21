"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { getIndustryBySlug } from "@/data/nidustry-products";
import { useProductStore } from "@/store/productStore";


const IndustryDetailClient = ({ slug }: { slug: string }) => {

    const industry = getIndustryBySlug(slug);
    const { products, isLoading, fetchProducts } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Not found
    if (!industry) {
        return (
            <div className="max-w-4xl mx-auto px-5 py-20 text-center mt-20">
                <h1 className="text-3xl font-serif font-bold text-white mb-4">Industry Not Found</h1>
                <p className="text-gray-400 mb-8">The industry page you are looking for does not exist.</p>
                <Link href="/industry" className="text-orange-500 hover:text-orange-400 transition-colors">
                    <ArrowLeft className="inline w-4 h-4 mr-2" />
                    Back to All Industries
                </Link>
            </div>
        );
    }


    // Filter products by industry's recommended categories
    const relevantProducts = products.filter((p) =>
        industry.recommendedCategories.includes(p.category)
    );


    return (
        <div className="bg-black text-white">

            {/* ── Hero Banner ── */}
            <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">

                {/* Grid bg */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[60px_60px] opacity-30"></div>

                {/* Glow */}
                <div className="absolute inset-0 flex justify-center items-center">
                    <div className="h-120 w-120 bg-[radial-gradient(circle,rgba(255,140,0,0.35),transparent_70%)] blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-4xl px-6 text-center">
                    {/* Icon */}
                    <div className="mb-4 text-center items-center justify-center flex">
                        <industry.icon size={80} className="text-gray-500" />
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-orange-500 tracking-tight leading-tight">
                        {industry.title}
                    </h1>
                    <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        {industry.description}
                    </p>

                    {/* Breadcrumb */}
                    <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
                        <Link href="/industry" className="hover:text-orange-500 transition-colors">Industries</Link>
                        <span>/</span>
                        <span className="text-white">{industry.shortTitle}</span>
                    </div>
                </div>
            </section>


            {/* ── Overview Section ── */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 gap-12 items-start">

                    {/* Overview Text */}
                    <div>
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-6">
                            Industry <span className="text-orange-500">Overview</span>
                        </h2>
                        <p className="text-gray-300 leading-relaxed text-base">
                            {industry.overview}
                        </p>
                    </div>

                    {/* Recommended Machine Types */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                        <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-orange-500" />
                            Recommended Machine Types
                        </h3>
                        <div className="space-y-4">
                            {industry.machineTypes.map((mt, idx) => (
                                <div key={idx} className="border-l-2 border-orange-500/40 pl-4">
                                    <h4 className="text-white font-medium text-sm">{mt.name}</h4>
                                    <p className="text-gray-400 text-sm mt-1">{mt.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>


            {/* ── Recommended Products ── */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">
                        Recommended <span className="text-orange-500">Machines</span>
                    </h2>
                    <p className="text-gray-400 mt-3 max-w-xl mx-auto">
                        Explore NANYA CNC machines best suited for the {industry.shortTitle.toLowerCase()} industry.
                    </p>
                </div>

                {/* Loading */}
                {isLoading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                {/* No products */}
                {!isLoading && relevantProducts.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-gray-400">No machines available for this industry at the moment.</p>
                    </div>
                )}

                {/* Product Grid */}
                {!isLoading && relevantProducts.length > 0 && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {relevantProducts.map((product) => {
                            const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];
                            return (
                                <div
                                    key={product._id}
                                    className="relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 p-3 transition-all duration-300 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/5"
                                >
                                    {/* Image */}
                                    <div className="h-55 w-full overflow-hidden group rounded-xl bg-black border border-white/10">
                                        <Image
                                            src={primaryImage?.url || "/placeholder.png"}
                                            alt={primaryImage?.altText || product.modelName}
                                            width={500}
                                            height={300}
                                            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110 rounded-xl"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="pt-5">
                                        <span className="inline-block text-xs font-medium text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full mb-3">
                                            {product.category}
                                        </span>

                                        <h3 className="text-white text-xl font-semibold mb-1">
                                            {product.modelName}
                                        </h3>

                                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                                            {product.tagline}
                                        </p>
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex gap-2 mt-4">
                                        <Link href="/get-quote" className="flex-1">
                                            <button className="w-full cursor-pointer text-sm py-2 px-3 font-medium bg-orange-500 text-black rounded-lg hover:bg-orange-500/80 transition">
                                                Request Quote
                                            </button>
                                        </Link>
                                        <Link href={`/products/${product.slug}`}>
                                            <button className="cursor-pointer text-sm py-2 px-3 font-medium bg-white/10 border border-white/10 text-white rounded-lg hover:bg-white/20 transition">
                                                Details
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>


            {/* ── CTA Section ── */}
            <section className="max-w-4xl mx-auto px-6 py-16 text-center">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-10">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
                        Need a Custom Solution?
                    </h2>
                    <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                        Our experts can help you find the perfect CNC machine for your {industry.shortTitle.toLowerCase()} manufacturing needs.
                    </p>
                    <div className="flex justify-center gap-4 flex-wrap">
                        <Link href="/get-quote">
                            <button className="cursor-pointer px-8 py-3 rounded-full bg-orange-500 text-black font-semibold hover:bg-orange-500/80 transition shadow-lg shadow-orange-500/20">
                                Request Free Consultation
                            </button>
                        </Link>
                        <Link href="/products">
                            <button className="cursor-pointer px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition flex items-center gap-2">
                                Browse All Machines <ArrowRight className="w-4 h-4" />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>


            {/* ── Back Button ── */}
            <div className="text-center pb-10">
                <Link
                    href="/industry"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors text-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to All Industries
                </Link>
            </div>

        </div>
    );
};

export default IndustryDetailClient;
