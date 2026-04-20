"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { EditorContent, useEditor, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { useBlogStore } from "@/store/blogStore";
import toast from "react-hot-toast";
import {
    Bold, Italic, UnderlineIcon, Strikethrough, Highlighter,
    Heading1, Heading2, Heading3, Heading4, Heading5, Heading6,
    List, ListOrdered, Quote, AlignLeft, AlignCenter, AlignRight,
    Undo2, Redo2, Minus, Eye, Pencil, Upload, X,
    Maximize2, Minimize2, Star, Globe, EyeOff,
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

const inputCls =
    "w-full px-4 py-3 rounded-xl text-white placeholder-white/25 text-sm outline-none transition"
    + " bg-white/5 border border-white/10 focus:border-orange-500/50";


// ── ToolbarBtn — top-level so React never recreates it ──────────────────────
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
        className={`p-2 rounded-lg transition-all duration-200 cursor-pointer ${
            active
                ? "bg-orange-500/15 text-orange-400"
                : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
        }`}
    >
        {children}
    </button>
);


// ── EditorBlock — top-level so React NEVER remounts on parent re-render ──────
type EditorBlockProps = {
    editor: Editor | null;
    fullscreen?: boolean;
    onToggleFullscreen: () => void;
};

const EditorBlock = ({ editor, fullscreen = false, onToggleFullscreen }: EditorBlockProps) => (
    <div
        className={`border rounded-xl overflow-hidden flex flex-col ${fullscreen ? "flex-1" : ""}`}
        style={{ borderColor: "rgba(255,255,255,0.1)", background: "#0A0A0A" }}
    >
        {/* Toolbar */}
        {editor && (
            <div
                className="flex flex-wrap gap-0.5 p-2.5 items-center"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
            >
                <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold"><Bold size={17} /></ToolbarBtn>
                <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic"><Italic size={17} /></ToolbarBtn>
                <ToolbarBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline"><UnderlineIcon size={17} /></ToolbarBtn>
                <ToolbarBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough"><Strikethrough size={17} /></ToolbarBtn>
                <ToolbarBtn onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive("highlight")} title="Highlight"><Highlighter size={17} /></ToolbarBtn>

                <div className="w-px h-5 mx-1 self-center" style={{ background: "rgba(255,255,255,0.1)" }} />

                <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="H1"><Heading1 size={17} /></ToolbarBtn>
                <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="H2"><Heading2 size={17} /></ToolbarBtn>
                <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="H3"><Heading3 size={17} /></ToolbarBtn>
                <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} active={editor.isActive("heading", { level: 4 })} title="H4"><Heading4 size={17} /></ToolbarBtn>
                <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()} active={editor.isActive("heading", { level: 5 })} title="H5"><Heading5 size={17} /></ToolbarBtn>
                <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()} active={editor.isActive("heading", { level: 6 })} title="H6"><Heading6 size={17} /></ToolbarBtn>

                <div className="w-px h-5 mx-1 self-center" style={{ background: "rgba(255,255,255,0.1)" }} />

                <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet List"><List size={17} /></ToolbarBtn>
                <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Ordered List"><ListOrdered size={17} /></ToolbarBtn>

                <div className="w-px h-5 mx-1 self-center" style={{ background: "rgba(255,255,255,0.1)" }} />

                <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} title="Align Left"><AlignLeft size={17} /></ToolbarBtn>
                <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} title="Align Center"><AlignCenter size={17} /></ToolbarBtn>
                <ToolbarBtn onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} title="Align Right"><AlignRight size={17} /></ToolbarBtn>

                <div className="w-px h-5 mx-1 self-center" style={{ background: "rgba(255,255,255,0.1)" }} />

                <ToolbarBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Quote"><Quote size={17} /></ToolbarBtn>
                <ToolbarBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Divider"><Minus size={17} /></ToolbarBtn>

                <div className="w-px h-5 mx-1 self-center" style={{ background: "rgba(255,255,255,0.1)" }} />

                <ToolbarBtn onClick={() => editor.chain().focus().undo().run()} title="Undo"><Undo2 size={17} /></ToolbarBtn>
                <ToolbarBtn onClick={() => editor.chain().focus().redo().run()} title="Redo"><Redo2 size={17} /></ToolbarBtn>

                {/* Fullscreen toggle — right-aligned */}
                <div className="flex-1" />
                <ToolbarBtn onClick={onToggleFullscreen} title={fullscreen ? "Exit Fullscreen (Esc)" : "Fullscreen"} active={fullscreen}>
                    {fullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
                </ToolbarBtn>
            </div>
        )}

        {/* Editor content */}
        <div className={`px-5 py-4 overflow-y-auto ${fullscreen ? "flex-1" : "min-h-[320px]"}`}>
            <EditorContent editor={editor} className="tiptap-content" />
        </div>
    </div>
);


