"use client";

import { Blog, useBlogStore } from "@/store/blogStore";
import { Loader, Trash2, Search, Eye, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/context/ModalContext";
import DeleteConfirmPopup from "../popup/DeleteConfirmPopup";
import BlogDetailPopup from "../popup/BlogDetailPopup";


const BlogsTable = () => {

    const { isLoading, getAllBlogs, blogs, deleteBlog } = useBlogStore();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const router = useRouter();


    useEffect(() => {
        getAllBlogs();
    }, [getAllBlogs]);


    // filter logic
    const filteredBlogs = blogs.filter((blog: Blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchTerm.toLowerCase())
    );


    // modal state
    const { openModal, closeModal } = useModal();


    // format date
    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "-";
        return new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };


    // confirm delete popup
    const handleBlogDelete = (blog: Blog) => {
        openModal(<DeleteConfirmPopup
            title={blog.title}
            onClose={closeModal}
            onDelete={() => deleteBlog(blog._id as string)}
        />)
    };


    // view blog detail popup
    const handleViewBlog = (blog: Blog) => {
        openModal(
            <BlogDetailPopup blog={blog} onClose={closeModal} />
        );
    };


    return (
        <>
            <h1 className="mb-3 font-normal tracking-tighter text-[20px]">All Blogs</h1>


            {/* Search bar */}
            <div className="flex flex-col md:flex-row my-5 gap-3 items-center">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search by title or category..."
                        className="w-full bg-black/20 border border-gray-700 outline-none pl-10 pr-4 py-2 rounded-lg focus:ring-1 focus:ring-orange-500 transition text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>


            {/* Table */}
            <div className="w-full overflow-x-auto rounded-xl border border-white/10 bg-black/20 backdrop-blur-md flex flex-col">
                {isLoading ? (
                    <div className="flex-1 flex items-center justify-center p-10">
                        <Loader className="animate-spin text-orange-500" size={32} />
                    </div>
                ) : filteredBlogs.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-10 text-white/50">
                        <p className="text-lg">No blogs found</p>
                    </div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-white/5 text-white/70 uppercase text-[11px] tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-semibold">#ID</th>
                                <th className="px-6 py-4 font-semibold">Title</th>
                                <th className="px-6 py-4 font-semibold">Category</th>
                                <th className="px-6 py-4 font-semibold">Created At</th>
                                <th className="px-6 py-4 font-semibold text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-white/5 text-white/90">
                            {filteredBlogs.map((blog: Blog, index: number) => (
                                <tr key={blog._id || index} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 text-white/50 font-mono text-sm">
                                        {String(index + 1).padStart(2, '0')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-medium">{blog.title}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/70">
                                            {blog.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-white/50 text-sm">
                                        {formatDate(blog.createdAt)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">

                                            {/* View Button */}
                                            <button
                                                className="p-2 hover:bg-blue-500/20 rounded-full text-blue-400 transition-all cursor-pointer"
                                                title="View Blog"
                                                onClick={() => handleViewBlog(blog)}
                                            >
                                                <Eye size={18} />
                                            </button>

                                            {/* Edit Button */}
                                            <button
                                                className="p-2 hover:bg-orange-500/20 rounded-full text-orange-400 transition-all cursor-pointer"
                                                title="Edit Blog"
                                                onClick={() => router.push(`/dashboard/add-blog?edit=${blog._id}`)}
                                            >
                                                <Pencil size={18} />
                                            </button>

                                            {/* Delete Button */}
                                            <button
                                                className="p-2 hover:bg-red-500/20 rounded-full text-red-400 transition-all cursor-pointer"
                                                title="Delete Blog"
                                                onClick={() => handleBlogDelete(blog)}
                                            >
                                                <Trash2 size={18} />
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default BlogsTable;
