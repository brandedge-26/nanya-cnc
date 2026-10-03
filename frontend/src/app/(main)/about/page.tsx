import Image from "next/image";
import { Cpu, ShieldCheck, Zap, Wrench, GraduationCap, Settings, Package, Headphones, Target, Eye, Lightbulb, Globe } from "lucide-react";
import OurJourney from "@/components/about/OurJourney";
import Link from "next/link";

export const metadata = {
    title: "About Us – Engineering Intelligence into Every Machine",
    description:
        "Nanya CNC combines advanced engineering with AI-driven innovation to redefine modern manufacturing. From precision machining to smart factory solutions.",
    alternates: {
        canonical: "/about",
    },
    openGraph: {
        title: "About Us | Nanya CNC – Engineering Intelligence into Every Machine",
        description:
            "Nanya CNC combines advanced engineering with AI-driven innovation to redefine modern manufacturing. From precision machining to smart factory solutions.",
        url: "/about",
        type: "website",
    },
};

const AboutPage = () => {
    return (
        <main className="bg-black text-white">

            {/* 1. HERO */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-black">

                {/* GRID BACKGROUND */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.09)_1px,transparent_1px)] bg-size-[60px_60px] opacity-30 animate-gridMove transform"></div>

                {/* ORANGE RADIAL CENTER GLOW */}
                <div className="absolute inset-0 flex justify-center items-center">
                    <div className="h-150 w-150 bg-[radial-gradient(circle,rgba(255,140,0,0.45),transparent_70%)] blur-3xl animate-glowMove transform"></div>
                </div>

                {/* LEFT GLOW */}
                <div className="absolute bottom-0 left-0 h-100 w-100 bg-[radial-gradient(circle,rgba(255,140,0,0.25),transparent_70%)] blur-3xl animate-glowMove2 transform"></div>

                {/* RIGHT GLOW */}
                <div className="absolute bottom-0 right-0 h-100 w-100 bg-[radial-gradient(circle,rgba(255,140,0,0.25),transparent_70%)] blur-3xl animate-glowMove3 transform"></div>

                {/* HERO CONTENT */}
                <div className="relative z-10 max-w-5xl px-6 text-center">

                    <p className="text-sm md:text-base uppercase tracking-widest text-orange-500 mb-4 font-medium">
                        About Nanya CNC
                    </p>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tighter leading-tight">
                        Engineering <span className="text-orange-500">Intelligence</span> into Every Machine
                    </h1>

                    <p className="mt-6 text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        At Nanya CNC, we combine advanced engineering with AI-driven innovation to redefine modern manufacturing.
                    </p>

                    <p className="mt-2 text-sm text-gray-500 max-w-xl mx-auto">
                        From precision machining to smart factory solutions — we are shaping the future of industrial production.
                    </p>

                    <div className="mt-10 flex justify-center gap-4 flex-wrap">
                        <Link href="/get-quote" className="px-8 py-3 rounded-full bg-orange-500 text-black font-semibold hover:bg-orange-500/80 transition shadow-lg shadow-orange-500/20">
                            Get Free Consultation
                        </Link>
                        <Link href="/products" className="px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition">
                            Our Products
                        </Link>
                    </div>

                </div>
            </section>


            {/* 2. WHO WE ARE */}
            <section className="py-20 bg-black">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="md:flex md:items-center md:gap-16">
                        <div className="md:w-1/2">
                            <p className="text-xs uppercase tracking-widest text-orange-500 mb-3 font-medium">Company Story</p>
                            <h2 className="text-3xl font-bold text-white mb-6 font-serif">Who We Are</h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                Nanya CNC is a forward-thinking manufacturing company specializing in high-performance CNC machines and intelligent production systems.
                            </p>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                We go beyond traditional machining by integrating automation, data-driven optimization, and cutting-edge technology into every solution we deliver.
                            </p>
                            <p className="text-gray-400 leading-relaxed">
                                Our goal is simple: Help businesses increase efficiency, reduce costs, and scale production with confidence.
                            </p>
                        </div>
                        <div className="md:w-1/2 relative h-64 md:h-96 mt-8 md:mt-0">
                            <Image
                                src="/about/mission-img.jpg"
                                alt="Who We Are - Nanya CNC"
                                fill
                                className="object-cover rounded-2xl shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>


            {/* 3. OUR VISION */}
            <section className="py-16 bg-black">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="md:flex md:items-center md:gap-16 md:flex-row-reverse">
                        <div className="md:w-1/2">
                            <p className="text-xs uppercase tracking-widest text-orange-500 mb-3 font-medium">Our Vision</p>
                            <h2 className="text-3xl font-bold text-white mb-6 font-serif">Our Vision</h2>
                            <p className="text-gray-300 leading-relaxed">
                                To become a global leader in AI-powered manufacturing by transforming industries through intelligent, efficient, and scalable CNC solutions.
                            </p>
                        </div>
                        <div className="md:w-1/2 relative h-64 md:h-80 mt-8 md:mt-0">
                            <Image
                                src="/about/vision-img.jpg"
                                alt="Our Vision - Nanya CNC"
                                fill
                                className="object-cover rounded-2xl shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>


            {/* 4. OUR MISSION */}
            <section className="py-16 bg-black">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <p className="text-xs uppercase tracking-widest text-orange-500 mb-3 font-medium">Our Purpose</p>
                        <h2 className="text-3xl font-bold text-white font-serif">Our Mission</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                        {[
                            { icon: Target, text: "Deliver high-performance CNC machines with unmatched precision" },
                            { icon: Zap, text: "Integrate smart technologies into modern production systems" },
                            { icon: Cpu, text: "Empower industries with automation and data-driven insights" },
                            { icon: ShieldCheck, text: "Build long-term partnerships through quality and innovation" },
                        ].map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div key={i} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-orange-500/30 transition-all duration-300">
                                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 shrink-0">
                                        <Icon size={20} strokeWidth={1.5} />
                                    </div>
                                    <p className="text-gray-300 text-sm leading-relaxed">{item.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>


            {/* 5. WHY CHOOSE NANYA CNC */}
            <section className="py-20 bg-black">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <p className="text-xs uppercase tracking-widest text-orange-500 mb-3 font-medium">What Makes Us Different</p>
                    <h2 className="text-3xl font-bold text-white mb-4 font-serif">Why Choose Nanya CNC</h2>
                    <p className="text-gray-400 max-w-xl mx-auto mb-12 text-sm">
                        We combine engineering excellence with intelligent innovation to create solutions that truly make a difference.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {[
                            {
                                icon: Cpu,
                                title: "AI-Driven Innovation",
                                desc: "We integrate intelligent systems that optimize performance, reduce waste, and improve production efficiency.",
                                color: "text-orange-500",
                            },
                            {
                                icon: Wrench,
                                title: "Engineering Excellence",
                                desc: "Every machine is designed with precision, durability, and long-term performance in mind.",
                                color: "text-blue-400",
                            },
                            {
                                icon: Lightbulb,
                                title: "Customized Solutions",
                                desc: "We understand that every business is unique — our solutions are tailored to your exact production needs.",
                                color: "text-yellow-400",
                            },
                            {
                                icon: Globe,
                                title: "Global Standards",
                                desc: "Our machines meet international quality benchmarks and are trusted across multiple industries worldwide.",
                                color: "text-green-400",
                            },
                        ].map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.title} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center hover:border-orange-500/30 transition-all duration-300">
                                    <div className={`mb-4 w-14 h-14 flex items-center justify-center bg-white/10 rounded-xl ${item.color}`}>
                                        <Icon size={26} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-3 font-serif">{item.title}</h3>
                                    <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>


            {/* 6. OUR JOURNEY TIMELINE */}
            <OurJourney />


            {/* 7. OUR EXPERTISE */}
            <section className="py-20 bg-black">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <p className="text-xs uppercase tracking-widest text-orange-500 mb-3 font-medium">Specializations</p>
                        <h2 className="text-3xl font-bold text-white font-serif">Our Expertise</h2>
                        <p className="mt-3 text-gray-400 max-w-lg mx-auto text-sm">
                            We specialize in a wide range of CNC technologies and industrial solutions.
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
                        {[
                            "CNC Router Machines",
                            "Laser Cutting Systems",
                            "Plasma Cutting Machines",
                            "Custom CNC Solutions",
                            "Smart Factory Integration",
                            "Vertical Machining Centers",
                            "Horizontal Machining Centers",
                            "CNC Lathes",
                        ].map((item) => (
                            <span key={item} className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm hover:border-orange-500/30 hover:text-orange-400 transition-all duration-300">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </section>


            {/* 8. GLOBAL PRESENCE */}
            <section className="py-16 bg-black">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center hover:border-orange-500/20 transition-all duration-300">
                        <Globe size={44} className="text-orange-500 mx-auto mb-5" strokeWidth={1.5} />
                        <h2 className="text-3xl font-bold text-white mb-4 font-serif">Serving Industries Worldwide</h2>
                        <p className="text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
                            Nanya CNC proudly serves clients across multiple countries, delivering reliable solutions for diverse industries including furniture, automotive, metal fabrication, and advertising.
                        </p>
                        <div className="flex justify-center gap-8 flex-wrap">
                            {[
                                { value: "30+", label: "Countries Served" },
                                { value: "5000+", label: "Machines Installed" },
                                { value: "16+", label: "Years Experience" },
                            ].map((stat) => (
                                <div key={stat.label} className="text-center">
                                    <div className="text-3xl font-bold text-orange-500 font-serif">{stat.value}</div>
                                    <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* 9. OUR APPROACH */}
            <section className="py-20 bg-black">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <p className="text-xs uppercase tracking-widest text-orange-500 mb-3 font-medium">How We Work</p>
                        <h2 className="text-3xl font-bold text-white font-serif">Our Approach to Smart Manufacturing</h2>
                        <p className="mt-3 text-gray-400 max-w-lg mx-auto text-sm">
                            We don&apos;t just sell machines — we build complete production ecosystems.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-4">
                        {[
                            { step: "01", title: "Understanding Your Business Needs" },
                            { step: "02", title: "Designing Optimized Solutions" },
                            { step: "03", title: "Integrating Automation and AI" },
                            { step: "04", title: "Ensuring Long-Term Scalability" },
                        ].map((item) => (
                            <div key={item.step} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-orange-500/30 transition-all duration-300">
                                <div className="text-3xl font-bold text-orange-500/30 font-serif mb-3">{item.step}</div>
                                <h3 className="text-white text-sm font-semibold leading-relaxed">{item.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* 10. QUALITY COMMITMENT */}
            <section className="py-16 bg-black">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <p className="text-xs uppercase tracking-widest text-orange-500 mb-3 font-medium">Quality First</p>
                        <h2 className="text-3xl font-bold text-white font-serif">Commitment to Quality &amp; Reliability</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { icon: ShieldCheck, title: "Precision", desc: "Every machine we build is engineered to deliver pinpoint accuracy, meeting the strictest standards.", color: "text-orange-500" },
                            { icon: Settings, title: "Reliability", desc: "Machines you can count on day after day, built for long-term performance and minimal downtime.", color: "text-green-400" },
                            { icon: Zap, title: "Innovation", desc: "Smart CNC solutions designed to solve modern manufacturing challenges efficiently.", color: "text-blue-400" },
                        ].map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.title} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center hover:border-orange-500/30 transition-all duration-300">
                                    <div className={`mb-4 w-14 h-14 flex items-center justify-center bg-white/10 rounded-xl ${item.color}`}>
                                        <Icon size={26} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-3 font-serif">{item.title}</h3>
                                    <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                    <p className="text-center mt-8 text-gray-400 text-sm max-w-2xl mx-auto">
                        Every machine undergoes strict quality checks and performance testing to ensure durability, accuracy, and consistent output. We are committed to delivering solutions that meet the highest standards of industrial excellence.
                    </p>
                </div>
            </section>


            {/* 11. TEAM SECTION */}
            <section className="py-16 bg-black">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <p className="text-xs uppercase tracking-widest text-orange-500 mb-3 font-medium">The People Behind It</p>
                    <h2 className="text-3xl font-bold text-white mb-4 font-serif">Our Team</h2>
                    <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-10 hover:border-orange-500/20 transition-all duration-300">
                        <p className="text-gray-300 leading-relaxed mb-3">
                            Our team consists of experienced engineers, designers, and industry experts dedicated to innovation and continuous improvement.
                        </p>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Together, we work to push the boundaries of modern manufacturing.
                        </p>
                    </div>
                </div>
            </section>


            {/* 12. SERVICES */}
            <section className="py-16 bg-black">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <p className="text-xs uppercase tracking-widest text-orange-500 mb-3 font-medium">After-Sales Support</p>
                    <h2 className="text-3xl font-semibold text-white mb-4 font-serif">Our Services</h2>
                    <p className="text-gray-400 max-w-xl mx-auto mb-10 text-sm">
                        NANYA CNC provides complete lifecycle support to ensure optimal machine performance and maximum uptime.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {[
                            { title: "Installation & Commissioning", icon: Wrench },
                            { title: "Operator & Technical Training", icon: GraduationCap },
                            { title: "Preventive & Corrective Maintenance", icon: Settings },
                            { title: "Genuine Spare Parts Supply", icon: Package },
                            { title: "Technical Support & Troubleshooting", icon: Headphones },
                        ].map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.title} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:border-orange-500/30 transition duration-300 w-full md:w-[calc(33%-12px)] min-w-56">
                                    <div className="mb-4 w-12 h-12 flex items-center justify-center bg-orange-500/10 rounded-xl text-orange-500">
                                        <Icon size={22} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="font-semibold text-white text-sm leading-snug">{item.title}</h3>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>


            {/* 12. FINAL CTA */}
            <section className="py-24 bg-black relative overflow-hidden">
                <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                    <div className="h-80 w-80 bg-[radial-gradient(circle,rgba(255,140,0,0.1),transparent_70%)] blur-3xl"></div>
                </div>
                <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif">
                        Let&apos;s Build the <span className="text-orange-500">Future Together</span>
                    </h2>
                    <p className="text-gray-400 mb-8">
                        Partner with Nanya CNC and take your manufacturing capabilities to the next level.
                    </p>
                    <div className="flex justify-center gap-4 flex-wrap">
                        <Link href="/get-quote" className="px-8 py-3 rounded-full bg-orange-500 text-black font-semibold hover:bg-orange-500/80 transition shadow-lg shadow-orange-500/20">
                            Get Free Consultation
                        </Link>
                        <Link href="/get-quote" className="px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition">
                            Contact Us
                        </Link>
                    </div>
                    <p className="mt-10 text-gray-500 text-sm">
                        &ldquo;Nanya CNC — Powering the Future of Smart Manufacturing.&rdquo;
                    </p>
                </div>
            </section>

        </main>
    );
};

export default AboutPage;
