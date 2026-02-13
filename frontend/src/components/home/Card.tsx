import Image from "next/image";


interface CardProps {
    image: string;
    title: string;
    description: string;
}

const Card = ({ image, title, description }: CardProps) => {
    return (

        <div
            className="
            relative rounded-2xl overflow-hidden
            bg-white/10 backdrop-blur-xl
            border border-white/20
            shadow-lg
            transition-shadow duration-300
            hover:shadow-2xl
            p-3
        "
        >
            {/* Image Wrapper */}
            <div className="h-55 w-full overflow-hidden group">
                <Image
                    src={image}
                    alt={title}
                    width={500}
                    height={300}
                    className="
                    h-full w-full object-cover
                    transition-transform duration-500 ease-out
                    group-hover:scale-110 rounded-xl hover:rounded-xl
                    "
                />
            </div>

            {/* Content */}
            <div className="pt-6">
                <h3 className="text-white text-xl font-semibold mb-3 font-serif">
                    {title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                    {description}
                </p>
            </div>

            <button className="mt-4 w-full cursor-pointer items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-amber-500 hover:bg-warning-light relative bg-linear-to-b from-orange-500 to-orange-600 border-orange-600 text-stone-50 rounded-lg hover:bg-linear-to-b hover:from-orange-600 hover:to-orange-600 hover:border-orange-600 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.35),inset_0_-2px_0px_rgba(0,0,0,0.18)] after:pointer-events-none transition antialiased">Read more</button>

            {/* Soft Glow (Optional but sexy) */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-(--primary)/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
        </div>
    );
};

export default Card;