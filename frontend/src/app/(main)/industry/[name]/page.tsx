import IndustrBanner from "@/components/industry/IndustrBanner";
import IndustryProducts from "@/components/industry/IndustryProductCard";

export const metadata = {
    title: "Trusted Industries | NANYA CNC – Engineering Excellence Since 2010",
    description:
        "Learn about NANYA CNC, a global manufacturer of high-precision CNC machines, driven by innovation, quality, and smart manufacturing solutions.",
};


const IndutryDetail = () => {

    return (<>
    
        <div className="px-5 mt-10">
            <IndustrBanner/>
            <IndustryProducts/>
        </div>

    </>);
}

export default IndutryDetail;