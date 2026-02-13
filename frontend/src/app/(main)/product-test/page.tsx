import ProductTestClient from "./ProductTestClient";


const ProductTestPage = () => {
    return (
        <>
            {/* Banner */}
            <div className="px-5 text-center mt-20 max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight">
                    Our <span className="text-orange-500">CNC Machines</span>
                </h1>
                <p className="mt-6 text-gray-400 text-lg leading-relaxed">
                    Explore our complete range of precision CNC machines — from vertical machining centers to horizontal machines, lathes, and industrial solutions.
                </p>
            </div>

            <div className="px-5">
                <ProductTestClient />
            </div>
        </>
    );
};

export default ProductTestPage;