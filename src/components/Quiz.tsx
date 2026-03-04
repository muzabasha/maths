'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ChevronRight, RefreshCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';
import { StudentCategory } from './PresentationContext';

interface Question {
    id: number;
    question: string;
    options: string[];
    correct: number;
    explanation: string;
    analogy?: string;
}

// School Students - Basic concepts
const SCHOOL_QUESTIONS: Question[] = [
    {
        id: 1,
        question: "If x increases, what happens to 5x?",
        options: ["Decreases", "Increases", "Stays same", "Becomes zero"],
        correct: 1,
        explanation: "As you sell more glasses (x), your profit (5x) goes up!",
        analogy: "Like walking more steps means more distance."
    },
    {
        id: 2,
        question: "x² represents:",
        options: ["Double x", "x × x", "Half x", "x − 2"],
        correct: 1,
        explanation: "x² means x multiplied by itself, forming a square area.",
        analogy: "If side is 3, area is 3×3=9."
    },
    {
        id: 3,
        question: "What is a polynomial?",
        options: ["A type of triangle", "An equation with powers of x", "A circle formula", "A straight line"],
        correct: 1,
        explanation: "A polynomial is like a recipe with different powers of x mixed together.",
        analogy: "Like mixing ingredients: 2x² + 3x + 1"
    },
    {
        id: 4,
        question: "In the equation y = 2x + 3, what is the coefficient of x?",
        options: ["3", "2", "x", "y"],
        correct: 1,
        explanation: "The coefficient is the number multiplying x, which is 2.",
        analogy: "Like saying 2 apples - the 2 is the coefficient."
    }
];

// UG Students - Intermediate concepts
const UG_QUESTIONS: Question[] = [
    {
        id: 1,
        question: "What does the derivative of a function represent?",
        options: ["The area under the curve", "The rate of change", "The maximum value", "The y-intercept"],
        correct: 1,
        explanation: "The derivative tells us how fast something is changing at any point.",
        analogy: "Like your speedometer showing how fast you're going."
    },
    {
        id: 2,
        question: "If f(x) = x³, what is f'(x)?",
        options: ["x²", "3x²", "3x", "x³/3"],
        correct: 1,
        explanation: "Using the power rule: bring down the exponent and reduce it by 1.",
        analogy: "3 comes down, and x³ becomes x²."
    },
    {
        id: 3,
        question: "At a critical point, the derivative equals:",
        options: ["Infinity", "Zero", "One", "Negative"],
        correct: 1,
        explanation: "Critical points occur where the slope is zero - the top or bottom of a curve.",
        analogy: "Like standing at the peak of a hill where it's flat."
    },
    {
        id: 4,
        question: "What is the second derivative test used for?",
        options: ["Finding roots", "Determining concavity", "Calculating area", "Solving equations"],
        correct: 1,
        explanation: "The second derivative tells us if a curve is bending upward or downward.",
        analogy: "Like checking if a bowl is right-side up or upside down."
    },
    {
        id: 5,
        question: "In optimization, we look for:",
        options: ["Any solution", "Maximum or minimum values", "Zero values", "Infinite values"],
        correct: 1,
        explanation: "Optimization finds the best possible outcome - highest profit or lowest cost.",
        analogy: "Like finding the best deal when shopping."
    }
];

