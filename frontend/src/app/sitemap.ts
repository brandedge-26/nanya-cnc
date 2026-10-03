import type { MetadataRoute } from "next";
import { API_BASE_URL, SITE_URL } from "@/lib/seo";
import { industries } from "@/data/nidustry-products";

type SitemapEntry = MetadataRoute.Sitemap[number];

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: SitemapEntry["changeFrequency"] }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/products", priority: 0.9, changeFrequency: "weekly" },
    { path: "/equipments", priority: 0.7, changeFrequency: "monthly" },
    { path: "/industry", priority: 0.7, changeFrequency: "monthly" },
    { path: "/blogs", priority: 0.8, changeFrequency: "daily" },
    { path: "/finance", priority: 0.6, changeFrequency: "monthly" },
    { path: "/get-quote", priority: 0.6, changeFrequency: "monthly" },
    { path: "/get-consultations", priority: 0.6, changeFrequency: "monthly" },
    { path: "/how-dealer-portal-works", priority: 0.5, changeFrequency: "monthly" },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

interface ProductListItem {
    slug: string;
    updatedAt?: string;
}

interface BlogListItem {
    _id: string;
    updatedAt?: string;
    createdAt?: string;
}

const fetchProducts = async (): Promise<ProductListItem[]> => {
    try {
        const res = await fetch(`${API_BASE_URL}/products/all`, { cache: "no-store" });
        if (!res.ok) return [];
        const json = await res.json();
        return json?.success ? json.data : [];
    } catch {
        return [];
    }
};

const fetchBlogs = async (): Promise<BlogListItem[]> => {
    try {
        const res = await fetch(`${API_BASE_URL}/blogs/all`, { cache: "no-store" });
        if (!res.ok) return [];
        const json = await res.json();
        return json?.success ? json.data : [];
    } catch {
        return [];
    }
};

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
    const [products, blogs] = await Promise.all([fetchProducts(), fetchBlogs()]);

    const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
        url: `${SITE_URL}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }));

    const industryEntries: MetadataRoute.Sitemap = industries.map((industry) => ({
        url: `${SITE_URL}/industry/${industry.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
    }));

    const productEntries: MetadataRoute.Sitemap = products
        .filter((product) => product.slug)
        .map((product) => ({
            url: `${SITE_URL}/products/${product.slug}`,
            lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        }));

    const blogEntries: MetadataRoute.Sitemap = blogs
        .filter((blog) => blog._id)
        .map((blog) => ({
            url: `${SITE_URL}/blogs/${blog._id}`,
            lastModified: blog.updatedAt
                ? new Date(blog.updatedAt)
                : blog.createdAt
                    ? new Date(blog.createdAt)
                    : new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        }));

    return [...staticEntries, ...industryEntries, ...productEntries, ...blogEntries];
};

export default sitemap;
