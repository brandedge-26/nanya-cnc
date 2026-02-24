"use client";

import { useState, useEffect } from "react";
import { X, ChevronRight, Wrench } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { equipments, equipmentCategories, Equipment } from "@/data/equipments";

/* ---------- Equipment Card ---------- */
const EquipmentCard = ({
    equipment,
    onViewDetail,
}: {
    equipment: Equipment;
    onViewDetail: (eq: Equipment) => void;
}) => {
    const [imgError, setImgError] = useState(false);

    return (
        <div className="relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg transition-all duration-300 hover:border-orange-500/30 hover:shadow-orange-500/5 hover:shadow-2xl p-4 flex flex-col">

            {/* Image */}
            <div className="h-48 w-full overflow-hidden rounded-xl flex items-center justify-center relative bg-transparent">
                {!imgError ? (
                    <Image
                        src={equipment.image}
                        alt={equipment.name}
                        fill
                        className="object-contain bg-black border border-white/10 p-4"
                        style={{ mixBlendMode: "multiply" }}
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <Wrench size={48} className="text-orange-500/30" />
                )}
            </div>

            {/* Content */}
            <div className="pt-5 flex-1 flex flex-col">
                {/* Category Badge */}
                <span className="inline-block w-fit text-xs font-medium text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full mb-3">
                    {equipment.category}
                </span>

                {/* Model Number */}
                <p className="text-orange-500 text-sm font-bold mb-1">{equipment.modelNo}</p>

                <h3 className="text-white text-base font-semibold mb-2 line-clamp-2">
                    {equipment.name}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 flex-1">
                    {equipment.shortDescription}
                </p>

                {/* View Detail Button */}
                <button
                    onClick={() => onViewDetail(equipment)}
                    className="mt-4 w-full cursor-pointer flex items-center justify-center gap-2 border align-middle select-none font-sans font-medium text-center duration-300 ease-in text-sm py-2.5 px-4 shadow-sm hover:shadow-md bg-linear-to-b from-orange-500 to-orange-600 border-orange-600 text-stone-50 rounded-lg after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.35),inset_0_-2px_0px_rgba(0,0,0,0.18)] after:pointer-events-none transition antialiased relative"
                >
                    View Details <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
};


/* ---------- Detail Modal ---------- */
const EquipmentModal = ({
    equipment,
    onClose,
}: {
    equipment: Equipment;
    onClose: () => void;
}) => {
    return (
        <div
            className="fixed inset-0 z-100 flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            {/* Modal Content */}
            <div
                className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-950 border border-white/10 rounded-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer"
                >
                    <X size={20} className="text-white" />
                </button>

                {/* Image Header */}
                <div className="h-56 w-full bg-black/40 flex items-center justify-center rounded-t-2xl border-b border-white/10 relative overflow-hidden">
                    <Image
                        src={equipment.image}
                        alt={equipment.name}
                        fill
                        className="object-contain p-8"
                        onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = "none";
                        }}
                    />
                </div>

                {/* Body */}
                <div className="p-6 md:p-8">
                    {/* Category */}
                    <span className="inline-block text-xs font-medium text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full mb-2">
                        {equipment.category}
                    </span>

                    {/* Model Number */}
                    <p className="text-orange-500 font-bold text-lg mb-1">{equipment.modelNo}</p>

                    {/* Name */}
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-3 font-serif">
                        {equipment.name}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed mb-6">
                        {equipment.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-orange-500 mb-3">Key Features</h3>
                        <ul className="space-y-2">
                            {equipment.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Specifications */}
                    <div>
                        <h3 className="text-lg font-semibold text-orange-500 mb-3">Specifications</h3>
                        <div className="rounded-xl border border-white/10 overflow-hidden">
                            {equipment.specifications.map((spec, i) => (
                                <div
                                    key={i}
                                    className={`flex justify-between items-center px-4 py-3 text-sm ${i % 2 === 0 ? "bg-white/5" : "bg-transparent"
                                        }`}
                                >
                                    <span className="text-gray-400">{spec.label}</span>
                                    <span className="text-white font-medium">{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-8 flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 cursor-pointer py-3 rounded-lg border border-white/20 text-white hover:bg-white/10 transition text-sm font-medium"
                        >
                            Close
                        </button>
                        <a
                            href="/get-quote"
                            className="flex-1 cursor-pointer py-3 rounded-lg bg-orange-500 text-black text-center text-sm font-medium hover:bg-orange-400 transition"
                        >
                            Get Quote
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};


/* ---------- Main Component ---------- */
const EquipmentsClient = () => {
    const searchParams = useSearchParams();
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

    useEffect(() => {
        const cat = searchParams.get("category");
        if (cat) {
            const decoded = decodeURIComponent(cat.replace(/\+/g, " "));
            const found = equipmentCategories.find((c) => c.key === decoded);
            if (found) setActiveCategory(found.key);
        }
    }, [searchParams]);

    const filteredEquipments =
        activeCategory === "All"
            ? equipments
            : equipments.filter((eq) => eq.category === activeCategory);

    return (
        <>
            <div className="max-w-7xl mx-auto px-5 py-16">

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-3 justify-center mb-12">
                    {equipmentCategories.map((cat) => (
                        <button
                            key={cat.key}
                            onClick={() => setActiveCategory(cat.key)}
                            className={`px-5 py-2 rounded-full backdrop-blur-lg bg-white/10 text-sm font-medium cursor-pointer transition-colors duration-300 hover:bg-white/20 hover:text-white ${activeCategory === cat.key
                                ? "bg-white/20 text-white shadow-lg border border-white/30"
                                : "text-gray-300 border border-white/10"
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Items Count */}
                <p className="text-gray-500 text-sm mb-6 text-center">
                    Showing {filteredEquipments.length} {filteredEquipments.length === 1 ? "item" : "items"}
                    {activeCategory !== "All" && ` in ${activeCategory}`}
                </p>

                {/* Equipment Grid */}
                {filteredEquipments.length > 0 ? (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3    gap-6">
                        {filteredEquipments.map((eq) => (
                            <EquipmentCard
                                key={eq.id}
                                equipment={eq}
                                onViewDetail={setSelectedEquipment}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-lg">No equipment found in this category.</p>
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {selectedEquipment && (
                <EquipmentModal
                    equipment={selectedEquipment}
                    onClose={() => setSelectedEquipment(null)}
                />
            )}
        </>
    );
};

export default EquipmentsClient;
