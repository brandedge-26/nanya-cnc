"use client";

import { useBlogStore } from "@/store/blogStore";
import { useEffect, useMemo, useState } from "react";
import BlogCard, { blogCategories } from "@/components/blogs/BlogCard";

const BlogsClient = () => {
    const { getAllBlogs, blogs, isLoading } = useBlogStore();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        getAllBlogs();
    }, [getAllBlogs]);

    const latestBlogs = useMemo(() => {
        return blogs.slice(0, 6);
    }, [blogs]);

    const filteredBlogs = useMemo(() => {
        if (!selectedCategory) return null;
        return blogs.filter((blog) => blog.category === selectedCategory);
    }, [blogs, selectedCategory]);

    const selectedCategoryLabel = blogCategories.find((c) => c.value === selectedCategory)?.label;
    const displayedBlogs = selectedCategory ? (filteredBlogs || []) : latestBlogs;

    return (
        <main className="bg-black text-white min-h-screen">
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[60px_60px]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 bg-[radial-gradient(circle,rgba(255,140,0,0.2),transparent_70%)] blur-3xl"></div>

                <div className="relative max-w-4xl mx-auto text-center px-5">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif">Our <span className="text-orange-500">Blogs</span></h1>
                    <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
                        Insights, updates, and expert knowledge from the world of CNC manufacturing and precision engineering.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-5 pb-20 flex flex-col lg:flex-row gap-8">
                <aside className="w-full lg:w-72 shrink-0">
                    <div className="lg:sticky lg:top-6">
                        <h2 className="text-lg font-bold mb-4">Categories</h2>

                        <ul className="space-y-1">
                            <li>
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-200 cursor-pointer ${!selectedCategory
                                        ? "bg-orange-500/10 text-orange-400 border-l-3 border-orange-500"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                        }`}
                                >
                                    All Blogs
                                </button>
                            </li>

                            {blogCategories.filter((c) => c.value).map((cat) => (
                                <li key={cat.value}>
                                    <button
                                        onClick={() => setSelectedCategory(selectedCategory === cat.value ? null : cat.value)}
                                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-200 cursor-pointer ${selectedCategory === cat.value
                                            ? "bg-orange-500/10 text-orange-400 border-l-3 border-orange-500"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                            }`}
                                    >
                                        {cat.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                <section className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">
                            {selectedCategory ? selectedCategoryLabel : "Latest Blogs"}
                        </h2>
                        {selectedCategory && (
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className="text-sm text-gray-400 hover:text-white transition cursor-pointer"
                            >
                                Clear Filter
                            </button>
                        )}
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="border border-gray-800 rounded-xl overflow-hidden animate-pulse">
                                    <div className="h-48 bg-gray-800"></div>
                                    <div className="p-5 space-y-3">
                                        <div className="h-4 bg-gray-800 rounded w-24"></div>
                                        <div className="h-5 bg-gray-800 rounded w-full"></div>
                                        <div className="h-4 bg-gray-800 rounded w-32"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : displayedBlogs.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {displayedBlogs.map((blog) => (
                                <BlogCard key={blog._id} blog={blog} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 border border-gray-800 rounded-xl">
                            <p className="text-gray-500 text-lg">
                                {selectedCategory ? "No blogs found in this category yet." : "No blogs published yet."}
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
};

export default BlogsClient;
