"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useBlogStore } from "@/store/blogStore";
import BlogCard from "@/components/blogs/BlogCard";

const BlogsSection = () => {
    const { blogs, isLoading, getAllBlogs } = useBlogStore();

    useEffect(() => {
        getAllBlogs();
    }, [getAllBlogs]);

    const latestBlogs = blogs.slice(0, 3);

    if (!isLoading && latestBlogs.length === 0) return null;

    return (
        <section className="py-24 bg-black">
            <div className="max-w-6xl mx-auto px-6">

                {/* Heading */}
                <div className="text-center mb-12">
                    <p className="text-xs uppercase tracking-widest text-orange-500 mb-3 font-medium">Knowledge Hub</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-white font-serif">
                        Latest Insights & <span className="text-orange-500">Industry Trends</span>
                    </h2>
                    <p className="mt-4 text-gray-400 max-w-xl mx-auto text-sm">
                        Stay updated with the latest in CNC technology, automation, and smart manufacturing.
                    </p>
                </div>

                {isLoading && (
                    <div className="flex justify-center py-10">
                        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}

                {!isLoading && latestBlogs.length > 0 && (
                    <>
                        <div className="grid md:grid-cols-3 gap-6">
                            {latestBlogs.map((blog) => (
                                <BlogCard key={blog._id} blog={blog} />
                            ))}
                        </div>

                        <div className="text-center mt-10">
                            <Link
                                href="/blogs"
                                className="inline-block px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition text-sm font-medium"
                            >
                                View All Articles
                            </Link>
                        </div>
                    </>
                )}

            </div>
        </section>
    );
};

export default BlogsSection;
