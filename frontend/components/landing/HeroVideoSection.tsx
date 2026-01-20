"use client";

import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import { motion } from "motion/react";

export function HeroVideoSection() {
    return (
        <section className="relative max-w-5xl mx-auto px-6 py-24">
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
            >
                <HeroVideoDialog
                    className="block dark:hidden"
                    animationStyle="from-center"
                    videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                    thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
                    thumbnailAlt="Hero Video Light"
                />
                <HeroVideoDialog
                    className="hidden dark:block"
                    animationStyle="from-center"
                    videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
                    thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
                    thumbnailAlt="Hero Video Dark"
                />

                {/* Glow effect behind the video */}
                <div className="absolute -inset-4 bg-blue-600/10 blur-3xl -z-10 rounded-full opacity-50" />
            </motion.div>
        </section>
    );
}
