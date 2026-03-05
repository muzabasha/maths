'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ChevronRight, RefreshCcw, Calculator, Play, Settings2, Sparkles, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';
import type { StudentCategory } from './PresentationContext';

interface Question {
    id: number;
    question: string;
    options: string[];
    correct: number;
    explanation: string;
    analogy?: string;
    interactive?: {
        type: 'slider' | 'area' | 'volume' | 'circle' | 'graph' | 'percentage' | 'speed' | 'matrix' | 'trig' | 'linear' | 'formula' | 'plot';
        label?: string;
        min?: number;
        max?: number;
        step?: number;
        unit?: string;
    };
}


// School Students - Basic concepts
export const SCHOOL_QUESTIONS: Question[] = [
    {
        id: 1,
        question: "If x increases, what happens to 5x?",
        options: ["Decreases", "Increases", "Stays same", "Becomes zero"],
        correct: 1,
        explanation: "As you sell more glasses (x), your profit (5x) goes up!",
        analogy: "Like walking more steps means more distance.",
        interactive: { type: 'linear', label: 'Number of Glasses (x)', min: 0, max: 50, unit: ' pcs' }
    },
    {
        id: 2,
        question: "x² represents:",
        options: ["Double x", "x × x", "Half x", "x − 2"],
        correct: 1,
        explanation: "x² means x multiplied by itself, forming a square area.",
        analogy: "If side is 3, area is 3×3=9.",
        interactive: { type: 'area', label: 'Side Length (x)', min: 0, max: 20, unit: ' m' }
    },
    {
        id: 3,
        question: "What is a polynomial?",
        options: ["A type of triangle", "An equation with powers of x", "A circle formula", "A straight line"],
        correct: 1,
        explanation: "A polynomial is like a recipe with different powers of x mixed together.",
        analogy: "Like mixing ingredients: 2x² + 3x + 1",
        interactive: { type: 'slider', label: 'Mix Ratio (x)', min: 0, max: 10 }
    },
    {
        id: 4,
        question: "In the equation y = 2x + 3, what is the coefficient of x?",
        options: ["3", "2", "x", "y"],
        correct: 1,
        explanation: "The coefficient is the number multiplying x, which is 2.",
        analogy: "Like saying 2 apples - the 2 is the coefficient.",
        interactive: { type: 'linear', label: 'Coefficient (x)', min: -5, max: 5, step: 0.5 }
    },
    {
        id: 5,
        question: "What is the highest power in 3x² + 2x + 1?",
        options: ["1", "2", "3", "4"],
        correct: 1,
        explanation: "The highest power of x is 2, making this a quadratic polynomial.",
        analogy: "Like finding the tallest person in a group.",
        interactive: { type: 'area', label: 'Power Level (x)', min: 1, max: 3 }
    },
    {
        id: 6,
        question: "If x = 2, what is 3x?",
        options: ["5", "6", "8", "9"],
        correct: 1,
        explanation: "Substitute x with 2: 3 × 2 = 6",
        analogy: "Like buying 3 chocolates at 2 rupees each.",
        interactive: { type: 'linear', label: 'Unit Price (x)', min: 1, max: 10 }
    },
    {
        id: 7,
        question: "What does the constant term mean in 2x + 5?",
        options: ["The number without x", "The coefficient", "The variable", "The power"],
        correct: 0,
        explanation: "The constant term (5) doesn't change with x.",
        analogy: "Like a fixed entry fee that everyone pays.",
        interactive: { type: 'linear', label: 'Constant (c)', min: 0, max: 20 }
    },
    {
        id: 8,
        question: "Which is larger: 2³ or 3²?",
        options: ["2³", "3²", "Both equal", "Cannot compare"],
        correct: 0,
        explanation: "2³ = 8 and 3² = 9, so 3² is larger. Wait, let me recalculate: 2³ = 2×2×2 = 8, 3² = 3×3 = 9",
        analogy: "Like comparing 8 apples to 9 oranges.",
        interactive: { type: 'volume', label: 'Base Value', min: 2, max: 3 }
    },
    {
        id: 9,
        question: "In a graph, what does the x-axis represent?",
        options: ["Output", "Input", "Result", "Answer"],
        correct: 1,
        explanation: "The x-axis shows the input values we put into our equation.",
        analogy: "Like the ingredients you put into a recipe.",
        interactive: { type: 'slider', label: 'Horizontal Axis', min: -10, max: 10 }
    },
    {
        id: 10,
        question: "What is the y-intercept in y = 2x + 4?",
        options: ["2", "4", "x", "y"],
        correct: 1,
        explanation: "The y-intercept is where the line crosses the y-axis, which is 4.",
        analogy: "Like the starting point before you begin walking.",
        interactive: { type: 'linear', label: 'Input X', min: -10, max: 10, step: 0.5 }
    },
    {
        id: 11,
        question: "If you double x, what happens to x²?",
        options: ["Doubles", "Triples", "Quadruples", "Stays same"],
        correct: 2,
        explanation: "If x becomes 2x, then (2x)² = 4x², which is 4 times larger.",
        analogy: "Like doubling the side of a square makes the area 4 times bigger.",
        interactive: { type: 'area', label: 'Side Multiplier', min: 1, max: 4 }
    },
    {
        id: 12,
        question: "What is 5x when x = 0?",
        options: ["5", "0", "x", "Undefined"],
        correct: 1,
        explanation: "Anything multiplied by 0 equals 0.",
        analogy: "Like having 5 baskets with 0 apples each.",
        interactive: { type: 'linear', label: 'Apples (x)', min: 0, max: 10 }
    },
    {
        id: 13,
        question: "Which equation represents a straight line?",
        options: ["y = x²", "y = 2x + 1", "y = x³", "y = 1/x"],
        correct: 1,
        explanation: "Linear equations like y = 2x + 1 create straight lines.",
        analogy: "Like a ruler - perfectly straight.",
        interactive: { type: 'linear', label: 'Line Position', min: -10, max: 10 }
    },
    {
        id: 14,
        question: "What does 'solving for x' mean?",
        options: ["Graphing x", "Finding the value of x", "Multiplying x", "Dividing x"],
        correct: 1,
        explanation: "Solving means finding what number x represents.",
        analogy: "Like solving a mystery to find the answer.",
        interactive: { type: 'slider', label: 'Unknown Value', min: 0, max: 100 }
    },
    {
        id: 15,
        question: "In 4x + 3 = 11, what is x?",
        options: ["1", "2", "3", "4"],
        correct: 1,
        explanation: "Subtract 3 from both sides: 4x = 8, then divide by 4: x = 2",
        analogy: "Like finding how many candies you have if 4 times that plus 3 equals 11.",
        interactive: { type: 'linear', label: 'Balance Scale', min: 0, max: 5 }
    },
    {
        id: 16,
        question: "What is the degree of the polynomial 5x³ + 2x + 1?",
        options: ["1", "2", "3", "5"],
        correct: 2,
        explanation: "The degree is the highest power of x, which is 3.",
        analogy: "Like the highest level in a video game.",
        interactive: { type: 'volume', label: 'Dimension (n)', min: 1, max: 3 }
    },
    {
        id: 17,
        question: "If a graph goes upward from left to right, the slope is:",
        options: ["Negative", "Positive", "Zero", "Undefined"],
        correct: 1,
        explanation: "An upward slope means as x increases, y also increases.",
        analogy: "Like climbing uphill.",
        interactive: { type: 'linear', label: 'Steepness', min: -2, max: 2, step: 0.1 }
    },
    {
        id: 18,
        question: "What is x⁰ equal to?",
        options: ["0", "1", "x", "Undefined"],
        correct: 1,
        explanation: "Any number (except 0) raised to the power 0 equals 1.",
        analogy: "Like a special rule in mathematics.",
        interactive: { type: 'slider', label: 'Base x', min: 1, max: 100 }
    },
    {
        id: 19,
        question: "In the expression 7x - 3, what operation comes first?",
        options: ["Subtraction", "Multiplication", "Addition", "Division"],
        correct: 1,
        explanation: "We multiply 7 by x first, then subtract 3.",
        analogy: "Like following the order of operations: PEMDAS.",
        interactive: { type: 'linear', label: 'Steps', min: 1, max: 10 }
    },
    {
        id: 20,
        question: "What shape does y = x² make on a graph?",
        options: ["Straight line", "Circle", "U-shaped curve", "Zigzag"],
        correct: 2,
        explanation: "Quadratic equations create a parabola, which looks like a U.",
        analogy: "Like a smile or a bowl.",
        interactive: { type: 'area', label: 'Width', min: -5, max: 5, step: 0.1 }
    },
    {
        id: 21,
        question: "What is the area of a square with side 4?",
        options: ["8", "12", "16", "20"],
        correct: 2,
        explanation: "Area of a square is side × side, so 4 × 4 = 16.",
        analogy: "Like tiling a floor - 4 rows of 4 tiles.",
        interactive: { type: 'area', label: 'Side Length', min: 1, max: 10 }
    },
    {
        id: 22,
        question: "If 3x = 9, what is x?",
        options: ["2", "3", "6", "12"],
        correct: 1,
        explanation: "Divide both sides by 3: 9 ÷ 3 = 3.",
        analogy: "Splitting 9 cookies among 3 friends.",
        interactive: { type: 'linear', label: 'Total Cookies', min: 0, max: 30 }
    },
    {
        id: 23,
        question: "What is the perimeter of a rectangle with length 5 and width 3?",
        options: ["8", "15", "16", "20"],
        correct: 2,
        explanation: "Perimeter is 2 × (length + width) = 2 × (5 + 3) = 16.",
        analogy: "Walking around the edge of a garden.",
        interactive: { type: 'linear', label: 'Distance', min: 1, max: 20 }
    },
    {
        id: 24,
        question: "What is 1/2 + 1/4?",
        options: ["1/6", "2/6", "3/4", "3/6"],
        correct: 2,
        explanation: "1/2 is 2/4, and 2/4 + 1/4 = 3/4.",
        analogy: "Adding half a pizza and a quarter pizza.",
        interactive: { type: 'percentage', label: 'Progress', min: 0, max: 1, step: 0.01 }
    },
    {
        id: 25,
        question: "If a car travels at 60 mph, how far does it go in 2 hours?",
        options: ["60 miles", "80 miles", "100 miles", "120 miles"],
        correct: 3,
        explanation: "Distance = Speed × Time, so 60 × 2 = 120.",
        analogy: "Constant speed over time.",
        interactive: { type: 'speed', label: 'Travel Time', min: 1, max: 10, unit: ' hrs' }
    },
    {
        id: 26,
        question: "What is the square root of 49?",
        options: ["6", "7", "8", "9"],
        correct: 1,
        explanation: "Because 7 × 7 = 49, the square root of 49 is 7.",
        analogy: "Finding the side of a square given its area.",
        interactive: { type: 'area', label: 'Area Box', min: 1, max: 100 }
    },
    {
        id: 27,
        question: "In the expression 2x + 5, what is the 'constant'?",
        options: ["2", "x", "5", "None"],
        correct: 2,
        explanation: "The constant is the number that doesn't change, which is 5.",
        analogy: "The fixed part of a price (like entry fee).",
        interactive: { type: 'linear', label: 'Growth', min: 0, max: 10 }
    },
    {
        id: 28,
        question: "What is the sum of internal angles in a triangle?",
        options: ["90°", "180°", "270°", "360°"],
        correct: 1,
        explanation: "All angles in any triangle always add up to 180 degrees.",
        analogy: "Turning halfway around a circle.",
        interactive: { type: 'trig', label: 'Rotation', min: 0, max: 3.14 }
    },
    {
        id: 29,
        question: "If y = x + 2, what is y when x = 5?",
        options: ["3", "5", "7", "10"],
        correct: 2,
        explanation: "Substitute x with 5: y = 5 + 2 = 7.",
        analogy: "Moving 2 steps forward from where you are.",
        interactive: { type: 'linear', label: 'Current Pos', min: 0, max: 20 }
    },
    {
        id: 30,
        question: "What is 10% of 200?",
        options: ["10", "20", "30", "40"],
        correct: 1,
        explanation: "10% of 200 is (10/100) × 200 = 20.",
        analogy: "Taking a small slice (one tenth) of a big pie.",
        interactive: { type: 'percentage', label: 'Cut Amount', min: 0, max: 100, unit: '%' }
    },
    {
        id: 31,
        question: "Which is larger: -5 or -10?",
        options: ["-5", "-10", "They are equal", "Cannot compare"],
        correct: 0,
        explanation: "-5 is to the right of -10 on the number line, so it is larger.",
        analogy: "Being less in debt ($5) is better than being more in debt ($10).",
        interactive: { type: 'slider', label: 'Debt Level', min: -20, max: 0 }
    },
    {
        id: 32,
        question: "What is the volume of a cube with side 2?",
        options: ["4", "6", "8", "16"],
        correct: 2,
        explanation: "Volume = side × side × side = 2 × 2 × 2 = 8.",
        analogy: "Counting blocks in a 2x2x2 stack.",
        interactive: { type: 'volume', label: 'Side Unit', min: 1, max: 5 }
    },
    {
        id: 33,
        question: "In the fraction 3/5, what is the numerator?",
        options: ["3", "5", "8", "2"],
        correct: 0,
        explanation: "The numerator is the top number of a fraction, which is 3.",
        analogy: "The number of slices you actually have.",
        interactive: { type: 'slider', label: 'Slices', min: 1, max: 10 }
    },
    {
        id: 34,
        question: "What is 2 raised to the power of 3 (2³)?",
        options: ["5", "6", "8", "9"],
        correct: 2,
        explanation: "2³ = 2 × 2 × 2 = 8.",
        analogy: "Growth that doubles three times.",
        interactive: { type: 'volume', label: 'Base 2', min: 1, max: 4 }
    },
    {
        id: 35,
        question: "What is the slope of a flat horizontal line?",
        options: ["1", "0", "-1", "Infinite"],
        correct: 1,
        explanation: "A horizontal line doesn't go up or down, so its slope is zero.",
        analogy: "Walking on perfectly level ground.",
        interactive: { type: 'linear', label: 'Inclination', min: -5, max: 5, step: 0.1 }
    },
    {
        id: 36,
        question: "If a triangle has sides 3, 4, and 5, is it a right triangle?",
        options: ["Yes", "No", "Only if x=1", "Not enough info"],
        correct: 0,
        explanation: "Yes, because 3² + 4² = 5² (9 + 16 = 25).",
        analogy: "The famous 3-4-5 rule in construction.",
        interactive: { type: 'area', label: 'Triangle Area', min: 1, max: 10 }
    },
    {
        id: 37,
        question: "What is the next number in the sequence 2, 4, 6, 8...?",
        options: ["9", "10", "11", "12"],
        correct: 1,
        explanation: "The pattern is adding 2 each time, so 8 + 2 = 10.",
        analogy: "Counting by twos.",
        interactive: { type: 'linear', label: 'Index n', min: 1, max: 20 }
    },
    {
        id: 38,
        question: "What is 0.5 written as a fraction?",
        options: ["1/5", "1/2", "5/100", "2/1"],
        correct: 1,
        explanation: "0.5 is half, which is 1 divided by 2.",
        analogy: "The halfway point between 0 and 1.",
        interactive: { type: 'percentage', label: 'Point', min: 0, max: 1, step: 0.05 }
    },
    {
        id: 39,
        question: "If x - 4 = 10, what is x?",
        options: ["6", "10", "14", "40"],
        correct: 2,
        explanation: "Add 4 to both sides: 10 + 4 = 14.",
        analogy: "Finding the original amount before some was taken away.",
        interactive: { type: 'linear', label: 'Unknown', min: 0, max: 20 }
    },
    {
        id: 40,
        question: "What is the diameter of a circle with radius 5?",
        options: ["2.5", "5", "7.5", "10"],
        correct: 3,
        explanation: "Diameter is twice the radius: 2 × 5 = 10.",
        analogy: "The full width of a wheel.",
        interactive: { type: 'circle', label: 'Radius', min: 1, max: 15, unit: ' cm' }
    }
];

