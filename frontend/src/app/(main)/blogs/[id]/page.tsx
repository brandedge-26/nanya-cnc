import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetail from "@/components/blogs/BlogDetail";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, breadcrumbJsonLd, toPlainDescription } from "@/lib/seo";
import { blogCategories } from "@/components/blogs/BlogCard";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

interface BlogData {
    _id: string;
    title: string;
    category: string;
    content: string;
    image?: string;
    createdAt?: string;
    updatedAt?: string;
}

// get blog
async function getBlog(id: string): Promise<BlogData | null> {
    try {
        const res = await fetch(`${API_BASE_URL}/blogs/${id}`, { cache: "no-store" });
        const json = await res.json();
        if (json.success) return json.data;
        return null;
    } catch {
        return null;
    }
}


export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {

    const { id } = await params;
    const blog = await getBlog(id);

    if (!blog) {
        return {
            title: "Blog Not Found",
            description: "The blog post you are looking for does not exist.",
            robots: { index: false, follow: true },
        };
    }

    const description = toPlainDescription(blog.content, 160);
    const categoryLabel = blogCategories.find((c) => c.value === blog.category)?.label || blog.category;
    const canonicalPath = `/blogs/${blog._id}`;

    return {
        title: blog.title,
        description,
        keywords: [
            blog.title,
            categoryLabel,
            "NANYA CNC",
            "Nanya CNC",
            "NYE CNC",
            "CNC manufacturing",
            "CNC machining",
            "CNC machinery",
        ],
        alternates: {
            canonical: canonicalPath,
        },
        robots: {
            index: true,
            follow: true,
        },
        openGraph: {
            title: blog.title,
            description,
            url: canonicalPath,
            siteName: "NANYA CNC",
            type: "article",
            publishedTime: blog.createdAt,
            modifiedTime: blog.updatedAt || blog.createdAt,
            section: categoryLabel,
            tags: [categoryLabel],
            ...(blog.image && {
                images: [{ url: blog.image, width: 1200, height: 630, alt: blog.title }],
            }),
        },
        twitter: {
            card: "summary_large_image",
            title: blog.title,
            description,
            ...(blog.image && { images: [blog.image] }),
        },
    };
}


export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;
    const blog = await getBlog(id);

    if (!blog) {
        notFound();
    }

    const categoryLabel = blogCategories.find((c) => c.value === blog.category)?.label || blog.category;
    const plainText = toPlainDescription(blog.content, 300);

    const blogPostingJsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": absoluteUrl(`/blogs/${blog._id}`),
        },
        headline: blog.title,
        description: plainText,
        articleSection: categoryLabel,
        datePublished: blog.createdAt,
        dateModified: blog.updatedAt || blog.createdAt,
        ...(blog.image && { image: [blog.image] }),
        author: {
            "@type": "Organization",
            name: "NANYA CNC",
            url: absoluteUrl("/"),
        },
        publisher: {
            "@type": "Organization",
            name: "NANYA CNC",
            logo: {
                "@type": "ImageObject",
                url: absoluteUrl("/logo-primary.png"),
            },
        },
    };

    return (
        <>
            <JsonLd
                data={[
                    blogPostingJsonLd,
                    breadcrumbJsonLd([
                        { name: "Home", path: "/" },
                        { name: "Blogs", path: "/blogs" },
                        { name: blog.title, path: `/blogs/${blog._id}` },
                    ]),
                ]}
            />
            <BlogDetail id={id} />
        </>
    );
}
