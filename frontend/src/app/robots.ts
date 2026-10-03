import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const robots = (): MetadataRoute.Robots => {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/admin-login",
                    "/auth-success",
                    "/dashboard",
                    "/dashboard/",
                    "/ad",
                    "/ad/",
                    "/dealer-portal",
                    "/dealer-portal/",
                    "/dealer-order",
                    "/dealer-order/",
                    "/dealer-request",
                    "/dealer-request/",
                ],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    };
};

export default robots;