// ── Main Page ────────────────────────────────────────────────────────────────
const AddBlogPage = () => {

    const searchParams = useSearchParams();
    const editId = searchParams.get("edit");
    const isEditMode = !!editId;

    const [tab, setTab]                       = useState<"write" | "preview">("write");
    const [title, setTitle]                   = useState("");
    const [category, setCategory]             = useState("");
    const [html, setHtml]                     = useState("");
    const [imageFile, setImageFile]           = useState<File | null>(null);
    const [imagePreview, setImagePreview]     = useState<string>("");
    const [published, setPublished]           = useState(true);
    const [featuredOnHome, setFeaturedOnHome] = useState(false);
    const [isFullscreen, setIsFullscreen]     = useState(false);

    const { createBlog, updateBlog, getBlogById, isLoading } = useBlogStore();

    const editor = useEditor({
        extensions: [
            StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] } }),
            Underline,
            Highlight,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Placeholder.configure({ placeholder: "Start writing your blog content here..." }),
        ],
        immediatelyRender: false,
        content: "",
        onUpdate({ editor }) {
            setHtml(editor.getHTML());
        },
    });

    // Exit fullscreen on Escape
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape" && isFullscreen) setIsFullscreen(false);
    }, [isFullscreen]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    // Load blog for edit mode
    useEffect(() => {
        if (!editId || !editor) return;
        const loadBlog = async () => {
            const blog = await getBlogById(editId);
            if (blog) {
                setTitle(blog.title);
                setCategory(blog.category);
                setHtml(blog.content);
                editor.commands.setContent(blog.content);
                if (blog.image) setImagePreview(blog.image);
                if (blog.published !== undefined) setPublished(blog.published);
                if (blog.featuredOnHome !== undefined) setFeaturedOnHome(blog.featuredOnHome);
            }
        };
        loadBlog();
    }, [editId, editor, getBlogById]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) { setImageFile(file); setImagePreview(URL.createObjectURL(file)); }
    };

    const removeImage = () => { setImageFile(null); setImagePreview(""); };

    const handlePublish = async () => {
        if (!title.trim() || !category || !html.trim()) {
            toast.error("Please fill all fields");
            return;
        }
        const formData = new FormData();
        formData.append("title", title.trim());
        formData.append("category", category);
        formData.append("content", html);
        formData.append("published", String(published));
        formData.append("featuredOnHome", String(featuredOnHome));
        if (imageFile) formData.append("image", imageFile);

        if (isEditMode) {
            await updateBlog(editId, formData);
        } else {
            const success = await createBlog(formData);
            if (success) {
                setTitle(""); setCategory(""); setHtml("");
                setImageFile(null); setImagePreview("");
                setPublished(true); setFeaturedOnHome(false);
                editor?.commands.clearContent();
            }
        }
    };

    const toggleFullscreen = () => setIsFullscreen((v) => !v);


    return (
        <>
            {/* ── Fullscreen Overlay ──────────────────────────────────────── */}
            {isFullscreen && (
                <div className="fixed inset-0 z-50 flex flex-col p-4" style={{ background: "#0d0d0d" }}>

                    {/* Top bar */}
                    <div className="flex items-center justify-between mb-3 px-1">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-white truncate max-w-sm">
                                {title || "Untitled Blog"}
                            </span>
                            {featuredOnHome && (
                                <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full"
                                    style={{ background: "rgba(249,133,19,0.15)", color: "#f98513" }}>
                                    <Star size={9} /> Featured
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Press Esc to exit</span>
                            <button onClick={() => setIsFullscreen(false)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center transition cursor-pointer"
                                style={{ color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = ""; }}>
                                <X size={15} strokeWidth={2} />
                            </button>
                        </div>
                    </div>

                    <EditorBlock editor={editor} fullscreen onToggleFullscreen={toggleFullscreen} />
                </div>
            )}

            {/* ── Normal Page ─────────────────────────────────────────────── */}
            <div className="space-y-6 pb-10">

                <div>
                    <h1 className="text-xl font-bold text-white">
                        {isEditMode ? "Edit Blog Post" : "Add New Blog Post"}
                    </h1>
                    <p className="text-sm mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                        {isEditMode ? "Update your published blog post." : "Write and publish a new article."}
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 p-1 rounded-xl w-fit"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    {(["write", "preview"] as const).map((t) => (
                        <button key={t} onClick={() => setTab(t)}
                            className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer capitalize"
                            style={tab === t ? { background: "#fff", color: "#000" } : { color: "rgba(255,255,255,0.45)" }}>
                            {t === "write" ? <Pencil size={14} /> : <Eye size={14} />}
                            {t}
                        </button>
                    ))}
                </div>


                {/* ── Write Tab ── */}
                {tab === "write" && (
                    <div className="space-y-5">

                        <div className="grid lg:grid-cols-3 gap-5">

                            {/* Left: Title, Category, Image */}
                            <div className="lg:col-span-2 space-y-5">
                                <div>
                                    <label className="block text-xs font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                                        Blog Title <span className="text-orange-500">*</span>
                                    </label>
                                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter a compelling blog title..." className={inputCls} />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                                        Category <span className="text-orange-500">*</span>
                                    </label>
                                    <select value={category} onChange={(e) => setCategory(e.target.value)}
                                        className={`${inputCls} cursor-pointer appearance-none`}
                                        style={{ background: "rgba(255,255,255,0.05)" }}>
                                        {categories.map((cat) => (
                                            <option key={cat.value} value={cat.value} className="bg-[#141414]">{cat.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium mb-1.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                                        Cover Image
                                    </label>
                                    {imagePreview ? (
                                        <div className="relative w-full max-w-sm">
                                            <Image src={imagePreview} alt="Cover" width={800} height={176}
                                                className="w-full h-44 object-cover rounded-xl"
                                                style={{ border: "1px solid rgba(255,255,255,0.1)" }} />
                                            <button type="button" onClick={removeImage}
                                                className="absolute top-2 right-2 w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer"
                                                style={{ background: "rgba(0,0,0,0.7)", color: "#fff" }}>
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center w-full max-w-sm h-40 rounded-xl cursor-pointer transition"
                                            style={{ border: "2px dashed rgba(255,255,255,0.12)" }}
                                            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(249,133,19,0.4)")}
                                            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")}>
                                            <Upload size={24} style={{ color: "rgba(255,255,255,0.3)" }} className="mb-2" />
                                            <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Click to upload cover image</span>
                                            <span className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.2)" }}>PNG, JPG, JPEG, WEBP</span>
                                            <input type="file" accept="image/png,image/jpg,image/jpeg,image/webp"
                                                onChange={handleImageChange} className="hidden" />
                                        </label>
                                    )}
                                </div>
                            </div>

                            {/* Right: Publish / Featured toggles */}
                            <div className="space-y-4">
                                <div className="rounded-2xl p-4 space-y-3"
                                    style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>
                                    <p className="text-xs font-semibold uppercase tracking-widest"
                                        style={{ color: "rgba(255,255,255,0.35)" }}>Publishing</p>

                                    {/* Published */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                                                style={{ background: published ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.05)" }}>
                                                {published
                                                    ? <Globe size={14} style={{ color: "#22c55e" }} />
                                                    : <EyeOff size={14} style={{ color: "rgba(255,255,255,0.35)" }} />}
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-white">{published ? "Published" : "Draft"}</p>
                                                <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                                                    {published ? "Visible to all visitors" : "Hidden from public"}
                                                </p>
                                            </div>
                                        </div>
                                        <button type="button" onClick={() => setPublished((v) => !v)}
                                            className="relative rounded-full flex-shrink-0 transition-all cursor-pointer"
                                            style={{ background: published ? "#22c55e" : "rgba(255,255,255,0.12)", width: 40, height: 22 }}>
                                            <span className="absolute top-[3px] rounded-full bg-white transition-all duration-200"
                                                style={{ width: 16, height: 16, left: published ? "calc(100% - 19px)" : "3px" }} />
                                        </button>
                                    </div>

                                    <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />

                                    {/* Featured */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                                                style={{ background: featuredOnHome ? "rgba(249,133,19,0.12)" : "rgba(255,255,255,0.05)" }}>
                                                <Star size={14} style={{ color: featuredOnHome ? "#f98513" : "rgba(255,255,255,0.35)" }} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-white">Feature on Homepage</p>
                                                <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                                                    {featuredOnHome ? "Shown in homepage blogs" : "Not on homepage"}
                                                </p>
                                            </div>
                                        </div>
                                        <button type="button" onClick={() => setFeaturedOnHome((v) => !v)}
                                            className="relative rounded-full flex-shrink-0 transition-all cursor-pointer"
                                            style={{ background: featuredOnHome ? "#f98513" : "rgba(255,255,255,0.12)", width: 40, height: 22 }}>
                                            <span className="absolute top-[3px] rounded-full bg-white transition-all duration-200"
                                                style={{ width: 16, height: 16, left: featuredOnHome ? "calc(100% - 19px)" : "3px" }} />
                                        </button>
                                    </div>
                                </div>

                                {/* Status summary */}
                                <div className="rounded-xl px-4 py-3"
                                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                    <p className="text-[10px] uppercase tracking-widest font-semibold mb-2"
                                        style={{ color: "rgba(255,255,255,0.3)" }}>Status</p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                                            style={published
                                                ? { background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" }
                                                : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)" }}>
                                            <Globe size={9} />{published ? "Published" : "Draft"}
                                        </span>
                                        {featuredOnHome && (
                                            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                                                style={{ background: "rgba(249,133,19,0.1)", color: "#f98513", border: "1px solid rgba(249,133,19,0.2)" }}>
                                                <Star size={9} />Featured
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Editor */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
                                    Content <span className="text-orange-500">*</span>
                                </label>
                                <button type="button" onClick={toggleFullscreen}
                                    className="flex items-center gap-1.5 text-xs transition cursor-pointer"
                                    style={{ color: "rgba(255,255,255,0.35)" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = "#f98513")}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}>
                                    <Maximize2 size={13} /> Open fullscreen
                                </button>
                            </div>
                            {/* Only mount EditorBlock in ONE place at a time to avoid TipTap conflicts */}
                            {!isFullscreen && (
                                <EditorBlock editor={editor} fullscreen={false} onToggleFullscreen={toggleFullscreen} />
                            )}
                            {isFullscreen && (
                                <div className="rounded-xl flex items-center justify-center gap-3 min-h-[120px]"
                                    style={{ border: "1px dashed rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.25)" }}>
                                    <Maximize2 size={16} />
                                    <span className="text-sm">Editor is open in fullscreen</span>
                                </div>
                            )}
                        </div>

                        {/* Submit */}
                        <button type="button" onClick={handlePublish} disabled={isLoading}
                            className="px-8 py-3 rounded-xl font-semibold text-sm transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2"
                            style={{ background: "linear-gradient(135deg, #f98513, #e06e00)", color: "#000" }}>
                            {isLoading
                                ? <><div className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />{isEditMode ? "Updating..." : "Publishing..."}</>
                                : isEditMode ? "Update Blog Post" : "Publish Blog Post"}
                        </button>
                    </div>
                )}


                {/* ── Preview Tab ── */}
                {tab === "preview" && (
                    <div className="rounded-2xl p-8"
                        style={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.07)" }}>
                        {title || html || imagePreview ? (
                            <div>
                                {imagePreview && (
                                    <Image src={imagePreview} alt="Preview" width={800} height={256}
                                        className="w-full h-64 object-cover rounded-xl mb-6" />
                                )}
                                <div className="flex gap-2 mb-4">
                                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                                        style={published
                                            ? { background: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" }
                                            : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)" }}>
                                        <Globe size={9} />{published ? "Published" : "Draft"}
                                    </span>
                                    {featuredOnHome && (
                                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                                            style={{ background: "rgba(249,133,19,0.1)", color: "#f98513", border: "1px solid rgba(249,133,19,0.2)" }}>
                                            <Star size={9} />Featured on Homepage
                                        </span>
                                    )}
                                </div>
                                {title && <h1 className="text-3xl font-bold mb-2 text-white">{title}</h1>}
                                {category && (
                                    <span className="inline-block text-sm px-3 py-1 rounded-full mb-6"
                                        style={{ background: "rgba(249,133,19,0.1)", color: "#f98513", border: "1px solid rgba(249,133,19,0.2)" }}>
                                        {categories.find((c) => c.value === category)?.label}
                                    </span>
                                )}
                                {html && <div className="tiptap-content mt-4" dangerouslySetInnerHTML={{ __html: html }} />}
                            </div>
                        ) : (
                            <p className="text-center py-16 text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
                                Nothing to preview yet. Switch to Write tab and start writing.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default AddBlogPage;