// UG Students - Intermediate concepts
export const UG_QUESTIONS: Question[] = [
    {
        id: 1,
        question: "What does the derivative of a function represent?",
        options: ["The area under the curve", "The rate of change", "The maximum value", "The y-intercept"],
        correct: 1,
        explanation: "The derivative tells us how fast something is changing at any point.",
        analogy: "Like your speedometer showing how fast you're going.",
        interactive: { type: 'linear', label: 'Speed (dx/dt)', min: 0, max: 100, unit: ' km/h' }
    },
    {
        id: 2,
        question: "If f(x) = x³, what is f'(x)?",
        options: ["x²", "3x²", "3x", "x³/3"],
        correct: 1,
        explanation: "Using the power rule: bring down the exponent and reduce it by 1.",
        analogy: "3 comes down, and x³ becomes x².",
        interactive: { type: 'volume', label: 'X Value', min: 1, max: 10 }
    },
    {
        id: 3,
        question: "At a critical point, the derivative equals:",
        options: ["Infinity", "Zero", "One", "Negative"],
        correct: 1,
        explanation: "Critical points occur where the slope is zero - the top or bottom of a curve.",
        analogy: "Like standing at the peak of a hill where it's flat.",
        interactive: { type: 'linear', label: 'Slope m', min: -5, max: 5, step: 0.1 }
    },
    {
        id: 4,
        question: "What is the second derivative test used for?",
        options: ["Finding roots", "Determining concavity", "Calculating area", "Solving equations"],
        correct: 1,
        explanation: "The second derivative tells us if a curve is bending upward or downward.",
        analogy: "Like checking if a bowl is right-side up or upside down.",
        interactive: { type: 'plot', label: 'Curvature', min: -10, max: 10 }
    },
    {
        id: 5,
        question: "In optimization, we look for:",
        options: ["Any solution", "Maximum or minimum values", "Zero values", "Infinite values"],
        correct: 1,
        explanation: "Optimization finds the best possible outcome - highest profit or lowest cost.",
        analogy: "Like finding the best deal when shopping.",
        interactive: { type: 'graph', label: 'Optimization Point', min: 0, max: 100 }
    },
    {
        id: 6,
        question: "What is the derivative of a constant?",
        options: ["1", "0", "The constant itself", "Undefined"],
        correct: 1,
        explanation: "Constants don't change, so their rate of change is zero.",
        analogy: "Like a parked car has zero speed.",
        interactive: { type: 'linear', label: 'Position', min: 0, max: 100 }
    },
    {
        id: 7,
        question: "The chain rule is used for:",
        options: ["Adding functions", "Composite functions", "Multiplying constants", "Finding limits"],
        correct: 1,
        explanation: "Chain rule helps differentiate functions within functions.",
        analogy: "Like peeling layers of an onion, one at a time.",
        interactive: { type: 'slider', label: 'Outer Layer', min: 1, max: 5 }
    },
    {
        id: 8,
        question: "If f'(x) > 0, the function is:",
        options: ["Decreasing", "Increasing", "Constant", "Zero"],
        correct: 1,
        explanation: "A positive derivative means the function is going upward.",
        analogy: "Like climbing uphill.",
        interactive: { type: 'linear', label: 'Growth Step', min: 0, max: 10 }
    },
    {
        id: 9,
        question: "What does ∫ represent?",
        options: ["Derivative", "Integral", "Limit", "Summation"],
        correct: 1,
        explanation: "The integral symbol represents integration, the reverse of differentiation.",
        analogy: "Like finding the total distance from speed.",
        interactive: { type: 'area', label: 'Accumulation', min: 0, max: 50 }
    },
    {
        id: 10,
        question: "The product rule is used when:",
        options: ["Adding two functions", "Multiplying two functions", "Dividing functions", "Subtracting functions"],
        correct: 1,
        explanation: "Product rule: (uv)' = u'v + uv'",
        analogy: "Like distributing when multiplying binomials.",
        interactive: { type: 'area', label: 'Factor u', min: 1, max: 10 }
    },
    {
        id: 11,
        question: "What is the derivative of sin(x)?",
        options: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"],
        correct: 0,
        explanation: "The derivative of sine is cosine.",
        analogy: "A fundamental trigonometric derivative.",
        interactive: { type: 'trig', label: 'Angle θ', min: 0, max: 6.28, unit: ' rad' }
    },
    {
        id: 12,
        question: "A function has a local maximum when:",
        options: ["f'(x) = 0 and f''(x) < 0", "f'(x) = 0 and f''(x) > 0", "f'(x) > 0", "f'(x) < 0"],
        correct: 0,
        explanation: "Zero first derivative and negative second derivative indicate a peak.",
        analogy: "Like reaching the top of a hill.",
        interactive: { type: 'graph', label: 'Local X', min: -5, max: 5 }
    },
    {
        id: 13,
        question: "What is lim(x→0) sin(x)/x?",
        options: ["0", "1", "∞", "Undefined"],
        correct: 1,
        explanation: "This is a famous limit that equals 1.",
        analogy: "A fundamental limit in calculus.",
        interactive: { type: 'trig', label: 'Input x', min: 0.01, max: 1, step: 0.01 }
    },
    {
        id: 14,
        question: "The Mean Value Theorem guarantees:",
        options: ["A point where f'(c) equals average rate", "Function is continuous", "Derivative exists everywhere", "Function is linear"],
        correct: 0,
        explanation: "MVT says there's a point where instantaneous rate equals average rate.",
        analogy: "Like finding a moment when your speed equals your average speed.",
        interactive: { type: 'linear', label: 'Point c', min: 0, max: 10 }
    },
    {
        id: 15,
        question: "What is the derivative of e^x?",
        options: ["e^x", "xe^(x-1)", "e", "1"],
        correct: 0,
        explanation: "The exponential function is its own derivative.",
        analogy: "A unique property of e^x.",
        interactive: { type: 'plot', label: 'Power x', min: 0, max: 5 }
    },
    {
        id: 16,
        question: "Implicit differentiation is used when:",
        options: ["y is explicitly defined", "y is not isolated", "Function is linear", "Derivative is zero"],
        correct: 1,
        explanation: "When we can't easily solve for y, we differentiate both sides.",
        analogy: "Like working with equations where variables are mixed together.",
        interactive: { type: 'slider', label: 'Mix Level', min: 1, max: 10 }
    },
    {
        id: 17,
        question: "The quotient rule formula is:",
        options: ["(u/v)' = u'/v'", "(u/v)' = (u'v - uv')/v²", "(u/v)' = u'v + uv'", "(u/v)' = uv'/v²"],
        correct: 1,
        explanation: "Quotient rule: low d-high minus high d-low, over low squared.",
        analogy: "A mnemonic: lo-d-hi minus hi-d-lo over lo-lo.",
        interactive: { type: 'slider', label: 'Ratio Scale', min: 1, max: 10 }
    },
    {
        id: 18,
        question: "What is ∫x dx?",
        options: ["x", "x²", "x²/2 + C", "2x + C"],
        correct: 2,
        explanation: "Integrate by adding 1 to the power and dividing, plus constant C.",
        analogy: "The reverse of differentiation.",
        interactive: { type: 'area', label: 'Width x', min: 1, max: 20 }
    },
    {
        id: 19,
        question: "L'Hôpital's Rule applies to:",
        options: ["All limits", "Indeterminate forms like 0/0", "Definite integrals", "Continuous functions"],
        correct: 1,
        explanation: "L'Hôpital's Rule helps evaluate limits of indeterminate forms.",
        analogy: "Like a special tool for tricky limits.",
        interactive: { type: 'slider', label: 'Convergence', min: 0, max: 1 }
    },
    {
        id: 20,
        question: "The Fundamental Theorem of Calculus connects:",
        options: ["Algebra and geometry", "Differentiation and integration", "Limits and continuity", "Functions and graphs"],
        correct: 1,
        explanation: "It shows that differentiation and integration are inverse operations.",
        analogy: "Like addition and subtraction being opposites.",
        interactive: { type: 'area', label: 'Total Area', min: 0, max: 100 }
    },
    {
        id: 21,
        question: "What is the dot product of vectors [1, 2] and [3, 4]?",
        options: ["7", "10", "11", "14"],
        correct: 2,
        explanation: "(1×3) + (2×4) = 3 + 8 = 11.",
        analogy: "Measuring how much two vectors point in the same direction.",
        interactive: { type: 'linear', label: 'Vector Length', min: 1, max: 20 }
    },
    {
        id: 22,
        question: "Solving the differential equation dy/dx = y leads to which function?",
        options: ["x²", "sin(x)", "e^x", "ln(x)"],
        correct: 2,
        explanation: "The exponential function's derivative is itself, satisfying dy/dx = y.",
        analogy: "A population that grows based on its current size.",
        interactive: { type: 'plot', label: 'Growth Step', min: 0, max: 10 }
    },
    {
        id: 23,
        question: "What is the determinant of a 2x2 identity matrix?",
        options: ["0", "1", "2", "-1"],
        correct: 1,
        explanation: "Identity matrix [[1,0],[0,1]] has determinant (1×1) - (0×0) = 1.",
        analogy: "The scaling factor of an unchanged area.",
        interactive: { type: 'matrix', label: 'Scaling', min: 1, max: 5 }
    },
    {
        id: 24,
        question: "A square matrix is invertible if and only if its determinant is:",
        options: ["Zero", "Non-zero", "Positive", "One"],
        correct: 1,
        explanation: "A matrix with a zero determinant is singular and cannot be inverted.",
        analogy: "A door that can be opened and closed - zero determinant is a locked door.",
        interactive: { type: 'matrix', label: 'Determinant', min: -5, max: 5 }
    },
    {
        id: 25,
        question: "What is the derivative of f(x) = ln(x)?",
        options: ["e^x", "1/x", "x", "1"],
        correct: 1,
        explanation: "The derivative of the natural logarithm is the reciprocal function.",
        analogy: "The rate of change of growth.",
        interactive: { type: 'linear', label: 'Input x', min: 1, max: 50 }
    },
    {
        id: 26,
        question: "If a function is continuous at a point, does the derivative necessarily exist there?",
        options: ["Yes", "No", "Always", "Only if it is linear"],
        correct: 1,
        explanation: "Continuity doesn't guarantee differentiability (e.g., y = |x| at x=0).",
        analogy: "A sharp corner in a road is continuous but has no single direction.",
        interactive: { type: 'graph', label: 'Corner Level', min: 0, max: 5 }
    },
    {
        id: 27,
        question: "What is the integral of cos(x)?",
        options: ["sin(x) + C", "-sin(x) + C", "cos(x) + C", "tan(x) + C"],
        correct: 0,
        explanation: "The derivative of sine is cosine, so the integral of cosine is sine.",
        analogy: "Moving between circular positions.",
        interactive: { type: 'trig', label: 'Wave Pos', min: 0, max: 6.28 }
    },
    {
        id: 28,
        question: "In linear algebra, what are 'eigenvalues'?",
        options: ["Vector lengths", "Scaling factors for specific axes", "Matrix sums", "Integration constants"],
        correct: 1,
        explanation: "Eigenvalues are scalars λ such that Av = λv for some non-zero vector v.",
        analogy: "The 'natural' frequencies or growth rates of a system.",
        interactive: { type: 'matrix', label: 'Eigenvalue', min: 0.1, max: 10 }
    },
    {
        id: 29,
        question: "A Taylor series approximates a function using a sum of:",
        options: ["Logarithms", "Polynomials", "Sines", "Square roots"],
        correct: 1,
        explanation: "Taylor series uses derivatives to create an approximating polynomial.",
        analogy: "Using simpler curves to mimic a complex shape.",
        interactive: { type: 'slider', label: 'Order (n)', min: 1, max: 10 }
    },
    {
        id: 30,
        question: "Partial derivatives are used when a function has:",
        options: ["One input", "Multiple inputs", "No inputs", "Complex outputs"],
        correct: 1,
        explanation: "Partial derivatives measure how a multivariable function changes with one variable at a time.",
        analogy: "Checking how height changes as you move North vs East separately.",
        interactive: { type: 'slider', label: 'X Slice', min: -5, max: 5 }
    },
    {
        id: 31,
        question: "What is the 'cross product' of two vectors in 3D used for?",
        options: ["Finding dot product", "Finding a perpendicular vector", "Finding vector length", "Adding vectors"],
        correct: 1,
        explanation: "The cross product result is a vector perpendicular to both input vectors.",
        analogy: "Finding the axis of rotation for two hands on a clock.",
        interactive: { type: 'slider', label: 'Vector A', min: 1, max: 10 }
    },
    {
        id: 32,
        question: "A sequence 'converges' if:",
        options: ["It keeps getting larger", "Its terms approach a specific limit", "It alternates signs", "It ends at zero"],
        correct: 1,
        explanation: "Convergence means the terms get arbitrarily close to a fixed number.",
        analogy: "Approaching a destination without ever quite reaching it.",
        interactive: { type: 'slider', label: 'Term n', min: 1, max: 100 }
    },
    {
        id: 33,
        question: "The 'divergence' of a vector field measures:",
        options: ["Rotation", "Outflow from a point", "Length", "Surface area"],
        correct: 1,
        explanation: "Divergence measures the extent to which the vector field flow 'exits' a small region.",
        analogy: "Like water spraying out of a fountain (positive divergence).",
        interactive: { type: 'slider', label: 'Source Strength', min: 0, max: 10 }
    },
    {
        id: 34,
        question: "Stokes' Theorem relates which two types of integrals?",
        options: ["Line and Surface", "Line and Volume", "Surface and Volume", "Single and Double"],
        correct: 0,
        explanation: "Stokes' Theorem relates the surface integral of the curl to the line integral around its boundary.",
        analogy: "The flow around a rim vs the activity on the surface inside.",
        interactive: { type: 'area', label: 'Surface Area', min: 1, max: 50 }
    },
    {
        id: 35,
        question: "What is a 'basis' in linear algebra?",
        options: ["The bottom of a matrix", "A set of vectors that span a space", "The first row", "The determinant"],
        correct: 1,
        explanation: "A basis is a set of linearly independent vectors that span the entire vector space.",
        analogy: "The primary colors needed to mix any other color in the spectrum.",
        interactive: { type: 'matrix', label: 'Basis Vec 1', min: 1, max: 10 }
    },
    {
        id: 36,
        question: "The technique of 'integration by parts' is based on which derivative rule?",
        options: ["Chain rule", "Product rule", "Quotient rule", "Power rule"],
        correct: 1,
        explanation: "Integration by parts is essentially the product rule for derivatives in reverse.",
        analogy: "Unwinding a product of two changing quantities.",
        interactive: { type: 'slider', label: 'Unwind Level', min: 1, max: 5 }
    },
    {
        id: 37,
        question: "What is the 'rank' of a matrix?",
        options: ["Number of rows", "Number of columns", "Number of linearly independent rows/columns", "Its largest value"],
        correct: 2,
        explanation: "Rank represents the dimension of the vector space spanned by its rows or columns.",
        analogy: "The true number of unique directions a system can actually move.",
        interactive: { type: 'matrix', label: 'Unique Info', min: 1, max: 4 }
    },
    {
        id: 38,
        question: "Euler's formula states that e^(iθ) equals:",
        options: ["cos θ + i sin θ", "cos θ - i sin θ", "sin θ + i cos θ", "tan θ"],
        correct: 0,
        explanation: "This formula establishes the fundamental relationship between trigonometric functions and complex exponentials.",
        analogy: "Connecting straight line growth to circular rotation.",
        interactive: { type: 'trig', label: 'Theta θ', min: 0, max: 6.28 }
    },
    {
        id: 39,
        question: "A 'Fourier series' represents a periodic function as a sum of:",
        options: ["Polynomials", "Sines and Cosines", "Logarithms", "Exponentials only"],
        correct: 1,
        explanation: "Fourier series break down periodic signals into their constituent frequencies.",
        analogy: "Breaking down a complex sound into its individual pure musical notes.",
        interactive: { type: 'trig', label: 'Harmonic n', min: 1, max: 20 }
    },
    {
        id: 40,
        question: "The 'gradient vector' ∇f always points in the direction of:",
        options: ["Steepest descent", "Steepest ascent", "Zero change", "Tangent plane"],
        correct: 1,
        explanation: "The gradient points in the direction where the function value increases most rapidly.",
        analogy: "The most direct path to the mountaintop.",
        interactive: { type: 'linear', label: 'Ascent Rate', min: 0, max: 100 }
    }
];


