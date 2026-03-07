'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles, Trophy, Star, Flame, Target, BookOpen, Beaker,
    Lightbulb, CheckCircle2, XCircle, ArrowRight, RotateCcw,
    Zap, Brain, Puzzle, GraduationCap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';
import type { StudentCategory } from './PresentationContext';

// ─── Types ───────────────────────────────────────────────────────

export interface Question {
    id: number;
    question: string;
    options: string[];
    correct: number;
    explanation: string;
    analogy?: string;
    interactive?: {
        type: string;
        label?: string;
        min?: number;
        max?: number;
        step?: number;
        unit?: string;
    };
}

type ActivityType = 'explore' | 'experiment' | 'apply' | 'assess';

interface ActivityStep {
    type: ActivityType;
    title: string;
    icon: React.ReactNode;
    color: string;
    component: React.ReactNode;
}

// ─── NEP 2020 Phase Labels ──────────────────────────────────────

const PHASE_META: Record<ActivityType, { label: string; desc: string; icon: React.ReactNode; color: string; bg: string }> = {
    explore: { label: 'Explore', desc: 'Discover the concept', icon: <BookOpen size={20} />, color: 'text-emerald-400', bg: 'bg-emerald-500/20 border-emerald-500/30' },
    experiment: { label: 'Experiment', desc: 'Try it yourself', icon: <Beaker size={20} />, color: 'text-amber-400', bg: 'bg-amber-500/20 border-amber-500/30' },
    apply: { label: 'Apply', desc: 'Solve a real-world problem', icon: <Target size={20} />, color: 'text-blue-400', bg: 'bg-blue-500/20 border-blue-500/30' },
    assess: { label: 'Assess', desc: 'Test your understanding', icon: <Brain size={20} />, color: 'text-purple-400', bg: 'bg-purple-500/20 border-purple-500/30' },
};

// ─── Concept Cards per Category ─────────────────────────────────

interface ConceptCard {
    title: string;
    emoji: string;
    story: string;
    keyIdea: string;
    funFact: string;
}

const CONCEPT_CARDS: Record<StudentCategory, ConceptCard[]> = {
    school: [
        { title: 'Numbers are Everywhere', emoji: '🔢', story: 'When you count your pocket money, measure your height, or check the time — you\'re using math!', keyIdea: 'Variables like x represent unknown quantities we want to find.', funFact: 'The word "algebra" comes from Arabic "al-jabr" meaning "reunion of broken parts".' },
        { title: 'Patterns & Shapes', emoji: '🔷', story: 'Nature is full of patterns — honeycomb hexagons, spiral shells, symmetric butterflies. Math helps us describe them all.', keyIdea: 'Equations describe relationships between quantities.', funFact: 'Sunflowers have exactly 34 or 55 spirals — both Fibonacci numbers!' },
        { title: 'The Power of Graphs', emoji: '📈', story: 'A graph is like a map of how things change. Your growth chart at the doctor is a graph of height vs age!', keyIdea: 'Graphs turn numbers into pictures we can understand at a glance.', funFact: 'The first bar chart was invented in 1786 by William Playfair.' },
    ],
    ug: [
        { title: 'Calculus: The Math of Change', emoji: '⚡', story: 'Every time your phone predicts traffic, optimizes battery, or renders graphics — calculus is at work behind the scenes.', keyIdea: 'Derivatives measure instantaneous rate of change; integrals accumulate totals.', funFact: 'Newton and Leibniz independently invented calculus in the 1680s!' },
        { title: 'Linear Algebra: The Language of Data', emoji: '🧮', story: 'Every image on your screen is a matrix of pixels. Machine learning, 3D games, and GPS all rely on linear algebra.', keyIdea: 'Matrices transform data — rotate, scale, project, and compress.', funFact: 'Google\'s PageRank algorithm is essentially a giant eigenvalue problem.' },
        { title: 'Probability: Taming Uncertainty', emoji: '🎲', story: 'From weather forecasts to medical diagnoses, probability helps us make decisions when we don\'t have all the information.', keyIdea: 'Expected value tells us the average outcome over many trials.', funFact: 'The birthday paradox: in a room of 23 people, there\'s a 50% chance two share a birthday!' },
    ],
    pg: [
        { title: 'Optimization: Finding the Best', emoji: '🎯', story: 'Airlines optimize fuel routes, hospitals optimize schedules, AI optimizes neural networks — all using the same math.', keyIdea: 'Gradient descent iteratively moves toward the minimum of a function.', funFact: 'The simplex method solves most real-world linear programs in polynomial time despite worst-case exponential complexity.' },
        { title: 'Numerical Methods: When Exact Fails', emoji: '🔬', story: 'Most real equations can\'t be solved exactly. Numerical methods give us powerful approximate solutions.', keyIdea: 'Convergence rate determines how quickly an algorithm approaches the true answer.', funFact: 'Weather prediction uses numerical methods to solve millions of differential equations every hour.' },
        { title: 'Functional Analysis: Infinite Dimensions', emoji: '♾️', story: 'Quantum mechanics, signal processing, and PDEs all live in infinite-dimensional spaces described by functional analysis.', keyIdea: 'Banach and Hilbert spaces generalize geometry to infinite dimensions.', funFact: 'The Fourier transform decomposes any signal into pure frequencies — the basis of MP3 compression.' },
    ],
    research: [
        { title: 'Convex Optimization: Guaranteed Solutions', emoji: '🏔️', story: 'From training deep neural networks to portfolio optimization, convex optimization provides the theoretical backbone.', keyIdea: 'In convex problems, every local minimum is global — no traps!', funFact: 'Interior point methods can solve problems with millions of variables in minutes.' },
        { title: 'Topology Meets Data', emoji: '🕸️', story: 'Topological Data Analysis reveals the "shape" of data — finding clusters, holes, and connections invisible to statistics.', keyIdea: 'Persistent homology tracks how topological features appear and disappear across scales.', funFact: 'TDA has been used to discover new subtypes of breast cancer from gene expression data.' },
        { title: 'Quantum Computing & Math', emoji: '⚛️', story: 'Quantum algorithms exploit superposition and entanglement to solve problems exponentially faster than classical computers.', keyIdea: 'Shor\'s algorithm factors integers in polynomial time, threatening RSA encryption.', funFact: 'A 300-qubit quantum computer can represent more states than atoms in the observable universe.' },
    ],
};

