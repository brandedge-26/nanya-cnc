import {
    Cpu,
    ClipboardCheck,
    Eye,
    Settings,
    BadgeCheck,
    LucideIcon
} from "lucide-react";


const Advantage = () => {

    const advantages = [
        {
            icon: Cpu,
            title: "AI-Enhanced Manufacturing",
            desc: "Technology that optimizes production without sacrificing human expertise",
        },
        {
            icon: ClipboardCheck,
            title: "Methodology-Driven Approach",
            desc: "Theory of Constraints implementation that maximizes efficiency",
        },
        {
            icon: Eye,
            title: "Complete Transparency",
            desc: "Real-time visibility into your manufacturing process at every stage",
        },
        {
            icon: Settings,
            title: "Engineering Excellence",
            desc: "Team with decades of manufacturing experience across multiple industries",
        },
        {
            icon: BadgeCheck,
            title: "Quality Commitment",
            desc: "Rigorous quality systems that ensure precision and consistency",
        },
    ];


    // Type define karo
    type AdvantageCardType = {
        icon: LucideIcon;
        title: string;
        desc: string;
    };


    const Card = ({ item }: { item: AdvantageCardType }) => {

        const Icon = item.icon;

        return (
            <div
                className="
                group rounded-2xl p-8
                bg-white/10 backdrop-blur-xl
                border border-white/20
                shadow-lg
                transition-all duration-300
                hover:border-(--primary)/60
                text-center
            "
            >
                <div className="mb-5 flex justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl
                        bg-(--primary)/15 text-(--primary)
                        group-hover:bg-(--primary)/25 transition">
                        <Icon size={28} strokeWidth={1.5} />
                    </div>
                </div>

                <h3 className="font-semibold text-lg mb-3 font-serif text-white">
                    {item.title}
                </h3>

                <p className="text-sm text-gray-300 leading-relaxed">
                    {item.desc}
                </p>
            </div>
        );
    };

    return (

        <section className="bg-black py-24">
            <div className="max-w-7xl mx-auto px-6">

                {/* Heading */}
                <h2 className="text-4xl font-bold mb-16 text-center text-white font-serif">
                    The <span className="text-orange-500">NANYA CNC</span> Advantages
                </h2>

                {/* 🔹 FIRST ROW → 3 CARDS */}
                <div className="
                    grid grid-cols-3 gap-3
                    max-md:grid-cols-2
                    max-sm:grid-cols-1
                    mb-3
                ">
                    {advantages.slice(0, 3).map((item, i) => (
                        <Card key={i} item={item} />
                    ))}
                </div>

                {/* 🔹 SECOND ROW → 2 CARDS CENTER */}
                <div className="w-full
                    grid grid-cols-2 gap-3
                    max-md:grid-cols-2
                    max-sm:grid-cols-1
                    max-w-4xl mx-auto
                ">
                    {advantages.slice(3).map((item, i) => (
                        <Card key={i} item={item} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Advantage;