// PG Students - Advanced concepts
export const PG_QUESTIONS: Question[] = [
    {
        id: 1,
        question: "What condition ensures a local minimum at a critical point?",
        options: ["f'(x) > 0", "f''(x) > 0", "f'(x) < 0", "f''(x) < 0"],
        correct: 1,
        explanation: "A positive second derivative indicates the function is concave up, forming a minimum.",
        analogy: "Like a bowl that holds water - it curves upward.",
        interactive: { type: 'slider', label: 'Curvature (f\'\')', min: -10, max: 10, step: 0.5 }
    },
    {
        id: 2,
        question: "The gradient descent algorithm moves in the direction of:",
        options: ["Maximum increase", "Steepest descent", "Random direction", "Zero gradient"],
        correct: 1,
        explanation: "Gradient descent follows the negative gradient to find the minimum efficiently.",
        analogy: "Like rolling a ball downhill - it naturally finds the lowest point.",
        interactive: { type: 'linear', label: 'Descent Rate', min: 0, max: 100 }
    },
    {
        id: 3,
        question: "What does the Hessian matrix determine?",
        options: ["First derivatives", "Local curvature and stability", "Function values", "Integration constants"],
        correct: 1,
        explanation: "The Hessian contains second derivatives and reveals the local shape of the function.",
        analogy: "Like a topographic map showing hills and valleys.",
        interactive: { type: 'matrix', label: 'Hessian (H)', min: -5, max: 5 }
    },
    {
        id: 4,
        question: "In numerical optimization, what is the learning rate?",
        options: ["The final answer", "Step size in each iteration", "Number of iterations", "Error tolerance"],
        correct: 1,
        explanation: "The learning rate controls how big a step we take toward the minimum.",
        analogy: "Like choosing between baby steps or giant leaps when walking.",
        interactive: { type: 'slider', label: 'Step Size (η)', min: 0.001, max: 1, step: 0.001 }
    },
    {
        id: 5,
        question: "What is the purpose of regularization in optimization?",
        options: ["Speed up computation", "Prevent overfitting", "Find exact solutions", "Increase complexity"],
        correct: 1,
        explanation: "Regularization adds constraints to prevent the model from fitting noise in the data.",
        analogy: "Like adding guardrails to keep a car on the road.",
        interactive: { type: 'slider', label: 'Penalty (λ)', min: 0, max: 10 }
    },
    {
        id: 6,
        question: "The Lagrange multiplier method is used for:",
        options: ["Unconstrained optimization", "Constrained optimization", "Linear equations", "Matrix inversion"],
        correct: 1,
        explanation: "Lagrange multipliers help optimize functions subject to constraints.",
        analogy: "Like finding the best route when you must stay on certain roads.",
        interactive: { type: 'slider', label: 'Constraint (g)', min: -10, max: 10 }
    },
    {
        id: 7,
        question: "What is a saddle point?",
        options: ["A local minimum", "A local maximum", "Neither minimum nor maximum", "An inflection point"],
        correct: 2,
        explanation: "A saddle point is a critical point that's a minimum in one direction and maximum in another.",
        analogy: "Like a mountain pass - uphill in one direction, downhill in another.",
        interactive: { type: 'graph', label: 'X Axis Pos', min: -5, max: 5 }
    },
    {
        id: 8,
        question: "The Newton-Raphson method uses:",
        options: ["Only first derivatives", "First and second derivatives", "No derivatives", "Third derivatives"],
        correct: 1,
        explanation: "Newton's method uses both gradient and Hessian for faster convergence.",
        analogy: "Like using both speed and acceleration to predict position.",
        interactive: { type: 'slider', label: 'Initial Guest', min: -10, max: 10 }
    },
    {
        id: 9,
        question: "What is the convergence rate of Newton's method?",
        options: ["Linear", "Quadratic", "Cubic", "Exponential"],
        correct: 1,
        explanation: "Newton's method has quadratic convergence near the solution.",
        analogy: "Like doubling your accuracy with each step.",
        interactive: { type: 'slider', label: 'Iteration k', min: 1, max: 10 }
    },
    {
        id: 10,
        question: "In convex optimization, any local minimum is:",
        options: ["Not optimal", "A global minimum", "A saddle point", "Undefined"],
        correct: 1,
        explanation: "Convex functions have the property that local minima are global.",
        analogy: "Like a bowl with only one lowest point.",
        interactive: { type: 'slider', label: 'Curvature', min: 1, max: 10 }
    },
    {
        id: 11,
        question: "What is the gradient of a scalar field?",
        options: ["A scalar", "A vector pointing to steepest ascent", "A matrix", "A constant"],
        correct: 1,
        explanation: "The gradient is a vector of partial derivatives showing steepest increase.",
        analogy: "Like an arrow pointing uphill on a mountain.",
        interactive: { type: 'linear', label: 'Gradient X', min: -10, max: 10 }
    },
    {
        id: 12,
        question: "The Jacobian matrix contains:",
        options: ["Second derivatives", "First partial derivatives", "Eigenvalues", "Determinants"],
        correct: 1,
        explanation: "The Jacobian is a matrix of all first-order partial derivatives.",
        analogy: "Like a table showing how each output changes with each input.",
        interactive: { type: 'matrix', label: 'Jacobian (J)', min: -5, max: 5 }
    },
    {
        id: 13,
        question: "What does positive definite Hessian indicate?",
        options: ["Saddle point", "Local minimum", "Local maximum", "Inflection point"],
        correct: 1,
        explanation: "Positive definite Hessian means the function curves upward in all directions.",
        analogy: "Like sitting at the bottom of a bowl.",
        interactive: { type: 'matrix', label: 'Eigenvalue λ', min: 0.1, max: 10 }
    },
    {
        id: 14,
        question: "The method of steepest descent uses:",
        options: ["Random directions", "Negative gradient direction", "Positive gradient direction", "Fixed direction"],
        correct: 1,
        explanation: "Steepest descent moves opposite to the gradient to minimize the function.",
        analogy: "Like water flowing downhill.",
        interactive: { type: 'linear', label: 'Descent Step', min: 0, max: 50 }
    },
    {
        id: 15,
        question: "What is the purpose of line search in optimization?",
        options: ["Find critical points", "Determine optimal step size", "Calculate gradients", "Solve constraints"],
        correct: 1,
        explanation: "Line search finds how far to move in the chosen direction.",
        analogy: "Like deciding how many steps to take in a direction.",
        interactive: { type: 'slider', label: 'Step Size α', min: 0, max: 1, step: 0.05 }
    },
    {
        id: 16,
        question: "The conjugate gradient method is efficient for:",
        options: ["Small problems", "Large sparse systems", "Nonlinear problems only", "Constrained problems"],
        correct: 1,
        explanation: "Conjugate gradient works well for large sparse linear systems.",
        analogy: "Like finding shortcuts through a maze.",
        interactive: { type: 'slider', label: 'System Size', min: 10, max: 1000 }
    },
    {
        id: 17,
        question: "What is the Lipschitz constant?",
        options: ["Integration constant", "Bound on gradient magnitude", "Eigenvalue", "Determinant"],
        correct: 1,
        explanation: "Lipschitz constant bounds how fast a function can change.",
        analogy: "Like a speed limit for function changes.",
        interactive: { type: 'linear', label: 'Max Growth L', min: 1, max: 100 }
    },
    {
        id: 18,
        question: "In multi-objective optimization, Pareto optimality means:",
        options: ["Single best solution", "No improvement without trade-off", "All objectives maximized", "Random solution"],
        correct: 1,
        explanation: "Pareto optimal means you can't improve one objective without worsening another.",
        analogy: "Like balancing quality and cost - improving one hurts the other.",
        interactive: { type: 'slider', label: 'Objective A', min: 0, max: 100 }
    },
    {
        id: 19,
        question: "What is the trust region method?",
        options: ["A constraint type", "A region where model is trusted", "An integration technique", "A differentiation rule"],
        correct: 1,
        explanation: "Trust region methods limit steps to where the quadratic model is reliable.",
        analogy: "Like only walking where you can see clearly.",
        interactive: { type: 'circle', label: 'Radius (Δ)', min: 0.1, max: 5 }
    },
    {
        id: 20,
        question: "The penalty method handles constraints by:",
        options: ["Ignoring them", "Adding penalty terms to objective", "Solving separately", "Linearizing them"],
        correct: 1,
        explanation: "Penalty methods add large costs for violating constraints.",
        analogy: "Like adding fines for breaking rules.",
        interactive: { type: 'slider', label: 'Penalty k', min: 1, max: 1000 }
    },

    {
        id: 21,
        question: "What is a 'Banach space'?",
        options: ["A finite space", "A complete normed vector space", "A space with no norm", "A discrete set"],
        correct: 1,
        explanation: "A Banach space is a vector space with a norm where every Cauchy sequence converges within the space.",
        analogy: "A world where every traveler following a map eventually finds a home.",
        interactive: { type: 'area', label: 'Space Size', min: 1, max: 100 }
    },
    {
        id: 22,
        question: "The Fourier Transform converts a signal from which domain to which domain?",
        options: ["Space to Time", "Time to Frequency", "Real to Imaginary", "Linear to Nonlinear"],
        correct: 1,
        explanation: "It decomposes a time-based signal into its constituent frequencies.",
        analogy: "Seeing the individual ingredients in a baked cake after it's finished.",
        interactive: { type: 'trig', label: 'Frequency ω', min: 1, max: 50 }
    },
    {
        id: 23,
        question: "What is the primary feature of the 'Monte Carlo method'?",
        options: ["Exact solutions", "Random sampling", "Linear regression", "Determinism"],
        correct: 1,
        explanation: "Monte Carlo methods use repeated random sampling to obtain numerical results.",
        analogy: "Predicting an election result by asking a few hundred random people.",
        interactive: { type: 'slider', label: 'Sample Count', min: 100, max: 10000, step: 100 }
    },
    {
        id: 24,
        question: "A Markov Chain is characterized by being:",
        options: ["Infinite", "Memoryless", "Reversible", "Continuous"],
        correct: 1,
        explanation: "The Markov property states that the future state depends only on the current state, not the history.",
        analogy: "Only the present matters for the future, not how you got here.",
        interactive: { type: 'slider', label: 'State Prob', min: 0, max: 1, step: 0.01 }
    },
    {
        id: 25,
        question: "What is the 'dual space' of an L^p space for 1 < p < ∞?",
        options: ["L^p itself", "L^q where 1/p + 1/q = 1", "L²", "L^∞"],
        correct: 1,
        explanation: "The dual of L^p is L^q where p and q are conjugate exponents.",
        analogy: "The hidden 'mirror' space where measurements and functions live together.",
        interactive: { type: 'slider', label: 'Exponent p', min: 1.1, max: 10, step: 0.1 }
    },
    {
        id: 26,
        question: "In 'Galerkin methods', we approximate solutions in:",
        options: ["Infinite spaces", "Finite-dimensional subspaces", "Random sets", "Discrete grids only"],
        correct: 1,
        explanation: "Galerkin methods project a continuous problem into a simpler finite-dimensional space to solve it numerically.",
        analogy: "Trying to paint a masterpiece using only a few basic brushes and colors.",
        interactive: { type: 'slider', label: 'Basis Dim N', min: 1, max: 100 }
    },
    {
        id: 27,
        question: "What is a 'Sobolev space' used to measure?",
        options: ["Function values only", "Smoothness and derivative integrability", "Set cardinality", "Matrix rank"],
        correct: 1,
        explanation: "Sobolev spaces provide a framework for studying solutions to differential equations with weak derivatives.",
        analogy: "Measuring the smoothness of a function more precisely than just continuity.",
        interactive: { type: 'slider', label: 'Order k', min: 0, max: 5 }
    },
    {
        id: 28,
        question: "Singular Value Decomposition (SVD) is highly effective for:",
        options: ["Addition", "Data compression and noise reduction", "Finding derivatives", "Integration"],
        correct: 1,
        explanation: "SVD identifies the most significant patterns in a matrix, allowing for efficient representation.",
        analogy: "Identifying the most important features in a messy photograph.",
        interactive: { type: 'matrix', label: 'SV Rank', min: 1, max: 10 }
    },
    {
        id: 29,
        question: "The 'Central Limit Theorem' states that the sum of independent variables approaches which distribution?",
        options: ["Uniform", "Normal (Gaussian)", "Poisson", "Exponential"],
        correct: 1,
        explanation: "As the sample size increases, the distribution of the sample mean approaches a normal distribution.",
        analogy: "Diverse small errors cancel each other out to form a predictable bell curve.",
        interactive: { type: 'slider', label: 'Sample Size n', min: 1, max: 200 }
    },
    {
        id: 30,
        question: "In the 'Calculus of Variations', we search for functions that minimize:",
        options: ["Values", "Functionals (integrals)", "Slopes", "Roots"],
        correct: 1,
        explanation: "Variational calculus finds functions that are extrema of integral expressions.",
        analogy: "Finding the exact shape of a hanging chain to minimize its energy.",
        interactive: { type: 'graph', label: 'Path Param', min: -5, max: 5 }
    },
    {
        id: 31,
        question: "The 'condition number' of a linear system measures:",
        options: ["The number of iterations", "Sensitivity to errors or perturbations", "The matrix size", "The sum of elements"],
        correct: 1,
        explanation: "A high condition number indicates that small changes in input can cause large changes in output.",
        analogy: "How much a small nudge at the start of a journey affects your final destination.",
        interactive: { type: 'linear', label: 'Condition κ', min: 1, max: 1000 }
    },
    {
        id: 32,
        question: "The 'Residue Theorem' is a powerful tool in which field?",
        options: ["Real Analysis", "Complex Analysis", "Linear Algebra", "Graph Theory"],
        correct: 1,
        explanation: "It allows for the evaluation of complex line integrals by looking at singularities.",
        analogy: "Calculating the total whirlpool effect around 'holes' in a flat plane.",
        interactive: { type: 'circle', label: 'Contour R', min: 0.1, max: 10 }
    },
    {
        id: 33,
        question: "A function is called 'analytic' if it can be represented by:",
        options: ["A graph", "A power series", "A limit", "A constant"],
        correct: 1,
        explanation: "Analytic functions are infinitely differentiable and equal to their Taylor series locally.",
        analogy: "A function so smooth that its past behavior perfectly predicts its future.",
        interactive: { type: 'slider', label: 'Series Order', min: 1, max: 20 }
    },
    {
        id: 34,
        question: "What is the purpose of the 'Expectation-Maximization' (EM) algorithm?",
        options: ["Sorting data", "Finding MLE in models with hidden variables", "Differentiating functions", "Integrating sines"],
        correct: 1,
        explanation: "EM is an iterative method to find maximum likelihood estimates when some data is missing or latent.",
        analogy: "Iteratively guessing hidden information to find the best possible explanation for what you see.",
        interactive: { type: 'slider', label: 'Latent Var', min: 0, max: 1 }
    },
    {
        id: 35,
        question: "What is a 'Hilbert space'?",
        options: ["An empty space", "A complete inner product space", "A space of integers", "A finite field"],
        correct: 1,
        explanation: "A Hilbert space generalizes Euclidean space to infinite dimensions with an inner product.",
        analogy: "The ultimate mathematical playground for geometry and analysis.",
        interactive: { type: 'linear', label: 'Vector Proj', min: 0, max: 10 }
    },
    {
        id: 36,
        question: "'Brownian motion' is a classic example of a:",
        options: ["Linear process", "Stochastic process", "Deterministic process", "Algebraic group"],
        correct: 1,
        explanation: "It is a continuous-time random walk that models physical phenomena like particle diffusion.",
        analogy: "The erratic, unpredictable dance of a dust particle in a glass of water.",
        interactive: { type: 'slider', label: 'Time Step t', min: 0, max: 100 }
    },
    {
        id: 37,
        question: "The 'Power Method' is an algorithm used to find:",
        options: ["The sum of a matrix", "The dominant eigenvalue", "The smallest element", "The matrix inverse"],
        correct: 1,
        explanation: "By repeatedly multiplying a vector by a matrix, it converges to the eigenvector of the largest eigenvalue.",
        analogy: "Repeatedly applying a process until only the strongest effect remains visible.",
        interactive: { type: 'matrix', label: 'Convergence', min: 1, max: 50 }
    },
    {
        id: 38,
        question: "The 'Laplace Transform' is especially useful for solving:",
        options: ["Linear equations", "Differential equations", "Integrals", "Logic puzzles"],
        correct: 1,
        explanation: "It transforms differential equations into simpler algebraic ones in the s-domain.",
        analogy: "Translating a difficult book into an easier language to solve the mystery more quickly.",
        interactive: { type: 'slider', label: 'Freq s', min: 0, max: 10 }
    },
    {
        id: 39,
        question: "What is a 'Hidden Markov Model' (HMM)?",
        options: ["A model with hidden states", "A model with secret inputs", "A model with no history", "A model used in encryption"],
        correct: 0,
        explanation: "An HMM is a system where the state is not directly visible, but the output depending on the state is.",
        analogy: "Guessing the weather inside a building by watching what people carry when they enter.",
        interactive: { type: 'slider', label: 'Hidden State', min: 1, max: 5 }
    },
    {
        id: 40,
        question: "A 'Green's function' essentially represents:",
        options: ["The derivative", "The impulse response of a linear operator", "The area", "The boundary value"],
        correct: 1,
        explanation: "It is a type of function used to solve inhomogeneous differential equations subject to boundary conditions.",
        analogy: "Seeing how a single drop of water creates ripples that travel across an entire pond.",
        interactive: { type: 'circle', label: 'Source Pos', min: 0, max: 100 }
    }
];


