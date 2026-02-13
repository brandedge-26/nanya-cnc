import { Blog } from "@/store/blogStore";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const blogCategories = [
    { label: "Latest Blogs", value: "" },
    { label: "General Brand & Manufacturing Authority", value: "general-brand-manufacturing-authority" },
    { label: "3-Axis CNC Vertical Machine Center", value: "3-axis-cnc-vertical-machine-center" },
    { label: "CNC Horizontal Machine Center", value: "cnc-horizontal-machine-center" },
    { label: "CNC Vertical Lathe Machine", value: "cnc-vertical-lathe-machine" },
    { label: "CNC Slant Bed Lathe Machine", value: "cnc-slant-bed-lathe-machine" },
    { label: "Conversational Milling & Lathe Machines", value: "conversational-milling-lathe-machines" },
    { label: "Surface Grinder Machine", value: "surface-grinder-machine" },
    { label: "Clamping Vise & Tool Holders", value: "clamping-vise-tool-holders" },
    { label: "CNC Controller Spare Parts", value: "cnc-controller-spare-parts" },
    { label: "Robotics & Automation Solutions", value: "robotics-automation-solutions" },
    { label: "Injection Mold & Hydraulic Press Machines", value: "injection-mold-hydraulic-press-machines" },
];



const BlogCard = ({ blog }: { blog: Blog }) => {

    const categoryLabel = blogCategories.find((c) => c.value === blog.category)?.label || blog.category;

    return (
        <Link href={`/blogs/${blog._id}`} className="group block border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 transition-all duration-300 px-3 py-2">

            {/* Image */}
            <div className="relative h-48 bg-gray-900 overflow-hidden  rounded-xl">
                {blog.image ? (
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-700">
                        <Tag size={40} />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="py-5 px-2">
                <span className="inline-block text-xs px-3 py-1 rounded-full bg-white/10 text-gray-400 mb-3">
                    {categoryLabel}
                </span>
                <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors duration-200 line-clamp-2">
                    {blog.title}
                </h3>
                <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                    <Calendar size={14} />
                    <span>{new Date(blog.createdAt || "").toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                </div>
                <div className="flex items-center gap-1 mt-4 text-sm text-orange-400 duration-300">
                    <span>Read More</span>
                    <ArrowRight size={14} />
                </div>
            </div>

        </Link>
    );
};


export default BlogCard;