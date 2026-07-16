import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/home/Header";
import ConditionalFooter from "@/components/home/ConditionalFooter";
import UtilityBar from "@/components/home/UtilityBar";
import { Work_Sans } from 'next/font/google';
import Provider from "@/providers/Providers";


const workSans = Work_Sans({
    subsets: ['latin'],
    weight: ['400', '700'],
    display: 'swap',
});



export const metadata: Metadata = {
    metadataBase: new URL("https://www.nanyacnc.com"),
    title: {
        default: "NANYA CNC | Precision CNC Machines & Manufacturing Solutions",
        template: "%s | NANYA CNC",
    },
    description:
        "NANYA CNC delivers high-performance CNC machining centers, vertical mills, lathes, surface grinders, and 5-axis machines built for precision manufacturing. Trusted by industries worldwide for reliability and cutting-edge technology.",
    keywords: [
        "CNC machines",
        "CNC machining center",
        "vertical machining center",
        "CNC lathe",
        "5-axis CNC",
        "surface grinder",
        "precision manufacturing",
        "NANYA CNC",
        "industrial machines",
    ],
    openGraph: {
        type: "website",
        siteName: "NANYA CNC",
        title: "NANYA CNC | Precision CNC Machines & Manufacturing Solutions",
        description:
            "NANYA CNC delivers high-performance CNC machining centers, vertical mills, lathes, surface grinders, and 5-axis machines built for precision manufacturing. Trusted by industries worldwide.",
        images: [
            {
                url: "/logo-primary.png",
                width: 1200,
                height: 630,
                alt: "NANYA CNC - Precision Manufacturing Machines",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "NANYA CNC | Precision CNC Machines & Manufacturing Solutions",
        description:
            "NANYA CNC delivers high-performance CNC machining centers, vertical mills, lathes, and 5-axis machines for precision manufacturing.",
        images: ["/logo-primary.png"],
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/logo-primary.png",
    },
};


export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${workSans.className} antialiased tracking-tight`}
            >

                <Provider>
                    <UtilityBar />
                    <Header />
                    {children}
                </Provider>

                {/* <script src="//code.tidio.co/q0rbikpfrmby33jbvifhmfwmwzvqgys4.js" async></script> */}

                {/* Footer */}
                <ConditionalFooter />

                {/* Tawk.to Live Chat */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                            (function(){
                            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                            s1.async=true;
                            s1.src='https://embed.tawk.to/6a58a8dfeac8f31d48677857/1jtl57ad2';
                            s1.charset='UTF-8';
                            s1.setAttribute('crossorigin','*');
                            s0.parentNode.insertBefore(s1,s0);
                            })();
                        `,
                    }}
                />

            </body>
        </html>
    );
}
