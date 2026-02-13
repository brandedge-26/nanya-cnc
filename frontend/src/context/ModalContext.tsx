// "use client";

// import { createContext, useContext, useState } from "react";

// type ModalContextType = {
//     isOpen: boolean;
//     openModal: () => void;
//     closeModal: () => void;
// };

// const ModalContext = createContext<ModalContextType | null>(null);

// export function ModalProvider({ children }: { children: React.ReactNode }) {

//     const [isOpen, setIsOpen] = useState(false);

//     const openModal = () => setIsOpen(true);
//     const closeModal = () => setIsOpen(false);

//     return (
//         <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
//             {children}
//         </ModalContext.Provider>
//     );
// }

// export function useModal() {
//     const context = useContext(ModalContext);
//     if (!context) {
//         throw new Error("useModal must be used inside ModalProvider");
//     }
//     return context;
// }






"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ModalContextType = {
    isOpen: boolean;
    content: ReactNode | null;
    openModal: (content: ReactNode) => void; // Content accept karega
    closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState<ReactNode | null>(null);

    const openModal = (component: ReactNode) => {
        setContent(component);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        // Timeout taaki animation ke baad content clear ho (optional)
        setTimeout(() => setContent(null), 300);
    };

    return (
        <ModalContext.Provider value={{ isOpen, content, openModal, closeModal }}>
            {children}
            {/* Modal Overlay & Container */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={closeModal}
                    />
                    {/* Modal Box */}
                    <div className="relative bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl max-w-fit w-full overflow-hidden animate-in fade-in zoom-in duration-200">
                        {content}
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    );
}

export function useModal() {
    const context = useContext(ModalContext);
    if (!context) throw new Error("useModal must be used inside ModalProvider");
    return context;
}
