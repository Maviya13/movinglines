"use client";

/**
 * @author: @kokonutui (modified for MovingLines)
 * @description: Real-time AI Status Loading
 */

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface AITextLoadingProps {
    status?: string;
    className?: string;
}

// Map backend status to user-friendly messages
const statusMessages: Record<string, string> = {
    'processing': 'Thinking...',
    'generating_script': 'Generating Manim Script...',
    'rendering': 'Rendering Animation...',
    'uploading': 'Finalizing Video...',
    'self_healing': 'Auto-fixing code...',
    'retry': 'Retrying render...',
};

export default function AITextLoading({
    status = 'processing',
    className,
}: AITextLoadingProps) {
    const displayText = statusMessages[status] || 'Processing...';

    return (
        <div className="flex items-center justify-center p-8">
            <motion.div
                className="relative px-4 py-2 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={displayText}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            backgroundPosition: ["200% center", "-200% center"],
                        }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                            opacity: { duration: 0.3 },
                            y: { duration: 0.3 },
                            backgroundPosition: {
                                duration: 2.5,
                                ease: "linear",
                                repeat: Infinity,
                            },
                        }}
                        className={cn(
                            "flex justify-center text-3xl font-bold bg-gradient-to-r from-neutral-950 via-neutral-400 to-neutral-950 dark:from-white dark:via-neutral-600 dark:to-white bg-[length:200%_100%] bg-clip-text text-transparent whitespace-nowrap min-w-max",
                            className
                        )}
                    >
                        {displayText}
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
