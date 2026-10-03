import ProductDetailClient from "./ProductDetailClient";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

type ProductImage = {
    url: string;
    altText?: string;
    isPrimary?: boolean;
};

type ProductData = {
    modelName?: string;
    tagline?: string;
    description?: string;
    category?: string;
    subCategory?: string;
    images?: ProductImage[];
};

type ProductResponse = {
    success: boolean;
    data?: ProductData;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

const getProductForMetadata = async (slug: string): Promise<ProductData | null> => {
    try {
        const res = await fetch(`${API_BASE_URL}/products/${slug}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            return null;
        }

        const payload = (await res.json()) as ProductResponse;
        return payload?.data || null;
    } catch {
        return null;
    }
};

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
    const { slug } = await params;
    const product = await getProductForMetadata(slug);

    if (!product) {
        return {
            title: "Product Not Found",
            robots: { index: false, follow: true },
        };
    }

    const title = product.modelName || "Product Details";

    const rawDescription =
        product.tagline ||
        product.description ||
        "Explore detailed specifications, features, and accessories for this CNC product from NANYA CNC.";

    const description =
        rawDescription.length > 160 ? `${rawDescription.slice(0, 157)}...` : rawDescription;

    const canonicalPath = `/products/${slug}`;
    const primaryImage = product.images?.find((img) => img.isPrimary) || product.images?.[0];

    return {
        title,
        description,
        keywords: [title, product.category, product.subCategory, "CNC machine", "NANYA CNC"].filter(
            (v): v is string => Boolean(v)
        ),
        alternates: {
            canonical: canonicalPath,
        },
        openGraph: {
            title,
            description,
            url: canonicalPath,
            siteName: "NANYA CNC",
            type: "website",
            ...(primaryImage && {
                images: [{ url: primaryImage.url, width: 1200, height: 900, alt: primaryImage.altText || title }],
            }),
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            ...(primaryImage && { images: [primaryImage.url] }),
        },
    };
};


const ProductDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {

    const { slug } = await params;
    const product = await getProductForMetadata(slug);

    if (!product) {
        notFound();
    }

    const primaryImage = product.images?.find((img) => img.isPrimary) || product.images?.[0];

    const productJsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.modelName,
        description: product.description || product.tagline,
        category: product.category,
        brand: {
            "@type": "Brand",
            name: "NANYA CNC",
        },
        ...(primaryImage && { image: product.images?.map((img) => img.url) }),
        url: absoluteUrl(`/products/${slug}`),
    };

    return (
        <>
            <JsonLd
                data={[
                    productJsonLd,
                    breadcrumbJsonLd([
                        { name: "Home", path: "/" },
                        { name: "Products", path: "/products" },
                        { name: product.modelName || "Product", path: `/products/${slug}` },
                    ]),
                ]}
            />
            <ProductDetailClient slug={slug} />
        </>
    );
};

export default ProductDetailPage;
