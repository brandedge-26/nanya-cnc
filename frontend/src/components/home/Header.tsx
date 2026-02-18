// "use client";

// import { useState } from "react";
// import { ChevronDown, Menu, X } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useModal } from "@/context/ModalContext";
// import { useAuthStore } from "@/store/authStore";
// import UserAvatar from "./UserAvatar";
// import AuthPopup from "../popup/AuthPopup";



// const productMegaMenu = [
//     {
//         title: "Vertical Machine Center",
//         path: "/products?category=CNC+Vertical+Machine+Center",
//         items: [
//             { label: "NANO-X8", path: "/products/nano-x8", series: "ECO-LINE 3 Axis" },
//             { label: "NANO-X10", path: "/products/nano-x10", series: "ECO-LINE 3 Axis" },
//             { label: "NV-855", path: "/products/nv-855", series: "HIGH SPEED 3 Axis" },
//             { label: "NV-1165", path: "/products/nv-1165", series: "HIGH SPEED 3 Axis" },
//             { label: "NV-1370", path: "/products/nv-1370", series: "HIGH SPEED 3 Axis" },
//         ],
//     },
//     {
//         title: "Horizontal Machine Center",
//         path: "/products?category=CNC+Horizontal+Machine+Center",
//         items: [
//             { label: "HMC-630A", path: "/products/hmc-630a", series: "HMC Series" },
//             { label: "HMC-800A", path: "/products/hmc-800a", series: "HMC Series" },
//         ],
//     },
//     {
//         title: "Slant-Bed Lathe",
//         path: "/products?category=CNC+Slant-Bed+Lathe+Machine",
//         items: [
//             { label: "3015S", path: "/products/3015s", series: "3015 Series" },
//             { label: "3015M", path: "/products/3015m", series: "3015 Series" },
//             { label: "3015L", path: "/products/3015l", series: "3015 Series" },
//             { label: "3605S", path: "/products/3605s", series: "3605 Series" },
//             { label: "3605M", path: "/products/3605m", series: "3605 Series" },
//         ],
//     },
//     {
//         title: "Vertical Lathe",
//         path: "/products?category=CNC+Vertical+Lathe+Machine",
//         items: [
//             { label: "VLT-550", path: "/products/vlt-550", series: "VLT Series" },
//             { label: "VLT-750", path: "/products/vlt-750", series: "VLT Series" },
//         ],
//     },
//     {
//         title: "Double Column",
//         path: "/products?category=CNC+Double+Column+Machine+Center",
//         items: [],
//     },
// ];


// const industryMenu = ["Industry 1", "Industry 2"];

// const Header = () => {

//     const router = useRouter();
//     const pathname = usePathname();

//     const [menuOpen, setMenuOpen] = useState(false);
//     const [productsOpen, setProductsOpen] = useState(false);
//     const [industryOpen, setIndustryOpen] = useState(false);

//     // Modal state
//     const { openModal } = useModal();

//     // auth state
//     const { user, isAuthenticated } = useAuthStore();



//     return (
//         <header className="sticky top-0 z-50 w-full glass border-b-[1.5px] border-white/10 backdrop-blur-lg">
//             <div className="max-w-7xl mx-auto px-6">
//                 <div className="flex items-center justify-between h-16 text-white">

//                     {/* Logo */}
//                     <Image
//                         src="/nanyawhitelogo.png"
//                         alt="Logo"
//                         height={20}
//                         width={150}
//                         className="cursor-pointer "
//                         onClick={() => router.push("/")}
//                     />



//                     {/* ================= Desktop Menu ================= */}
//                     <nav className="hidden md:flex items-center gap-8">


//                         <Link href="/" className={`hover:text-(--primary) cursor-pointer ${pathname === "/" ? "text-orange-500" : ""}`}>Home</Link>
//                         <Link href="/about" className={`hover:text-(--primary) cursor-pointer ${pathname === "/about" ? "text-orange-500" : ""}`}>About</Link>

