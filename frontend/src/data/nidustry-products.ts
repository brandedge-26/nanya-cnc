import {
    Car,
    Plane,
    Stethoscope,
    Settings,
    Cpu,
    Bot,
    LucideIcon
} from "lucide-react";

export interface IndustryData {
    slug: string;
    title: string;
    shortTitle: string;
    description: string;
    icon: LucideIcon; 
    heroImage: string;
    overview: string;
    recommendedCategories: string[];
    machineTypes: { name: string; description: string }[];
}

export const industries: IndustryData[] = [
    {
        slug: "automotive",
        title: "Automotive Industry",
        shortTitle: "Automotive",
        description: "High-precision CNC machining for mass production of reliable automotive components.",
        icon: Car,
        heroImage: "/industry/automotive.jpg",
        overview: "NANYA machines are widely used for the mass production of reliable, identical automotive components...",
        recommendedCategories: [
            "CNC Vertical Machine Center",
            "CNC Slant-Bed Lathe Machine",
            "Industrial Robotic Technology",
        ],
        machineTypes: [
            { name: "3-Axis Vertical Machining Centers (VMC)", description: "For engine blocks, cylinder heads, transmission cases, and suspension components." },
            { name: "CNC Lathes", description: "Used to produce cylindrical parts such as shafts, pistons, and fasteners." },
            { name: "Robotics & Automation", description: "For automated assembly lines, welding, and painting to increase productivity and safety." },
        ],
    },
    {
        slug: "aerospace-defense",
        title: "Aerospace & Defense",
        shortTitle: "Aerospace",
        description: "Exceptional precision machining for flight-critical and structural components.",
        icon: Plane,
        heroImage: "/industry/aerospace.jpg",
        overview: "This sector demands exceptional precision (tolerances as tight as ±0.0001 inches) and the ability to machine tough materials...",
        recommendedCategories: [
            "CNC Vertical Machine Center",
            "CNC Horizontal Machine Center",
            "CNC Double Column Machine Center",
        ],
        machineTypes: [
            { name: "5-Axis CNC Mills", description: "For complex multi-angle shaping of turbine blades, airfoils, and engine components." },
            { name: "Vertical & Horizontal Machining Centers", description: "Used for large structural airframe parts, landing gear, and housing units." },
        ],
    },
    {
        slug: "medical-healthcare",
        title: "Medical & Healthcare",
        shortTitle: "Medical",
        description: "High-precision solutions for surgical tools, implants, and diagnostic equipment.",
        icon: Stethoscope,
        heroImage: "/industry/medical.jpg",
        overview: "NANYA provides high-precision solutions for surgical tools, orthopedic implants, and diagnostic equipment housings...",
        recommendedCategories: [
            "CNC Vertical Machine Center",
            "CNC Slant-Bed Lathe Machine",
        ],
        machineTypes: [
            { name: "Vertical Machining Centers (VMC)", description: "Ideal for producing intricate medical implants and surgical instruments." },
            { name: "Swiss-style CNC Lathes", description: "Specifically for tiny, high-precision medical screws and micro-components." },
        ],
    },
    {
        slug: "mold-die-engineering",
        title: "Mold, Die & General Engineering",
        shortTitle: "Mold & Die",
        description: "Ideal solutions for mold making, die casting, and general engineering applications.",
        icon: Settings,
        heroImage: "/industry/mold.jpg",
        overview: "NANYA's 3-Axis VMCs are specifically described as the ideal solution for the mold, die, and general engineering industries...",
        recommendedCategories: [
            "CNC Vertical Machine Center",
            "CNC Double Column Machine Center",
            "CNC Horizontal Machine Center",
        ],
        machineTypes: [
            { name: "3-Axis Vertical Machining Centers (VMC)", description: "Highlighted for their high accuracy and rigidity in milling, drilling, and tapping." },
            { name: "Surface Grinders", description: "Essential for achieving the precision flatness and surface finish required." },
        ],
    },
    {
        slug: "electronics-semiconductors",
        title: "Electronics & Semiconductors",
        shortTitle: "Electronics",
        description: "CNC machining for miniature parts, device enclosures, and heat sinks.",
        icon: Cpu,
        heroImage: "/industry/electronics.jpg",
        overview: "This industry relies on CNC machining for miniature parts, device enclosures, and heat sinks...",
        recommendedCategories: [
            "CNC Vertical Machine Center",
            "Industrial Robotic Technology",
        ],
        machineTypes: [
            { name: "High-Speed Vertical Machining Centers", description: "For the quick and precise milling of aluminum electronics housings." },
            { name: "Robotic Arm Integration", description: "To enhance automation efficiency in micro-assembly and PCB handling." },
        ],
    },
    {
        slug: "robotics-smart-manufacturing",
        title: "Robotics & Smart Manufacturing",
        shortTitle: "Robotics",
        description: "Smart technologies and AI-based monitoring for operational excellence.",
        icon: Bot,
        heroImage: "/industry/robotics.jpg",
        overview: "NANYA integrates smart technologies and AI-based monitoring to help manufacturers achieve operational excellence...",
        recommendedCategories: [
            "Industrial Robotic Technology",
            "Industrial Device",
            "CNC Vertical Machine Center",
        ],
        machineTypes: [
            { name: "Robotic Systems", description: "For machine tending, material handling, and automated welding." },
            { name: "CNC Controllers & Spare Parts", description: "Emphasizing the reliability of genuine NANYA controllers." },
        ],
    },
];

export const getIndustryBySlug = (slug: string): IndustryData | undefined => {
    return industries.find((i) => i.slug === slug);
};