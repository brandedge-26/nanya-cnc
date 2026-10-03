// Central SEO constants — keep in sync with metadataBase in app/(main)/layout.tsx
export const SITE_URL = "https://www.nye-cnc.com";
export const SITE_NAME = "NANYA CNC";
export const DEFAULT_OG_IMAGE = "/logo-primary.png";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

// Builds an absolute URL for the live site from a path like "/blogs/123"
export const absoluteUrl = (path: string) => {
    if (/^https?:\/\//i.test(path)) return path;
    return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

// Strips HTML tags + collapses whitespace, then trims to a meta-description-safe length
export const toPlainDescription = (html: string, maxLength = 160) => {
    const plain = html
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, " ")
        .trim();

    if (plain.length <= maxLength) return plain;
    return `${plain.slice(0, maxLength - 1).trimEnd()}…`;
};

// Brand-name variants people search for — helps Google tie all of these
// queries back to this one business entity (brand disambiguation).
export const BRAND_ALTERNATE_NAMES = [
    "Nanya CNC",
    "NANYACNC",
    "Nanya",
    "Nanya Enterprise",
    "NYE CNC",
    "NYECNC",
    "NYE",
];

export const organizationJsonLd = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: BRAND_ALTERNATE_NAMES,
    url: SITE_URL,
    logo: absoluteUrl(DEFAULT_OG_IMAGE),
    sameAs: [] as string[],
});

export const websiteJsonLd = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
});

export interface BreadcrumbItem {
    name: string;
    path: string;
}

export const breadcrumbJsonLd = (items: BreadcrumbItem[]) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: absoluteUrl(item.path),
    })),
});