//                         {/* ================= Products Mega Menu ================= */}
//                         {/* <div className="relative group">
//                             <Link href="/products" className={`flex items-center gap-1 py-4 cursor-pointer ${pathname === "/products" ? "text-orange-500" : ""}`}>
//                                 Products <ChevronDown size={16} />
//                             </Link>

//                             <div className="absolute left-1/2 top-full -translate-x-1/2
//                                 opacity-0 invisible group-hover:opacity-100 group-hover:visible
//                                 transition-all duration-300
//                                 w-225 mt-4
//                                 glass rounded-2xl shadow-xl p-8 bg-black border-2 border-gray-900"
//                             >
//                                 <div className="grid grid-cols-5 gap-6">
//                                     {productMegaMenu.map((col) => (
//                                         <div key={col.title}>
//                                             <Link href={col.path} className="font-semibold cursor-pointer hover:text-(--primary)">
//                                                 {col.title}
//                                             </Link>

//                                             <ul className="mt-3 space-y-2 text-sm text-gray-300">
//                                                 {col.items.map((item) => (
//                                                     <li key={item}>
//                                                         <Link href="#" className="cursor-pointer hover:text-(--primary)">
//                                                             {item}
//                                                         </Link>
//                                                     </li>
//                                                 ))}
//                                             </ul>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                         </div> */}


//                         <div className="relative group">
//                             <Link href="/products" className={`flex items-center gap-1 py-4 cursor-pointer ${pathname.startsWith("/products") ? "text-orange-500" : ""}`}>
//                                 Products <ChevronDown size={16} />
//                             </Link>

//                             <div className="absolute left-1/2 top-full -translate-x-1/2
//         opacity-0 invisible group-hover:opacity-100 group-hover:visible
//         transition-all duration-300
//         w-225 mt-4
//         glass rounded-2xl shadow-xl p-8 bg-black border-2 border-gray-900"
//                             >
//                                 <div className="grid grid-cols-5 gap-6">
//                                     {productMegaMenu.map((col) => (
//                                         <div key={col.title}>
//                                             <Link href={col.path} className="font-semibold cursor-pointer hover:text-orange-500 text-sm">
//                                                 {col.title}
//                                             </Link>

//                                             <ul className="mt-3 space-y-2 text-sm text-gray-300">
//                                                 {col.items.map((item) => (
//                                                     <li key={item.label}>
//                                                         <Link href={item.path} className="cursor-pointer hover:text-orange-500 flex items-center gap-1.5">
//                                                             {item.label}
//                                                         </Link>
//                                                     </li>
//                                                 ))}

//                                                 {col.items.length === 0 && (
//                                                     <li className="text-gray-600 italic text-xs">Coming soon</li>
//                                                 )}
//                                             </ul>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 {/* View All Products Link */}
//                                 <div className="mt-6 pt-4 border-t border-white/10 text-center">
//                                     <Link href="/products" className="text-sm text-orange-500 hover:text-orange-400 transition-colors">
//                                         View All Products →
//                                     </Link>
//                                 </div>
//                             </div>

//                         </div>



//                         {/* ================= Industries Dropdown ================= */}
//                         <div className="relative group">
//                             <Link href="/industry" className={`flex items-center gap-1 py-4 cursor-pointer ${pathname === "/industries" ? "text-orange-500" : ""}`}>
//                                 Industries <ChevronDown size={16} />
//                             </Link>

//                             <div className="absolute left-0 top-full mt-3 w-48
//                                 opacity-0 invisible group-hover:opacity-100 group-hover:visible
//                                 transition-all duration-200
//                                 glass rounded-xl p-4 bg-black border-2 border-gray-900"
//                             >
//                                 {industryMenu.map((i) => (
//                                     <Link
//                                         key={i}
//                                         href="#"
//                                         className="block py-1 cursor-pointer hover:text-(--primary)"
//                                     >
//                                         {i}
//                                     </Link>
//                                 ))}
//                             </div>
//                         </div>

//                         <Link href="/blogs" className={`hover:text-(--primary) cursor-pointer ${pathname === "/blogs" ? "text-orange-500" : ""}`}>Blogs</Link>

