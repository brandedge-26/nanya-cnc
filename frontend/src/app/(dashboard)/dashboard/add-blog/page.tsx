"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { useBlogStore } from "@/store/blogStore";
import toast from "react-hot-toast";
import {
    Bold,
    Italic,
    UnderlineIcon,
    Strikethrough,
    Highlighter,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    List,
    ListOrdered,
    Quote,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Undo2,
    Redo2,
    Minus,
    Eye,
    Pencil,
    Upload,
    X,
} from "lucide-react";
import Image from "next/image";



const categories = [
    { label: "Select Category", value: "" },
    { label: "General Brand & Manufacturing Authority", value: "general-brand-manufacturing-authority" },
    { label: "3-Axis CNC Vertical Machine Center", value: "3-axis-cnc-vertical-machine-center" },
    { label: "CNC Horizontal Machine Center", value: "cnc-horizontal-machine-center" },
    { label: "CNC Vertical Lathe Machine", value: "cnc-vertical-lathe-machine" },
    { label: "CNC Slant Bed Lathe Machine", value: "cnc-slant-bed-lathe-machine" },
    { label: "Conversational Milling & Lathe Machines", value: "conversational-milling-lathe-machines" },
    { label: "Surface Grinder Machine", value: "surface-grinder-machine" },
    { label: "Clamping Vise & Tool Holders", value: "clamping-vise-tool-holders" },
    { label: "CNC Controller Spare Parts", value: "cnc-controller-spare-parts" },
    { label: "Robotics & Automation Solutions", value: "robotics-automation-solutions" },
    { label: "Injection Mold & Hydraulic Press Machines", value: "injection-mold-hydraulic-press-machines" },
];


type ToolbarBtnProps = {
    onClick: () => void;
    active?: boolean;
    children: React.ReactNode;
    title?: string;
};

const ToolbarBtn = ({ onClick, active, children, title }: ToolbarBtnProps) => (
    <button
        type="button"
        onClick={onClick}
        title={title}
        className={`p-2 rounded-lg transition-all duration-200 cursor-pointer ${active
            ? "bg-white/10 text-white"
            : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
            }`}
    >
        {children}
    </button>
);