// Research Scholars - Expert level
export const RESEARCH_QUESTIONS: Question[] = [
    {
        id: 1,
        question: "What is the KKT condition in constrained optimization?",
        options: ["A linear solver", "Necessary conditions for optimality with constraints", "A matrix decomposition", "An integration technique"],
        correct: 1,
        explanation: "Karush-Kuhn-Tucker conditions generalize Lagrange multipliers to inequality constraints.",
        analogy: "Like traffic rules that must be satisfied for the optimal route.",
        interactive: { type: 'slider', label: 'Constraint λ', min: 0, max: 10 }
    },
    {
        id: 2,
        question: "In convex optimization, a local minimum is:",
        options: ["Not guaranteed to exist", "Always a global minimum", "Only valid locally", "Dependent on initial conditions"],
        correct: 1,
        explanation: "Convex functions have the special property that any local minimum is also global.",
        analogy: "Like a bowl - there's only one lowest point.",
        interactive: { type: 'slider', label: 'Convexity Multiplier', min: 1, max: 5, step: 0.2 }
    },
    {
        id: 3,
        question: "What does the condition number of the Hessian indicate?",
        options: ["Number of variables", "Numerical stability and convergence rate", "Polynomial degree", "Integration bounds"],
        correct: 1,
        explanation: "A high condition number means the problem is ill-conditioned and sensitive to perturbations.",
        analogy: "Like trying to balance on a narrow beam vs. a wide platform.",
        interactive: { type: 'matrix', label: 'Hessian H', min: -5, max: 5 }
    },
    {
        id: 4,
        question: "In stochastic gradient descent, what is the trade-off?",
        options: ["Accuracy vs. memory", "Speed vs. convergence stability", "Complexity vs. simplicity", "Local vs. global"],
        correct: 1,
        explanation: "SGD is faster per iteration but has noisy updates that can affect convergence.",
        analogy: "Like taking shortcuts that save time but might be bumpy.",
        interactive: { type: 'slider', label: 'Batch Size', min: 1, max: 128 }
    },
    {
        id: 5,
        question: "What is the purpose of the Armijo condition in line search?",
        options: ["Ensure sufficient decrease", "Calculate exact minimum", "Determine step direction", "Evaluate constraints"],
        correct: 0,
        explanation: "The Armijo condition ensures each step provides adequate improvement in the objective.",
        analogy: "Like checking that each move in chess actually improves your position.",
        interactive: { type: 'slider', label: 'Decrease (c1)', min: 0, max: 0.5, step: 0.01 }
    },
    {
        id: 6,
        question: "In quasi-Newton methods, what is approximated?",
        options: ["The gradient", "The Hessian inverse", "The objective function", "The constraints"],
        correct: 1,
        explanation: "Quasi-Newton methods build an approximation of the Hessian inverse iteratively.",
        analogy: "Like sketching a map instead of surveying every detail.",
        interactive: { type: 'matrix', label: 'Approx H⁻¹', min: -2, max: 2 }
    },
    {
        id: 7,
        question: "What distinguishes BFGS from Newton's method?",
        options: ["Uses first derivatives only", "Approximates second derivatives", "Requires no derivatives", "Only works for linear problems"],
        correct: 1,
        explanation: "BFGS avoids computing the expensive Hessian by building an approximation.",
        analogy: "Like using a compass instead of GPS - less precise but more practical.",
        interactive: { type: 'slider', label: 'Update k', min: 1, max: 20 }
    },
    {
        id: 8,
        question: "What is the Wolfe condition used for?",
        options: ["Constraint satisfaction", "Line search step size", "Eigenvalue computation", "Matrix factorization"],
        correct: 1,
        explanation: "Wolfe conditions ensure both sufficient decrease and curvature in line search.",
        analogy: "Like having two quality checks before accepting a solution.",
        interactive: { type: 'slider', label: 'Curvature (c2)', min: 0.5, max: 0.99, step: 0.01 }
    },
    {
        id: 9,
        question: "The Frank-Wolfe algorithm is particularly suited for:",
        options: ["Unconstrained problems", "Problems with simple constraint geometry", "Integer programming", "Stochastic optimization"],
        correct: 1,
        explanation: "Frank-Wolfe works well when projecting onto constraints is expensive but linear optimization is cheap.",
        analogy: "Like taking advantage of the shape of your constraints.",
        interactive: { type: 'slider', label: 'Linear Step', min: 0, max: 1 }
    },
    {
        id: 10,
        question: "What is the convergence rate of gradient descent with Lipschitz continuous gradient?",
        options: ["Exponential", "Linear", "Quadratic", "Cubic"],
        correct: 1,
        explanation: "Standard gradient descent has linear convergence for smooth strongly convex functions.",
        analogy: "Like reducing error by a constant factor each step.",
        interactive: { type: 'slider', label: 'Step k', min: 1, max: 100 }
    },
    {
        id: 11,
        question: "In the interior point method, what happens to the barrier parameter?",
        options: ["Increases to infinity", "Decreases to zero", "Stays constant", "Oscillates"],
        correct: 1,
        explanation: "The barrier parameter is gradually reduced to approach the constraint boundary.",
        analogy: "Like slowly removing training wheels from a bicycle.",
        interactive: { type: 'slider', label: 'Barrier μ', min: 0.001, max: 1, step: 0.001 }
    },
    {
        id: 12,
        question: "What is the purpose of momentum in optimization?",
        options: ["Increase step size", "Accelerate convergence and dampen oscillations", "Satisfy constraints", "Compute Hessian"],
        correct: 1,
        explanation: "Momentum helps accelerate in consistent directions and dampen oscillations.",
        analogy: "Like a heavy ball that keeps rolling in the same direction.",
        interactive: { type: 'slider', label: 'Momentum β', min: 0, max: 0.99, step: 0.01 }
    },
    {
        id: 13,
        question: "The Nesterov accelerated gradient achieves:",
        options: ["Linear convergence", "Optimal convergence rate for first-order methods", "Quadratic convergence", "No guaranteed convergence"],
        correct: 1,
        explanation: "Nesterov's method achieves the optimal O(1/k²) rate for smooth convex functions.",
        analogy: "Like finding the theoretical speed limit for gradient-based methods.",
        interactive: { type: 'slider', label: 'Accel Fact L', min: 1, max: 10 }
    },
    {
        id: 14,
        question: "What is the dual problem in optimization?",
        options: ["A second objective", "Optimization over Lagrange multipliers", "A backup solution", "An approximation"],
        correct: 1,
        explanation: "The dual problem optimizes over the Lagrange multipliers of the primal problem.",
        analogy: "Like looking at a problem from the opposite perspective.",
        interactive: { type: 'slider', label: 'Dual Var y', min: -10, max: 10 }
    },
    {
        id: 15,
        question: "Strong duality holds when:",
        options: ["Problem is linear", "Slater's condition is satisfied", "Hessian is positive definite", "Gradient is Lipschitz"],
        correct: 1,
        explanation: "Slater's condition (strict feasibility) ensures strong duality for convex problems.",
        analogy: "Like having a guarantee that two perspectives give the same answer.",
        interactive: { type: 'slider', label: 'Feas Gap', min: 0, max: 5 }
    },
    {
        id: 16,
        question: "What is the proximal gradient method used for?",
        options: ["Smooth problems only", "Non-smooth regularized problems", "Linear systems", "Eigenvalue problems"],
        correct: 1,
        explanation: "Proximal methods handle non-smooth terms like L1 regularization efficiently.",
        analogy: "Like having a special tool for rough edges.",
        interactive: { type: 'slider', label: 'Proximal Step', min: 0, max: 1 }
    },
    {
        id: 17,
        question: "The ADMM algorithm is based on:",
        options: ["Newton's method", "Augmented Lagrangian and decomposition", "Gradient descent", "Simplex method"],
        correct: 1,
        explanation: "ADMM uses augmented Lagrangian and alternating minimization for decomposable problems.",
        analogy: "Like divide and conquer - split the problem and solve pieces alternately.",
        interactive: { type: 'slider', label: 'Rho (ρ)', min: 0.1, max: 10 }
    },
    {
        id: 18,
        question: "What is variance reduction in stochastic optimization?",
        options: ["Reducing problem size", "Reducing gradient estimate noise", "Reducing iterations", "Reducing memory"],
        correct: 1,
        explanation: "Variance reduction techniques like SVRG reduce noise in stochastic gradient estimates.",
        analogy: "Like using a better camera to get clearer pictures.",
        interactive: { type: 'slider', label: 'Variance Red', min: 0, max: 1 }
    },
    {
        id: 19,
        question: "The Adam optimizer combines:",
        options: ["Momentum and RMSprop", "Newton and gradient descent", "SGD and BFGS", "Proximal and dual methods"],
        correct: 0,
        explanation: "Adam uses both momentum and adaptive learning rates (like RMSprop).",
        analogy: "Like combining the best features of two approaches.",
        interactive: { type: 'slider', label: 'Adapt Rate', min: 0.001, max: 0.1 }
    },
    {
        id: 20,
        question: "What is the subgradient method used for?",
        options: ["Smooth optimization", "Non-differentiable convex functions", "Linear programming", "Quadratic programming"],
        correct: 1,
        explanation: "Subgradient methods extend gradient descent to non-smooth convex functions.",
        analogy: "Like using a generalized slope when the function has corners.",
        interactive: { type: 'linear', label: 'Subgrad Step', min: 0, max: 1 }
    },

    {
        id: 21,
        question: "In semidefinite programming, variables are:",
        options: ["Scalars", "Vectors", "Positive semidefinite matrices", "Integers"],
        correct: 2,
        explanation: "SDP optimizes over the cone of positive semidefinite matrices.",
        analogy: "Like optimizing over shapes that satisfy matrix constraints.",
        interactive: { type: 'matrix', label: 'Matrix X', min: -5, max: 5 }
    },
    {
        id: 22,
        question: "What is the cutting plane method?",
        options: ["A matrix decomposition", "Iteratively adding constraints to approximate feasible region", "A differentiation technique", "A sampling method"],
        correct: 1,
        explanation: "Cutting plane methods progressively refine the feasible region by adding constraints.",
        analogy: "Like sculpting a statue by removing pieces.",
        interactive: { type: 'slider', label: 'Cut Index', min: 1, max: 20 }
    },
    {
        id: 23,
        question: "The ellipsoid method guarantees:",
        options: ["Fast practical performance", "Polynomial time complexity", "Quadratic convergence", "Global optimum always"],
        correct: 1,
        explanation: "Ellipsoid method was the first polynomial-time algorithm for linear programming.",
        analogy: "Like having a theoretical guarantee even if not the fastest in practice.",
        interactive: { type: 'circle', label: 'Ellipsoid R', min: 1, max: 10 }
    },
    {
        id: 24,
        question: "What is coordinate descent?",
        options: ["Descending in all directions", "Optimizing one variable at a time", "Using coordinates as constraints", "A projection method"],
        correct: 1,
        explanation: "Coordinate descent optimizes with respect to one coordinate while fixing others.",
        analogy: "Like adjusting one knob at a time on a control panel.",
        interactive: { type: 'slider', label: 'Coord (i)', min: 1, max: 10 }
    },
    {
        id: 25,
        question: "The mirror descent algorithm uses:",
        options: ["Euclidean geometry", "Bregman divergence", "Manhattan distance", "Cosine similarity"],
        correct: 1,
        explanation: "Mirror descent generalizes gradient descent using Bregman divergences.",
        analogy: "Like using a curved mirror instead of a flat one - different geometry.",
        interactive: { type: 'slider', label: 'Bregman Div', min: 0, max: 10 }
    },
    {
        id: 26,
        question: "What is the 'Manifold Hypothesis' in data science?",
        options: ["Data is random", "High-dimensional data lies on low-dimensional manifolds", "Data is always linear", "Data cannot be compressed"],
        correct: 1,
        explanation: "It suggests that natural high-dimensional data actually sits on a much simpler lower-dimensional structure.",
        analogy: "A crumpled piece of paper is a complex 3D object, but its surface is still just a 2D sheet.",
        interactive: { type: 'slider', label: 'Manifold Dim', min: 1, max: 10 }
    },
    {
        id: 27,
        question: "What is the primary goal of 'Differential Privacy'?",
        options: ["Speed up queries", "Protect individual privacy while sharing aggregate info", "Encrypt all data", "Delete noisy data"],
        correct: 1,
        explanation: "It adds controlled noise to queries so that the presence of any single individual cannot be determined.",
        analogy: "Adding just enough blur to a photo so you recognize the scene but not the specific faces.",
        interactive: { type: 'slider', label: 'Epsilon (ε)', min: 0.01, max: 10, step: 0.01 }
    },
    {
        id: 28,
        question: "The 'Attention mechanism' in Transformers allows the model to:",
        options: ["Ignore inputs", "Weight the importance of different input parts", "Add more layers", "Speed up training"],
        correct: 1,
        explanation: "It computes a weighted sum of values based on how relevant they are to a specific query.",
        analogy: "Focusing on specific key words in a long sentence to understand its true meaning.",
        interactive: { type: 'percentage', label: 'Attention W', min: 0, max: 100 }
    },
    {
        id: 29,
        question: "In Information Theory, what does 'Entropy' measure?",
        options: ["Energy", "Average uncertainty or information content", "System speed", "Data size"],
        correct: 1,
        explanation: "Entropy quantifies the 'surprise' or bits of information needed to describe a state.",
        analogy: "How surprised you are by a result - a coin flip has more entropy than a fixed outcome.",
        interactive: { type: 'slider', label: 'Prob p', min: 0, max: 1, step: 0.01 }
    },
    {
        id: 30,
        question: "What is a 'Lie Group'?",
        options: ["A deceptive set", "A group that is also a differentiable manifold", "A finite group", "A group of integers"],
        correct: 1,
        explanation: "Lie groups provide a framework for studying continuous symmetry in mathematics and physics.",
        analogy: "A mathematical object that describes smooth, continuous motions like rotations.",
        interactive: { type: 'slider', label: 'Rotation θ', min: 0, max: 360 }
    },
    {
        id: 31,
        question: "The 'Atiyah-Singer Index Theorem' is famous for connecting:",
        options: ["Algebra and Number Theory", "Analysis and Topology", "Logic and Sets", "Chaos and Order"],
        correct: 1,
        explanation: "It relates the analytical index of a differential operator to the topological index of the manifold.",
        analogy: "Bridging the world of differential equations with the world of geometric shapes.",
        interactive: { type: 'slider', label: 'Index n', min: -5, max: 5 }
    },
    {
        id: 32,
        question: "What is the purpose of 'Shor's algorithm' in quantum computing?",
        options: ["Searching databases", "Factoring large integers", "Optimizing routes", "Sorting lists"],
        correct: 1,
        explanation: "It factors integers in polynomial time on a quantum computer, threatening RSA encryption.",
        analogy: "Finding the secret combination of a lock by exploring all possible paths simultaneously.",
        interactive: { type: 'slider', label: 'Qubits N', min: 2, max: 1024 }
    },
    {
        id: 33,
        question: "In Reinforcement Learning, the 'Bellman Equation' describes:",
        options: ["Reward sum", "Relationship between current and future value", "Agent speed", "Environment size"],
        correct: 1,
        explanation: "It breaks down the value of a state into the immediate reward plus the discounted future value.",
        analogy: "Planning your career by considering the value of today's work plus every possible future opportunity.",
        interactive: { type: 'slider', label: 'Discount γ', min: 0, max: 1, step: 0.01 }
    },
    {
        id: 34,
        question: "What is a 'Generative Adversarial Network' (GAN)?",
        options: ["A network that fights humans", "Two networks competing to create and detect data", "A single network that sorts data", "A network that adds noise"],
        correct: 1,
        explanation: "A generator tries to create realistic data while a discriminator tries to tell real from fake.",
        analogy: "An art forger and an investigator training each other to become better and better.",
        interactive: { type: 'slider', label: 'Noise z', min: -1, max: 1, step: 0.1 }
    },
    {
        id: 35,
        question: "'Homology' in Algebraic Topology is used to measure:",
        options: ["Set size", "Holes of various dimensions in a space", "Function slopes", "Point distances"],
        correct: 1,
        explanation: "Homology groups provide a way to distinguish between shapes based on their connectivity and 'holes'.",
        analogy: "Distinguishing a donut from a ball by counting the number of loops that can't be shrunk.",
        interactive: { type: 'slider', label: 'Dimension p', min: 0, max: 5 }
    },
    {
        id: 36,
        question: "The 'Navier-Stokes' problem is famous for being related to:",
        options: ["Prime numbers", "Fluid flow existence and smoothness", "Graph coloring", "Infinite sets"],
        correct: 1,
        explanation: "One of the Millennium Prize Problems, it asks about the fundamental nature of 3D fluid motion.",
        analogy: "Proving whether water will always flow predictably or if it can suddenly turn into chaos.",
        interactive: { type: 'slider', label: 'Reynolds Re', min: 1, max: 10000 }
    },
    {
        id: 37,
        question: "The 'P vs NP' problem fundamentally asks if:",
        options: ["Verification is harder than discovery", "Easy verification implies easy solution", "Primes are infinite", "Computers can think"],
        correct: 1,
        explanation: "It asks whether every problem whose solution can be quickly verified can also be quickly solved.",
        analogy: "Does being able to appreciate a great book mean you could have easily written it yourself?",
        interactive: { type: 'slider', label: 'Complexity n', min: 1, max: 100 }
    },
    {
        id: 38,
        question: "What is an 'Autoencoder' primary function?",
        options: ["Driving cars", "Dimensionality reduction and feature learning", "Sending emails", "Multiplying matrices"],
        correct: 1,
        explanation: "An autoencoder compresses input into a bottleneck and then reconstructs it to find key features.",
        analogy: "Summarizing a long complex story into a few key points, then trying to tell the whole story from just those points.",
        interactive: { type: 'slider', label: 'Compress %', min: 1, max: 100 }
    },
    {
        id: 39,
        question: "The 'Black-Scholes model' is a mathematical model for:",
        options: ["Weather prediction", "Pricing financial derivatives (options)", "Protein folding", "Social networks"],
        correct: 1,
        explanation: "It provides a theoretical estimate of the price of European-style options over time.",
        analogy: "Calculating the fair price for a bet on the future value of a company's stock.",
        interactive: { type: 'slider', label: 'Volatility σ', min: 0.01, max: 1, step: 0.01 }
    },
    {
        id: 40,
        question: "The 'Incompleteness Theorems' by Gödel state that:",
        options: ["All truths are provable", "Any consistent formal system is incomplete", "Mathematics is finite", "Logic is absolute"],
        correct: 1,
        explanation: "Gödel proved that within any consistent formal system, there are statements that are true but cannot be proven.",
        analogy: "Even in the most perfect library, there are stories that will never be told.",
        interactive: { type: 'slider', label: 'System Complexity', min: 1, max: 10 }
    },
    {
        id: 41,
        question: "What is 'Compressed Sensing'?",
        options: ["Zipping files", "Reconstructing signals from sparse measurements", "Slow data transfer", "Lossy compression only"],
        correct: 1,
        explanation: "It allows for the recovery of signals from far fewer samples than the Nyquist rate would suggest.",
        analogy: "Reconstructing a high-resolution photograph using only a few random pixels' worth of information.",
        interactive: { type: 'slider', label: 'Sample Rate', min: 0.1, max: 1, step: 0.05 }
    },
    {
        id: 42,
        question: "A 'Calabi-Yau manifold' is a concept important in:",
        options: ["Biology", "String Theory", "Economics", "Sociology"],
        correct: 1,
        explanation: "These complex manifolds are used to compactify the extra dimensions required by string theory.",
        analogy: "The tiny, hidden dimensions where mathematical 'strings' vibrate to create the physics of the universe.",
        interactive: { type: 'slider', label: 'Dimensions d', min: 2, max: 11 }
    },
    {
        id: 43,
        question: "The 'Langlands Program' is often described as:",
        options: ["A coding bootcamp", "A Grand Unified Theory for mathematics", "A space program", "A new computer OS"],
        correct: 1,
        explanation: "It is a vast web of conjectures linking number theory, representation theory, and harmonic analysis.",
        analogy: "Creating a master dictionary that translates every field of math into every other field.",
        interactive: { type: 'matrix', label: 'Mapping M', min: -5, max: 5 }
    },
    {
        id: 44,
        question: "Grigori Perelman used 'Ricci Flow' to prove which famous conjecture?",
        options: ["Fermat's Last Theorem", "Poincaré Conjecture", "Riemann Hypothesis", "Goldbach Conjecture"],
        correct: 1,
        explanation: "Ricci flow is a process that deforms a manifold to smooth out its geometry, eventually revealing simple shapes.",
        analogy: "Smoothing out a lumpy, irregular ball of clay until it becomes a perfect, identifiable sphere.",
        interactive: { type: 'slider', label: 'Flow Time t', min: 0, max: 100 }
    },
    {
        id: 45,
        question: "'Differential Geometry' provides the mathematical language for:",
        options: ["Modern Cooking", "General Relativity", "Binary Logic", "Linear Programming"],
        correct: 1,
        explanation: "Einstein used differential geometry to describe gravity as the curvature of the spacetime manifold.",
        analogy: "Using the language of curved surfaces and slopes to explain how the entire universe behaves.",
        interactive: { type: 'linear', label: 'Curvature κ', min: -10, max: 10 }
    },
    {
        id: 46,
        question: "In Game Theory, a 'Nash Equilibrium' is a state where:",
        options: ["Everyone wins", "No player can benefit by changing strategy alone", "The game ends", "One player wins everything"],
        correct: 1,
        explanation: "In a Nash Equilibrium, each player's strategy is optimal given the strategies of all other players.",
        analogy: "An 'unbeatable' standoff where everyone is doing their best given what everyone else is doing.",
        interactive: { type: 'slider', label: 'Player A Strat', min: 0, max: 1, step: 0.1 }
    }
];


