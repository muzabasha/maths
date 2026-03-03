'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SlideProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    className?: string;
}

export default function Slide({ title, subtitle, children, className }: SlideProps) {
    return (
        <div className={cn("flex flex-col gap-8 py-12", className)}>
            <div className="space-y-2">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl font-black tracking-tight math-gradient"
                >
                    {title}
                </motion.h2>
                {subtitle && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl text-muted-foreground font-medium"
                    >
                        {subtitle}
                    </motion.p>
                )}
            </div>

            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}
