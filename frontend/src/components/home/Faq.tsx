"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
    {
        question: "What products does NANYA CNC manufacture?",
        answer:
            "NANYA CNC specializes in high-precision CNC machines, including Vertical Machining Centers, Horizontal Machining Centers, CNC Lathe machines, and advanced 5-Axis Machining Centers designed for accuracy, durability, and high productivity.",
    },
    {
        question: "Since when has NANYA CNC been in operation?",
        answer:
            "NANYA CNC was established in 2010 and has grown from a small workshop into a globally trusted CNC manufacturing brand serving customers in more than 50 countries.",
    },
    {
        question: "Where are NANYA CNC machines manufactured?",
        answer:
            "Our machines are manufactured in Wuxi, Jiangsu, China, at advanced production facilities, with strong technical influence and engineering expertise from Taiwan.",
    },
    {
        question: "What industries use NANYA CNC machines?",
        answer:
            "NANYA CNC machines are widely used across automotive, aerospace, general engineering, metal fabrication, tooling, and other precision manufacturing industries.",
    },
    {
        question: "Does NANYA CNC offer smart and AI-enabled CNC solutions?",
        answer:
            "Yes, we integrate AI-driven technologies such as real-time monitoring, smart diagnostics, robotic integration, and industrial automation to improve productivity and reduce downtime.",
    },
    {
        question: "Do you provide installation and training services?",
        answer:
            "Absolutely. We offer complete machine installation, commissioning, and operator training to ensure smooth setup and optimal machine performance from day one.",
    },
    {
        question: "What kind of after-sales support does NANYA CNC provide?",
        answer:
            "We provide complete lifecycle support including preventive and corrective maintenance, genuine spare parts supply, technical support, and troubleshooting for maximum machine uptime.",
    },
    {
        question: "Does NANYA CNC export machines internationally?",
        answer:
            "Yes, NANYA CNC exports machines globally and currently serves customers in over 50 countries with customized CNC solutions and reliable service support.",
    },
];

const Faq = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="bg-black pt-15">
            <div className="max-w-6xl mx-auto px-6">

                {/* Heading */}
                <h2 className="text-4xl font-bold text-center mb-16 text-white font-serif">
                    Common <span className="text-(--primary)">Questions</span>
                </h2>

                {/* FAQ List */}
                <div
                    className="
                    rounded-2xl
                    bg-white/10 backdrop-blur-xl
                    border border-white/20
                    shadow-xl
                    divide-y divide-white/20
                "
                >
                    {faqs.map((item, index) => (
                        <div key={index} className="p-6">

                            {/* Question */}
                            <button
                                onClick={() => toggle(index)}
                                className="w-full flex items-center justify-between text-left group"
                            >
                                <span className="text-lg font-semibold text-white group-hover:text-(--primary) transition cursor-pointer font-serif">
                                    {item.question}
                                </span>

                                {/* Icon */}
                                <span
                                    className="
                                    ml-4 shrink-0
                                    flex items-center justify-center
                                    h-9 w-9 rounded-full
                                    bg-(--primary)/15  text-orange-500
                                    transition-transform duration-300
                                    cursor-pointer
                                "
                                >
                                    {openIndex === index ? (
                                        <Minus size={18} />
                                    ) : (
                                        <Plus size={18} />
                                    )}
                                </span>
                            </button>

                            {/* Answer */}
                            <div
                                className={`grid transition-all duration-300 ease-in-out ${openIndex === index
                                    ? "grid-rows-[1fr] opacity-100 mt-4"
                                    : "grid-rows-[0fr] opacity-0"
                                    }`}
                            >
                                <div className="overflow-hidden text-gray-300 leading-relaxed">
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Faq;