//                     </nav>



//                     {/* Normal screen */}
//                     {isAuthenticated && user ? (

//                         <div className="max-sm:hidden max-md:hidden">
//                             <UserAvatar user={user} />
//                         </div>

//                     ) : (

//                         <div className="hidden md:flex items-center gap-3">

//                             <button className="cursor-pointer px-4 h-9.5 rounded-xl border border-white/30 text-white hover:bg-white/10 transition"
//                                 onClick={() => openModal(<AuthPopup />)}
//                             >
//                                 Login
//                             </button>

//                             <button
//                                 className="w-max cursor-pointer items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in text-sm py-2 px-4 shadow-sm bg-orange-500 bg-linear-to-b from-orange-500 to-orange-600 border-orange-600 text-stone-50 rounded-lg transition antialiased"
//                                 onClick={() => router.push("/get-quote")}
//                             >
//                                 Get Instant Quote
//                             </button>

//                         </div>

//                     )}




//                     {/* Mobile Menu toggle btn */}
//                     <div className="flex items-center gap-3 md:hidden">

//                         {isAuthenticated && user && <UserAvatar user={user} />}

//                         <button onClick={() => setMenuOpen(!menuOpen)} className="cursor-pointer">
//                             {menuOpen ? <X size={28} /> : <Menu size={28} />}
//                         </button>

//                     </div>

//                 </div>
//             </div>




//             {/* ================= Mobile Menu ================= */}
//             <div className={`md:hidden glass transition-all duration-300 ${menuOpen ? "max-h-[90vh] opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
//                 <div className="px-6 py-6 flex flex-col gap-5 text-white">

//                     <Link href="/" className="cursor-pointer">Home</Link>
//                     <Link href="/about" className="cursor-pointer">About</Link>

//                     {/* Products Mobile (Scrollable) */}
//                     <div>
//                         <button
//                             onClick={() => setProductsOpen(!productsOpen)}
//                             className="flex items-center justify-between w-full cursor-pointer"
//                         >
//                             Products <ChevronDown size={18} className={`transition-transform ${productsOpen ? "rotate-180" : ""}`} />
//                         </button>

//                         {productsOpen && (
//                             <div className="mt-4 pl-4 space-y-4 text-gray-300 max-h-60 overflow-y-auto">
//                                 {productMegaMenu.map((col) => (
//                                     <div key={col.title}>
//                                         <Link href={col.path} className="font-semibold cursor-pointer hover:text-orange-500" onClick={() => setMenuOpen(false)}>
//                                             {col.title}
//                                         </Link>
//                                         {col.items.map((item) => (
//                                             <Link key={item.label} href={item.path} className="block ml-4 text-sm cursor-pointer hover:text-orange-500" onClick={() => setMenuOpen(false)}>
//                                                 {item.label}
//                                             </Link>
//                                         ))}
//                                         {col.items.length === 0 && (
//                                             <span className="block ml-4 text-xs text-gray-600 italic">Coming soon</span>
//                                         )}
//                                     </div>
//                                 ))}

//                                 <Link href="/products" className="block text-sm text-orange-500 font-medium pt-2" onClick={() => setMenuOpen(false)}>
//                                     View All Products →
//                                 </Link>
//                             </div>
//                         )}
//                     </div>

//                     {/* Industries Mobile */}
//                     <div>

//                         <button
//                             onClick={() => {
//                                 setIndustryOpen(!industryOpen);
//                                 router.push("/industry");
//                             }}
//                             className="flex items-center justify-between w-full cursor-pointer"
//                         >
//                             Industries <ChevronDown size={18} />
//                         </button>

//                         {industryOpen && (
//                             <div className="mt-3 pl-4 text-gray-300 space-y-2">
//                                 {industryMenu.map((i) => (
//                                     <Link key={i} href="#" className="block cursor-pointer">
//                                         {i}
//                                     </Link>
//                                 ))}
//                             </div>
//                         )}
//                     </div>

//                     <Link href="/blogs" className="cursor-pointer">Blogs</Link>


