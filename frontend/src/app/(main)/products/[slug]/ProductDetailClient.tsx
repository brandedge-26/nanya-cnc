"use client";


import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, type MouseEvent } from "react";
import { ArrowLeft, ChevronRight, CheckCircle, Circle, Download } from "lucide-react";
import { useProductStore } from "@/store/productStore";
import { useRouter } from "next/navigation";




/* ---------- Brochure PDF mapping (slug -> pdf filename) ---------- */
const brochureMap: Record<string, string> = {
    "3105s": "3105S.pdf",
    "3605m": "3605M.pdf",
    "hmc-630a": "HMC630.pdf",
    "hmc-800a": "hmc800.pdf",
    "nano-x10": "nano-x10.pdf",
    "nano-x8": "nano-x8.pdf",
    "nv-1165": "nv1165.pdf",
    "nv-855": "nv-855.pdf",
    "vlt-550": "VLT-550.pdf",
    "vlt-750": "vlt-750.pdf",
};


/* ---------- Component ---------- */
const ProductDetailClient = ({ slug }: { slug: string }) => {


    //for image zoom
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [showZoom, setShowZoom] = useState(false);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setPosition({ x, y });
    };

    // router
    const router = useRouter();

    const { fetchProductBySlug, singleProduct } = useProductStore();

    // const [product, setProduct] = useState<Product>();
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
    const [activeSpecGroup, setActiveSpecGroup] = useState(0);

    const handleDownloadBrochure = () => {
        const pdfFile = brochureMap[slug];
        if (pdfFile) {
            const link = document.createElement("a");
            link.href = `/pdf/${pdfFile}`;
            link.download = pdfFile;
            link.click();
        }
    };

    useEffect(() => {
        const loadProduct = async () => {
            const data = await fetchProductBySlug(slug);
            console.log(data);
            // setProduct(data);
            setLoading(false);
        };

        loadProduct();
    }, [slug, fetchProductBySlug]);


    // Loading
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // Not found
    if (!singleProduct) {
        return (
            <div className="max-w-4xl mx-auto px-5 py-20 text-center">
                <h1 className="text-3xl font-serif font-bold text-white mb-4">Product Not Found</h1>
                <p className="text-gray-400 mb-8">The product you are looking for does not exist.</p>
                <Link href="/products" className="text-orange-500 hover:text-orange-400 transition-colors">
                    <ArrowLeft className="inline w-4 h-4 mr-2" />
                    Back to All Products
                </Link>
            </div>
        );
    }


    const primaryImage = singleProduct.images.find(img => img.isPrimary) || singleProduct.images[0];
    const currentImage = singleProduct.images[activeImage] || primaryImage;


    return (
        <div className="max-w-7xl mx-auto px-5 py-10 mt-14">


            {/* ── Breadcrumb ── */}
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8 max-sm:grid max-sm:grid-cols-2 max-sm:gap-2W">

                <Link href="/products" className="hover:text-orange-500 transition-colors max-sm:text-xs">
                    Products
                </Link>

                <ChevronRight className="w-3.5 h-3.5 " />
                <span className="text-gray-500">{singleProduct.category}</span>

                {singleProduct.subCategory && (
                    <>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-gray-500">{singleProduct.subCategory}</span>
                    </>
                )}

                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-white">{singleProduct.modelName}</span>

            </nav>


            {/* ── Top Section: Image + Info ── */}
            <div className="grid lg:grid-cols-2 gap-10 mb-16">

                {/* Image Gallery */}
                <div>
                    {/* Main Image */}
                    <div
                        className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 mb-4 h-125 w-full cursor-move" // 'relative' aur 'h-[500px]' zaroori hai
                        onMouseEnter={() => setShowZoom(true)}
                        onMouseLeave={() => setShowZoom(false)}
                        onMouseMove={handleMouseMove}
                    >
                        {/* Original Image */}
                        <Image
                            src={currentImage?.url || "/01-NYE.jpg"}
                            alt={currentImage?.altText || singleProduct.modelName}
                            fill
                            className="object-cover"
                        />

                        {/* Zoom Layer */}
                        {showZoom && (
                            <div
                                className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-150"
                                style={{
                                    backgroundImage: `url(${currentImage?.url || "/01-NYE.jpg"})`,
                                    backgroundPosition: `${position.x}% ${position.y}%`,
                                    backgroundSize: "250%",
                                    backgroundRepeat: "no-repeat",
                                    backgroundColor: "bg-red-500"
                                }}
                            />
                        )}
                    </div>

                    {/* Thumbnails */}
                    {singleProduct.images.length > 1 && (
                        <div className="flex gap-3">
                            {singleProduct.images.map((img, idx) => (
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

                {/* singleProduct Info */}
                <div>

                    {/* Category Badge */}
                    <span className="inline-block text-xs font-medium text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full mb-4">
                        {singleProduct.category}
                    </span>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                        {singleProduct.modelName}
                    </h1>

                    {singleProduct.tagline && (
                        <p className="text-lg text-orange-400 mb-4">{singleProduct.tagline}</p>
                    )}

                    {singleProduct.description && (
                        <p className="text-gray-300 leading-relaxed mb-8">{singleProduct.description}</p>
                    )}


                    {/* Quick Specs */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                        {singleProduct.machineWeight && (
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Weight</p>
                                <p className="text-white font-semibold text-sm">{singleProduct.machineWeight}</p>
                            </div>
                        )}
                        {singleProduct.machineDimensions && (
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Dimensions</p>
                                <p className="text-white font-semibold text-sm">{singleProduct.machineDimensions}</p>
                            </div>
                        )}
                        {singleProduct.powerRequirement && (
                            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Power</p>
                                <p className="text-white font-semibold text-sm">{singleProduct.powerRequirement}</p>
                            </div>
                        )}
                    </div>

                    {/* Get Quote Button */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => router.push("/get-quote")}
                            className="cursor-pointer items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in text-base py-3 px-8 shadow-sm hover:shadow-md relative bg-linear-to-b from-orange-500 to-orange-600 border-orange-600 text-stone-50 rounded-lg hover:bg-linear-to-b hover:from-orange-600 hover:to-orange-600 hover:border-orange-600 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.35),inset_0_-2px_0px_rgba(0,0,0,0.18)] after:pointer-events-none transition antialiased">
                            Get a Quote
                        </button>

                        {brochureMap[slug] && (
                            <button
                                onClick={handleDownloadBrochure}
                                className="flex items-center gap-2 cursor-pointer px-8 py-3 rounded-lg border border-white/20 text-white hover:bg-white/10 transition"
                            >
                                <Download size={20} />
                                <span>Download Brochure</span>
                            </button>
                        )}
                    </div>

                </div>

            </div>



            {/* ── Technical Specifications ── */}
            {singleProduct.specifications.length > 0 && (
                <section className="mb-16">

                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-8">
                        Technical Specifications
                    </h2>

                    {/* Spec Group Tabs */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {singleProduct.specifications.map((group, idx) => (
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
                                {singleProduct.specifications[activeSpecGroup]?.items.map((item, idx) => (
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
                        {singleProduct.specifications.map((group, gIdx) => (
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
            {(singleProduct.standardAccessories.length > 0 || singleProduct.optionalAccessories.length > 0) && (
                <section className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-8">
                        Accessories
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Standard */}
                        {singleProduct.standardAccessories.length > 0 && (
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-500" />
                                    Standard Accessories
                                </h3>
                                <ul className="space-y-2">
                                    {singleProduct.standardAccessories.map((acc, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                                            <span className="text-green-500 mt-0.5">&#10003;</span>
                                            {acc}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Optional */}
                        {singleProduct.optionalAccessories.length > 0 && (
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <Circle className="w-5 h-5 text-orange-500" />
                                    Optional Accessories
                                </h3>
                                <ul className="space-y-2">
                                    {singleProduct.optionalAccessories.map((acc, idx) => (
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
                    href="/products"
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