// PG Students - Advanced concepts
const PG_QUESTIONS: Question[] = [
    {
        id: 1,
        question: "What condition ensures a local minimum at a critical point?",
        options: ["f'(x) > 0", "f''(x) > 0", "f'(x) < 0", "f''(x) < 0"],
        correct: 1,
        explanation: "A positive second derivative indicates the function is concave up, forming a minimum.",
        analogy: "Like a bowl that holds water - it curves upward."
    },
    {
        id: 2,
        question: "The gradient descent algorithm moves in the direction of:",
        options: ["Maximum increase", "Steepest descent", "Random direction", "Zero gradient"],
        correct: 1,
        explanation: "Gradient descent follows the negative gradient to find the minimum efficiently.",
        analogy: "Like rolling a ball downhill - it naturally finds the lowest point."
    },
    {
        id: 3,
        question: "What does the Hessian matrix determine?",
        options: ["First derivatives", "Local curvature and stability", "Function values", "Integration constants"],
        correct: 1,
        explanation: "The Hessian contains second derivatives and reveals the local shape of the function.",
        analogy: "Like a topographic map showing hills and valleys."
    },
    {
        id: 4,
        question: "In numerical optimization, what is the learning rate?",
        options: ["The final answer", "Step size in each iteration", "Number of iterations", "Error tolerance"],
        correct: 1,
        explanation: "The learning rate controls how big a step we take toward the minimum.",
        analogy: "Like choosing between baby steps or giant leaps when walking."
    },
    {
        id: 5,
        question: "What is the purpose of regularization in optimization?",
        options: ["Speed up computation", "Prevent overfitting", "Find exact solutions", "Increase complexity"],
        correct: 1,
        explanation: "Regularization adds constraints to prevent the model from fitting noise in the data.",
        analogy: "Like adding guardrails to keep a car on the road."
    },
    {
        id: 6,
        question: "The Lagrange multiplier method is used for:",
        options: ["Unconstrained optimization", "Constrained optimization", "Linear equations", "Matrix inversion"],
        correct: 1,
        explanation: "Lagrange multipliers help optimize functions subject to constraints.",
        analogy: "Like finding the best route when you must stay on certain roads."
    }
];

// Research Scholars - Expert level
const RESEARCH_QUESTIONS: Question[] = [
    {
        id: 1,
        question: "What is the KKT condition in constrained optimization?",
        options: ["A linear solver", "Necessary conditions for optimality with constraints", "A matrix decomposition", "An integration technique"],
        correct: 1,
        explanation: "Karush-Kuhn-Tucker conditions generalize Lagrange multipliers to inequality constraints.",
        analogy: "Like traffic rules that must be satisfied for the optimal route."
    },
    {
        id: 2,
        question: "In convex optimization, a local minimum is:",
        options: ["Not guaranteed to exist", "Always a global minimum", "Only valid locally", "Dependent on initial conditions"],
        correct: 1,
        explanation: "Convex functions have the special property that any local minimum is also global.",
        analogy: "Like a bowl - there's only one lowest point."
    },
    {
        id: 3,
        question: "What does the condition number of the Hessian indicate?",
        options: ["Number of variables", "Numerical stability and convergence rate", "Polynomial degree", "Integration bounds"],
        correct: 1,
        explanation: "A high condition number means the problem is ill-conditioned and sensitive to perturbations.",
        analogy: "Like trying to balance on a narrow beam vs. a wide platform."
    },
    {
        id: 4,
        question: "In stochastic gradient descent, what is the trade-off?",
        options: ["Accuracy vs. memory", "Speed vs. convergence stability", "Complexity vs. simplicity", "Local vs. global"],
        correct: 1,
        explanation: "SGD is faster per iteration but has noisy updates that can affect convergence.",
        analogy: "Like taking shortcuts that save time but might be bumpy."
    },
    {
        id: 5,
        question: "What is the purpose of the Armijo condition in line search?",
        options: ["Ensure sufficient decrease", "Calculate exact minimum", "Determine step direction", "Evaluate constraints"],
        correct: 0,
        explanation: "The Armijo condition ensures each step provides adequate improvement in the objective.",
        analogy: "Like checking that each move in chess actually improves your position."
    },
    {
        id: 6,
        question: "In quasi-Newton methods, what is approximated?",
        options: ["The gradient", "The Hessian inverse", "The objective function", "The constraints"],
        correct: 1,
        explanation: "Quasi-Newton methods build an approximation of the Hessian inverse iteratively.",
        analogy: "Like sketching a map instead of surveying every detail."
    },
    {
        id: 7,
        question: "What distinguishes BFGS from Newton's method?",
        options: ["Uses first derivatives only", "Approximates second derivatives", "Requires no derivatives", "Only works for linear problems"],
        correct: 1,
        explanation: "BFGS avoids computing the expensive Hessian by building an approximation.",
        analogy: "Like using a compass instead of GPS - less precise but more practical."
    }
];

