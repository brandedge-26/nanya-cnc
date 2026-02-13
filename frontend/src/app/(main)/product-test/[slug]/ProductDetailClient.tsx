"use client";


import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, ChevronRight, CheckCircle, Circle } from "lucide-react";
import api from "@/config/axios";



/* ---------- Types ---------- */
interface SpecItem {
    label: string;
    value: string;
}


interface SpecGroup {
    groupName: string;
    items: SpecItem[];
}


interface ProductImage {
    url: string;
    publicId: string;
    altText: string;
    isPrimary: boolean;
}


interface Product {
    _id: string;
    modelName: string;
    slug: string;
    tagline: string;
    description: string;
    category: string;
    subCategory: string;
    images: ProductImage[];
    specifications: SpecGroup[];
    standardAccessories: string[];
    optionalAccessories: string[];
    machineWeight: string;
    machineDimensions: string;
    powerRequirement: string;
}



/* ---------- Component ---------- */
const ProductDetailClient = ({ slug }: { slug: string }) => {

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [activeSpecGroup, setActiveSpecGroup] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {

                const res = await api.get(`/products/${slug}`);
                setProduct(res.data.data);

            } catch (err) {
                console.error("Failed to fetch product:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [slug]);


    // Loading
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // Not found
    if (!product) {
        return (
            <div className="max-w-4xl mx-auto px-5 py-20 text-center">
                <h1 className="text-3xl font-serif font-bold text-white mb-4">Product Not Found</h1>
                <p className="text-gray-400 mb-8">The product you are looking for does not exist.</p>
                <Link href="/product-test" className="text-orange-500 hover:text-orange-400 transition-colors">
                    <ArrowLeft className="inline w-4 h-4 mr-2" />
                    Back to All Products
                </Link>
            </div>
        );
    }


    const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];
    const currentImage = product.images[activeImage] || primaryImage;


    return (
        <div className="max-w-7xl mx-auto px-5 py-10 mt-14">

         
            {/* ── Breadcrumb ── */}
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">

                <Link href="/product-test" className="hover:text-orange-500 transition-colors">
                    Products
                </Link>
                
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-gray-500">{product.category}</span>

                {product.subCategory && (
                    <>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-gray-500">{product.subCategory}</span>
                    </>
                )}

                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-white">{product.modelName}</span>

            </nav>


            {/* ── Top Section: Image + Info ── */}
            <div className="grid lg:grid-cols-2 gap-10 mb-16">

                {/* Image Gallery */}
                <div>
                    {/* Main Image */}
                    <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 mb-4">
                        <Image
                            src={currentImage?.url || "/01-NYE.jpg"}
                            alt={currentImage?.altText || product.modelName}
                            width={800}
                            height={600}
                            className="w-full h-100 object-cover"
                        />
                    </div>

                    {/* Thumbnails */}
                    {product.images.length > 1 && (
                        <div className="flex gap-3">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${activeImage === idx
                                        ? "border-orange-500 shadow-lg shadow-orange-500/20"
                                        : "border-white/10 hover:border-white/30"
                                        }`}
                                >
                                    <Image
                                        src={img.url}
                                        alt={img.altText || `View ${idx + 1}`}
                                        width={100}
                                        height={75}
                                        className="w-20 h-16 object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div>

                    {/* Category Badge */}
                    <span className="inline-block text-xs font-medium text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full mb-4">
                        {product.category}
                    </span>

                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">
                        {product.modelName}
                    </h1>

                    {product.tagline && (
                        <p className="text-lg text-orange-400 mb-4">{product.tagline}</p>
                    )}

                    {product.description && (
                        <p className="text-gray-300 leading-relaxed mb-8">{product.description}</p>
                    )}


                    {/* Quick Specs */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        {product.machineWeight && (
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Weight</p>
                                <p className="text-white font-semibold text-sm">{product.machineWeight}</p>
                            </div>
                        )}
                        {product.machineDimensions && (
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Dimensions</p>
                                <p className="text-white font-semibold text-sm">{product.machineDimensions}</p>
                            </div>
                        )}
                        {product.powerRequirement && (
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Power</p>
                                <p className="text-white font-semibold text-sm">{product.powerRequirement}</p>
                            </div>
                        )}
                    </div>

                    {/* Get Quote Button */}
                    <Link href="/get-quote">
                        <button className="cursor-pointer items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in text-base py-3 px-8 shadow-sm hover:shadow-md relative bg-linear-to-b from-orange-500 to-orange-600 border-orange-600 text-stone-50 rounded-lg hover:bg-linear-to-b hover:from-orange-600 hover:to-orange-600 hover:border-orange-600 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.35),inset_0_-2px_0px_rgba(0,0,0,0.18)] after:pointer-events-none transition antialiased">
                            Get a Quote
                        </button>
                    </Link>

                </div>
                
            </div>



            {/* ── Technical Specifications ── */}
            {product.specifications.length > 0 && (
                <section className="mb-16">

                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-8">
                        Technical Specifications
                    </h2>

                    {/* Spec Group Tabs */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {product.specifications.map((group, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveSpecGroup(idx)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 ${activeSpecGroup === idx
                                    ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                                    : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                {group.groupName}
                            </button>
                        ))}
                    </div>


                    {/* Spec Table */}
                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400 uppercase tracking-wider">
                                        Specification
                                    </th>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400 uppercase tracking-wider">
                                        Value
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.specifications[activeSpecGroup]?.items.map((item, idx) => (
                                    <tr
                                        key={idx}
                                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                                    >
                                        <td className="px-6 py-4 text-sm text-gray-300">{item.label}</td>
                                        <td className="px-6 py-4 text-sm text-white font-medium">{item.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>


                    {/* All Specs Overview */}
                    <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {product.specifications.map((group, gIdx) => (
                            <div
                                key={gIdx}
                                className="rounded-xl border border-white/10 bg-white/5 p-5"
                            >
                                <h4 className="text-orange-400 font-semibold text-sm mb-3 uppercase tracking-wider">
                                    {group.groupName}
                                </h4>
                                <div className="space-y-2">
                                    {group.items.map((item, iIdx) => (
                                        <div key={iIdx} className="flex justify-between gap-2">
                                            <span className="text-gray-400 text-xs">{item.label}</span>
                                            <span className="text-white text-xs font-medium text-right">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                </section>
            )}


            {/* ── Accessories ── */}
            {(product.standardAccessories.length > 0 || product.optionalAccessories.length > 0) && (
                <section className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-8">
                        Accessories
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Standard */}
                        {product.standardAccessories.length > 0 && (
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    Standard Accessories
                                </h3>
                                <ul className="space-y-2">
                                    {product.standardAccessories.map((acc, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                                            <span className="text-green-500 mt-0.5">&#10003;</span>
                                            {acc}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Optional */}
                        {product.optionalAccessories.length > 0 && (
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <Circle className="w-5 h-5 text-orange-500" />
                                    Optional Accessories
                                </h3>
                                <ul className="space-y-2">
                                    {product.optionalAccessories.map((acc, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                                            <span className="text-orange-500 mt-0.5">&#9675;</span>
                                            {acc}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </section>
            )}


            {/* ── Back Button ── */}
            <div className="text-center pb-10">
                <Link
                    href="/product-test"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors text-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to All Products
                </Link>
            </div>

        </div>
    );
};

export default ProductDetailClient;
