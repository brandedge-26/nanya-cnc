import {
    Cpu,
    ClipboardCheck,
    Eye,
    BadgeCheck,
    LucideIcon
} from "lucide-react";


const Advantage = () => {

    const advantages = [
        {
            icon: Cpu,
            title: "AI-Driven Precision",
            desc: "Advanced algorithms optimize cutting paths and reduce errors, ensuring unmatched accuracy in every operation.",
        },
        {
            icon: ClipboardCheck,
            title: "High-Speed Production",
            desc: "Maximize output with machines engineered for speed without compromising quality.",
        },
        {
            icon: Eye,
            title: "Smart Automation",
            desc: "Reduce manual work with automated workflows, real-time monitoring, and intelligent controls.",
        },
        {
            icon: BadgeCheck,
            title: "Global Reliability",
            desc: "Trusted by industries worldwide with durable machines and consistent performance.",
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
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white font-serif">
                        Why Nanya CNC Leads the <span className="text-orange-500">Future of Manufacturing</span>
                    </h2>
                    <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
                        We don&apos;t just manufacture machines — we build intelligent production systems designed for efficiency, scalability, and long-term growth.
                    </p>
                </div>

                {/* 4 Cards Grid */}
                <div className="grid grid-cols-2 gap-3 max-md:grid-cols-2 max-sm:grid-cols-1 max-w-5xl mx-auto">
                    {advantages.map((item, i) => (
                        <Card key={i} item={item} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Advantage;