// ─── Experiment Challenges (hands-on mini-tasks) ────────────────

interface ExperimentChallenge {
    title: string;
    emoji: string;
    instruction: string;
    sliderLabel: string;
    min: number;
    max: number;
    step: number;
    unit: string;
    compute: (val: number) => string;
    targetHint: string;
    interpret: (val: number, result: string) => string;
}

const EXPERIMENT_CHALLENGES: Record<StudentCategory, ExperimentChallenge[]> = {
    school: [
        {
            title: 'Lemonade Profit Calculator', emoji: '🍋',
            instruction: 'You sell lemonade at ₹10 per glass and it costs ₹5 to make. Drag the slider to see your profit!',
            sliderLabel: 'Glasses Sold', min: 0, max: 50, step: 1, unit: ' glasses',
            compute: (v) => `₹${(v * 5).toFixed(0)}`,
            targetHint: 'How many glasses for ₹100 profit?',
            interpret: (v, r) => `Selling ${v} glasses gives you ${r} profit. Each glass adds ₹5 to your pocket. That\'s the power of linear growth!`
        },
        {
            title: 'Area Explorer', emoji: '📐',
            instruction: 'Change the side length and watch how the area of a square grows. Notice: it doesn\'t just double!',
            sliderLabel: 'Side Length', min: 1, max: 15, step: 1, unit: ' cm',
            compute: (v) => `${(v * v).toFixed(0)} cm²`,
            targetHint: 'What side gives area = 100?',
            interpret: (v, r) => `A square with side ${v} cm has area ${r}. When you doubled from ${Math.floor(v / 2)} to ${v}, the area quadrupled! That\'s quadratic growth (x²).`
        },
        {
            title: 'Speed & Distance', emoji: '🚗',
            instruction: 'A car travels at 60 km/h. How far does it go? Drag to change the travel time.',
            sliderLabel: 'Hours', min: 0, max: 10, step: 0.5, unit: ' hrs',
            compute: (v) => `${(60 * v).toFixed(0)} km`,
            targetHint: 'How long to travel 300 km?',
            interpret: (v, r) => `At 60 km/h for ${v} hours, you cover ${r}. Distance = Speed × Time is one of the most useful formulas in everyday life!`
        },
    ],
    ug: [
        {
            title: 'Derivative Visualizer', emoji: '📉',
            instruction: 'For f(x) = x³, the derivative f\'(x) = 3x² tells you the slope. Watch how the rate of change itself changes!',
            sliderLabel: 'x value', min: -5, max: 5, step: 0.1, unit: '',
            compute: (v) => `f(${v.toFixed(1)}) = ${(v ** 3).toFixed(1)}, f'(${v.toFixed(1)}) = ${(3 * v ** 2).toFixed(1)}`,
            targetHint: 'Where is the slope zero?',
            interpret: (v, r) => `At x = ${v.toFixed(1)}: ${r}. The derivative is always positive (except at 0), meaning x³ is always increasing. The slope is steepest far from zero.`
        },
        {
            title: 'Integration: Area Under Curve', emoji: '📊',
            instruction: 'Integration finds the area under a curve. For f(x) = x², the integral from 0 to b is b³/3.',
            sliderLabel: 'Upper bound b', min: 0, max: 10, step: 0.5, unit: '',
            compute: (v) => `∫₀^${v} x² dx = ${(v ** 3 / 3).toFixed(2)}`,
            targetHint: 'What b gives area = 9?',
            interpret: (v, r) => `The area under x² from 0 to ${v} is ${(v ** 3 / 3).toFixed(2)}. As b grows, the area grows cubically — much faster than the function itself!`
        },
        {
            title: 'Taylor Series Approximation', emoji: '🔮',
            instruction: 'See how adding more terms of the Taylor series makes the approximation of sin(x) more accurate.',
            sliderLabel: 'Number of terms', min: 1, max: 8, step: 1, unit: ' terms',
            compute: (n) => {
                const x = 2;
                let approx = 0;
                for (let i = 0; i < n; i++) {
                    const sign = i % 2 === 0 ? 1 : -1;
                    const power = 2 * i + 1;
                    let factorial = 1;
                    for (let j = 2; j <= power; j++) factorial *= j;
                    approx += sign * Math.pow(x, power) / factorial;
                }
                return `sin(2) ≈ ${approx.toFixed(6)} (actual: ${Math.sin(2).toFixed(6)})`;
            },
            targetHint: 'How many terms for 4-decimal accuracy?',
            interpret: (n, r) => `With ${n} term(s): ${r}. Each additional term dramatically improves accuracy. This is how calculators compute trig functions!`
        },
    ],
    pg: [
        {
            title: 'Gradient Descent Simulator', emoji: '⛰️',
            instruction: 'Watch gradient descent minimize f(x) = x². Adjust the learning rate to see convergence behavior.',
            sliderLabel: 'Learning Rate (η)', min: 0.01, max: 1.5, step: 0.01, unit: '',
            compute: (lr) => {
                let x = 5;
                const steps: number[] = [x];
                for (let i = 0; i < 10; i++) { x = x - lr * 2 * x; steps.push(x); }
                return `After 10 steps: x = ${x.toFixed(4)} (goal: 0)`;
            },
            targetHint: 'What η converges fastest without diverging?',
            interpret: (lr, r) => `Learning rate ${lr}: ${r}. Too small = slow convergence. Too large (>1) = divergence! The sweet spot is around 0.5 for this quadratic.`
        },
        {
            title: 'Newton-Raphson Root Finder', emoji: '🎯',
            instruction: 'Find the root of f(x) = x² - 4 using Newton\'s method. Watch quadratic convergence!',
            sliderLabel: 'Starting guess x₀', min: -10, max: 10, step: 0.5, unit: '',
            compute: (x0) => {
                let x = x0;
                const iters: string[] = [];
                for (let i = 0; i < 5; i++) {
                    const fx = x * x - 4;
                    const fpx = 2 * x;
                    if (Math.abs(fpx) < 0.001) break;
                    x = x - fx / fpx;
                    iters.push(x.toFixed(6));
                }
                return `Converges to: ${x.toFixed(6)} (root: ±2)`;
            },
            targetHint: 'Try starting at x₀ = 3 vs x₀ = 0.1',
            interpret: (x0, r) => `Starting from x₀ = ${x0}: ${r}. Newton\'s method has quadratic convergence — each step roughly doubles the number of correct digits!`
        },
        {
            title: 'Condition Number Explorer', emoji: '⚖️',
            instruction: 'See how the condition number affects solution sensitivity. Higher = more sensitive to errors.',
            sliderLabel: 'Matrix skew factor', min: 0.01, max: 5, step: 0.01, unit: '',
            compute: (s) => {
                const cond = Math.max(1, s) / Math.min(1, s);
                return `κ(A) = ${cond.toFixed(2)} — ${cond < 10 ? 'Well-conditioned ✅' : cond < 100 ? 'Moderate ⚠️' : 'Ill-conditioned ❌'}`;
            },
            targetHint: 'When does the system become unreliable?',
            interpret: (s, r) => `Skew factor ${s}: ${r}. In practice, condition numbers above 10⁶ mean you can\'t trust the last 6 digits of your solution!`
        },
    ],
    research: [
        {
            title: 'SGD vs Full Gradient', emoji: '🎰',
            instruction: 'Compare stochastic gradient descent (noisy but fast) with full gradient descent (smooth but slow).',
            sliderLabel: 'Batch size', min: 1, max: 100, step: 1, unit: ' samples',
            compute: (batch) => {
                const variance = (100 / batch).toFixed(2);
                const speed = (batch === 100 ? 1 : (100 / batch)).toFixed(1);
                return `Variance: ${variance}, Relative speed: ${speed}x`;
            },
            targetHint: 'What batch size balances speed and stability?',
            interpret: (b, r) => `Batch size ${b}: ${r}. Mini-batch SGD (32-64) is the sweet spot used in practice — it balances noise reduction with computational efficiency.`
        },
        {
            title: 'Entropy Calculator', emoji: '🔐',
            instruction: 'Information entropy measures uncertainty. A fair coin has maximum entropy. Adjust the probability.',
            sliderLabel: 'Probability p', min: 0.01, max: 0.99, step: 0.01, unit: '',
            compute: (p) => {
                const H = -(p * Math.log2(p) + (1 - p) * Math.log2(1 - p));
                return `H(p) = ${H.toFixed(4)} bits`;
            },
            targetHint: 'At what p is entropy maximized?',
            interpret: (p, r) => `At p = ${p}: ${r}. Maximum entropy (1 bit) occurs at p = 0.5 — maximum uncertainty. This is foundational to information theory and cryptography.`
        },
        {
            title: 'Differential Privacy Budget', emoji: '🛡️',
            instruction: 'Explore the privacy-utility tradeoff. Lower ε = more privacy but noisier results.',
            sliderLabel: 'Privacy budget ε', min: 0.01, max: 10, step: 0.01, unit: '',
            compute: (eps) => {
                const noise = (1 / eps).toFixed(4);
                const utility = (100 * (1 - 1 / (1 + eps))).toFixed(1);
                return `Noise scale: ${noise}, Utility: ${utility}%`;
            },
            targetHint: 'What ε gives 90% utility?',
            interpret: (eps, r) => `ε = ${eps}: ${r}. Apple uses ε ≈ 8 for emoji suggestions, while the US Census uses ε ≈ 19. The choice depends on the sensitivity of the data.`
        },
    ],
};

