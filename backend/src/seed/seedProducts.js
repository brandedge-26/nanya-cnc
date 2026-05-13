import mongoose from "mongoose";
import { Product } from "../models/Product.js";
import { ENV } from "../config/env.js";


// ═══════════════════════════════════════════════════════════════
//  ALL PRODUCTS DATA — Extracted from Excel catalogues
// ═══════════════════════════════════════════════════════════════

const allProducts = [

    // ────────────────────────────────────────────────────
    //  CNC VERTICAL MACHINE CENTER → ECO-LINE 3 AXIS
    // ────────────────────────────────────────────────────
    {
        modelName: "NANO-X8",
        slug: "nano-x8",
        category: "CNC Vertical Machine Center",
        subCategory: "ECO-LINE 3 Axis Machines",
        tagline: "Eco-Line 3 Axis CNC Vertical Machining Center",
        description: "The NANO-X8 is a compact yet powerful 3-axis vertical machining center designed for high-precision operations. Featuring a direct-driven spindle at 12,000 RPM with BT-40 taper, roller linear guideways on all axes, and a 24-tool arm-type ATC with 1.8 sec tool change. Ideal for mold making, die work, and precision parts manufacturing.",
        images: [
            { url: "/machines/nano-x8.jpeg", altText: "NANO-X8 Front View", isPrimary: true },
            { url: "/machines/nano-x8-second-variant.jpeg", altText: "NANO-X8 Variant View" },
        ],
        specifications: [
            {
                groupName: "Travel",
                items: [
                    { label: "X-Axis Travel", value: "800mm" },
                    { label: "Y-Axis Travel", value: "500mm" },
                    { label: "Z-Axis Travel", value: "550mm" },
                    { label: "Spindle Nose to Table", value: "90–600mm" },
                    { label: "Spindle Center to Z-Rail", value: "550mm" },
                    { label: "Three-Axis Guideway", value: "X Y Z Load Roller Linear Guideway" },
                ],
            },
            {
                groupName: "Table",
                items: [
                    { label: "Table Size", value: "1000 x 500mm" },
                    { label: "T-Slot (Number x Width x Pitch)", value: "3 x 18 x 102mm" },
                    { label: "Maximum Table Load", value: "700 KGS" },
                ],
            },
            {
                groupName: "Spindle",
                items: [
                    { label: "Spindle Taper", value: "(Ø140mm) BT-40" },
                    { label: "Spindle Driven", value: "Direct Driven (DDS)" },
                    { label: "Spindle Speed", value: "12,000 RPM" },
                    { label: "Spindle Motor Torque", value: "96 N/m" },
                ],
            },
            {
                groupName: "Feed Rate",
                items: [
                    { label: "X/Y Axis Rapid Traverse", value: "40 / 40 m/min" },
                    { label: "Z-Axis Rapid Traverse", value: "40 m/min" },
                    { label: "Max Cutting Feed Rate", value: "12 m/min" },
                ],
            },
            {
                groupName: "ATC Tool Changer",
                items: [
                    { label: "Type (Tool to Tool)", value: "24 Tools Arm-Type ATC (1.8 sec)" },
                    { label: "Max Tool Diameter (Adjacent)", value: "Ø100 x 300mm" },
                    { label: "Max Tool Weight", value: "8 KGS" },
                ],
            },
            {
                groupName: "Motors",
                items: [
                    { label: "Spindle Motor (Rated/Max)", value: "7.5 kW / 11 kW" },
                    { label: "X/Y Axis Servo Motor", value: "2.0 kW" },
                    { label: "Z Axis Servo Motor", value: "3.0 kW BS" },
                ],
            },
            {
                groupName: "Accuracy",
                items: [
                    { label: "Positioning Accuracy (JIS)", value: "± 0.008mm / 300mm" },
                    { label: "Repeatability Accuracy (JIS)", value: "± 0.003mm" },
                ],
            },
        ],
        standardAccessories: [
            "BT-40 Direct Driven (DDS) 12,000 RPM",
            "Air-Blast Through Spindle",
            "Work Lamp / Work LED Light",
            "Three Color Light",
            "Auto Power Off",
            "Auto Lubrication System",
            "Rigid Tapping & Threading System",
            "Heat Exchanger for Controller Cabinet",
            "Spindle Oil Coolant System",
            "Tool Box & Tools",
            "Screw Type Chip Conveyor + Cart",
            "Tool Length Measuring Equipment",
            "Arm-Type ATC-24 Tools",
            "High Pressure Water & Air-Gun",
            "Chip Flush System & Nobs",
            "Full Splash Guard",
            "USB Interface",
            "Spindle Cutting Coolant Ring",
        ],
        optionalAccessories: [
            "4th Axis Rotary Table: Ø125 / Ø170 / Ø210 / Ø255mm",
            "Chain Type Chip Conveyor + Cart",
            "Semi-Auto Rotary Table APC System",
            "LCD Screen 15 Inch",
            "Heavy Spindle Motor 11kW/18.5kW",
            "CE Safety Doors System",
            "Heavy Spindle Torque Motor",
            "CE Approved Certification",
        ],
        machineWeight: "4,700 KG (4.7 Ton)",
        machineDimensions: "2300 x 2300 x 2400mm",
        powerRequirement: "20 kVA (7.5/11kW), 3φ-AC 220V ±5% / 3φ-AC 380V 60Hz ±5%",
    },

    {
        modelName: "NANO-X10",
        slug: "nano-x10",
        category: "CNC Vertical Machine Center",
        subCategory: "ECO-LINE 3 Axis Machines",
        tagline: "Eco-Line Large-Table 3 Axis Vertical Machining Center",
        description: "The NANO-X10 offers a larger work envelope with 1020mm X-axis travel and 1200x600mm table size. Direct-driven spindle at 12,000 RPM with BT-40 taper, roller linear guideways, and 24-tool ATC. Perfect for larger workpieces requiring precision machining.",
        images: [],
        specifications: [
            {
                groupName: "Travel",
                items: [
                    { label: "X-Axis Travel", value: "1020mm" },
                    { label: "Y-Axis Travel", value: "550mm" },
                    { label: "Z-Axis Travel", value: "550mm" },
                    { label: "Spindle Nose to Table", value: "100–700mm" },
                    { label: "Spindle Center to Z-Rail", value: "550mm" },
                    { label: "Three-Axis Guideway", value: "X Y Z Load Roller Linear Guideway" },
                ],
            },
            {
                groupName: "Table",
                items: [
                    { label: "Table Size", value: "1200 x 600mm" },
                    { label: "T-Slot (Number x Width x Pitch)", value: "5 x 18 x 100mm" },
                    { label: "Maximum Table Load", value: "900 KGS" },
                ],
            },
            {
                groupName: "Spindle",
                items: [
                    { label: "Spindle Taper", value: "(Ø140mm) BT-40" },
                    { label: "Spindle Driven", value: "Direct Driven (DDS)" },
                    { label: "Spindle Speed", value: "12,000 RPM" },
                ],
            },
            {
                groupName: "Feed Rate",
                items: [
                    { label: "X/Y Axis Rapid Traverse", value: "40 / 40 m/min" },
                    { label: "Z-Axis Rapid Traverse", value: "40 m/min" },
                    { label: "Max Cutting Feed Rate", value: "12 m/min" },
                ],
            },
            {
                groupName: "ATC Tool Changer",
                items: [
                    { label: "Type (Tool to Tool)", value: "24 Tools Arm-Type ATC (1.8 sec)" },
                    { label: "Max Tool Diameter (Adjacent)", value: "Ø100 x 300mm" },
                    { label: "Max Tool Weight", value: "8 KGS" },
                ],
            },
            {
                groupName: "Motors",
                items: [
                    { label: "Spindle Motor (Rated/Max)", value: "7.5 kW / 11 kW" },
                    { label: "X/Y Axis Servo Motor", value: "2.0 kW" },
                    { label: "Z Axis Servo Motor", value: "3.0 kW BS" },
                ],
            },
        ],
        standardAccessories: [
            "BT-40 Direct Driven (DDS) 12,000 RPM",
            "Air-Blast Through Spindle",
            "Work Lamp / Work LED Light",
            "Three Color Light",
            "Auto Power Off",
            "Auto Lubrication System",
            "Rigid Tapping & Threading System",
            "Heat Exchanger for Controller Cabinet",
            "Spindle Oil Coolant System",
            "Tool Box & Tools",
            "Screw Type Chip Conveyor + Cart",
            "Tool Length Measuring Equipment",
            "Arm-Type ATC-24 Tools",
            "High Pressure Water & Air-Gun",
            "Chip Flush System & Nobs",
            "Full Splash Guard",
            "USB Interface",
            "Spindle Cutting Coolant Ring",
        ],
        optionalAccessories: [
            "4th Axis Rotary Table: Ø125 / Ø170 / Ø210 / Ø255mm",
            "Chain Type Chip Conveyor + Cart",
            "Semi-Auto Rotary Table APC System",
            "LCD Screen 15 Inch",
            "Heavy Spindle Motor 11kW/18.5kW",
            "CE Safety Doors System",
            "Heavy Spindle Torque Motor",
            "CE Approved Certification",
        ],
        machineWeight: "5,500 KG (5.5 Ton)",
        machineDimensions: "2600 x 2400 x 2500mm",
        powerRequirement: "25 kVA, 3φ-AC 220V ±5% / 3φ-AC 380V 60Hz ±5%",
    },


    // ────────────────────────────────────────────────────
    //  CNC VERTICAL MACHINE CENTER → HIGH SPEED 3 AXIS
    // ────────────────────────────────────────────────────
    {
        modelName: "NV-855",
        slug: "nv-855",
        category: "CNC Vertical Machine Center",
        subCategory: "HIGH SPEED 3 Axis Machines",
        tagline: "High Speed 3 Axis Vertical Machining Center",
        description: "The NV-855 is a high-speed 3-axis vertical machining center with 830mm X-axis travel. Features direct-driven spindle at 12,000 RPM, BT-40 taper, roller linear guideways on all axes, and 24-tool arm-type ATC. Engineered for high-speed precision machining with superior rigidity.",
        images: [
            { url: "/machines/nv-855.jpeg", altText: "NV-855 Front View", isPrimary: true },
            { url: "/machines/NV-855.png", altText: "NV-855 Angle View" },
        ],
        specifications: [
            {
                groupName: "Travel",
                items: [
                    { label: "X-Axis Travel", value: "830mm" },
                    { label: "Y-Axis Travel", value: "550mm" },
                    { label: "Z-Axis Travel", value: "550mm" },
                    { label: "Spindle Nose to Table", value: "135–685mm" },
                    { label: "Spindle Center to Z-Rail", value: "595mm" },
                    { label: "Three-Axis Guideway", value: "X Y Z Load Roller Linear Guideway" },
                ],
            },
            {
                groupName: "Table",
                items: [
                    { label: "Table Size", value: "1000 x 550mm" },
                    { label: "T-Slot (Number x Width x Pitch)", value: "5 x 18 x 90mm" },
                    { label: "Maximum Table Load", value: "800 KGS" },
                ],
            },
            {
                groupName: "Spindle",
                items: [
                    { label: "Spindle Taper", value: "(Ø140mm) BT-40" },
                    { label: "Spindle Driven", value: "Direct Driven (DDS)" },
                    { label: "Spindle Speed", value: "12,000 RPM" },
                    { label: "Spindle Motor Torque", value: "96 N/m" },
                ],
            },
            {
                groupName: "Feed Rate",
                items: [
                    { label: "X/Y Axis Rapid Traverse", value: "48 / 48 m/min" },
                    { label: "Z-Axis Rapid Traverse", value: "40 m/min" },
                    { label: "Max Cutting Feed Rate", value: "12 m/min" },
                ],
            },
            {
                groupName: "ATC Tool Changer",
                items: [
                    { label: "Type (Tool to Tool)", value: "24 Tools Arm-Type ATC (1.5 sec)" },
                    { label: "Max Tool Diameter (Adjacent)", value: "Ø100 x 300mm" },
                    { label: "Max Tool Weight", value: "8 KGS" },
                ],
            },
            {
                groupName: "Motors",
                items: [
                    { label: "Spindle Motor (Rated/Max)", value: "7.5 kW / 11 kW" },
                    { label: "X/Y Axis Servo Motor", value: "2.0 kW" },
                    { label: "Z Axis Servo Motor", value: "3.0 kW BS" },
                ],
            },
            {
                groupName: "Accuracy",
                items: [
                    { label: "Positioning Accuracy (JIS)", value: "± 0.005mm / 300mm" },
                    { label: "Repeatability Accuracy (JIS)", value: "± 0.002mm" },
                ],
            },
        ],
        standardAccessories: [
            "BT-40 Direct Driven (DDS) 12,000 RPM",
            "Air-Blast Through Spindle",
            "Work Lamp / Work LED Light",
            "Three Color Light",
            "Auto Power Off",
            "Auto Lubrication System",
            "Rigid Tapping & Threading System",
            "Heat Exchanger for Controller Cabinet",
            "Spindle Oil Coolant System",
            "Tool Box & Tools",
            "Screw Type Chip Conveyor + Cart",
            "Tool Length Measuring Equipment",
            "Arm-Type ATC-24 Tools",
            "High Pressure Water & Air-Gun",
            "Chip Flush System & Nobs",
            "Full Splash Guard",
        ],
        optionalAccessories: [
            "4th Axis Rotary Table",
            "Chain Type Chip Conveyor + Cart",
            "CTS 20 bar / 30 bar",
            "Heidenhain Linear Scales for XYZ",
            "Renishaw Touch Probe",
            "CE Safety Doors System",
        ],
        machineWeight: "5,800 KG",
        machineDimensions: "2700 x 2500 x 2600mm",
        powerRequirement: "25 kVA, 3φ-AC 220V ±5% / 3φ-AC 380V 60Hz ±5%",
    },

    {
        modelName: "NV-1165",
        slug: "nv-1165",
        category: "CNC Vertical Machine Center",
        subCategory: "HIGH SPEED 3 Axis Machines",
        tagline: "High Speed Large-Format 3 Axis Vertical Machining Center",
        description: "The NV-1165 provides a spacious 1100mm X-axis travel and 1200x600mm table. With a direct-driven spindle at 12,000 RPM, BT-40 taper, and enhanced rigidity, it delivers superior performance for larger workpieces requiring precision high-speed machining.",
        images: [
            { url: "/machines/nv-1165.jpeg", altText: "NV-1165 Front View", isPrimary: true },
        ],
        specifications: [
            {
                groupName: "Travel",
                items: [
                    { label: "X-Axis Travel", value: "1100mm" },
                    { label: "Y-Axis Travel", value: "650mm" },
                    { label: "Z-Axis Travel", value: "600mm" },
                    { label: "Spindle Nose to Table", value: "120–720mm" },
                    { label: "Spindle Center to Z-Rail", value: "680mm" },
                    { label: "Three-Axis Guideway", value: "X Y Z Load Roller Linear Guideway" },
                ],
            },
            {
                groupName: "Table",
                items: [
                    { label: "Table Size", value: "1200 x 600mm" },
                    { label: "T-Slot (Number x Width x Pitch)", value: "5 x 18 x 100mm" },
                    { label: "Maximum Table Load", value: "900 KGS" },
                ],
            },
            {
                groupName: "Spindle",
                items: [
                    { label: "Spindle Taper", value: "(Ø150mm) BT-40" },
                    { label: "Spindle Driven", value: "Direct Driven (DDS)" },
                    { label: "Spindle Speed", value: "12,000 RPM" },
                    { label: "Spindle Motor Torque", value: "115 N/m" },
                ],
            },
            {
                groupName: "Feed Rate",
                items: [
                    { label: "X/Y Axis Rapid Traverse", value: "48 / 48 m/min" },
                    { label: "Z-Axis Rapid Traverse", value: "40 m/min" },
                    { label: "Max Cutting Feed Rate", value: "12 m/min" },
                ],
            },
            {
                groupName: "ATC Tool Changer",
                items: [
                    { label: "Type (Tool to Tool)", value: "24 Tools Arm-Type ATC (1.5 sec)" },
                    { label: "Max Tool Diameter (Adjacent)", value: "Ø100 x 300mm" },
                    { label: "Max Tool Weight", value: "8 KGS" },
                ],
            },
            {
                groupName: "Motors",
                items: [
                    { label: "Spindle Motor (Rated/Max)", value: "11 kW / 15 kW" },
                    { label: "X/Y Axis Servo Motor", value: "3.0 kW" },
                    { label: "Z Axis Servo Motor", value: "3.0 kW BS" },
                ],
            },
        ],
        standardAccessories: [
            "BT-40 Direct Driven (DDS) 12,000 RPM",
            "Air-Blast Through Spindle",
            "Work Lamp / Work LED Light",
            "Three Color Light",
            "Auto Power Off",
            "Auto Lubrication System",
            "Rigid Tapping & Threading System",
            "Heat Exchanger for Controller Cabinet",
            "Spindle Oil Coolant System",
            "Tool Box & Tools",
            "Screw Type Chip Conveyor + Cart",
            "Tool Length Measuring Equipment",
            "Arm-Type ATC-24 Tools",
            "High Pressure Water & Air-Gun",
            "Full Splash Guard",
        ],
        optionalAccessories: [
            "4th Axis Rotary Table",
            "Chain Type Chip Conveyor + Cart",
            "CTS 20 bar / 30 bar",
            "Heidenhain Linear Scales",
            "Renishaw Touch Probe",
            "CE Approved Certification",
        ],
        machineWeight: "7,200 KG",
        machineDimensions: "3000 x 2600 x 2700mm",
        powerRequirement: "30 kVA, 3φ-AC 220V ±5% / 3φ-AC 380V 60Hz ±5%",
    },

    {
        modelName: "NV-1370",
        slug: "nv-1370",
        category: "CNC Vertical Machine Center",
        subCategory: "HIGH SPEED 3 Axis Machines",
        tagline: "High Speed Heavy-Duty 3 Axis Vertical Machining Center",
        description: "The NV-1370 is the flagship of the high-speed VMC range with 1300mm X-axis and 750mm Y-axis travel. Rigid inverted Y-shaped structure with full stroke support, 198% increased column span for enhanced rigidity. Direct-driven spindle, 1400x700mm table, ideal for heavy-duty precision machining.",
        images: [
            { url: "/machines/nv-1370.jpeg", altText: "NV-1370 Front View", isPrimary: true },
        ],
        specifications: [
            {
                groupName: "Travel",
                items: [
                    { label: "X-Axis Travel", value: "1300mm" },
                    { label: "Y-Axis Travel", value: "750mm" },
                    { label: "Z-Axis Travel", value: "700mm" },
                    { label: "Spindle Nose to Table", value: "120–820mm" },
                    { label: "Spindle Center to Z-Rail", value: "780mm" },
                    { label: "Three-Axis Guideway", value: "X Y Z Load Roller Linear Guideway" },
                ],
            },
            {
                groupName: "Table",
                items: [
                    { label: "Table Size", value: "1400 x 700mm" },
                    { label: "T-Slot (Number x Width x Pitch)", value: "5 x 22 x 125mm" },
                    { label: "Maximum Table Load", value: "1200 KGS" },
                ],
            },
            {
                groupName: "Spindle",
                items: [
                    { label: "Spindle Taper", value: "(Ø150mm) BT-40" },
                    { label: "Spindle Driven", value: "Direct Driven (DDS)" },
                    { label: "Spindle Speed", value: "12,000 RPM" },
                    { label: "Spindle Motor Torque", value: "115 N/m" },
                ],
            },
            {
                groupName: "Feed Rate",
                items: [
                    { label: "X/Y Axis Rapid Traverse", value: "36 / 36 m/min" },
                    { label: "Z-Axis Rapid Traverse", value: "30 m/min" },
                    { label: "Max Cutting Feed Rate", value: "12 m/min" },
                ],
            },
            {
                groupName: "ATC Tool Changer",
                items: [
                    { label: "Type (Tool to Tool)", value: "24 Tools Arm-Type ATC (1.5 sec)" },
                    { label: "Max Tool Diameter (Adjacent)", value: "Ø100 x 350mm" },
                    { label: "Max Tool Weight", value: "8 KGS" },
                ],
            },
            {
                groupName: "Motors",
                items: [
                    { label: "Spindle Motor (Rated/Max)", value: "11 kW / 18.5 kW" },
                    { label: "X/Y Axis Servo Motor", value: "3.0 kW" },
                    { label: "Z Axis Servo Motor", value: "3.5 kW BS" },
                ],
            },
            {
                groupName: "Structure Rigidity",
                items: [
                    { label: "Structure Type", value: "Rigid Inverted Y-shaped, Full Stroke Support" },
                    { label: "Column Span", value: "198% Increased for Enhanced Rigidity" },
                    { label: "Counterweight", value: "Without Counterweight – Enhanced Surface Accuracy" },
                ],
            },
        ],
        standardAccessories: [
            "BT-40 Direct Driven (DDS) 12,000 RPM",
            "Air-Blast Through Spindle",
            "Work Lamp / Work LED Light",
            "Three Color Light",
            "Auto Power Off",
            "Auto Lubrication System",
            "Rigid Tapping & Threading System",
            "Heat Exchanger for Controller Cabinet",
            "Spindle Oil Coolant System",
            "Tool Box & Tools",
            "Screw Type Chip Conveyor + Cart",
            "Tool Length Measuring Equipment",
            "Arm-Type ATC-24 Tools",
            "High Pressure Water & Air-Gun",
            "Full Splash Guard",
        ],
        optionalAccessories: [
            "4th Axis Rotary Table",
            "Chain Type Chip Conveyor + Cart",
            "CTS 20 bar / 30 bar",
            "Heidenhain Linear Scales",
            "Renishaw Touch Probe",
            "CE Approved Certification",
        ],
        machineWeight: "9,500 KG",
        machineDimensions: "3400 x 2900 x 3000mm",
        powerRequirement: "35 kVA, 3φ-AC 220V ±5% / 3φ-AC 380V 60Hz ±5%",
    },


    // ────────────────────────────────────────────────────
    //  CNC HORIZONTAL MACHINE CENTER
    // ────────────────────────────────────────────────────
    {
        modelName: "HMC-630A",
        slug: "hmc-630a",
        category: "CNC Horizontal Machine Center",
        subCategory: "",
        tagline: "Heavy-Duty Horizontal Machining Center",
        description: "The HMC-630A is a heavy-duty horizontal machining center with 630x630mm pallet, 1050mm X-axis travel, and BT-50 spindle taper. Supports belt, direct, and gear head drive types up to 8000 RPM. 30-tool arm-type ATC and 1200kg table load capacity for demanding production environments.",
        images: [
            { url: "/machines/hmc-630A.jpeg", altText: "HMC-630A Horizontal Machining Center", isPrimary: true },
        ],
        specifications: [
            {
                groupName: "Travel",
                items: [
                    { label: "X, Y, Z Axis Travel", value: "X: 1050, Y: 850, Z: 950mm" },
                    { label: "Spindle Nose to Pallet", value: "150–1100mm" },
                    { label: "Spindle Center to Pallet Surface", value: "90–940mm" },
                ],
            },
            {
                groupName: "Table",
                items: [
                    { label: "Table Size", value: "630 x 630mm" },
                    { label: "Workbench Number", value: "1 (Opt. 2)" },
                    { label: "Workbench Surface Configuration", value: "M16-125mm" },
                    { label: "Maximum Workbench Load", value: "1200 kg" },
                    { label: "Smallest Unit of Setting", value: "1° (Opt. 0.001°)" },
                ],
            },
            {
                groupName: "Spindle",
                items: [
                    { label: "Spindle Taper", value: "BT-50" },
                    { label: "Drive Types", value: "Belt Type / Direct Type / Gear Head" },
                    { label: "Spindle RPM", value: "6000 / 8000 / 6000 RPM" },
                    { label: "Spindle Motor", value: "15/18.5 kW (Belt) / 22/26 kW (Direct) / 15/18.5 kW (Gear)" },
                ],
            },
            {
                groupName: "Feed Rate",
                items: [
                    { label: "X/Z Axis Rapid Feed", value: "24 m/min" },
                    { label: "Y Axis Rapid Feed", value: "24 m/min" },
                    { label: "Max Cutting Feed Rate", value: "6 m/min" },
                ],
            },
            {
                groupName: "ATC Tool Changer",
                items: [
                    { label: "Type (Tool to Tool)", value: "30T Arm-Type (4.5 sec)" },
                    { label: "Tool Shank", value: "BT-50" },
                    { label: "Max Tool Diameter x Length (Adjacent)", value: "Ø200 x 350mm (Ø105 x 350mm)" },
                    { label: "Max Tool Weight", value: "15 kg" },
                ],
            },
            {
                groupName: "Controller & Motors",
                items: [
                    { label: "X Axis Servo Motor", value: "3 kW (36 Nm)" },
                    { label: "Y Axis Servo Motor", value: "3 kW (36 Nm) BS" },
                    { label: "Z Axis Servo Motor", value: "3 kW (36 Nm)" },
                    { label: "B Axis Servo Motor", value: "2.5 kW (20 Nm)" },
                ],
            },
        ],
        standardAccessories: [
            "Fully-Enclosed Splash Guard",
            "Electrical Cabinet with Heat Exchanger",
            "Work Lamp + Alarm Lamp",
            "High Pressure Coolant & Air Gun",
            "Spindle Air Blast & Coolant Nozzle",
            "Rigid Tapping",
            "Auto Lubrication System",
            "Editable CF Card Function",
            "Portable Hand Wheel (MPG)",
            "Auto Interrupt & Power Off System",
            "Leveling Blocks & Screws",
            "Tool & Tool Box",
            "Chip Flushing System",
            "Spindle Coolant System",
            "Screw Type Chip Conveyor + Cart",
            "Operation Manual",
        ],
        optionalAccessories: [
            "FANUC 0i-MF (Alpha Package) + AICC II",
            "Air Conditioner for Electrical Cabinet",
            "Chain Type ATC-40T / 60T / 80T",
            "CTS 30 bar / 50 bar",
            "Heidenhain Linear Scales for XYZ",
            "Renishaw TS-27R Touch Probe",
            "Renishaw NC4 Laser Probe",
            "Renishaw OMP60 Workpiece Probe",
            "Transformer 30kVA",
            "Oil Skimmer",
            "CE Standard",
        ],
        machineWeight: "A: 15,500 kg / B: 17,000 kg",
        machineDimensions: "A: 6000 x 4600 x 3800mm / B: 6500 x 4600 x 3800mm",
        powerRequirement: "30 kVA, 3φ-AC 220V ±5%",
    },

    {
        modelName: "HMC-800A",
        slug: "hmc-800a",
        category: "CNC Horizontal Machine Center",
        subCategory: "",
        tagline: "Large-Format Heavy-Duty Horizontal Machining Center",
        description: "The HMC-800A features an 800x800mm pallet with 1300mm X-axis travel. BT-50 spindle taper with multiple drive options up to 8000 RPM. 30-tool ATC and up to 2000kg table load. Designed for heavy-duty horizontal machining of large workpieces.",
        images: [
            { url: "/machines/HMC-800A.png", altText: "HMC-800A Horizontal Machining Center", isPrimary: true },
        ],
        specifications: [
            {
                groupName: "Travel",
                items: [
                    { label: "X, Y, Z Axis Travel", value: "X: 1300, Y: 1000, Z: 1050mm" },
                    { label: "Spindle Nose to Pallet", value: "150–1200mm" },
                    { label: "Spindle Center to Pallet Surface", value: "90–1090mm" },
                ],
            },
            {
                groupName: "Table",
                items: [
                    { label: "Table Size", value: "800 x 800mm" },
                    { label: "Workbench Number", value: "1 (Opt. 2)" },
                    { label: "Workbench Surface Configuration", value: "M16-160mm" },
                    { label: "Maximum Workbench Load", value: "1300–2000 kg" },
                    { label: "Smallest Unit of Setting", value: "1° (Opt. 0.001°)" },
                ],
            },
            {
                groupName: "Spindle",
                items: [
                    { label: "Spindle Taper", value: "BT-50" },
                    { label: "Drive Types", value: "Belt Type / Direct Type / Gear Head" },
                    { label: "Spindle RPM", value: "6000 / 8000 / 6000 RPM" },
                    { label: "Spindle Motor", value: "15/18.5 kW (Belt) / 22/26 kW (Direct) / 15/18.5 kW (Gear)" },
                ],
            },
            {
                groupName: "Feed Rate",
                items: [
                    { label: "X/Z Axis Rapid Feed", value: "24 m/min" },
                    { label: "Y Axis Rapid Feed", value: "24 m/min" },
                    { label: "Max Cutting Feed Rate", value: "6 m/min" },
                ],
            },
            {
                groupName: "ATC Tool Changer",
                items: [
                    { label: "Type (Tool to Tool)", value: "30T Arm-Type (4.5 sec)" },
                    { label: "Tool Shank", value: "BT-50" },
                    { label: "Max Tool Diameter x Length", value: "Ø200 x 350mm" },
                    { label: "Max Tool Weight", value: "15 kg" },
                ],
            },
        ],
        standardAccessories: [
            "Fully-Enclosed Splash Guard",
            "Electrical Cabinet with Heat Exchanger",
            "Work Lamp + Alarm Lamp",
            "High Pressure Coolant & Air Gun",
            "Spindle Air Blast & Coolant Nozzle",
            "Rigid Tapping",
            "Auto Lubrication System",
            "Screw Type Chip Conveyor + Cart",
            "Operation Manual",
        ],
        optionalAccessories: [
            "FANUC 0i-MF (Alpha Package) + AICC II",
            "Chain Type ATC-40T / 60T / 80T",
            "CTS 30 bar / 50 bar",
            "Heidenhain Linear Scales",
            "Renishaw Probes",
            "CE Standard",
        ],
        machineWeight: "18,000 kg",
        machineDimensions: "7000 x 5000 x 4000mm",
        powerRequirement: "35 kVA, 3φ-AC 220V ±5%",
    },


    // ────────────────────────────────────────────────────
    //  CNC SLANT-BED LATHE MACHINE
    // ────────────────────────────────────────────────────
    {
        modelName: "3105S",
        slug: "3105s",
        category: "CNC Slant-Bed Lathe Machine",
        subCategory: "",
        tagline: "Slant-Bed CNC Lathe — Standard Series",
        description: "The 3105S is a precision slant-bed CNC lathe with Ø740mm swing over bed and 708mm max turning length. Features 12-station turret, 2800 RPM belt-drive spindle, A2-8 nose with 12-inch chuck, and Ø74mm bar capacity. Perfect for high-precision turning operations.",
        images: [
            { url: "/machines/3105S.jpeg", altText: "3105S Slant-Bed CNC Lathe", isPrimary: true },
        ],
        specifications: [
            {
                groupName: "Capacity",
                items: [
                    { label: "Swing Over Bed", value: "Ø740mm" },
                    { label: "Max Rotational Diameter", value: "Ø656mm" },
                    { label: "Max Turning Diameter", value: "Ø500mm" },
                    { label: "Max Turning Length", value: "708mm [1,288mm]" },
                    { label: "Bar Working Diameter", value: "Ø74mm" },
                ],
            },
            {
                groupName: "Travel",
                items: [
                    { label: "X-Axis Travel", value: "260mm" },
                    { label: "Z-Axis Travel", value: "730mm [1,350mm]" },
                ],
            },
            {
                groupName: "Feed Rates",
                items: [
                    { label: "X-Axis Rapid Traverse", value: "24 m/min" },
                    { label: "Z-Axis Rapid Traverse", value: "30 m/min" },
                ],
            },
            {
                groupName: "Spindle",
                items: [
                    { label: "Spindle Speed (Belt Type)", value: "2800 r/min" },
                    { label: "Spindle Nose", value: "12 inch chuck, A2-8" },
                    { label: "Spindle Through Hole Diameter", value: "Ø91mm" },
                ],
            },
            {
                groupName: "Turret",
                items: [
                    { label: "No. of Tool Stations", value: "12" },
                    { label: "OD Tool Size", value: "25mm" },
                    { label: "Boring Bar Diameter", value: "50mm" },
                    { label: "Indexing Time (1st Swivel)", value: "0.2 sec" },
                ],
            },
            {
                groupName: "Tailstock",
                items: [
                    { label: "Quill Diameter", value: "Ø100mm" },
                    { label: "Quill Bore Taper (Live)", value: "MT5" },
                    { label: "Tailstock Bushing Travel", value: "120mm" },
                ],
            },
            {
                groupName: "Motors",
                items: [
                    { label: "Main Spindle Motor", value: "15/18.5 kW" },
                    { label: "Coolant Motor Power", value: "0.4 kW" },
                ],
            },
        ],
        standardAccessories: [],
        optionalAccessories: [],
        machineWeight: "5,800 kg [7,000 kg]",
        machineDimensions: "L: 3,284/4,359 x W: 1,817/1,879mm, H: 1,755mm",
        powerRequirement: "30 kVA, 3φ-AC 220V ±5%",
    },

    {
        modelName: "3105M",
        slug: "3105m",
        category: "CNC Slant-Bed Lathe Machine",
        subCategory: "",
        tagline: "Slant-Bed CNC Lathe — Milling Series with BMT Turret",
        description: "The 3105M is the milling-capable variant with BMT55/65 turret, 12-station tool system, and 4000 RPM rotary tool spindle. Features C-axis with 0.001° indexing for complex mill-turn operations. Available in both BMT55 and BMT65 configurations.",
        images: [],
        specifications: [
            {
                groupName: "Capacity",
                items: [
                    { label: "Swing Over Bed", value: "Ø740mm" },
                    { label: "Max Rotational Diameter", value: "Ø656mm" },
                    { label: "Max Turning Diameter", value: "BMT55: Ø530mm / BMT65: Ø480mm" },
                    { label: "Max Turning Length", value: "BMT55: 654mm [1,235mm] / BMT65: 658mm [1,238mm]" },
                ],
            },
            {
                groupName: "Travel",
                items: [
                    { label: "X-Axis Travel", value: "260mm" },
                    { label: "Z-Axis Travel", value: "730mm [1,350mm]" },
                ],
            },
            {
                groupName: "Spindle",
                items: [
                    { label: "Spindle Speed", value: "2800 r/min" },
                    { label: "C-Axis Min Indexing Angle", value: "0.001°" },
                ],
            },
            {
                groupName: "Turret",
                items: [
                    { label: "No. of Tool Stations", value: "12 / BMT55 / BMT65" },
                    { label: "Boring Bar Diameter", value: "40mm" },
                    { label: "Rotary Tool Spindle Speed", value: "4000 r/min" },
                ],
            },
        ],
        standardAccessories: [],
        optionalAccessories: [],
        machineWeight: "5,800 kg [7,000 kg]",
        machineDimensions: "L: 3,284/4,359 x W: 1,817/1,879mm",
        powerRequirement: "35 kVA",
    },

    {
        modelName: "3105L",
        slug: "3105l",
        category: "CNC Slant-Bed Lathe Machine",
        subCategory: "",
        tagline: "Slant-Bed CNC Lathe — Y-Axis Series",
        description: "The 3105L features Y-axis capability with ±55mm travel for off-center machining. 3000 RPM spindle, 10-inch chuck with A2-8 nose, 12-station BMT55 turret. Ideal for complex parts requiring Y-axis milling operations.",
        images: [],
        specifications: [
            {
                groupName: "Capacity",
                items: [
                    { label: "Swing Over Bed", value: "Ø740mm" },
                    { label: "Max Rotational Diameter", value: "Ø656mm" },
                    { label: "Max Turning Diameter", value: "Ø300mm" },
                    { label: "Max Turning Length", value: "660mm [1,225mm]" },
                ],
            },
            {
                groupName: "Travel",
                items: [
                    { label: "X-Axis Travel", value: "215mm" },
                    { label: "Z-Axis Travel", value: "730mm [1,350mm]" },
                    { label: "Y-Axis Travel", value: "±55mm" },
                ],
            },
            {
                groupName: "Spindle",
                items: [
                    { label: "Spindle Speed", value: "3000 r/min" },
                    { label: "Spindle Nose", value: "10 inch chuck, A2-8" },
                ],
            },
            {
                groupName: "Feed Rates",
                items: [
                    { label: "Y-Axis Rapid Traverse", value: "10 m/min" },
                ],
            },
            {
                groupName: "Turret",
                items: [
                    { label: "No. of Tool Stations", value: "12 / BMT55" },
                ],
            },
        ],
        standardAccessories: [],
        optionalAccessories: [],
        machineWeight: "6,200 kg (7,300 kg)",
        machineDimensions: "L: 3,413/4,359 x W: 1,860/1,900mm, H: 2,015mm",
        powerRequirement: "35 kVA → 50 kVA",
    },

    {
        modelName: "3605S",
        slug: "3605s",
        category: "CNC Slant-Bed Lathe Machine",
        subCategory: "",
        tagline: "Large Slant-Bed CNC Lathe — Standard Series",
        description: "The 3605S is a large slant-bed CNC lathe with Ø940mm swing over bed, Ø540mm max turning diameter, and 1342mm turning length. Features Ø119mm bar capacity, 295mm X-axis travel, and 24 m/min rapid traverse. Designed for larger workpiece turning.",
        images: [],
        specifications: [
            {
                groupName: "Capacity",
                items: [
                    { label: "Swing Over Bed", value: "Ø940mm" },
                    { label: "Max Rotational Diameter", value: "Ø855mm" },
                    { label: "Max Turning Diameter", value: "Ø540mm" },
                    { label: "Max Turning Length", value: "1342mm [2120/3120mm]" },
                    { label: "Bar Working Diameter", value: "Ø119mm" },
                ],
            },
            {
                groupName: "Travel",
                items: [
                    { label: "X-Axis Travel", value: "295mm" },
                    { label: "Z-Axis Travel", value: "1,350mm [2,150/3,150mm]" },
                ],
            },
            {
                groupName: "Feed Rates",
                items: [
                    { label: "X-Axis Rapid Traverse", value: "24 m/min" },
                    { label: "Z-Axis Rapid Traverse", value: "30 m/min" },
                ],
            },
            {
                groupName: "Spindle",
                items: [
                    { label: "Spindle Speed (Belt Type)", value: "2800 r/min" },
                ],
            },
        ],
        standardAccessories: [],
        optionalAccessories: [],
        machineWeight: "7,500 kg",
        machineDimensions: "Large format slant-bed configuration",
        powerRequirement: "30 kVA",
    },

    {
        modelName: "3605M",
        slug: "3605m",
        category: "CNC Slant-Bed Lathe Machine",
        subCategory: "",
        tagline: "Large Slant-Bed CNC Lathe — Milling Series",
        description: "The 3605M brings milling capability to the large slant-bed platform with Ø520mm turning diameter and 1265mm turning length. Features C-axis indexing and BMT turret for complex mill-turn operations on large parts.",
        images: [
            { url: "/machines/3605M.jpeg", altText: "3605M Large Slant-Bed CNC Lathe Milling Series", isPrimary: true },
        ],
        specifications: [
            {
                groupName: "Capacity",
                items: [
                    { label: "Swing Over Bed", value: "Ø940mm" },
                    { label: "Max Turning Diameter", value: "Ø520mm" },
                    { label: "Max Turning Length", value: "1265mm [2070/3070mm]" },
                ],
            },
            {
                groupName: "Travel",
                items: [
                    { label: "X-Axis Travel", value: "295mm" },
                    { label: "Z-Axis Travel", value: "1,350mm [2,150/3,150mm]" },
                ],
            },
        ],
        standardAccessories: [],
        optionalAccessories: [],
        machineWeight: "8,000 kg",
        machineDimensions: "Large format slant-bed configuration",
        powerRequirement: "35 kVA",
    },


    // ────────────────────────────────────────────────────
    //  CNC VERTICAL LATHE MACHINE
    // ────────────────────────────────────────────────────
    {
        modelName: "VLT-550",
        slug: "vlt-550",
        category: "CNC Vertical Lathe Machine",
        subCategory: "",
        tagline: "CNC Vertical Lathe for Precision Turning",
        description: "The VLT-550 is a precision CNC vertical lathe with 12-inch chuck, Ø550mm max turning diameter, and 580mm Z-axis travel. Features A2-8 spindle nose, 8-station horizontal turret, and 50-2000 RPM spindle speed. FANUC 0i-TF controller included as standard.",
        images: [
            { url: "/machines/vlt-550.jpeg", altText: "VLT-550 CNC Vertical Lathe", isPrimary: true },
        ],
        specifications: [
            {
                groupName: "Travel",
                items: [
                    { label: "X-Axis Travel", value: "+300 / -30mm" },
                    { label: "Z-Axis Travel", value: "580mm" },
                ],
            },
            {
                groupName: "Capacity",
                items: [
                    { label: "Chuck Diameter", value: "12 inch" },
                    { label: "Max Swing", value: "Ø650mm" },
                    { label: "Max Turning Diameter", value: "Ø550mm" },
                    { label: "Max Turning Length", value: "Ø550mm" },
                    { label: "Maximum Workpiece Weight", value: "500 kgs" },
                ],
            },
            {
                groupName: "Spindle",
                items: [
                    { label: "Spindle Nose", value: "A2-8" },
                    { label: "Spindle Bearing Diameter", value: "Ø130mm" },
                    { label: "Spindle Speed", value: "50–2000 RPM" },
                ],
            },
            {
                groupName: "Turret",
                items: [
                    { label: "Turret Type", value: "Horizontal" },
                    { label: "Number of Tools", value: "8" },
                    { label: "Cutter Size", value: "Ø32, Opt. Ø50" },
                ],
            },
            {
                groupName: "Feed Rate",
                items: [
                    { label: "X-Axis Rapid Feed", value: "12 m/min" },
                    { label: "Z-Axis Rapid Feed", value: "20 m/min" },
                ],
            },
            {
                groupName: "Motors",
                items: [
                    { label: "Spindle Motor", value: "15/18.5 kW" },
                    { label: "X Axis Servo Motor", value: "3 kW" },
                    { label: "Z Axis Servo Motor", value: "3 kW BS" },
                    { label: "Coolant Pump Motor", value: "750W" },
                    { label: "Hydraulic Motor", value: "2.2 kW" },
                ],
            },
        ],
        standardAccessories: [
            "FANUC 0i-TF Controller",
            "10.4 inch LCD Screen",
            "Leveling Bolts and Blocks",
            "Tool Box & Tool",
            "Work Lamp",
            "Alarm Lamp",
            "Auto Power Off",
            "Auto Lubrication System",
            "Chain Type Chip Conveyor with Car",
            "12 inch Three Jaw Solid Oil Pressure Chuck and Rotary Cylinder",
            "Chip Flush",
            "Standard Knife Dish",
            "Heat Exchanger for Control Cabinet",
            "Remote Manual Pulse Generator",
            "12 inch Soft Paws",
            "High and Low Pressure Loop of Collet",
            "Air Gun",
            "Full Splash Guard",
            "System Operation Manual",
            "Machine Manual",
        ],
        optionalAccessories: [
            "Automatic Door System",
            "Oil Skimmer",
            "Air Conditioner for Electrical Cabinet",
            "Hard-Jaw",
            "Oil Mist Collector System",
            "ZF Gearbox",
            "Coolant Intercooling System",
            "Safety Door Switch",
            "Heidenhain Optical Linear Scales",
            "Paper Bank Filter System",
            "18 inch Three Jaw Solid Oil Pressure Chuck",
        ],
        machineWeight: "7,000 KG",
        machineDimensions: "2000 x 3660 x 3100mm",
        powerRequirement: "28 kVA, 3φ-AC 220V ±5%",
    },

    {
        modelName: "VLT-750",
        slug: "vlt-750",
        category: "CNC Vertical Lathe Machine",
        subCategory: "",
        tagline: "Large CNC Vertical Lathe for Heavy Workpieces",
        description: "The VLT-750 is a large CNC vertical lathe with 15-inch chuck, Ø750mm max turning diameter, and 700mm Z-axis travel. A2-11 spindle nose, 8-station horizontal turret, 1000kg workpiece capacity. Designed for heavy-duty vertical turning of large components.",
        images: [
            { url: "/machines/vlt-750.jpeg", altText: "VLT-750 CNC Vertical Lathe", isPrimary: true },
        ],
        specifications: [
            {
                groupName: "Travel",
                items: [
                    { label: "X-Axis Travel", value: "+400 / -30mm" },
                    { label: "Z-Axis Travel", value: "700mm" },
                ],
            },
            {
                groupName: "Capacity",
                items: [
                    { label: "Chuck Diameter", value: "15 inch" },
                    { label: "Max Swing", value: "Ø800mm" },
                    { label: "Max Turning Diameter", value: "Ø750mm" },
                    { label: "Max Turning Length", value: "Ø650mm" },
                    { label: "Maximum Workpiece Weight", value: "1000 kg" },
                ],
            },
            {
                groupName: "Spindle",
                items: [
                    { label: "Spindle Nose", value: "A2-11" },
                    { label: "Spindle Bearing Diameter", value: "Ø160mm" },
                    { label: "Spindle Speed", value: "50–2000 RPM" },
                ],
            },
            {
                groupName: "Turret",
                items: [
                    { label: "Turret Type", value: "Horizontal" },
                    { label: "Number of Tools", value: "8" },
                ],
            },
            {
                groupName: "Feed Rate",
                items: [
                    { label: "X-Axis Rapid Feed", value: "12 m/min" },
                    { label: "Z-Axis Rapid Feed", value: "20 m/min" },
                ],
            },
        ],
        standardAccessories: [
            "FANUC 0i-TF Controller",
            "10.4 inch LCD Screen",
            "Leveling Bolts and Blocks",
            "Tool Box & Tool",
            "Work Lamp & Alarm Lamp",
            "Auto Power Off",
            "Auto Lubrication System",
            "Chain Type Chip Conveyor with Car",
            "15 inch Three Jaw Solid Oil Pressure Chuck and Rotary Cylinder",
            "Chip Flush",
            "Heat Exchanger for Control Cabinet",
            "Full Splash Guard",
            "Machine Manual",
        ],
        optionalAccessories: [
            "Automatic Door System",
            "Oil Skimmer",
            "Air Conditioner for Electrical Cabinet",
            "Oil Mist Collector System",
            "Heidenhain Optical Linear Scales",
            "Paper Bank Filter System",
        ],
        machineWeight: "9,500 KG",
        machineDimensions: "2200 x 4000 x 3300mm",
        powerRequirement: "35 kVA, 3φ-AC 220V ±5%",
    },

];


// ═══════════════════════════════════════════════════════════════
//  SEED FUNCTION
// ═══════════════════════════════════════════════════════════════

const seedProducts = async () => {
    try {
        await mongoose.connect(ENV.DB_URL);
        console.log("MongoDB Connected for seeding...");

        // Clear existing products
        await Product.deleteMany({});
        console.log("Cleared existing products.");

        // Insert all products
        const inserted = await Product.insertMany(allProducts);
        console.log(`Successfully seeded ${inserted.length} products!`);

        // Log summary
        const categories = [...new Set(inserted.map(p => p.category))];
        categories.forEach(cat => {
            const count = inserted.filter(p => p.category === cat).length;
            console.log(`  - ${cat}: ${count} products`);
        });

    } catch (err) {
        console.error("Seeding failed:", err.message);
    } finally {
        await mongoose.disconnect();
        console.log("MongoDB disconnected.");
    }
};


seedProducts();
