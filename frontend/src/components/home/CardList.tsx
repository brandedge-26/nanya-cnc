
"use client"


import Card from "./Card";

const CardList = () => {

    const cardData = [
        {
            id: 1,
            title: "Precision CNC Machining",
            description:
                "High-accuracy CNC machining solutions designed to meet industrial and commercial manufacturing standards.",
            image: "/cards/01.jpg",
        },
        {
            id: 2,
            title: "Automotive Components",
            description:
                "Durable and precision-engineered CNC parts for the automotive industry with strict quality control.",
            image: "/cards/02.jpeg",
        },
        {
            id: 3,
            title: "Industrial Equipment Parts",
            description:
                "Custom CNC-machined parts for heavy machinery and industrial equipment applications.",
            image: "/cards/03.jpeg",
        }
    ];

    return (
        <section className="mx-auto px-6 py-20 bg-black">

            {/* Section Title */}
            <div className="mb-16 text-center">
                <h1 className="font-bold text-[38px] leading-tight text-white font-serif">
                    Manufacturing Expertise <br />
                    <span className="text-(--primary)">That Delivers Results</span>
                </h1>
                <p className="text-gray-400 mx-auto mt-4 max-w-xl">
                    Working with a manufacturing partner who understands your product needs makes all the difference.
                </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-3 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
                {cardData.map((item) => (
                    <Card
                        key={item.id}
                        image={item.image}
                        title={item.title}
                        description={item.description}
                    />
                ))}
            </div>

        </section>
    );
};

export default CardList;
