import Image from "next/image";

const TrustedCompany = () => {

    const images = ["company1", "company2", "company3", "company4", "company5"];

    return (
        <section className=" bg-black">
            <div
                className="max-w-6xl mx-auto "
            >
                {/* Heading */}
                <h1 className="text-center font-bold text-[36px] text-white mb-10 font-serif">
                    Trusted By Innovative <span className="text-orange-500">Hardware</span> Companies
                </h1>

                {/* Animated Logos */}
                <div className="relative overflow-hidden">
                    <div className="flex items-center gap-12 animate-marquee w-max">

                        {/* Duplicate logos for seamless loop */}
                        {[...images, ...images].map((img, index) => (
                            <div
                                key={index}
                                className="
                                flex items-center justify-center
                                transition-transform duration-300
                                hover:scale-110
                            "
                            >
                                <Image
                                    src={`/company/${img}.webp`}
                                    alt="Trusted company"
                                    width={150}
                                    height={80}
                                    className="opacity-80 hover:opacity-100 transition"
                                />
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustedCompany;