export const QUESTIONS_BY_CATEGORY: Record<StudentCategory, Question[]> = {
    school: SCHOOL_QUESTIONS,
    ug: UG_QUESTIONS,
    pg: PG_QUESTIONS,
    research: RESEARCH_QUESTIONS,
};

interface InteractivePlaygroundProps {
    type: 'slider' | 'area' | 'volume' | 'circle' | 'graph' | 'percentage' | 'speed' | 'matrix' | 'trig' | 'linear' | 'formula' | 'plot';
    label?: string;
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
    question: string;
}


function InteractivePlayground({ type, label = 'Variable X', min = 0, max = 100, step = 1, unit = '', question }: InteractivePlaygroundProps) {
    const [value, setValue] = useState(min);

    const getResult = () => {
        const q = question.toLowerCase();
        if (q.includes('5x')) return (value * 5).toFixed(1);
        if (q.includes('x²')) return (value * value).toFixed(1);
        if (q.includes('x³')) return (value * value * value).toFixed(1);
        if (q.includes('2x + 3')) return (2 * value + 3).toFixed(1);
        if (q.includes('2x + 5')) return (2 * value + 5).toFixed(1);
        if (q.includes('2x + 4')) return (2 * value + 4).toFixed(1);
        if (q.includes('diameter')) return (value * 2).toFixed(1);
        if (q.includes('speed') || q.includes('car travels')) return (60 * value).toFixed(0);
        if (q.includes('derivative') && q.includes('x³')) return (3 * value * value).toFixed(1);
        if (q.includes('sin(x)')) return Math.sin(value).toFixed(2);
        if (q.includes('cos(x)')) return Math.cos(value).toFixed(2);
        if (q.includes('square root')) return Math.sqrt(value).toFixed(2);
        return value;
    };

    const getInterpretation = () => {
        const q = question.toLowerCase();
        const res = getResult();

        if (q.includes('5x')) return `By choosing x = ${value}, the output is ${res}. Each unit of x adds exactly 5 to the total. This illustrates a linear relationship where the rate of change is constant.`;
        if (q.includes('x²')) return `A square with side ${value} leads to an area of ${res}. Incrementing x from 3 to 4 grows area from 9 to 16 (+7), while 4 to 5 grows it from 16 to 25 (+9). Notice how the growth rate itself is increasing—this is the signature of quadratic growth!`;
        if (q.includes('x³')) return `A cube with side ${value} has a volume of ${res}. Volume scales with the cube of the dimension, meaning small increases in length lead to massive increases in capacity.`;
        if (type === 'circle' || q.includes('radius')) return `With a radius of ${value}${unit}, the diameter is ${res}${unit}. This direct 1:2 ratio exists because the diameter is simply the longest straight line that passes through the center of the circle.`;
        if (type === 'speed' || q.includes('travels')) return `Traveling at 60 mph for ${value} hours covers ${res} miles. This scenario models distance as the accumulation of speed over a duration of time.`;
        if (type === 'trig' || q.includes('sin(x)')) return `At an angle of ${value} radians, the value is ${res}. This cyclical behavior is used to model everything from ocean waves to sound and light.`;
        if (q.includes('2x + 3')) return `Starting at 3 (the y-intercept), we add 2 for every unit of x. At x = ${value}, we have 'moved' from the start to ${res}. The '2' is the speed or slope of this growth.`;

        return "Observe how the result shifts as you manipulate the variables. This dynamic link is the heart of mathematical modeling—turning static numbers into living relationships.";
    };

    return (
        <div className="glass-morphism p-8 rounded-3xl border border-white/5 space-y-8 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32 rounded-full" />

            <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/20 rounded-lg">
                        <SlidersHorizontal className="text-primary" size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-lg">Interactive Lab</h4>
                        <p className="text-sm text-slate-400">Learn by doing • Real-time simulation</p>
                    </div>
                </div>
                <div className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <Sparkles size={12} />
                    Live Preview
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
                <div className="space-y-8">
                    <div className="space-y-5">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-bold text-slate-300 uppercase tracking-[0.2em]">{label}</label>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-black text-primary">{value}</span>
                                <span className="text-primary/60 font-medium">{unit}</span>
                            </div>
                        </div>
                        <input
                            type="range"
                            min={min}
                            max={max}
                            step={step}
                            value={value}
                            onChange={(e) => setValue(Number(e.target.value))}
                            className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary focus:ring-2 focus:ring-primary/50 outline-none"
                        />
                        <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                            <span>MIN: {min}{unit}</span>
                            <span>MAX: {max}{unit}</span>
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
                        <span className="text-xs text-primary font-black uppercase tracking-[0.3em] flex items-center gap-2">
                            <Sparkles size={14} />
                            Scenario Interpretation
                        </span>
                        <p className="text-base leading-relaxed text-slate-200 font-medium">
                            "{getInterpretation()}"
                        </p>
                    </div>
                </div>

                <div className="relative aspect-square flex items-center justify-center bg-white/2 rounded-3xl border border-white/5 overflow-hidden group">
                    <div className="absolute inset-0 bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />

                    {/* Background Grid */}
                    <div className="absolute inset-0 opacity-10" style={{
                        backgroundImage: 'linear-gradient(#4f46e5 1px, transparent 1px), linear-gradient(90deg, #4f46e5 1px, transparent 1px)',
                        backgroundSize: '30px 30px'
                    }} />

                    <div className="relative flex flex-col items-center w-full h-full justify-center p-8">
                        <motion.div
                            key={getResult()}
                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            className="text-8xl font-black text-white tracking-tighter drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                        >
                            {getResult()}
                        </motion.div>
                        <div className="text-primary font-black uppercase tracking-[0.4em] text-xs mt-4 bg-primary/10 px-5 py-2 rounded-full border border-primary/20 shadow-lg shadow-primary/5">Interactive Result</div>

                        <div className="mt-12 w-full flex justify-center items-center flex-1">
                            {/* Visual representation logic */}
                            {(type === 'area' || question.includes('x²')) ? (
                                <motion.div
                                    animate={{ width: Math.max(20, value * 15), height: Math.max(20, value * 15) }}
                                    className="border-4 border-primary bg-primary/20 rounded-xl shadow-[0_0_50px_rgba(79,70,229,0.3)] relative flex items-center justify-center overflow-hidden"
                                >
                                    <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-20">
                                        {[...Array(36)].map((_, i) => <div key={i} className="border border-primary/30" />)}
                                    </div>
                                    <span className="text-primary font-black text-2xl opacity-40">x²</span>
                                </motion.div>
                            ) : type === 'circle' || question.includes('radius') ? (
                                <motion.div
                                    animate={{ width: Math.max(20, value * 10), height: Math.max(20, value * 10) }}
                                    className="border-4 border-accent rounded-full bg-accent/10 shadow-[0_0_50px_rgba(245,158,11,0.2)] flex items-center justify-center relative"
                                >
                                    <div className="w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                                    <div className="absolute h-[3px] bg-accent/60 origin-left left-1/2 rounded-full" style={{ width: value * 5 }} />
                                    <div className="absolute -top-6 text-accent font-bold text-xs">DIAMETER = {value * 2}</div>
                                </motion.div>
                            ) : type === 'linear' || question.includes('5x') ? (
                                <div className="flex items-end gap-3 h-40">
                                    {[...Array(Math.min(10, Math.ceil(value > 0 ? value : 0)))].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            animate={{ height: Math.max(10, value * 4) }}
                                            className="w-5 bg-linear-to-t from-primary/60 to-primary/20 border border-primary/30 rounded-t-xl shadow-lg relative group"
                                        >
                                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </motion.div>
                                    ))}
                                    {value === 0 && <div className="text-slate-500 italic text-sm">Input x to see the growth...</div>}
                                </div>
                            ) : type === 'speed' || question.includes('travels') ? (
                                <div className="w-full max-w-[300px] h-4 bg-slate-800 rounded-full relative overflow-visible border border-white/10">
                                    <div className="absolute -top-12 left-0 right-0 flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-widest px-1">
                                        <span>START</span>
                                        <span>DESTINATION</span>
                                    </div>
                                    <motion.div
                                        animate={{ x: `${(value / max) * 100}%` }}
                                        className="absolute top-1/2 -translate-y-1/2 -ml-6 text-5xl filter drop-shadow-xl"
                                        style={{ left: 0 }}
                                    >
                                        🚗
                                    </motion.div>
                                    <motion.div
                                        animate={{ width: `${(value / max) * 100}%` }}
                                        className="h-full bg-linear-to-r from-primary/60 to-primary rounded-full shadow-[0_0_20px_rgba(79,70,229,0.4)]"
                                    />
                                    <div className="absolute inset-0 flex justify-around opacity-20 pointer-events-none">
                                        {[...Array(10)].map((_, i) => <div key={i} className="w-px h-full bg-white/20" />)}
                                    </div>
                                </div>
                            ) : type === 'trig' || (question.includes('sin(') || question.includes('cos(')) ? (
                                <div className="relative w-64 h-64 border-2 border-white/5 rounded-full flex items-center justify-center bg-black/20">
                                    <div className="absolute border-t border-white/10 w-full" />
                                    <div className="absolute border-l border-white/10 h-full" />
                                    <motion.div
                                        animate={{ rotate: -value * (180 / Math.PI) }}
                                        className="absolute w-32 h-[3px] bg-primary origin-left left-1/2 top-1/2 shadow-[0_0_15px_rgba(79,70,229,0.5)] rounded-full"
                                    />
                                    {/* Vertical projection (Sine) */}
                                    <motion.div
                                        animate={{
                                            height: Math.abs(Math.sin(value) * 128),
                                            y: Math.sin(value) > 0 ? -Math.sin(value) * 64 : -Math.sin(value) * 64
                                        }}
                                        className="absolute w-1.5 bg-accent shadow-[0_0_10px_rgba(245,158,11,0.5)] rounded-full"
                                        style={{
                                            left: `calc(50% + ${Math.cos(value) * 128}px)`,
                                            top: '50%'
                                        }}
                                    />
                                    <div className="absolute bottom-4 right-4 text-primary font-black text-[10px] tracking-widest">UNIT CIRCLE MODES</div>
                                </div>
                            ) : type === 'percentage' || question.includes('%') ? (
                                <div className="relative w-48 h-48 flex items-center justify-center">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            cx="96" cy="96" r="80"
                                            fill="transparent"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            className="text-white/5"
                                        />
                                        <motion.circle
                                            cx="96" cy="96" r="80"
                                            fill="transparent"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            strokeDasharray={502}
                                            animate={{ strokeDashoffset: 502 - (502 * Math.min(100, Math.max(0, value))) / 100 }}
                                            className="text-primary"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute text-5xl font-black text-white">{value}%</div>
                                </div>
                            ) : type === 'matrix' || question.includes('matrix') ? (
                                <div className="grid grid-cols-2 gap-4 p-8 bg-black/40 rounded-3xl border-2 border-primary/30 shadow-2xl relative group">
                                    <div className="absolute -top-3 -left-3 text-[10px] font-black text-primary bg-black px-2 py-0.5 rounded border border-primary/20">HESSIAN / JACOBIAN</div>
                                    {[1, 0, 0, 1].map((base, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{
                                                scale: value > 0 ? 1 + (value / max) * 0.2 : 1,
                                                opacity: 0.5 + (value / max) * 0.5
                                            }}
                                            className="w-20 h-20 flex items-center justify-center bg-primary/10 border border-primary/30 rounded-xl text-primary font-black text-2xl"
                                        >
                                            {(base * value).toFixed(0)}
                                        </motion.div>
                                    ))}
                                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 font-bold uppercase tracking-widest whitespace-nowrap">det(M) = {(value * value).toFixed(0)}</div>
                                </div>
                            ) : type === 'graph' || question.includes('path') ? (
                                <div className="w-full h-40 bg-black/40 rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center">
                                    <svg className="w-full h-full" viewBox="0 0 200 100">
                                        <motion.path
                                            d={`M 0 50 Q 50 ${50 - value * 5} 100 50 T 200 50`}
                                            fill="transparent"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            className="text-primary"
                                            animate={{ d: `M 0 50 Q 50 ${50 - value * 5} 100 50 T 200 50` }}
                                        />
                                        {[...Array(5)].map((_, i) => (
                                            <circle key={i} cx={40 * i} cy="50" r="1.5" className="fill-white/20" />
                                        ))}
                                    </svg>
                                    <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-50">
                                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                        <span className="text-[10px] font-bold text-slate-400">CURVE APPROX</span>
                                    </div>
                                </div>
                            ) : (
                                <motion.div
                                    animate={{
                                        rotate: 360,
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{
                                        rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
                                        scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                                    }}
                                    className="relative"
                                >
                                    <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
                                    <Calculator className="text-white/10 w-48 h-48 relative z-10" />
                                    <div className="absolute inset-0 flex items-center justify-center z-20">
                                        <Sparkles className="text-primary/60 w-16 h-16 animate-pulse" />
                                    </div>
                                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-primary/40 font-black text-[10px] tracking-[0.5em] whitespace-nowrap">COMPUTING MODEL</div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


interface SingleQuestionProps {
    question: Question;
}

export function SingleQuestion({ question }: SingleQuestionProps) {
    const [selected, setSelected] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);

    const handleSelect = (idx: number) => {
        if (showResult) return;
        setSelected(idx);
        setShowResult(true);
        if (idx === question.correct) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#10b981', '#3b82f6', '#f59e0b']
            });
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-primary animate-ping" />
                            <span className="text-primary font-bold text-sm uppercase tracking-[0.2em]">Active Activity</span>
                        </div>
                        <h3 className="text-5xl font-black leading-tight tracking-tight">{question.question}</h3>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {question.options.map((opt, i) => {
                            const isCorrect = i === question.correct;
                            const isSelected = selected === i;

                            return (
                                <motion.button
                                    key={i}
                                    whileHover={!showResult ? { scale: 1.02, x: 10 } : {}}
                                    onClick={() => handleSelect(i)}
                                    className={cn(
                                        "p-8 text-left text-2xl font-bold rounded-3xl border transition-all duration-300 flex items-center justify-between group",
                                        !showResult && "bg-white/5 border-white/10 hover:bg-white/10 hover:border-primary/50",
                                        showResult && isCorrect && "bg-primary/20 border-primary text-primary shadow-2xl shadow-primary/20",
                                        showResult && isSelected && !isCorrect && "bg-red-500/20 border-red-500 text-red-500",
                                        showResult && !isSelected && !isCorrect && "opacity-30 border-white/5 grayscale"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-10 h-10 rounded-full border flex items-center justify-center text-sm",
                                            !showResult && "border-white/20",
                                            showResult && isCorrect && "bg-primary border-primary text-white",
                                            showResult && isSelected && !isCorrect && "bg-red-500 border-red-500 text-white"
                                        )}>
                                            {String.fromCharCode(65 + i)}
                                        </div>
                                        <span>{opt}</span>
                                    </div>
                                    {showResult && isCorrect && <CheckCircle2 className="text-primary" />}
                                    {showResult && isSelected && !isCorrect && <XCircle className="text-red-500" />}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Learn by Doing Section */}
                    <InteractivePlayground
                        type={question.interactive?.type || 'slider'}
                        label={question.interactive?.label || 'Input X'}
                        min={question.interactive?.min || 0}
                        max={question.interactive?.max || 20}
                        step={question.interactive?.step || 1}
                        unit={question.interactive?.unit || ''}
                        question={question.question}
                    />

                    <AnimatePresence>
                        {showResult && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <div className="glass p-10 rounded-3xl border border-white/10 space-y-6 bg-linear-to-br from-primary/5 to-accent/5">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-primary/20 rounded-lg text-primary">
                                            <Sparkles size={20} />
                                        </div>
                                        <h4 className="text-xl font-bold uppercase tracking-widest text-primary">Master Insight</h4>
                                    </div>
                                    <p className="text-2xl leading-relaxed font-medium">{question.explanation}</p>
                                    {question.analogy && (
                                        <div className="pt-6 border-t border-white/10">
                                            <p className="text-xl text-slate-400 italic leading-relaxed">
                                                <span className="text-primary not-italic font-bold mr-2">Analogy:</span>
                                                {question.analogy}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

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

    // Reset all state when category changes
    useEffect(() => {
        setCurrentIdx(0);
        setSelected(null);
        setShowResult(false);
        setScore(0);
        setIsFinished(false);
    }, [category]);

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
            {/* Category Indicator for debugging */}
            <div className="text-center text-sm text-primary/60 uppercase tracking-wider">
                {category === 'school' && '📚 School Level'}
                {category === 'ug' && '🎓 Undergraduate Level'}
                {category === 'pg' && '🔬 Postgraduate Level'}
                {category === 'research' && '🧪 Research Scholar Level'}
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-end">
                    <span className="text-primary font-bold text-xl">Question {currentIdx + 1}/{QUESTIONS.length}</span>
                    <div className="w-48 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary rounded-full transition-all duration-300"
                            style={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
                        />
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