// ─── Real-World Application Scenarios ───────────────────────────

interface ApplicationScenario {
    title: string;
    emoji: string;
    scenario: string;
    challenge: string;
    hint: string;
    answer: string;
    connection: string;
}

const APPLICATION_SCENARIOS: Record<StudentCategory, ApplicationScenario[]> = {
    school: [
        { title: 'Shopping Budget', emoji: '🛒', scenario: 'You have ₹500 to buy notebooks (₹40 each) and pens (₹10 each). You need at least 5 notebooks.', challenge: 'What\'s the maximum number of pens you can buy?', hint: '5 notebooks cost 5 × ₹40 = ₹200. Remaining = ₹300.', answer: '30 pens (₹300 ÷ ₹10)', connection: 'This is a linear inequality problem: 40n + 10p ≤ 500, n ≥ 5' },
        { title: 'Garden Design', emoji: '🌻', scenario: 'You want to fence a rectangular garden with 24 meters of fencing.', challenge: 'What dimensions give the maximum area?', hint: 'If length = x, then width = (24-2x)/2 = 12-x. Area = x(12-x).', answer: '6m × 6m = 36 m² (a square!)', connection: 'This is an optimization problem — maximizing area under a perimeter constraint.' },
        { title: 'Cricket Statistics', emoji: '🏏', scenario: 'A batsman scored 45, 62, 38, 71, and 54 in 5 innings.', challenge: 'What score does he need in the 6th innings for a 60 average?', hint: 'Total needed = 60 × 6 = 360. Current total = 270.', answer: '90 runs needed', connection: 'Averages are a fundamental concept in statistics and data analysis.' },
    ],
    ug: [
        { title: 'Rocket Trajectory', emoji: '🚀', scenario: 'A rocket\'s height is h(t) = -5t² + 100t meters after t seconds.', challenge: 'When does it reach maximum height, and what is that height?', hint: 'Set h\'(t) = 0: -10t + 100 = 0, so t = 10s.', answer: 'Max height = 500m at t = 10s', connection: 'Derivatives find extrema — the core of optimization in engineering.' },
        { title: 'Population Growth', emoji: '🌍', scenario: 'A city\'s population follows P(t) = 100000 × e^(0.03t) where t is years.', challenge: 'How long until the population doubles?', hint: '2 = e^(0.03t), so t = ln(2)/0.03', answer: '≈ 23.1 years', connection: 'Exponential growth and logarithms model real-world phenomena from biology to finance.' },
        { title: 'Bridge Cable Tension', emoji: '🌉', scenario: 'A suspension bridge cable follows y = 0.01x² + 2. The tension at any point is proportional to the slope.', challenge: 'Where is the tension greatest in the range x ∈ [-50, 50]?', hint: 'Slope = dy/dx = 0.02x. Maximum |slope| at endpoints.', answer: 'At x = ±50, slope = ±1 (maximum tension)', connection: 'Derivatives directly model physical forces in structural engineering.' },
    ],
    pg: [
        { title: 'Neural Network Training', emoji: '🧠', scenario: 'Loss function L(w) = w⁴ - 4w² + 1. You\'re training with gradient descent.', challenge: 'Find all critical points and classify them.', hint: 'L\'(w) = 4w³ - 8w = 4w(w² - 2) = 0', answer: 'w = 0 (local max), w = ±√2 (global min, L = -3)', connection: 'Understanding loss landscapes is crucial for training deep learning models.' },
        { title: 'Supply Chain Optimization', emoji: '📦', scenario: 'Minimize cost C(x,y) = x² + y² subject to x + y = 10 (production constraint).', challenge: 'Use Lagrange multipliers to find the optimal production split.', hint: '∇C = λ∇g → (2x, 2y) = λ(1, 1) → x = y', answer: 'x = y = 5, minimum cost = 50', connection: 'Constrained optimization is the backbone of operations research.' },
        { title: 'Image Compression', emoji: '🖼️', scenario: 'A 1000×1000 image matrix has singular values σ₁=500, σ₂=200, σ₃=50, σ₄=10, rest ≈ 0.', challenge: 'How much can you compress while keeping 99% of the "energy"?', hint: 'Energy = Σσᵢ². Total ≈ 292500. First 3: 292500.', answer: 'Keep top 3 SVs → 99.97% energy, 99.7% compression!', connection: 'SVD is the mathematical foundation of data compression, from JPEG to Netflix recommendations.' },
    ],
    research: [
        { title: 'Adversarial Robustness', emoji: '🛡️', scenario: 'A classifier has 99% accuracy but is fooled by perturbations of size ε = 0.01 in L∞ norm.', challenge: 'Design a defense using the PGD adversarial training framework.', hint: 'min_θ max_{||δ||∞ ≤ ε} L(f_θ(x+δ), y) — a minimax problem.', answer: 'Solve the inner max with PGD, outer min with SGD. Typically 3-7 PGD steps suffice.', connection: 'Adversarial robustness connects optimization, game theory, and security in ML.' },
        { title: 'Quantum Error Correction', emoji: '⚛️', scenario: 'A quantum computer has a per-gate error rate of 10⁻³. You need logical error rate < 10⁻¹⁵.', challenge: 'How many levels of the surface code are needed?', hint: 'Surface code threshold ≈ 1%. Error suppression is exponential in code distance.', answer: '≈ 4-5 levels of concatenation with distance-7 surface codes', connection: 'Error correction is the bridge between theoretical quantum advantage and practical quantum computing.' },
        { title: 'Optimal Transport', emoji: '🚚', scenario: 'You have 3 factories producing [100, 200, 150] units and 4 stores needing [80, 120, 100, 150] units.', challenge: 'Formulate this as a linear program and identify the structure.', hint: 'This is a transportation problem — a special case of LP with network structure.', answer: 'The constraint matrix is totally unimodular → LP relaxation gives integer solutions!', connection: 'Optimal transport connects to Wasserstein distances in ML, economics, and logistics.' },
    ],
};

