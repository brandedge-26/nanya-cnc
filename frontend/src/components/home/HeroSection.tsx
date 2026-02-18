"use client";


import { useRouter } from "next/navigation";

const HeroSection = () => {

  const router = useRouter();

  return (<>

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

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tighter leading-tight">
          Precision CNC Machining,
          <br />
          Built for <span className="text-orange-500">Modern Manufacturing.</span>
        </h1>

        <p className="mt-6 text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Nanya CNC is a precision machining platform where advanced technology,
          engineering excellence, and trusted partnerships come together to deliver
          uncompromised quality.
        </p>

        <div className="mt-10 flex justify-center gap-4">

          <button 
            onClick={() => router.push("/get-quote")}
            className="cursor-pointer px-8 py-3 rounded-full bg-orange-500 text-black font-medium hover:bg-orange-500/80 transition">
            Get Quote
          </button>

          <button 
            onClick={() => router.push("/products")}
            className="cursor-pointer px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition">
            Our Products
          </button>

        </div>

      </div>

    </section>

  </>);
}

export default HeroSection;