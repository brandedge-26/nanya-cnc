import type { Metadata } from "next";
import BlogsClient from "./BlogsClient";

export const metadata: Metadata = {
    title: "Blogs",
    description:
        "Read CNC insights, manufacturing updates, and precision engineering knowledge from NANYA CNC.",
    alternates: {
        canonical: "/blogs",
    },
    openGraph: {
        title: "Blogs | NANYA CNC",
        description:
            "Read CNC insights, manufacturing updates, and precision engineering knowledge from NANYA CNC.",
        url: "/blogs",
        type: "website",
    },
};

const BlogPage = () => {
    return <BlogsClient />;
};

export default BlogPage;