// ─── Sub-Components ─────────────────────────────────────────────

function PhaseIndicator({ phase, currentPhase }: { phase: ActivityType; currentPhase: ActivityType }) {
    const phases: ActivityType[] = ['explore', 'experiment', 'apply', 'assess'];
    const currentIdx = phases.indexOf(currentPhase);
    const thisIdx = phases.indexOf(phase);
    const meta = PHASE_META[phase];
    const isActive = phase === currentPhase;
    const isDone = thisIdx < currentIdx;

    return (
        <div className={cn("flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 border",
            isActive ? meta.bg + ' ' + meta.color : isDone ? 'bg-white/10 border-white/20 text-white/60' : 'bg-white/5 border-white/5 text-white/20'
        )}>
            {isDone ? <CheckCircle2 size={14} /> : meta.icon}
            <span className="uppercase tracking-wider">{meta.label}</span>
        </div>
    );
}

function ExploreCard({ card }: { card: ConceptCard }) {
    const [flipped, setFlipped] = useState(false);

    return (
        <div className="max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
            >
                <div className="text-center space-y-2">
                    <span className="text-7xl">{card.emoji}</span>
                    <h3 className="text-4xl font-black tracking-tight">{card.title}</h3>
                </div>

                <div className="glass p-10 rounded-3xl border border-white/10 space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400 shrink-0">
                            <BookOpen size={24} />
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-xl font-bold text-emerald-400 uppercase tracking-wider">The Story</h4>
                            <p className="text-2xl leading-relaxed text-slate-200">{card.story}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="glass p-8 rounded-2xl border border-primary/20 space-y-3 cursor-pointer"
                        onClick={() => setFlipped(!flipped)}
                    >
                        <div className="flex items-center gap-2 text-primary">
                            <Lightbulb size={20} />
                            <span className="font-bold uppercase tracking-wider text-sm">Key Idea</span>
                        </div>
                        <p className="text-xl font-medium">{card.keyIdea}</p>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="glass p-8 rounded-2xl border border-amber-500/20 space-y-3"
                    >
                        <div className="flex items-center gap-2 text-amber-400">
                            <Sparkles size={20} />
                            <span className="font-bold uppercase tracking-wider text-sm">Fun Fact</span>
                        </div>
                        <p className="text-xl font-medium text-slate-300">{card.funFact}</p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

function ExperimentLab({ challenge }: { challenge: ExperimentChallenge }) {
    const [value, setValue] = useState(challenge.min);
    const result = challenge.compute(value);

    return (
        <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="text-center space-y-2">
                    <span className="text-6xl">{challenge.emoji}</span>
                    <h3 className="text-3xl font-black">{challenge.title}</h3>
                </div>

                <div className="glass p-8 rounded-3xl border border-amber-500/20 space-y-3">
                    <div className="flex items-center gap-2 text-amber-400">
                        <Beaker size={20} />
                        <span className="font-bold uppercase tracking-wider text-sm">Your Mission</span>
                    </div>
                    <p className="text-xl text-slate-200">{challenge.instruction}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="glass p-8 rounded-3xl border border-white/10 space-y-8">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-bold text-slate-300 uppercase tracking-widest">{challenge.sliderLabel}</label>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-black text-primary">{value}</span>
                                    <span className="text-primary/60 font-medium">{challenge.unit}</span>
                                </div>
                            </div>
                            <input
                                type="range"
                                min={challenge.min}
                                max={challenge.max}
                                step={challenge.step}
                                value={value}
                                onChange={(e) => setValue(Number(e.target.value))}
                                className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <div className="flex justify-between text-xs text-slate-500 font-bold">
                                <span>{challenge.min}{challenge.unit}</span>
                                <span>{challenge.max}{challenge.unit}</span>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 text-center">
                            <div className="text-xs text-primary font-bold uppercase tracking-widest mb-2">Result</div>
                            <div className="text-3xl font-black text-primary">{result}</div>
                        </div>

                        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                            <div className="flex items-center gap-2 text-amber-400 mb-1">
                                <Target size={16} />
                                <span className="text-xs font-bold uppercase tracking-wider">Challenge</span>
                            </div>
                            <p className="text-sm text-amber-200">{challenge.targetHint}</p>
                        </div>
                    </div>

                    <div className="glass p-8 rounded-3xl border border-white/10 space-y-4">
                        <div className="flex items-center gap-2 text-blue-400">
                            <Brain size={20} />
                            <span className="font-bold uppercase tracking-wider text-sm">Live Interpretation</span>
                        </div>
                        <p className="text-lg leading-relaxed text-slate-200">
                            {challenge.interpret(value, result)}
                        </p>

                        {/* Simple visual bar */}
                        <div className="mt-6 space-y-2">
                            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Visual Scale</div>
                            <div className="h-8 bg-slate-800 rounded-full overflow-hidden">
                                <motion.div
                                    animate={{ width: `${Math.min(100, ((value - challenge.min) / (challenge.max - challenge.min)) * 100)}%` }}
                                    className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function ApplicationChallenge({ scenario }: { scenario: ApplicationScenario }) {
    const [showHint, setShowHint] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="text-center space-y-2">
                    <span className="text-6xl">{scenario.emoji}</span>
                    <h3 className="text-3xl font-black">{scenario.title}</h3>
                </div>

                <div className="glass p-10 rounded-3xl border border-blue-500/20 space-y-6">
                    <div className="flex items-center gap-2 text-blue-400">
                        <Target size={20} />
                        <span className="font-bold uppercase tracking-wider text-sm">Real-World Scenario</span>
                    </div>
                    <p className="text-2xl leading-relaxed text-slate-200">{scenario.scenario}</p>
                    <div className="p-6 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                        <p className="text-xl font-bold text-blue-300">{scenario.challenge}</p>
                    </div>
                </div>

                <div className="flex gap-4 justify-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowHint(true)}
                        className={cn("px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all",
                            showHint ? "bg-amber-500/20 border border-amber-500/30 text-amber-400" : "bg-white/5 border border-white/10 hover:bg-white/10"
                        )}
                    >
                        <Lightbulb size={18} /> {showHint ? 'Hint Revealed' : 'Show Hint'}
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            setShowAnswer(true);
                            confetti({ particleCount: 60, spread: 50, origin: { y: 0.7 }, colors: ['#3b82f6', '#10b981', '#f59e0b'] });
                        }}
                        className={cn("px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all",
                            showAnswer ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-400" : "bg-primary text-white shadow-lg shadow-primary/20"
                        )}
                    >
                        <CheckCircle2 size={18} /> {showAnswer ? 'Answer Revealed' : 'Reveal Answer'}
                    </motion.button>
                </div>

                <AnimatePresence>
                    {showHint && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                            className="glass p-6 rounded-2xl border border-amber-500/20"
                        >
                            <div className="flex items-center gap-2 text-amber-400 mb-2">
                                <Lightbulb size={16} />
                                <span className="font-bold text-sm uppercase tracking-wider">Hint</span>
                            </div>
                            <p className="text-lg text-amber-200">{scenario.hint}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {showAnswer && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                            <div className="glass p-8 rounded-2xl border border-emerald-500/20">
                                <div className="flex items-center gap-2 text-emerald-400 mb-3">
                                    <CheckCircle2 size={20} />
                                    <span className="font-bold uppercase tracking-wider text-sm">Solution</span>
                                </div>
                                <p className="text-2xl font-bold text-emerald-300">{scenario.answer}</p>
                            </div>
                            <div className="glass p-6 rounded-2xl border border-purple-500/20">
                                <div className="flex items-center gap-2 text-purple-400 mb-2">
                                    <Puzzle size={16} />
                                    <span className="font-bold text-sm uppercase tracking-wider">Math Connection</span>
                                </div>
                                <p className="text-lg text-purple-200">{scenario.connection}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}

// ─── Quiz Question (Assess Phase) ──────────────────────────────

function AssessQuestion({ question, onComplete }: { question: Question; onComplete: (correct: boolean) => void }) {
    const [selected, setSelected] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);

    const handleSelect = (idx: number) => {
        if (showResult) return;
        setSelected(idx);
        setShowResult(true);
        const isCorrect = idx === question.correct;
        onComplete(isCorrect);
        if (isCorrect) {
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#10b981', '#3b82f6', '#f59e0b'] });
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-purple-400 animate-ping" />
                    <span className="text-purple-400 font-bold text-sm uppercase tracking-widest">Assessment</span>
                </div>
                <h3 className="text-4xl font-black leading-tight">{question.question}</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {question.options.map((opt, i) => {
                    const isCorrect = i === question.correct;
                    const isSelected = selected === i;
                    return (
                        <motion.button
                            key={i}
                            whileHover={!showResult ? { scale: 1.02 } : {}}
                            onClick={() => handleSelect(i)}
                            className={cn(
                                "p-6 text-left text-xl font-bold rounded-2xl border transition-all duration-300 flex items-center gap-4",
                                !showResult && "bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/50",
                                showResult && isCorrect && "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-lg",
                                showResult && isSelected && !isCorrect && "bg-red-500/20 border-red-500 text-red-400",
                                showResult && !isSelected && !isCorrect && "opacity-30 border-white/5"
                            )}
                        >
                            <div className={cn("w-9 h-9 rounded-full border flex items-center justify-center text-sm shrink-0",
                                !showResult && "border-white/20",
                                showResult && isCorrect && "bg-emerald-500 border-emerald-500 text-white",
                                showResult && isSelected && !isCorrect && "bg-red-500 border-red-500 text-white"
                            )}>
                                {String.fromCharCode(65 + i)}
                            </div>
                            <span>{opt}</span>
                            {showResult && isCorrect && <CheckCircle2 className="ml-auto text-emerald-400 shrink-0" size={20} />}
                            {showResult && isSelected && !isCorrect && <XCircle className="ml-auto text-red-400 shrink-0" size={20} />}
                        </motion.button>
                    );
                })}
            </div>

            <AnimatePresence>
                {showResult && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass p-8 rounded-2xl border border-white/10 space-y-4">
                        <div className="flex items-center gap-2 text-primary">
                            <Sparkles size={20} />
                            <span className="font-bold uppercase tracking-wider text-sm">Explanation</span>
                        </div>
                        <p className="text-xl leading-relaxed">{question.explanation}</p>
                        {question.analogy && (
                            <p className="text-lg text-slate-400 italic border-t border-white/10 pt-4">
                                <span className="text-primary not-italic font-bold mr-2">Analogy:</span>{question.analogy}
                            </p>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── Gamification Score Bar ─────────────────────────────────────

function ScoreBar({ score, streak, totalAnswered, totalQuestions }: { score: number; streak: number; totalAnswered: number; totalQuestions: number }) {
    return (
        <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Star size={14} />
                <span className="font-bold">{score} pts</span>
            </div>
            {streak >= 2 && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400"
                >
                    <Flame size={14} />
                    <span className="font-bold">{streak} streak!</span>
                </motion.div>
            )}
            <div className="flex items-center gap-1.5 text-slate-400">
                <GraduationCap size={14} />
                <span className="font-medium">{totalAnswered}/{totalQuestions} completed</span>
            </div>
        </div>
    );
}

// ─── Main: Build Activity Slides ────────────────────────────────

export interface ActivitySlide {
    id: string;
    phase: ActivityType;
    render: () => React.ReactNode;
}

/**
 * Builds a NEP 2020 "Ladder of Activities" for a given category.
 * Structure per learning unit:
 *   1. Explore  — concept card (story, key idea, fun fact)
 *   2. Experiment — hands-on slider lab
 *   3. Apply   — real-world scenario with hint/answer
 *   4. Assess  — 3-4 quiz questions
 * Repeated for each concept unit in the category.
 */
export function buildActivitySlides(
    category: StudentCategory,
    questions: Question[],
    onScore: (delta: number) => void,
    onStreak: (correct: boolean) => void,
): ActivitySlide[] {
    const concepts = CONCEPT_CARDS[category];
    const experiments = EXPERIMENT_CHALLENGES[category];
    const applications = APPLICATION_SCENARIOS[category];
    const slides: ActivitySlide[] = [];

    // Welcome slide
    slides.push({
        id: `welcome-${category}`,
        phase: 'explore',
        render: () => (
            <div className="max-w-4xl mx-auto text-center space-y-8">
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring' }}>
                    <div className="text-8xl mb-4">
                        {category === 'school' ? '📚' : category === 'ug' ? '🎓' : category === 'pg' ? '🔬' : '🧪'}
                    </div>
                    <h2 className="text-5xl font-black math-gradient">
                        {category === 'school' ? 'Math Adventures' : category === 'ug' ? 'Calculus & Beyond' : category === 'pg' ? 'Advanced Mathematics' : 'Research Frontiers'}
                    </h2>
                    <p className="text-2xl text-slate-400 mt-4">Learn by Doing — NEP 2020 Experiential Learning</p>
                </motion.div>
                <div className="flex justify-center gap-4 flex-wrap">
                    {(['explore', 'experiment', 'apply', 'assess'] as ActivityType[]).map(phase => {
                        const meta = PHASE_META[phase];
                        return (
                            <div key={phase} className={cn("flex items-center gap-2 px-4 py-2 rounded-xl border", meta.bg, meta.color)}>
                                {meta.icon}
                                <div className="text-left">
                                    <div className="font-bold text-sm">{meta.label}</div>
                                    <div className="text-xs opacity-70">{meta.desc}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        ),
    });

    // Build learning units
    const unitCount = Math.min(concepts.length, experiments.length, applications.length);
    const questionsPerUnit = Math.ceil(questions.length / unitCount);

    for (let u = 0; u < unitCount; u++) {
        // Unit header
        slides.push({
            id: `unit-header-${u}`,
            phase: 'explore',
            render: () => (
                <div className="max-w-3xl mx-auto text-center space-y-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-wider mb-4">
                            <Zap size={16} />
                            Learning Unit {u + 1} of {unitCount}
                        </div>
                        <h2 className="text-4xl font-black">{concepts[u].title} {concepts[u].emoji}</h2>
                        <p className="text-xl text-slate-400 mt-2">Explore → Experiment → Apply → Assess</p>
                    </motion.div>
                </div>
            ),
        });

        // Phase 1: Explore
        slides.push({
            id: `explore-${u}`,
            phase: 'explore',
            render: () => <ExploreCard card={concepts[u]} />,
        });

        // Phase 2: Experiment
        slides.push({
            id: `experiment-${u}`,
            phase: 'experiment',
            render: () => <ExperimentLab challenge={experiments[u]} />,
        });

        // Phase 3: Apply
        slides.push({
            id: `apply-${u}`,
            phase: 'apply',
            render: () => <ApplicationChallenge scenario={applications[u]} />,
        });

        // Phase 4: Assess — quiz questions for this unit
        const unitQuestions = questions.slice(u * questionsPerUnit, (u + 1) * questionsPerUnit);
        unitQuestions.forEach((q, qi) => {
            slides.push({
                id: `assess-${u}-${qi}-${q.id}`,
                phase: 'assess',
                render: () => (
                    <AssessQuestion
                        question={q}
                        onComplete={(correct) => {
                            onScore(correct ? 10 : 0);
                            onStreak(correct);
                        }}
                    />
                ),
            });
        });
    }

    // Completion slide
    slides.push({
        id: `complete-${category}`,
        phase: 'assess',
        render: () => (
            <div className="max-w-3xl mx-auto text-center space-y-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring' }}
                >
                    <div className="text-8xl mb-4">🏆</div>
                    <h2 className="text-5xl font-black math-gradient">Journey Complete!</h2>
                    <p className="text-2xl text-slate-400 mt-4">
                        You&apos;ve explored, experimented, applied, and assessed your way through this module.
                    </p>
                    <div className="mt-8 inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-primary/10 border border-primary/20">
                        <Trophy className="text-primary" size={28} />
                        <span className="text-2xl font-bold text-primary">NEP 2020 Experiential Learning — Achieved</span>
                    </div>
                </motion.div>
            </div>
        ),
    });

    return slides;
}

// ─── Exports ────────────────────────────────────────────────────

export { PhaseIndicator, ScoreBar, PHASE_META };
export type { ActivityType };