const QUESTIONS_BY_CATEGORY: Record<StudentCategory, Question[]> = {
    school: SCHOOL_QUESTIONS,
    ug: UG_QUESTIONS,
    pg: PG_QUESTIONS,
    research: RESEARCH_QUESTIONS,
};

interface QuizComponentProps {
    category: StudentCategory;
}

export default function QuizComponent({ category }: QuizComponentProps) {
    const QUESTIONS = QUESTIONS_BY_CATEGORY[category];
    const [currentIdx, setCurrentIdx] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    const handleSelect = (idx: number) => {
        if (showResult) return;
        setSelected(idx);
        setShowResult(true);
        if (idx === QUESTIONS[currentIdx].correct) {
            setScore(prev => prev + 1);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#10b981', '#3b82f6', '#f59e0b']
            });
        }
    };

    const nextQuestion = () => {
        if (currentIdx < QUESTIONS.length - 1) {
            setCurrentIdx(prev => prev + 1);
            setSelected(null);
            setShowResult(false);
        } else {
            setIsFinished(true);
        }
    };

    if (isFinished) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-12 rounded-3xl border border-primary/20 text-center space-y-8 max-w-2xl mx-auto"
            >
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={48} className="text-primary" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-4xl font-black">Quiz Complete! 🎉</h3>
                    <p className="text-2xl text-slate-400">You scored {score} out of {QUESTIONS.length}</p>
                </div>

                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => {
                            setCurrentIdx(0);
                            setSelected(null);
                            setShowResult(false);
                            setScore(0);
                            setIsFinished(false);
                        }}
                        className="px-8 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all font-bold flex items-center gap-2"
                    >
                        <RefreshCcw size={20} /> Try Again
                    </button>
                </div>
            </motion.div>
        );
    }

    const q = QUESTIONS[currentIdx];

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-4">
                <div className="flex justify-between items-end">
                    <span className="text-primary font-bold text-xl">Question {currentIdx + 1}/{QUESTIONS.length}</span>
                    <div className="flex gap-1">
                        {QUESTIONS.map((_, i) => (
                            <div key={i} className={cn("h-1.5 w-8 rounded-full", i <= currentIdx ? "bg-primary" : "bg-slate-800")} />
                        ))}
                    </div>
                </div>
                <h3 className="text-4xl font-black leading-tight">{q.question}</h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {q.options.map((opt, i) => {
                    const isCorrect = i === q.correct;
                    const isSelected = selected === i;

                    return (
                        <motion.button
                            key={i}
                            whileHover={!showResult ? { scale: 1.02, x: 10 } : {}}
                            onClick={() => handleSelect(i)}
                            className={cn(
                                "p-6 text-left text-2xl font-bold rounded-2xl border transition-all duration-300 flex items-center justify-between",
                                !showResult && "bg-white/5 border-white/10 hover:bg-white/10 hover:border-primary/50",
                                showResult && isCorrect && "bg-primary/20 border-primary text-primary",
                                showResult && isSelected && !isCorrect && "bg-red-500/20 border-red-500 text-red-500",
                                showResult && !isSelected && !isCorrect && "opacity-30 border-white/5"
                            )}
                        >
                            <span>{opt}</span>
                            {showResult && isCorrect && <CheckCircle2 className="text-primary" />}
                            {showResult && isSelected && !isCorrect && <XCircle className="text-red-500" />}
                        </motion.button>
                    );
                })}
            </div>

            <AnimatePresence>
                {showResult && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="glass p-8 rounded-3xl border border-white/10 space-y-4">
                            <div className="flex items-center gap-2 text-xl font-bold">
                                <span className="text-primary tracking-widest uppercase text-sm">Explanation</span>
                            </div>
                            <p className="text-2xl leading-relaxed">{q.explanation}</p>
                            {q.analogy && (
                                <p className="text-xl text-slate-400 italic">💡 Analogy: {q.analogy}</p>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={nextQuestion}
                                className="px-10 py-4 bg-primary text-white text-2xl font-black rounded-2xl shadow-xl shadow-primary/30 flex items-center gap-2 hover:scale-105 transition-transform"
                            >
                                Next Question <ChevronRight size={28} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
