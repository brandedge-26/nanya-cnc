"use client";

import { useParams } from "next/navigation";
import { industryProducts } from "@/data/nidustry-products";
import Image from "next/image";

const IndustryProducts = () => {

    const { name } = useParams();

    const industryName = decodeURIComponent(name as string).toLowerCase();

    const filteredProducts = industryProducts.filter(
        (product) => product.industry.toLowerCase() === industryName.toLowerCase()
    );

    return (
        <div className="grid md:grid-cols-3 gap-6 mt-10">
            {filteredProducts.map((product) => (
                <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                    <Image src={product.image} alt="Company" height={200} width={200}/>
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                </div>
            ))}
        </div>
    );
};

export default IndustryProducts;
