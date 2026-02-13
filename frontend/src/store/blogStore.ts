import api from "@/config/axios";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";


interface ApiErrorResponse {
    success?: boolean;
    message: string
}


// handle error
const handleError = (err: unknown) => {
    const error = err as AxiosError<ApiErrorResponse>;
    const serverMessage = error?.response?.data?.message;
    const msg = serverMessage || error.message || "Request failed";

    return msg;
}



export interface Blog {
    _id?: string;
    title: string;
    category: string;
    content: string;
    image?: string;
    imagePublicId?: string;
    createdAt?: string;
    updatedAt?: string;
}


interface BlogState {

    isLoading: boolean;
    blogs: Blog[];

    createBlog: (data: FormData) => Promise<boolean>;
    getAllBlogs: () => Promise<void>;
    getBlogById: (id: string) => Promise<Blog | null>;
    updateBlog: (id: string, data: FormData) => Promise<boolean>;
    deleteBlog: (id: string) => Promise<void>;

}


export const useBlogStore = create<BlogState>((set) => ({

    isLoading: false,
    blogs: [],


    // CREATE BLOG
    createBlog: async (data: FormData): Promise<boolean> => {

        set({ isLoading: true });

        try {

            const response = await api.post("/blogs/create", data, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            const { success, message } = response.data;

            if (success) {
                toast.success(message);
                return true;
            }

            return false;

        } catch (err) {
            const msg = handleError(err);
            toast.error(msg);
            return false;
        } finally {
            set({ isLoading: false });
        }
    },


    // GET ALL BLOGS
    getAllBlogs: async (): Promise<void> => {

        set({ isLoading: true });

        try {

            const response = await api.get("/blogs/all");
            const { success, data } = response.data;

            if (success) {
                set({ blogs: data });
            }

        } catch (err) {
            const msg = handleError(err);
            toast.error(msg);
        } finally {
            set({ isLoading: false });
        }
    },


    // GET BLOG BY ID
    getBlogById: async (id: string): Promise<Blog | null> => {

        set({ isLoading: true });

        try {

            const response = await api.get(`/blogs/${id}`);
            const { success, data } = response.data;

            if (success) {
                return data;
            }

            return null;

        } catch (err) {
            console.log(err);
            return null;
        } finally {
            set({ isLoading: false });
        }
    },


    // UPDATE BLOG
    updateBlog: async (id: string, data: FormData): Promise<boolean> => {

        set({ isLoading: true });

        try {

            const response = await api.put(`/blogs/${id}/update`, data, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            const { success, message, data: updatedBlog } = response.data;

            if (success) {
                set((state) => ({
                    blogs: state.blogs.map((blog) =>
                        blog._id === id ? updatedBlog : blog
                    )
                }));
                toast.success(message);
                return true;
            }

            return false;

        } catch (err) {
            const msg = handleError(err);
            toast.error(msg);
            return false;
        } finally {
            set({ isLoading: false });
        }
    },


    // DELETE BLOG
    deleteBlog: async (id: string): Promise<void> => {

        set({ isLoading: true });

        try {

            const response = await api.delete(`/blogs/${id}/delete`);
            const { success, message } = response.data;

            if (success) {
                set((state) => ({
                    blogs: state.blogs.filter((blog) => blog._id !== id)
                }));
                toast.success(message);
            } else {
                toast.error(message);
            }

        } catch (err) {
            const msg = handleError(err);
            toast.error(msg);
        } finally {
            set({ isLoading: false });
        }
    },


}));
