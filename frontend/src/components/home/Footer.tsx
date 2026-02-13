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
                            <Image src="/nanyawhitelogo.png" alt="Wefab" width={160} height={40} />

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
                                <li><Link href="/vertical" className="hover:text-white">Vertical Machining Centers</Link></li>
                                <li><Link href="/horizontal" className="hover:text-white">Horizontal Machining Centers</Link></li>
                                <li><Link href="/5-axis" className="hover:text-white">5-Axis Solutions</Link></li>
                                <li><Link href="/turning" className="hover:text-white">Turning Lathes</Link></li>
                                <li><Link href="/surface-grinder" className="hover:text-white">Surface Grinders</Link></li>
                            </ul>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-semibold mb-5 text-lg text-white">
                                Company
                            </h4>
                            <ul className="space-y-3 text-gray-300 text-sm">
                                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                                <li><Link href="#" className="hover:text-white">Careers</Link></li>
                                <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                                <li><Link href="#" className="hover:text-white">Terms & Conditions</Link></li>
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
                                        <span>+886-4-26699-0550</span>
                                        <span>+886-928-021-628</span>
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
                                    <MapPin size={16} className="text-(--primary)" />
                                    <span>
                                        5F-1, No.118, Dadun 20th Street, Xitun District,
                                        Taichung City, 407
                                    </span>
                                </li>
                            </ul>
                        </div>

                    </div>

                    {/* Bottom Bar */}
                    <div className="mt-12 pt-6 border-t border-white/20 flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm">
                        <span>© {new Date().getFullYear()} Wefab. All rights reserved.</span>
                        <span>Built for Precision Manufacturing</span>
                    </div>

                </div>
            </div>

        </footer>
    );
};

export default Footer;
