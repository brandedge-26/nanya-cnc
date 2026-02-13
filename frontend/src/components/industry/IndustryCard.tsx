"use client";


import Image from "next/image";
import Link from "next/link";



const cards = [
    {
        title: "Google deve",
        description:
            "Google is a global technology company focused on search, cloud computing, and artificial intelligence.",
        image: "/01-NYE.jpg",
    },
    {
        title: "Microsoft",
        description:
            "Microsoft develops software, cloud solutions, and enterprise tools that power businesses worldwide.",
        image: "/02-NYE.jpg",
    },
    {
        title: "Amazon",
        description:
            "Amazon is a leading e-commerce and cloud services provider with a strong focus on innovation.",
        image: "/03-NYE.jpg",
    },
    {
        title: "Tesla",
        description:
            "Tesla designs electric vehicles and clean energy solutions with cutting-edge technology.",
        image: "/01-NYE.jpg",
    },
];


const IndustryCard = () => {

    return (
        <div className="max-w-7xl mx-auto px-5 py-16">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl border border-gray-200 transition overflow-hidden"
                    >
                        <Image
                            src={card.image}
                            alt={card.title}
                            width={200}
                            height={200}
                            className="w-full h-44 object-cover"
                        />

                        <div className="p-5">
                            <h3 className="text-lg font-semibold">
                                {card.title}
                            </h3>

                            <p className="text-sm text-gray-600 mt-2">
                                {card.description}
                            </p>

                            <div className="mt-4">
                                <Link href={{
                                    pathname: `/industry/${encodeURIComponent(card.title.toLowerCase())}`,
                                    query: { img: card.image }
                                }} className="primary-btn hover:underline cursor-pointer">
                                    Read More →
                                </Link>
                            </div>

                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default IndustryCard;
