"use client";

import { Blog, useBlogStore } from "@/store/blogStore";
import { Trash2, Search, Eye, Pencil, FileText, X, Star, Globe, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/context/ModalContext";
import DeleteConfirmPopup from "../popup/DeleteConfirmPopup";
import BlogDetailPopup from "../popup/BlogDetailPopup";


const BlogsTable = () => {

    const { isLoading, getAllBlogs, blogs, deleteBlog, togglePublish, toggleFeatured } = useBlogStore();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const router = useRouter();
    const { openModal, closeModal } = useModal();

    useEffect(() => {
        getAllBlogs();
    }, [getAllBlogs]);

    const filteredBlogs = blogs.filter((blog: Blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "-";
        return new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric", month: "short", day: "numeric",
        });
    };

    const handleBlogDelete = (blog: Blog) => {
        openModal(
            <DeleteConfirmPopup
                title={blog.title}
                onClose={closeModal}
                onDelete={() => deleteBlog(blog._id as string)}
            />
        );
    };

    return (
        <div className="space-y-5">

            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(168,85,247,0.12)", color: "#a855f7" }}>
                        <FileText size={18} strokeWidth={2} />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white">All Blogs</h1>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                            {isLoading ? "Loading..." : `${blogs.length} articles · ${blogs.filter(b => b.featuredOnHome).length} featured`}
                        </p>
                    </div>
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={15}
                        style={{ color: "rgba(255,255,255,0.3)" }} />
                    <input
                        type="text"
                        placeholder="Search title or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-8 py-2.5 rounded-xl text-sm text-white outline-none transition"
                        style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.1)" }}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(168,85,247,0.5)")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                    {searchTerm && (
                        <button onClick={() => setSearchTerm("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                            style={{ color: "rgba(255,255,255,0.3)" }}>
                            <X size={13} />
                        </button>
                    )}
                </div>
            </div>

            {/* Table card */}
            <div className="rounded-2xl overflow-hidden"
                style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>

                {isLoading ? (
                    <div className="flex items-center justify-center py-20 gap-3">
                        <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Loading blogs…</span>
                    </div>
                ) : filteredBlogs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-3">
                        <FileText size={36} style={{ color: "rgba(255,255,255,0.12)" }} />
                        <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>
                            {searchTerm ? "No blogs match your search" : "No blogs yet. Create your first post!"}
                        </p>
                        {searchTerm && (
                            <button onClick={() => setSearchTerm("")}
                                className="text-xs text-purple-400 hover:text-purple-300 transition cursor-pointer">
                                Clear search
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                                    {["#", "Blog Post", "Category", "Status", "Featured", "Date", "Actions"].map((h) => (
                                        <th key={h} className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap"
                                            style={{ color: "rgba(255,255,255,0.35)" }}>
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBlogs.map((blog: Blog, index: number) => {
                                    const isPublished = blog.published !== false; // default true if undefined
                                    const isFeatured  = !!blog.featuredOnHome;

                                    return (
                                        <tr key={blog._id || index}
                                            style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                                            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                                            onMouseLeave={(e) => (e.currentTarget.style.background = "")}>

                                            {/* # */}
                                            <td className="px-5 py-4 text-xs font-mono"
                                                style={{ color: "rgba(255,255,255,0.25)" }}>
                                                {String(index + 1).padStart(2, "0")}
                                            </td>

                                            {/* Title */}
                                            <td className="px-5 py-4 max-w-[220px]">
                                                <p className="text-sm font-semibold text-white truncate">{blog.title}</p>
                                            </td>

                                            {/* Category */}
                                            <td className="px-5 py-4">
                                                <span className="text-[10px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap"
                                                    style={{ background: "rgba(168,85,247,0.1)", color: "#a855f7", border: "1px solid rgba(168,85,247,0.2)" }}>
                                                    {blog.category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).slice(0, 28)}
                                                </span>
                                            </td>

                                            {/* Publish toggle */}
                                            <td className="px-5 py-4">
                                                <button
                                                    title={isPublished ? "Click to Unpublish" : "Click to Publish"}
                                                    onClick={() => togglePublish(blog._id as string, !isPublished)}
                                                    className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1.5 rounded-full transition-all cursor-pointer"
                                                    style={isPublished
                                                        ? { background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" }
                                                        : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)" }
                                                    }
                                                    onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.7"; }}
                                                    onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                                                >
                                                    {isPublished
                                                        ? <><Globe size={10} strokeWidth={2.5} /> Published</>
                                                        : <><EyeOff size={10} strokeWidth={2.5} /> Draft</>
                                                    }
                                                </button>
                                            </td>

                                            {/* Featured toggle */}
                                            <td className="px-5 py-4">
                                                <button
                                                    title={isFeatured ? "Remove from Homepage" : "Feature on Homepage"}
                                                    onClick={() => toggleFeatured(blog._id as string, !isFeatured)}
                                                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                                                    style={isFeatured
                                                        ? { background: "rgba(249,133,19,0.15)", color: "#f98513" }
                                                        : { color: "rgba(255,255,255,0.2)" }
                                                    }
                                                    onMouseEnter={(e) => {
                                                        if (!isFeatured) {
                                                            e.currentTarget.style.background = "rgba(249,133,19,0.08)";
                                                            e.currentTarget.style.color = "#f98513";
                                                        }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (!isFeatured) {
                                                            e.currentTarget.style.background = "";
                                                            e.currentTarget.style.color = "rgba(255,255,255,0.2)";
                                                        }
                                                    }}
                                                >
                                                    <Star size={15} strokeWidth={isFeatured ? 2.5 : 2}
                                                        fill={isFeatured ? "#f98513" : "none"} />
                                                </button>
                                            </td>

                                            {/* Date */}
                                            <td className="px-5 py-4 text-xs whitespace-nowrap"
                                                style={{ color: "rgba(255,255,255,0.35)" }}>
                                                {formatDate(blog.createdAt)}
                                            </td>

                                            {/* Actions */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-1">
                                                    <button title="Preview"
                                                        onClick={() => openModal(<BlogDetailPopup blog={blog} onClose={closeModal} />)}
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                                                        style={{ color: "#3b82f6" }}
                                                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(59,130,246,0.12)"; }}
                                                        onMouseLeave={(e) => { e.currentTarget.style.background = ""; }}>
                                                        <Eye size={15} strokeWidth={2} />
                                                    </button>
                                                    <button title="Edit"
                                                        onClick={() => router.push(`/dashboard/add-blog?edit=${blog._id}`)}
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                                                        style={{ color: "#f98513" }}
                                                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(249,133,19,0.12)"; }}
                                                        onMouseLeave={(e) => { e.currentTarget.style.background = ""; }}>
                                                        <Pencil size={15} strokeWidth={2} />
                                                    </button>
                                                    <button title="Delete"
                                                        onClick={() => handleBlogDelete(blog)}
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                                                        style={{ color: "#ef4444" }}
                                                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.12)"; }}
                                                        onMouseLeave={(e) => { e.currentTarget.style.background = ""; }}>
                                                        <Trash2 size={15} strokeWidth={2} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Footer */}
            {!isLoading && filteredBlogs.length > 0 && (
                <p className="text-xs text-right" style={{ color: "rgba(255,255,255,0.25)" }}>
                    Showing {filteredBlogs.length} of {blogs.length} blogs
                </p>
            )}
        </div>
    );
};

export default BlogsTable;
