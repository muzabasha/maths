'use client';

import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import Slide from '@/components/Slide';
import { BlockMath } from '@/components/Math';
import { motion } from 'framer-motion';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false }) as any;

export function SlidePolynomialRecipe() {
    const [a, setA] = useState(1);
    const [b, setB] = useState(0);
    const [c, setC] = useState(0);

    const xValues = Array.from({ length: 101 }, (_, i) => (i - 50) / 10);
    const yValues = xValues.map((x: number) => a * x * x + b * x + c);

    return (
        <Slide
            title="Polynomial as a Recipe"
            subtitle="Changing Ingredients = Changing Results"
        >
            <div className="grid grid-cols-12 gap-12">
                <div className="col-span-5 space-y-8">
                    <div className="glass p-8 rounded-3xl border border-white/10 space-y-6">
                        <BlockMath math={`P(x) = ${a}x^2 + ${b}x + ${c}`} />

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between font-bold text-emerald-400">
                                    <span>Curvature (a)</span>
                                    <span>{a}</span>
                                </div>
                                <input
                                    type="range" min="-5" max="5" step="0.5" value={a}
                                    onChange={(e) => setA(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between font-bold text-amber-400">
                                    <span>Slope (b)</span>
                                    <span>{b}</span>
                                </div>
                                <input
                                    type="range" min="-5" max="5" step="0.5" value={b}
                                    onChange={(e) => setB(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between font-bold text-blue-400">
                                    <span>Base (c)</span>
                                    <span>{c}</span>
                                </div>
                                <input
                                    type="range" min="-10" max="10" step="1" value={c}
                                    onChange={(e) => setC(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="glass p-6 rounded-2xl border border-white/5">
                        <h4 className="font-bold text-lg mb-2">🍰 Analogy:</h4>
                        <ul className="text-slate-400 space-y-2">
                            <li><span className="text-emerald-400 font-mono">ax²</span>: The main flavor (strong effect)</li>
                            <li><span className="text-amber-400 font-mono">bx</span>: The sweetness (medium effect)</li>
                            <li><span className="text-blue-400 font-mono">c</span>: The salt (base level)</li>
                        </ul>
                    </div>
                </div>

                <div className="col-span-7">
                    <div className="glass rounded-3xl border border-white/10 overflow-hidden h-full min-h-[500px]">
                        <Plot
                            data={[
                                {
                                    x: xValues,
                                    y: yValues,
                                    type: 'scatter',
                                    mode: 'lines',
                                    line: { color: '#10b981', width: 4, shape: 'spline' },
                                    fill: 'tozeroy',
                                    fillcolor: 'rgba(16, 185, 129, 0.1)'
                                },
                            ]}
                            layout={{
                                autosize: true,
                                paper_bgcolor: 'rgba(0,0,0,0)',
                                plot_bgcolor: 'rgba(0,0,0,0)',
                                margin: { l: 40, r: 20, t: 20, b: 40 },
                                xaxis: {
                                    gridcolor: 'rgba(255,255,255,0.05)',
                                    zerolinecolor: 'rgba(255,255,255,0.2)',
                                    tickfont: { color: 'rgba(255,255,255,0.5)' }
                                },
                                yaxis: {
                                    gridcolor: 'rgba(255,255,255,0.05)',
                                    zerolinecolor: 'rgba(255,255,255,0.2)',
                                    tickfont: { color: 'rgba(255,255,255,0.5)' },
                                    range: [-20, 20]
                                },
                                hovermode: 'closest',
                            }}
                            config={{ displayModeBar: false, responsive: true }}
                            style={{ width: '100%', height: '100%' }}
                            useResizeHandler={true}
                        />
                    </div>
                </div>
            </div>
        </Slide>
    );
}
