"use client";

import { useBlogStore, Blog } from "@/store/blogStore";
import { blogCategories } from "@/components/blogs/BlogCard";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowLeft, Tag } from "lucide-react";


const BlogDetail = ({ id }: { id: string }) => {

    const { getBlogById, isLoading } = useBlogStore();
    const [blog, setBlog] = useState<Blog | null>(null);

    useEffect(() => {
        const loadBlog = async () => {
            const data = await getBlogById(id);
            if (data) setBlog(data);
        };

        loadBlog();
    }, [id, getBlogById]);

    const categoryLabel = blogCategories.find((c) => c.value === blog?.category)?.label || blog?.category;


    // Loading State
    if (isLoading || !blog) {
        return (
            <main className="bg-black text-white min-h-screen">
                <div className="max-w-4xl mx-auto px-5 py-20">
                    <div className="animate-pulse space-y-6">
                        <div className="h-6 bg-gray-800 rounded w-32"></div>
                        <div className="h-72 bg-gray-800 rounded-xl"></div>
                        <div className="h-4 bg-gray-800 rounded w-40"></div>
                        <div className="h-10 bg-gray-800 rounded w-3/4"></div>
                        <div className="space-y-3 mt-8">
                            <div className="h-4 bg-gray-800 rounded w-full"></div>
                            <div className="h-4 bg-gray-800 rounded w-full"></div>
                            <div className="h-4 bg-gray-800 rounded w-5/6"></div>
                            <div className="h-4 bg-gray-800 rounded w-full"></div>
                            <div className="h-4 bg-gray-800 rounded w-2/3"></div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }


    return (
        <main className="bg-black text-white min-h-screen">

            <div className="max-w-4xl mx-auto px-5 py-12">

                {/* Back Button */}
                <Link
                    href="/blogs"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition mb-8"
                >
                    <ArrowLeft size={18} />
                    <span>Back to Blogs</span>
                </Link>


                {/* Blog Image */}
                {blog.image ? (
                    <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden mb-8 border border-gray-800">
                        <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                ) : (
                    <div className="w-full h-72 md:h-96 rounded-xl bg-gray-900 flex items-center justify-center mb-8">
                        <Tag size={60} className="text-gray-700" />
                    </div>
                )}


                {/* Category & Date */}
                <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="inline-block text-sm px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                        {categoryLabel}
                    </span>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar size={14} />
                        <span>
                            {new Date(blog.createdAt || "").toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </span>
                    </div>
                </div>


                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-8">
                    {blog.title}
                </h1>


                {/* Divider */}
                <div className="h-px bg-gray-800 mb-8"></div>


                {/* Blog Content */}
                <div
                    className="tiptap-content text-gray-300"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />


                {/* Bottom Divider */}
                <div className="h-px bg-gray-800 mt-12 mb-8"></div>


                {/* Back to Blogs */}
                <Link
                    href="/blogs"
                    className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition"
                >
                    <ArrowLeft size={18} />
                    <span>Back to all blogs</span>
                </Link>

            </div>
        </main>
    );
};

export default BlogDetail;
