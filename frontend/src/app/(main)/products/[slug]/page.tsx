import ProductDetailClient from "./ProductDetailClient";
import type { Metadata } from "next";

type ProductResponse = {
    success: boolean;
    data?: {
        modelName?: string;
        tagline?: string;
        description?: string;
    };
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.nanyacnc.com/api";

const getProductForMetadata = async (slug: string) => {
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

    const title = product?.modelName
        ? `${product.modelName} | NANYA CNC`
        : "Product Details | NANYA CNC";

    const rawDescription =
        product?.tagline ||
        product?.description ||
        "Explore detailed specifications, features, and accessories for this CNC product from NANYA CNC.";

    const description =
        rawDescription.length > 160 ? `${rawDescription.slice(0, 157)}...` : rawDescription;

    return {
        title,
        description,
    };
};


const ProductDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {

    const { slug } = await params;

    return <ProductDetailClient slug={slug} />;
};

export default ProductDetailPage;
