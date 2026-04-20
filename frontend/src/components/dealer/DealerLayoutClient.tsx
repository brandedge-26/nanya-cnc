"use client";

import { usePathname } from "next/navigation";
import DealerShell from "./DealerShell";
import DealerPortalHeader from "./DealerPortalHeader";


export default function DealerLayoutClient({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Use dashboard shell only for dealer-portal pages
    if (pathname.startsWith("/dealer-portal")) {
        return <DealerShell>{children}</DealerShell>;
    }

    // All other dealer routes (dealer-request, dealer-order) use simple header
    return (
        <>
            <DealerPortalHeader />
            {children}
        </>
    );
}
