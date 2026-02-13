import { Metadata } from "next";
import BlogDetail from "@/components/blogs/BlogDetail";


const API_BASE_URL = "http://localhost:5510/api";


// get blog
async function getBlog(id: string) {
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
            title: "Blog Not Found | NANYA CNC",
            description: "The blog post you are looking for does not exist.",
        };
    }

    const plainText = blog.content.replace(/<[^>]*>/g, "");
    const description = plainText.slice(0, 160).trim();

    return {
        title: `${blog.title} | NANYA CNC`,
        description,
        openGraph: {
            title: blog.title,
            description,
            type: "article",
            ...(blog.image && { images: [{ url: blog.image }] }),
        },
    };
}


export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;

    return <BlogDetail id={id} />;
}