const AddBlogPage = () => {

    const searchParams = useSearchParams();
    const editId = searchParams.get("edit");
    const isEditMode = !!editId;

    const [tab, setTab] = useState<"write" | "preview">("write");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [html, setHtml] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const { createBlog, updateBlog, getBlogById, isLoading } = useBlogStore();

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3, 4, 5, 6] },
            }),
            Underline,
            Highlight,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Placeholder.configure({ placeholder: "Start writing your blog content..." }),
        ],
        immediatelyRender: false,
        content: "",
        onUpdate({ editor }) {
            setHtml(editor.getHTML());
        },
    });


    // load blog data for edit mode
    useEffect(() => {
        if (!editId || !editor) return;

        const loadBlog = async () => {
            const blog = await getBlogById(editId);
            if (blog) {
                setTitle(blog.title);
                setCategory(blog.category);
                setHtml(blog.content);
                editor.commands.setContent(blog.content);
                if (blog.image) {
                    setImagePreview(blog.image);
                }
            }
        };

        loadBlog();
    }, [editId, editor, getBlogById]);


    // handle image select
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // remove selected image
    const removeImage = () => {
        setImageFile(null);
        setImagePreview("");
    };

    // handle publish / update
    const handlePublish = async () => {

        if (!title.trim() || !category || !html.trim()) {
            toast.error("Please fill all fields");
            return;
        }

        const formData = new FormData();
        formData.append("title", title.trim());
        formData.append("category", category);
        formData.append("content", html);
        if (imageFile) {
            formData.append("image", imageFile);
        }

        if (isEditMode) {
            await updateBlog(editId, formData);
        } else {
            const success = await createBlog(formData);
            if (success) {
                setTitle("");
                setCategory("");
                setHtml("");
                setImageFile(null);
                setImagePreview("");
                editor?.commands.clearContent();
            }
        }
    };


    return (
        <div>
            <h1 className="text-3xl font-bold">{isEditMode ? "Edit Blog" : "Add New Blog"}</h1>
            <p className="text-gray-500 mt-1">{isEditMode ? "Update your blog post" : "Create and publish a new blog post"}</p>

            {/* Tabs */}
            <div className="flex gap-1 mt-6 bg-gray-800/50 p-1 rounded-lg w-fit">
                <button
                    onClick={() => setTab("write")}
                    className={`flex items-center gap-2 px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${tab === "write"
                        ? "bg-white text-black"
                        : "text-gray-400 hover:text-gray-200"
                        }`}
                >
                    <Pencil size={16} />
                    Write
                </button>
                <button
                    onClick={() => setTab("preview")}
                    className={`flex items-center gap-2 px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${tab === "preview"
                        ? "bg-white text-black"
                        : "text-gray-400 hover:text-gray-200"
                        }`}
                >
                    <Eye size={16} />
                    Preview
                </button>
            </div>


            {/* Write Tab */}
            {tab === "write" && (
                <div className="mt-6 space-y-5">

                    {/* Title */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Blog Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter blog title..."
                            className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg bg-transparent border border-gray-700 text-white focus:outline-none focus:border-gray-500 transition appearance-none cursor-pointer"
                        >
                            {categories.map((cat) => (
                                <option key={cat.value} value={cat.value} className="bg-gray-900">
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Blog Image */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Blog Image</label>

                        {imagePreview ? (
                            <div className="relative w-full max-w-md">
                                <Image
                                    src={imagePreview}
                                    alt="Blog preview"
                                    className="w-full h-52 object-cover rounded-lg border border-gray-700"
                                    width={800}
                                    height={208}
                                />
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute top-2 right-2 p-1.5 bg-black/70 rounded-full text-white hover:bg-black transition cursor-pointer"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center w-full max-w-md h-44 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-gray-500 transition">
                                <Upload size={28} className="text-gray-500 mb-2" />
                                <span className="text-sm text-gray-500">Click to upload blog image</span>
                                <span className="text-xs text-gray-600 mt-1">PNG, JPG, JPEG, WEBP</span>
                                <input
                                    type="file"
                                    accept="image/png,image/jpg,image/jpeg,image/webp"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>

                    {/* Editor */}
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Content</label>

                        <div className="border border-gray-700 rounded-lg overflow-hidden">

                            {/* Toolbar */}
                            {editor && (
                                <div className="flex flex-wrap gap-1 p-3 border-b border-gray-700 bg-gray-800/30">

                                    {/* Text formatting */}
                                    <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold">
                                        <Bold size={18} />
                                    </ToolbarBtn>
                                    <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic">
                                        <Italic size={18} />
                                    </ToolbarBtn>
                                    <ToolbarBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline">
                                        <UnderlineIcon size={18} />
                                    </ToolbarBtn>
                                    <ToolbarBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough">
                                        <Strikethrough size={18} />
                                    </ToolbarBtn>
                                    <ToolbarBtn onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive("highlight")} title="Highlight">
                                        <Highlighter size={18} />
                                    </ToolbarBtn>

                                    <div className="w-px h-7 bg-gray-700 mx-1 self-center" />

                                    {/* Headings */}
                                    <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="Heading 1">
                                        <Heading1 size={18} />
                                    </ToolbarBtn>
                                    <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading 2">
                                        <Heading2 size={18} />
                                    </ToolbarBtn>
                                    <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Heading 3">
                                        <Heading3 size={18} />
                                    </ToolbarBtn>
                                    <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} active={editor.isActive("heading", { level: 4 })} title="Heading 4">
                                        <Heading4 size={18} />
                                    </ToolbarBtn>
                                    <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()} active={editor.isActive("heading", { level: 5 })} title="Heading 5">
                                        <Heading5 size={18} />
                                    </ToolbarBtn>
                                    <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()} active={editor.isActive("heading", { level: 6 })} title="Heading 6">
                                        <Heading6 size={18} />
                                    </ToolbarBtn>

                                    <div className="w-px h-7 bg-gray-700 mx-1 self-center" />

                                    {/* Lists */}
                                    <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet List">
                                        <List size={18} />
                                    </ToolbarBtn>
                                    <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Ordered List">
                                        <ListOrdered size={18} />
                                    </ToolbarBtn>

                                    <div className="w-px h-7 bg-gray-700 mx-1 self-center" />

                                    {/* Alignment */}
                                    <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} title="Align Left">
                                        <AlignLeft size={18} />
                                    </ToolbarBtn>
                                    <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} title="Align Center">
                                        <AlignCenter size={18} />
                                    </ToolbarBtn>
                                    <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} title="Align Right">
                                        <AlignRight size={18} />
                                    </ToolbarBtn>

                                    <div className="w-px h-7 bg-gray-700 mx-1 self-center" />

                                    {/* Extras */}
                                    <ToolbarBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Quote">
                                        <Quote size={18} />
                                    </ToolbarBtn>
                                    <ToolbarBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal Rule">
                                        <Minus size={18} />
                                    </ToolbarBtn>

                                    <div className="w-px h-7 bg-gray-700 mx-1 self-center" />

                                    {/* Undo / Redo */}
                                    <ToolbarBtn onClick={() => editor.chain().focus().undo().run()} title="Undo">
                                        <Undo2 size={18} />
                                    </ToolbarBtn>
                                    <ToolbarBtn onClick={() => editor.chain().focus().redo().run()} title="Redo">
                                        <Redo2 size={18} />
                                    </ToolbarBtn>
                                </div>
                            )}

                            {/* Editor Content */}
                            <div className="p-4 min-h-100">
                                <EditorContent editor={editor} className="tiptap-content " />
                            </div>

                        </div>
                    </div>

                    {/* Publish Button */}
                    <button
                        onClick={handlePublish}
                        // disabled={isLoading}
                        className="px-8 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (isEditMode ? "Updating..." : "Publishing...") : (isEditMode ? "Update Blog" : "Publish Blog")}
                    </button>

                </div>
            )}


            {/* Preview Tab */}
            {tab === "preview" && (
                <div className="mt-6 border border-gray-700 rounded-lg p-8">

                    {title || html || imagePreview ? (
                        <div>

                            {/* Preview Image */}
                            {imagePreview && (
                                <Image
                                    src={imagePreview}
                                    alt="Blog preview"
                                    className="w-full h-64 object-cover rounded-lg mb-6"
                                    width={800}
                                    height={256}
                                />
                            )}

                            {/* Preview Title */}
                            {title && (
                                <h1 className="text-3xl font-bold mb-2">{title}</h1>
                            )}

                            {/* Preview Category */}
                            {category && (
                                <span className="inline-block text-sm px-3 py-1 rounded-full bg-white/10 text-gray-300 mb-6">
                                    {categories.find((c) => c.value === category)?.label}
                                </span>
                            )}

                            {/* Preview Content */}
                            {html && (
                                <div
                                    className="tiptap-content mt-4"
                                    dangerouslySetInnerHTML={{ __html: html }}
                                />
                            )}

                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-10">
                            Nothing to preview yet. Start writing in the Write tab.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default AddBlogPage;
