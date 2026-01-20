"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play, X } from "lucide-react";

import { cn } from "@/lib/utils";

type AnimationStyle =
    | "from-bottom"
    | "from-center"
    | "from-top"
    | "from-left"
    | "from-right"
    | "fade"
    | "top-in-bottom-out"
    | "left-in-right-out";

interface HeroVideoProps {
    animationStyle?: AnimationStyle;
    videoSrc: string;
    thumbnailSrc: string;
    thumbnailAlt?: string;
    className?: string;
}

const animationVariants = {
    "from-bottom": {
        initial: { y: "100%", opacity: 0, scale: 0.8 },
        animate: { y: 0, opacity: 1, scale: 1 },
        exit: { y: "100%", opacity: 0, scale: 0.8 },
    },
    "from-center": {
        initial: { scale: 0.5, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.5, opacity: 0 },
    },
    "from-top": {
        initial: { y: "-100%", opacity: 0, scale: 0.8 },
        animate: { y: 0, opacity: 1, scale: 1 },
        exit: { y: "-100%", opacity: 0, scale: 0.8 },
    },
    "from-left": {
        initial: { x: "-100%", opacity: 0, scale: 0.8 },
        animate: { x: 0, opacity: 1, scale: 1 },
        exit: { x: "-100%", opacity: 0, scale: 0.8 },
    },
    "from-right": {
        initial: { x: "100%", opacity: 0, scale: 0.8 },
        animate: { x: 0, opacity: 1, scale: 1 },
        exit: { x: "100%", opacity: 0, scale: 0.8 },
    },
    fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    },
    "top-in-bottom-out": {
        initial: { y: "-100%", opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: "100%", opacity: 0 },
    },
    "left-in-right-out": {
        initial: { x: "-100%", opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: "100%", opacity: 0 },
    },
};

export function HeroVideoDialog({
    animationStyle = "from-center",
    videoSrc,
    thumbnailSrc,
    thumbnailAlt = "Video thumbnail",
    className,
}: HeroVideoProps) {
    const [isOpen, setIsOpen] = useState(false);
    const selectedAnimation = animationVariants[animationStyle];

    return (
        <div className={cn("relative", className)}>
            <div
                className="relative cursor-pointer group"
                onClick={() => setIsOpen(true)}
            >
                <img
                    src={thumbnailSrc}
                    alt={thumbnailAlt}
                    width={1920}
                    height={1080}
                    className="w-full rounded-2xl border border-white/10 shadow-2xl transition-all duration-300 group-hover:brightness-[0.8] group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex size-20 items-center justify-center rounded-full bg-blue-600/10 backdrop-blur-md text-white shadow-xl transition-transform duration-300 group-hover:scale-110">
                        <div className="flex size-16 items-center justify-center rounded-full bg-blue-600 shadow-lg outline outline-1 outline-blue-400">
                            <Play className="size-8 fill-white" />
                        </div>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-lg p-4 md:p-10"
                    >
                        <motion.div
                            {...selectedAnimation}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white/50 hover:text-white transition-colors border border-white/10 backdrop-blur-md"
                            >
                                <X className="size-6" />
                            </button>
                            <iframe
                                src={videoSrc}
                                className="size-full"
                                allowFullScreen
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            ></iframe>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
