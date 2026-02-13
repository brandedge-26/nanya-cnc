import ProductDetailClient from "./ProductDetailClient";


const ProductDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {

    const { slug } = await params;

    return <ProductDetailClient slug={slug} />;
};

export default ProductDetailPage;