//                     {/* In mobile menu if user do note show login */}
//                     {!user && <>

//                         <button className="mt-4 w-full cursor-pointer items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-amber-500 hover:bg-warning-light relative bg-linear-to-b from-orange-500 to-orange-600 border-orange-600 text-stone-50 rounded-lg hover:bg-linear-to-b hover:from-orange-600 hover:to-orange-600 hover:border-orange-600 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.35),inset_0_-2px_0px_rgba(0,0,0,0.18)] after:pointer-events-none transition antialiased"
//                             onClick={() => router.push("/get-quote")}
//                         >Get Instant Quote</button>

//                         <button className="w-full cursor-pointer px-4 h-9.5 rounded-xl border border-white/30 text-white hover:bg-white/10 transition" onClick={() => {
//                             openModal(<AuthPopup />)
//                         }}>
//                             Login
//                         </button>

//                     </>}

//                 </div>
//             </div>
//         </header>
//     );
// };

// export default Header;
































"use client";

import { useState } from "react";
import { ChevronDown, Menu, X, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useModal } from "@/context/ModalContext";
import { useAuthStore } from "@/store/authStore";
import UserAvatar from "./UserAvatar";
import AuthPopup from "../popup/AuthPopup";
import SearchModal from "../popup/SearchModal";



const productMegaMenu = [
    {
        title: "Vertical Machine Center",
        path: "/products?category=CNC+Vertical+Machine+Center",
        items: [
            { label: "NANO-X8", path: "/products/nano-x8", series: "ECO-LINE 3 Axis" },
            { label: "NANO-X10", path: "/products/nano-x10", series: "ECO-LINE 3 Axis" },
            { label: "NV-855", path: "/products/nv-855", series: "HIGH SPEED 3 Axis" },
            { label: "NV-1165", path: "/products/nv-1165", series: "HIGH SPEED 3 Axis" },
            { label: "NV-1370", path: "/products/nv-1370", series: "HIGH SPEED 3 Axis" },
        ],
    },
    {
        title: "Horizontal Machine Center",
        path: "/products?category=CNC+Horizontal+Machine+Center",
        items: [
            { label: "HMC-630A", path: "/products/hmc-630a", series: "HMC Series" },
            { label: "HMC-800A", path: "/products/hmc-800a", series: "HMC Series" },
        ],
    },
    {
        title: "Slant-Bed Lathe",
        path: "/products?category=CNC+Slant-Bed+Lathe+Machine",
        items: [
            { label: "3015S", path: "/products/3015s", series: "3015 Series" },
            { label: "3015M", path: "/products/3015m", series: "3015 Series" },
            { label: "3015L", path: "/products/3015l", series: "3015 Series" },
            { label: "3605S", path: "/products/3605s", series: "3605 Series" },
            { label: "3605M", path: "/products/3605m", series: "3605 Series" },
        ],
    },
    {
        title: "Vertical Lathe",
        path: "/products?category=CNC+Vertical+Lathe+Machine",
        items: [
            { label: "VLT-550", path: "/products/vlt-550", series: "VLT Series" },
            { label: "VLT-750", path: "/products/vlt-750", series: "VLT Series" },
        ],
    },
    {
        title: "Double Column",
        path: "/products?category=CNC+Double+Column+Machine+Center",
        items: [],
    },
];


const industryMenu = [
    { label: "Automotive", slug: "automotive" },
    { label: "Aerospace & Defense", slug: "aerospace-defense" },
    { label: "Medical & Healthcare", slug: "medical-healthcare" },
    { label: "Mold, Die & Engineering", slug: "mold-die-engineering" },
    { label: "Electronics & Semiconductors", slug: "electronics-semiconductors" },
    { label: "Robotics & Smart Manufacturing", slug: "robotics-smart-manufacturing" },
];

