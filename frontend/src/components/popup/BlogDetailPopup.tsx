import { X } from "lucide-react";
import { Blog } from "@/store/blogStore";


interface Props {
    blog: Blog;
    onClose: () => void;
}


const BlogDetailPopup = ({ blog, onClose }: Props) => {

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "-";
        return new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="relative w-[90vw] max-w-4xl max-h-[85vh] overflow-y-auto p-8 text-white">

            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-all cursor-pointer"
                title="Close"
            >
                <X size={20} className="text-gray-400" />
            </button>

            {/* Title */}
            <h1 className="text-3xl font-bold pr-10">{blog.title}</h1>

            {/* Meta */}
            <div className="flex items-center gap-3 mt-3">
                <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-gray-300">
                    {blog.category}
                </span>
                <span className="text-xs text-white/40">
                    {formatDate(blog.createdAt)}
                </span>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/10 my-6" />

            {/* Content */}
            <div
                className="tiptap-content"
                dangerouslySetInnerHTML={{ __html: blog.content }}
            />
        </div>
    );
};

export default BlogDetailPopup;
