import MachineTabs from "./MachinTabs";

const ProductPage = () => {
    return (<>


        {/* Banner */}
        <div className="px-5 text-center mt-20 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tighter  ">
                CNC <span className="text-orange-500">Machine <br /> Centers</span>
            </h1>

            <p className="mt-6 text-gray-400 text-lg leading-relaxed">
                Discover our comprehensive range of CNC machines designed for precision manufacturing at scale.
            </p>
        </div>


        <div className="px-5">
            <MachineTabs />
        </div>

    </>);
}

export default ProductPage;


