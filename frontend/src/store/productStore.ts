import { create } from "zustand";
import api from "@/config/axios";


interface ProductImage {
    url: string;
    publicId?: string;
    altText?: string;
    isPrimary?: boolean;
}

interface SpecItem {
    label: string;
    value: string;
}

interface SpecGroup {
    groupName: string;
    items: SpecItem[];
}

export interface Product {
    _id: string;
    modelName: string;
    slug: string;
    tagline: string;
    description?: string;
    category: string;
    subCategory: string;
    images: ProductImage[];
    specifications: SpecGroup[];
    standardAccessories: string[];
    optionalAccessories: string[];
    machineWeight?: string;
    machineDimensions?: string;
    powerRequirement?: string;
}

interface ProductState {

    products: Product[];
    singleProduct: Product | null;
    categories: string[];
    isLoading: boolean;
    error: string | null;

    fetchProducts: () => Promise<void>;
    fetchCategories: () => Promise<void>;
    fetchProductBySlug: (slug: string) => Promise<Product | null>;
}

export const useProductStore = create<ProductState>((set, get) => ({

    products: [],
    singleProduct: null,
    categories: [],
    isLoading: false,
    error: null,

    fetchProducts: async () => {
        if (get().products.length > 0) return;
        set({ isLoading: true, error: null });
        try {
            const res = await api.get("/products/all");
            set({ products: res.data.data, isLoading: false });
        } catch (err) {
            console.error("Failed to fetch products:", err);
            set({ error: "Failed to fetch products", isLoading: false });
        }
    },

    fetchCategories: async () => {
        if (get().categories.length > 0) return;
        try {
            const res = await api.get("/products/categories");
            set({ categories: res.data.data });
        } catch (err) {
            console.error("Failed to fetch categories:", err);
        }
    },

    fetchProductBySlug: async (slug: string) => {
        try {
            const res = await api.get(`/products/${slug}`);
            set({ singleProduct: res.data.data });
            return res.data.data as Product;
        } catch (err) {
            console.error("Failed to fetch product:", err);
            set({ singleProduct: null });
            return null;
        }
    },

}));