const Header = () => {

    const router = useRouter();
    const pathname = usePathname();

    const [menuOpen, setMenuOpen] = useState(false);
    const [productsOpen, setProductsOpen] = useState(false);
    const [equipmentsOpen, setEquipmentsOpen] = useState(false);
    const [industryOpen, setIndustryOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    // Modal state
    const { openModal } = useModal();

    // auth state
    const { user, isAuthenticated } = useAuthStore();



    return (
        <>
            <header className="sticky top-0 z-50 w-full glass border-b-[1.5px] border-white/10 backdrop-blur-lg">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between h-16 text-white">

                        {/* Logo */}
                        <Image
                            src="/nanyawhitelogo.png"
                            alt="Logo"
                            height={20}
                            width={150}
                            className="cursor-pointer "
                            onClick={() => router.push("/")}
                        />



                        {/* ================= Desktop Menu ================= */}
                        <nav className="hidden md:flex items-center gap-8">


                            <Link href="/" className={`hover:text-(--primary) cursor-pointer ${pathname === "/" ? "text-orange-500" : ""}`}>Home</Link>
                            <Link href="/about" className={`hover:text-(--primary) cursor-pointer ${pathname === "/about" ? "text-orange-500" : ""}`}>About</Link>

                            {/* ================= Products Mega Menu ================= */}
                            <div className="relative group">
                                <Link href="/products" className={`flex items-center gap-1 py-4 cursor-pointer ${pathname.startsWith("/products") ? "text-orange-500" : ""}`}>
                                    Products <ChevronDown size={16} />
                                </Link>

                                <div className="absolute left-1/2 top-full -translate-x-1/2
        opacity-0 invisible group-hover:opacity-100 group-hover:visible
        transition-all duration-300
        w-225 mt-4
        glass rounded-2xl shadow-xl p-8 bg-black border-2 border-gray-900"
                                >
                                    <div className="grid grid-cols-5 gap-6">
                                        {productMegaMenu.map((col) => (
                                            <div key={col.title}>
                                                <Link href={col.path} className="font-semibold cursor-pointer hover:text-orange-500 text-sm">
                                                    {col.title}
                                                </Link>

                                                <ul className="mt-3 space-y-2 text-sm text-gray-300">
                                                    {col.items.map((item) => (
                                                        <li key={item.label}>
                                                            <Link href={item.path} className="cursor-pointer hover:text-orange-500 flex items-center gap-1.5">
                                                                {item.label}
                                                            </Link>
                                                        </li>
                                                    ))}

                                                    {col.items.length === 0 && (
                                                        <li className="text-gray-600 italic text-xs">Coming soon</li>
                                                    )}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>

                                    {/* View All Products Link */}
                                    <div className="mt-6 pt-4 border-t border-white/10 text-center">
                                        <Link href="/products" className="text-sm text-orange-500 hover:text-orange-400 transition-colors">
                                            View All Products →
                                        </Link>
                                    </div>
                                </div>

                            </div>



                            {/* ================= Equipments Dropdown ================= */}
                            <div className="relative group">
                                <Link href="/equipments" className={`flex items-center gap-1 py-4 cursor-pointer ${pathname.startsWith("/equipments") ? "text-orange-500" : ""}`}>
                                    Equipments <ChevronDown size={16} />
                                </Link>

                                <div className="absolute left-0 top-full mt-3 w-64
                                opacity-0 invisible group-hover:opacity-100 group-hover:visible
                                transition-all duration-200
                                glass rounded-xl p-4 bg-black border-2 border-gray-900"
                                >
                                    {[
                                        { label: "AR Series", key: "AR+Series" },
                                        { label: "52 Series", key: "52+Series" },
                                        { label: "96 Series", key: "96+Series" },
                                        { label: "Self-Centering Vise", key: "Self-Centering+Vise" },
                                        { label: "Pneumatic Vise", key: "Pneumatic+Vise" },
                                        { label: "ER Zero Point Chuck", key: "ER+Zero+Point+Chuck" },
                                        { label: "4-Axis L Plate", key: "4-Axis+L+Plate" },
                                        { label: "Three Jaws Series", key: "Three+Jaws+Series" },
                                        { label: "Run Out Tester", key: "Run+Out+Tester" },
                                    ].map((cat) => (
                                        <Link
                                            key={cat.key}
                                            href={`/equipments?category=${cat.key}`}
                                            className="block py-1.5 cursor-pointer hover:text-orange-500 text-sm"
                                        >
                                            {cat.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* ================= Industries Dropdown ================= */}
                            <div className="relative group">
                                <Link href="/industry" className={`flex items-center gap-1 py-4 cursor-pointer ${pathname.startsWith("/industry") ? "text-orange-500" : ""}`}>
                                    Industries <ChevronDown size={16} />
                                </Link>

                                <div className="absolute left-0 top-full mt-3 w-64
                                opacity-0 invisible group-hover:opacity-100 group-hover:visible
                                transition-all duration-200
                                glass rounded-xl p-4 bg-black border-2 border-gray-900"
                                >
                                    {industryMenu.map((i) => (
                                        <Link
                                            key={i.slug}
                                            href={`/industry/${i.slug}`}
                                            className="block py-1.5 cursor-pointer hover:text-orange-500 text-sm"
                                        >
                                            {i.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <Link href="/blogs" className={`hover:text-(--primary) cursor-pointer ${pathname === "/blogs" ? "text-orange-500" : ""}`}>Blogs</Link>

                        </nav>



                        {/* Desktop Right Side */}
                        <div className="hidden md:flex items-center gap-3">
                            {/* Search Icon */}
                            <button
                                onClick={() => setSearchOpen(true)}
                                className="p-2 rounded-lg hover:bg-white/10 transition cursor-pointer"
                                aria-label="Search products"
                            >
                                <Search size={20} className="text-white" />
                            </button>

                            {isAuthenticated && user ? (
                                <UserAvatar user={user} />
                            ) : (
                                <>
                                    <button className="cursor-pointer px-4 h-9.5 rounded-xl border border-white/30 text-white hover:bg-white/10 transition"
                                        onClick={() => openModal(<AuthPopup />)}
                                    >
                                        Login
                                    </button>

                                    <button
                                        className="w-max cursor-pointer items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in text-sm py-2 px-4 shadow-sm bg-orange-500 bg-linear-to-b from-orange-500 to-orange-600 border-orange-600 text-stone-50 rounded-lg transition antialiased"
                                        onClick={() => router.push("/get-quote")}
                                    >
                                        Get Instant Quote
                                    </button>
                                </>
                            )}
                        </div>




                        {/* Mobile Menu toggle btn */}
                        <div className="flex items-center gap-3 md:hidden">
                            {/* Mobile Search Icon */}
                            <button
                                onClick={() => setSearchOpen(true)}
                                className="p-2 rounded-lg hover:bg-white/10 transition cursor-pointer"
                                aria-label="Search products"
                            >
                                <Search size={20} className="text-white" />
                            </button>

                            {isAuthenticated && user && <UserAvatar user={user} />}

                            <button onClick={() => setMenuOpen(!menuOpen)} className="cursor-pointer">
                                {menuOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>

                        </div>

                    </div>
                </div>




                {/* ================= Mobile Menu ================= */}
                <div className={`md:hidden glass transition-all duration-300 ${menuOpen ? "max-h-[90vh] opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
                    <div className="px-6 py-6 flex flex-col gap-5 text-white">

                        <Link href="/" className="cursor-pointer">Home</Link>
                        <Link href="/about" className="cursor-pointer">About</Link>

                        {/* Products Mobile (Scrollable) */}
                        <div>
                            <button
                                onClick={() => setProductsOpen(!productsOpen)}
                                className="flex items-center justify-between w-full cursor-pointer"
                            >
                                Products <ChevronDown size={18} className={`transition-transform ${productsOpen ? "rotate-180" : ""}`} />
                            </button>

                            {productsOpen && (
                                <div className="mt-4 pl-4 space-y-4 text-gray-300 max-h-60 overflow-y-auto">
                                    {productMegaMenu.map((col) => (
                                        <div key={col.title}>
                                            <Link href={col.path} className="font-semibold cursor-pointer hover:text-orange-500" onClick={() => setMenuOpen(false)}>
                                                {col.title}
                                            </Link>
                                            {col.items.map((item) => (
                                                <Link key={item.label} href={item.path} className="block ml-4 text-sm cursor-pointer hover:text-orange-500" onClick={() => setMenuOpen(false)}>
                                                    {item.label}
                                                </Link>
                                            ))}
                                            {col.items.length === 0 && (
                                                <span className="block ml-4 text-xs text-gray-600 italic">Coming soon</span>
                                            )}
                                        </div>
                                    ))}

                                    <Link href="/products" className="block text-sm text-orange-500 font-medium pt-2" onClick={() => setMenuOpen(false)}>
                                        View All Products →
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Equipments Mobile */}
                        <div>
                            <button
                                onClick={() => setEquipmentsOpen(!equipmentsOpen)}
                                className="flex items-center justify-between w-full cursor-pointer"
                            >
                                Equipments <ChevronDown size={18} className={`transition-transform ${equipmentsOpen ? "rotate-180" : ""}`} />
                            </button>

                            {equipmentsOpen && (
                                <div className="mt-3 pl-4 text-gray-300 space-y-2">
                                    {[
                                        { label: "AR Series", key: "AR+Series" },
                                        { label: "52 Series", key: "52+Series" },
                                        { label: "96 Series", key: "96+Series" },
                                        { label: "Self-Centering Vise", key: "Self-Centering+Vise" },
                                        { label: "Pneumatic Vise", key: "Pneumatic+Vise" },
                                        { label: "ER Zero Point Chuck", key: "ER+Zero+Point+Chuck" },
                                        { label: "4-Axis L Plate", key: "4-Axis+L+Plate" },
                                        { label: "Three Jaws Series", key: "Three+Jaws+Series" },
                                        { label: "Run Out Tester", key: "Run+Out+Tester" },
                                    ].map((cat) => (
                                        <Link key={cat.key} href={`/equipments?category=${cat.key}`} className="block cursor-pointer hover:text-orange-500 text-sm" onClick={() => setMenuOpen(false)}>
                                            {cat.label}
                                        </Link>
                                    ))}
                                    <Link href="/equipments" className="block text-sm text-orange-500 font-medium pt-2" onClick={() => setMenuOpen(false)}>
                                        View All Equipments →
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Industries Mobile */}
                        <div>

                            <button
                                onClick={() => {
                                    setIndustryOpen(!industryOpen);
                                    router.push("/industry");
                                }}
                                className="flex items-center justify-between w-full cursor-pointer"
                            >
                                Industries <ChevronDown size={18} />
                            </button>

                            {industryOpen && (
                                <div className="mt-3 pl-4 text-gray-300 space-y-2">
                                    {industryMenu.map((i) => (
                                        <Link key={i.slug} href={`/industry/${i.slug}`} className="block cursor-pointer hover:text-orange-500 text-sm" onClick={() => setMenuOpen(false)}>
                                            {i.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link href="/blogs" className="cursor-pointer">Blogs</Link>


                        {/* In mobile menu if user do note show login */}
                        {!user && <>

                            <button className="mt-4 w-full cursor-pointer items-center justify-center border align-middle select-none font-sans font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md bg-amber-500 hover:bg-warning-light relative bg-linear-to-b from-orange-500 to-orange-600 border-orange-600 text-stone-50 rounded-lg hover:bg-linear-to-b hover:from-orange-600 hover:to-orange-600 hover:border-orange-600 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.35),inset_0_-2px_0px_rgba(0,0,0,0.18)] after:pointer-events-none transition antialiased"
                                onClick={() => router.push("/get-quote")}
                            >Get Instant Quote</button>

                            <button className="w-full cursor-pointer px-4 h-9.5 rounded-xl border border-white/30 text-white hover:bg-white/10 transition" onClick={() => {
                                openModal(<AuthPopup />)
                            }}>
                                Login
                            </button>

                        </>}

                    </div>
                </div>
            </header>

            {/* Search Modal */}
            {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
        </>
    );
};

export default Header;