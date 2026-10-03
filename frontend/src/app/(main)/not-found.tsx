import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Page Not Found | NANYA CNC",
    description: "The page you are looking for does not exist or has been moved.",
    robots: {
        index: false,
        follow: true,
    },
};

const NotFound = () => {
    return (
        <main className="bg-black text-white min-h-screen flex items-center justify-center px-5">
            <div className="text-center max-w-lg">
                <p className="text-orange-500 font-bold text-sm tracking-widest uppercase mb-4">
                    404 Error
                </p>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    We couldn&apos;t find that page
                </h1>
                <p className="text-gray-400 mb-8">
                    The page you&apos;re looking for may have been moved, renamed, or no longer exists.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="px-6 py-3 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
                    >
                        Back to Home
                    </Link>
                    <Link
                        href="/products"
                        className="px-6 py-3 rounded-full border border-gray-700 text-gray-300 font-semibold hover:border-gray-500 hover:text-white transition"
                    >
                        Browse Products
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default NotFound;
