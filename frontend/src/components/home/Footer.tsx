"use client";

import {
    Facebook,
    Linkedin,
    Instagram,
    X,
    Phone,
    Mail,
    MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="w-full relative bg-black pt-24 pb-10 overflow-hidden">

            {/* Background Glow */}
            <div className="absolute inset-0 bg-linear-to-br from-(--primary)/80 via-transparent to-orange-500/10 blur-3xl opacity-30" />

            <div className="relative mx-auto px-6">

                {/* Glass Container */}
                <div
                    className="
                    rounded-3xl
                    bg-white/10 backdrop-blur-xl
                    border border-white/20
                    shadow-2xl
                    p-12
                "
                >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

                        {/* Logo + Social */}
                        <div className="space-y-6">
                            <Image src="/logo-primary.png" alt="Wefab" width={200} height={50} />

                            <p className="text-gray-300 text-sm leading-relaxed">
                                Precision CNC manufacturing solutions designed for
                                accuracy, reliability, and global performance.
                            </p>

                            <div className="flex items-center gap-4">
                                {[Facebook, X, Linkedin, Instagram].map((Icon, i) => (
                                    <div
                                        key={i}
                                        className="
                                        h-9 w-9 flex items-center justify-center
                                        rounded-full
                                        bg-white/10 border border-white/20
                                        text-gray-300
                                        hover:bg-(--primary) hover:text-black
                                        transition cursor-pointer
                                    "
                                    >
                                        <Icon size={16} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Range */}
                        <div>
                            <h4 className="font-semibold mb-5 text-lg text-white">
                                Product Range
                            </h4>
                            <ul className="space-y-3 text-gray-300 text-sm">
                                <li><Link href="/products?category=CNC+Vertical+Machine+Center" className="hover:text-white">Vertical Machine Center</Link></li>
                                <li><Link href="/products?category=CNC+Horizontal+Machine+Center" className="hover:text-white">Horizontal Machine Center</Link></li>
                                <li><Link href="/products?category=CNC+Slant-Bed+Lathe+Machine" className="hover:text-white">Slant-Bed Lathe</Link></li>
                                <li><Link href="/products?category=CNC+Vertical+Lathe+Machine" className="hover:text-white">Vertical Lathe</Link></li>
                                <li><Link href="/products?category=CNC+Double+Column+Machine+Center" className="hover:text-white">Double Column</Link></li>
                            </ul>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-semibold mb-5 text-lg text-white">
                                Company
                            </h4>
                            <ul className="space-y-3 text-gray-300 text-sm">
                                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                                <li><Link href="/industry" className="hover:text-white">Trusted Industries</Link></li>
                                <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
                                <li><Link href="/terms" className="hover:text-white">Terms & Conditions</Link></li>
                                <li><Link href="/products" className="hover:text-white">Our Products</Link></li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="font-semibold mb-5 text-lg text-white">
                                Contact Info
                            </h4>

                            <ul className="space-y-4 text-gray-300 text-sm">
                                <li className="flex gap-3">
                                    <Phone size={16} className="text-(--primary)" />
                                    <div className="flex flex-col">
                                        <span>+886-4-2699-0550</span>
                                        <span>+886-928-021-628</span>
                                        <span>+965-520-531</span>
                                    </div>
                                </li>

                                <li className="flex gap-3">
                                    <Mail size={16} className="text-(--primary)" />
                                    <div className="flex flex-col">
                                        <span>att0905@gmail.com</span>
                                        <span>adam@nanya-ent.com</span>
                                    </div>
                                </li>

                                <li className="flex gap-3">
                                    <MapPin size={40} className="text-(--primary)" />
                                    <span>
                                        No. 5F-1, No. 118, Dadun 20th Street, Xitun District,
                                        Taichung City, 407, Taiwan ROC
                                    </span>
                                </li>
                            </ul>
                        </div>

                    </div>

                    {/* Bottom Bar */}
                    <div className="mt-12 pt-6 border-t border-white/20 flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm">
                        <span>© {new Date().getFullYear()} <span className="text-orange-500">NANYA CNC</span>. All rights reserved.</span>
                        <span>Developed by <Link href="https://brandedgecreations.io/" target="_blank" className="font-bold text-orange-500">BrandEdge Creations</Link></span>
                        <span>Built for Precision Manufacturing</span>
                    </div>

                </div>
            </div>

            {/* Floating WhatsApp */}   
            <a
                href="https://wa.me/886928021628"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="fixed bottom-6 right-6 z-100 h-14 w-14 rounded-full bg-[#25D366] shadow-xl flex items-center justify-center hover:scale-105 transition-transform"
            >
                <svg viewBox="0 0 16 16" className="h-7 w-7 fill-white" aria-hidden="true">
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 8.004 0C3.58 0 .001 3.57 0 7.98a7.93 7.93 0 0 0 1.063 3.968L0 16l4.162-1.09a7.99 7.99 0 0 0 3.84.98h.003c4.423 0 8.003-3.57 8.004-7.98a7.9 7.9 0 0 0-2.408-5.584zM8.005 14.5h-.002a6.6 6.6 0 0 1-3.357-.92l-.24-.142-2.47.646.66-2.4-.156-.246a6.56 6.56 0 0 1-1.02-3.458c.002-3.64 2.96-6.6 6.595-6.6a6.56 6.56 0 0 1 4.68 1.945 6.55 6.55 0 0 1 1.93 4.666c-.002 3.64-2.96 6.6-6.595 6.6zm3.615-4.925c-.198-.099-1.172-.578-1.354-.644-.182-.066-.314-.099-.446.099-.132.198-.512.644-.628.776-.116.132-.231.149-.43.05-.198-.099-.836-.308-1.592-.981-.588-.524-.985-1.17-1.1-1.368-.116-.198-.012-.305.087-.403.089-.088.198-.231.297-.347.099-.116.132-.198.198-.33.066-.132.033-.248-.017-.347-.05-.099-.446-1.074-.611-1.47-.161-.387-.325-.335-.446-.341a8.2 8.2 0 0 0-.38-.007c-.132 0-.347.05-.529.248-.182.198-.694.677-.694 1.652s.71 1.917.81 2.05c.099.132 1.399 2.132 3.39 2.99.474.204.843.326 1.13.417.475.151.907.13 1.248.079.38-.057 1.172-.479 1.338-.941.165-.462.165-.858.116-.941-.05-.083-.182-.132-.38-.231z" />
                </svg>
            </a>

        </footer>
    );
};

export default Footer;
