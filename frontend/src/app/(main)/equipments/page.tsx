import EquipmentsClient from "./EquipmentsClient";

export const metadata = {
    title: "Equipments – CNC Machine Accessories & Tooling",
    description:
        "Explore NANYA CNC's range of high-quality CNC equipment including tool holders, workholding solutions, coolant systems, rotary tables, measurement probes, and machine accessories.",
    alternates: {
        canonical: "/equipments",
    },
    openGraph: {
        title: "Equipments | NANYA CNC – CNC Machine Accessories & Tooling",
        description:
            "Explore NANYA CNC's range of high-quality CNC equipment including tool holders, workholding solutions, coolant systems, rotary tables, measurement probes, and machine accessories.",
        url: "/equipments",
        type: "website",
    },
};

const EquipmentsPage = () => {
    return (
        <main className="bg-black text-white min-h-screen">

            {/* HERO */}
            <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-black">

                {/* GRID BACKGROUND */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.09)_1px,transparent_1px)] bg-size-[60px_60px] opacity-30 animate-gridMove transform"></div>

                {/* ORANGE RADIAL CENTER GLOW */}
                <div className="absolute inset-0 flex justify-center items-center">
                    <div className="h-120 w-120 bg-[radial-gradient(circle,rgba(255,140,0,0.35),transparent_70%)] blur-3xl animate-glowMove transform"></div>
                </div>

                {/* HERO CONTENT */}
                <div className="relative z-10 max-w-4xl px-6 text-center">
                    <p className="text-sm md:text-base uppercase tracking-widest text-orange-500 mb-4 font-medium">
                        CNC Machine Accessories
                    </p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tighter leading-tight">
                        Our <span className="text-orange-500">Equipments</span>
                    </h1>
                    <p className="mt-6 text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        High-quality tooling, workholding, and accessories to maximize the performance
                        of your CNC machines. Built for precision, durability, and productivity.
                    </p>
                </div>
            </section>

            {/* EQUIPMENT LISTING */}
            <EquipmentsClient />

        </main>
    );
};

export default EquipmentsPage;