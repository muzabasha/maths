'use client';

import React from 'react';
import Slide from '@/components/Slide';
import { motion } from 'framer-motion';
import { Lightbulb, Calculator, TrendingUp, Search } from 'lucide-react';

export function SlideIntro() {
    return (
        <Slide
            title="Math is Everywhere!"
            subtitle="From Zero to Excellence – Learn Math by Doing"
        >
            <div className="grid grid-cols-2 gap-12 mt-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="glass p-8 rounded-3xl border border-primary/20 space-y-6"
                >
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <Lightbulb size={32} />
                    </div>
                    <h3 className="text-3xl font-bold">The Story of Lemonade 🍋</h3>
                    <p className="text-xl text-slate-400 leading-relaxed">
                        Imagine you want to start a small business. You decide to sell fresh lemonade.
                        How do you know if you're making money or losing it?
                    </p>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-lg font-medium text-amber-400 italic">
                            "Mathematics is the tool that turns your ideas into reality!"
                        </p>
                    </div>
                </motion.div>

                <div className="grid grid-cols-2 gap-6">
                    {[
                        { icon: <Calculator />, label: "Modeling", desc: "Turn real life into equations" },
                        { icon: <TrendingUp />, label: "Optimization", desc: "Find the best outcome" },
                        { icon: <Search />, label: "Discovery", desc: "Explore what happens if..." },
                        { icon: <Calculator />, label: "Validation", desc: "Check if your answer is right" }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                            className="glass p-6 rounded-2xl flex flex-col gap-4 border border-white/5"
                        >
                            <div className="text-primary">{item.icon}</div>
                            <div>
                                <h4 className="font-bold text-lg">{item.label}</h4>
                                <p className="text-sm text-slate-400">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Slide>
    );
}

export function SlideLemonadeStory() {
    return (
        <Slide
            title="The Lemonade Problem"
            subtitle="Real world problem → Real world solution"
        >
            <div className="flex flex-col gap-12">
                <div className="glass p-12 rounded-3xl border border-white/10 flex items-center justify-between gap-12">
                    <div className="space-y-8 flex-1">
                        <div className="space-y-4">
                            <h3 className="text-4xl font-bold flex items-center gap-4">
                                <span className="text-6xl">🍋</span> Selling Lemonade
                            </h3>
                            <ul className="space-y-4 text-2xl text-slate-300">
                                <li className="flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm">1</span>
                                    Cost to make 1 glass: <span className="text-white font-bold ml-2">₹5</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm">2</span>
                                    Selling price per glass: <span className="text-white font-bold ml-2">₹10</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-6 bg-primary/10 rounded-2xl border border-primary/20">
                            <p className="text-2xl font-bold text-primary">
                                Question: How much profit do we make if we sell 10 glasses?
                            </p>
                        </div>
                    </div>

                    <div className="w-1/3 aspect-square bg-linear-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center border border-white/10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                        <span className="text-9xl">💰</span>
                    </div>
                </div>

                <div className="flex justify-center">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="px-12 py-6 bg-primary text-white text-3xl font-black rounded-2xl shadow-2xl shadow-primary/40 cursor-pointer"
                    >
                        TELL ME THE ANSWER!
                    </motion.div>
                </div>
            </div>
        </Slide>
    );
}
