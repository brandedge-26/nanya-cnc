import type { Metadata } from "next";
import BlogsClient from "./BlogsClient";

export const metadata: Metadata = {
    title: "Blogs | NANYA CNC",
    description:
        "Read CNC insights, manufacturing updates, and precision engineering knowledge from NANYA CNC.",
};

const BlogPage = () => {
    return <BlogsClient />;
};

export default BlogPage;
