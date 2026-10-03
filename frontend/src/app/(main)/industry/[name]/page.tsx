import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IndustryDetailClient from "@/components/industry/IndustryDetailClient";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { getIndustryBySlug } from "@/data/nidustry-products";

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {

    const { name } = await params;
    const industry = getIndustryBySlug(name);

    if (!industry) {
        return {
            title: "Industry Not Found",
            robots: { index: false, follow: true },
        };
    }

    const title = `${industry.title} CNC Solutions`;
    const description = industry.description;

    return {
        title,
        description,
        alternates: {
            canonical: `/industry/${industry.slug}`,
        },
        openGraph: {
            title: `${title} | NANYA CNC`,
            description,
            url: `/industry/${industry.slug}`,
            type: "website",
            ...(industry.heroImage && {
                images: [{ url: industry.heroImage, width: 1200, height: 630, alt: industry.title }],
            }),
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | NANYA CNC`,
            description,
        },
    };
}


const IndustryDetail = async ({ params }: { params: Promise<{ name: string }> }) => {

    const { name } = await params;
    const industry = getIndustryBySlug(name);

    if (!industry) {
        notFound();
    }

    return (
        <>
            <JsonLd
                data={breadcrumbJsonLd([
                    { name: "Home", path: "/" },
                    { name: "Industries", path: "/industry" },
                    { name: industry.title, path: `/industry/${industry.slug}` },
                ])}
            />
            <IndustryDetailClient slug={name} />
        </>
    );
}

export default IndustryDetail;
