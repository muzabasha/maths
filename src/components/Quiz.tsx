'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ChevronRight, RefreshCcw } from 'lucide-react';
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
}

// School Students - Basic concepts
export const SCHOOL_QUESTIONS: Question[] = [
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
    },
    {
        id: 5,
        question: "What is the highest power in 3x² + 2x + 1?",
        options: ["1", "2", "3", "4"],
        correct: 1,
        explanation: "The highest power of x is 2, making this a quadratic polynomial.",
        analogy: "Like finding the tallest person in a group."
    },
    {
        id: 6,
        question: "If x = 2, what is 3x?",
        options: ["5", "6", "8", "9"],
        correct: 1,
        explanation: "Substitute x with 2: 3 × 2 = 6",
        analogy: "Like buying 3 chocolates at 2 rupees each."
    },
    {
        id: 7,
        question: "What does the constant term mean in 2x + 5?",
        options: ["The number without x", "The coefficient", "The variable", "The power"],
        correct: 0,
        explanation: "The constant term (5) doesn't change with x.",
        analogy: "Like a fixed entry fee that everyone pays."
    },
    {
        id: 8,
        question: "Which is larger: 2³ or 3²?",
        options: ["2³", "3²", "Both equal", "Cannot compare"],
        correct: 0,
        explanation: "2³ = 8 and 3² = 9, so 3² is larger. Wait, let me recalculate: 2³ = 2×2×2 = 8, 3² = 3×3 = 9",
        analogy: "Like comparing 8 apples to 9 oranges."
    },
    {
        id: 9,
        question: "In a graph, what does the x-axis represent?",
        options: ["Output", "Input", "Result", "Answer"],
        correct: 1,
        explanation: "The x-axis shows the input values we put into our equation.",
        analogy: "Like the ingredients you put into a recipe."
    },
    {
        id: 10,
        question: "What is the y-intercept in y = 2x + 4?",
        options: ["2", "4", "x", "y"],
        correct: 1,
        explanation: "The y-intercept is where the line crosses the y-axis, which is 4.",
        analogy: "Like the starting point before you begin walking."
    },
    {
        id: 11,
        question: "If you double x, what happens to x²?",
        options: ["Doubles", "Triples", "Quadruples", "Stays same"],
        correct: 2,
        explanation: "If x becomes 2x, then (2x)² = 4x², which is 4 times larger.",
        analogy: "Like doubling the side of a square makes the area 4 times bigger."
    },
    {
        id: 12,
        question: "What is 5x when x = 0?",
        options: ["5", "0", "x", "Undefined"],
        correct: 1,
        explanation: "Anything multiplied by 0 equals 0.",
        analogy: "Like having 5 baskets with 0 apples each."
    },
    {
        id: 13,
        question: "Which equation represents a straight line?",
        options: ["y = x²", "y = 2x + 1", "y = x³", "y = 1/x"],
        correct: 1,
        explanation: "Linear equations like y = 2x + 1 create straight lines.",
        analogy: "Like a ruler - perfectly straight."
    },
    {
        id: 14,
        question: "What does 'solving for x' mean?",
        options: ["Graphing x", "Finding the value of x", "Multiplying x", "Dividing x"],
        correct: 1,
        explanation: "Solving means finding what number x represents.",
        analogy: "Like solving a mystery to find the answer."
    },
    {
        id: 15,
        question: "In 4x + 3 = 11, what is x?",
        options: ["1", "2", "3", "4"],
        correct: 1,
        explanation: "Subtract 3 from both sides: 4x = 8, then divide by 4: x = 2",
        analogy: "Like finding how many candies you have if 4 times that plus 3 equals 11."
    },
    {
        id: 16,
        question: "What is the degree of the polynomial 5x³ + 2x + 1?",
        options: ["1", "2", "3", "5"],
        correct: 2,
        explanation: "The degree is the highest power of x, which is 3.",
        analogy: "Like the highest level in a video game."
    },
    {
        id: 17,
        question: "If a graph goes upward from left to right, the slope is:",
        options: ["Negative", "Positive", "Zero", "Undefined"],
        correct: 1,
        explanation: "An upward slope means as x increases, y also increases.",
        analogy: "Like climbing uphill."
    },
    {
        id: 18,
        question: "What is x⁰ equal to?",
        options: ["0", "1", "x", "Undefined"],
        correct: 1,
        explanation: "Any number (except 0) raised to the power 0 equals 1.",
        analogy: "Like a special rule in mathematics."
    },
    {
        id: 19,
        question: "In the expression 7x - 3, what operation comes first?",
        options: ["Subtraction", "Multiplication", "Addition", "Division"],
        correct: 1,
        explanation: "We multiply 7 by x first, then subtract 3.",
        analogy: "Like following the order of operations: PEMDAS."
    },
    {
        id: 20,
        question: "What shape does y = x² make on a graph?",
        options: ["Straight line", "Circle", "U-shaped curve", "Zigzag"],
        correct: 2,
        explanation: "Quadratic equations create a parabola, which looks like a U.",
        analogy: "Like a smile or a bowl."
    },
    {
        id: 21,
        question: "What is the area of a square with side 4?",
        options: ["8", "12", "16", "20"],
        correct: 2,
        explanation: "Area of a square is side × side, so 4 × 4 = 16.",
        analogy: "Like tiling a floor - 4 rows of 4 tiles."
    },
    {
        id: 22,
        question: "If 3x = 9, what is x?",
        options: ["2", "3", "6", "12"],
        correct: 1,
        explanation: "Divide both sides by 3: 9 ÷ 3 = 3.",
        analogy: "Splitting 9 cookies among 3 friends."
    },
    {
        id: 23,
        question: "What is the perimeter of a rectangle with length 5 and width 3?",
        options: ["8", "15", "16", "20"],
        correct: 2,
        explanation: "Perimeter is 2 × (length + width) = 2 × (5 + 3) = 16.",
        analogy: "Walking around the edge of a garden."
    },
    {
        id: 24,
        question: "What is 1/2 + 1/4?",
        options: ["1/6", "2/6", "3/4", "3/6"],
        correct: 2,
        explanation: "1/2 is 2/4, and 2/4 + 1/4 = 3/4.",
        analogy: "Adding half a pizza and a quarter pizza."
    },
    {
        id: 25,
        question: "If a car travels at 60 mph, how far does it go in 2 hours?",
        options: ["60 miles", "80 miles", "100 miles", "120 miles"],
        correct: 3,
        explanation: "Distance = Speed × Time, so 60 × 2 = 120.",
        analogy: "Constant speed over time."
    },
    {
        id: 26,
        question: "What is the square root of 49?",
        options: ["6", "7", "8", "9"],
        correct: 1,
        explanation: "Because 7 × 7 = 49, the square root of 49 is 7.",
        analogy: "Finding the side of a square given its area."
    },
    {
        id: 27,
        question: "In the expression 2x + 5, what is the 'constant'?",
        options: ["2", "x", "5", "None"],
        correct: 2,
        explanation: "The constant is the number that doesn't change, which is 5.",
        analogy: "The fixed part of a price (like entry fee)."
    },
    {
        id: 28,
        question: "What is the sum of internal angles in a triangle?",
        options: ["90°", "180°", "270°", "360°"],
        correct: 1,
        explanation: "All angles in any triangle always add up to 180 degrees.",
        analogy: "Turning halfway around a circle."
    },
    {
        id: 29,
        question: "If y = x + 2, what is y when x = 5?",
        options: ["3", "5", "7", "10"],
        correct: 2,
        explanation: "Substitute x with 5: y = 5 + 2 = 7.",
        analogy: "Moving 2 steps forward from where you are."
    },
    {
        id: 30,
        question: "What is 10% of 200?",
        options: ["10", "20", "30", "40"],
        correct: 1,
        explanation: "10% of 200 is (10/100) × 200 = 20.",
        analogy: "Taking a small slice (one tenth) of a big pie."
    },
    {
        id: 31,
        question: "Which is larger: -5 or -10?",
        options: ["-5", "-10", "They are equal", "Cannot compare"],
        correct: 0,
        explanation: "-5 is to the right of -10 on the number line, so it is larger.",
        analogy: "Being less in debt ($5) is better than being more in debt ($10)."
    },
    {
        id: 32,
        question: "What is the volume of a cube with side 2?",
        options: ["4", "6", "8", "16"],
        correct: 2,
        explanation: "Volume = side × side × side = 2 × 2 × 2 = 8.",
        analogy: "Counting blocks in a 2x2x2 stack."
    },
    {
        id: 33,
        question: "In the fraction 3/5, what is the numerator?",
        options: ["3", "5", "8", "2"],
        correct: 0,
        explanation: "The numerator is the top number of a fraction, which is 3.",
        analogy: "The number of slices you actually have."
    },
    {
        id: 34,
        question: "What is 2 raised to the power of 3 (2³)?",
        options: ["5", "6", "8", "9"],
        correct: 2,
        explanation: "2³ = 2 × 2 × 2 = 8.",
        analogy: "Growth that doubles three times."
    },
    {
        id: 35,
        question: "What is the slope of a flat horizontal line?",
        options: ["1", "0", "-1", "Infinite"],
        correct: 1,
        explanation: "A horizontal line doesn't go up or down, so its slope is zero.",
        analogy: "Walking on perfectly level ground."
    },
    {
        id: 36,
        question: "If a triangle has sides 3, 4, and 5, is it a right triangle?",
        options: ["Yes", "No", "Only if x=1", "Not enough info"],
        correct: 0,
        explanation: "Yes, because 3² + 4² = 5² (9 + 16 = 25).",
        analogy: "The famous 3-4-5 rule in construction."
    },
    {
        id: 37,
        question: "What is the next number in the sequence 2, 4, 6, 8...?",
        options: ["9", "10", "11", "12"],
        correct: 1,
        explanation: "The pattern is adding 2 each time, so 8 + 2 = 10.",
        analogy: "Counting by twos."
    },
    {
        id: 38,
        question: "What is 0.5 written as a fraction?",
        options: ["1/5", "1/2", "5/100", "2/1"],
        correct: 1,
        explanation: "0.5 is half, which is 1 divided by 2.",
        analogy: "The halfway point between 0 and 1."
    },
    {
        id: 39,
        question: "If x - 4 = 10, what is x?",
        options: ["6", "10", "14", "40"],
        correct: 2,
        explanation: "Add 4 to both sides: 10 + 4 = 14.",
        analogy: "Finding the original amount before some was taken away."
    },
    {
        id: 40,
        question: "What is the diameter of a circle with radius 5?",
        options: ["2.5", "5", "7.5", "10"],
        correct: 3,
        explanation: "Diameter is twice the radius: 2 × 5 = 10.",
        analogy: "The full width of a wheel."
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
    },
    {
        id: 6,
        question: "What is the derivative of a constant?",
        options: ["1", "0", "The constant itself", "Undefined"],
        correct: 1,
        explanation: "Constants don't change, so their rate of change is zero.",
        analogy: "Like a parked car has zero speed."
    },
    {
        id: 7,
        question: "The chain rule is used for:",
        options: ["Adding functions", "Composite functions", "Multiplying constants", "Finding limits"],
        correct: 1,
        explanation: "Chain rule helps differentiate functions within functions.",
        analogy: "Like peeling layers of an onion, one at a time."
    },
    {
        id: 8,
        question: "If f'(x) > 0, the function is:",
        options: ["Decreasing", "Increasing", "Constant", "Zero"],
        correct: 1,
        explanation: "A positive derivative means the function is going upward.",
        analogy: "Like climbing uphill."
    },
    {
        id: 9,
        question: "What does ∫ represent?",
        options: ["Derivative", "Integral", "Limit", "Summation"],
        correct: 1,
        explanation: "The integral symbol represents integration, the reverse of differentiation.",
        analogy: "Like finding the total distance from speed."
    },
    {
        id: 10,
        question: "The product rule is used when:",
        options: ["Adding two functions", "Multiplying two functions", "Dividing functions", "Subtracting functions"],
        correct: 1,
        explanation: "Product rule: (uv)' = u'v + uv'",
        analogy: "Like distributing when multiplying binomials."
    },
    {
        id: 11,
        question: "What is the derivative of sin(x)?",
        options: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"],
        correct: 0,
        explanation: "The derivative of sine is cosine.",
        analogy: "A fundamental trigonometric derivative."
    },
    {
        id: 12,
        question: "A function has a local maximum when:",
        options: ["f'(x) = 0 and f''(x) < 0", "f'(x) = 0 and f''(x) > 0", "f'(x) > 0", "f'(x) < 0"],
        correct: 0,
        explanation: "Zero first derivative and negative second derivative indicate a peak.",
        analogy: "Like reaching the top of a hill."
    },
    {
        id: 13,
        question: "What is lim(x→0) sin(x)/x?",
        options: ["0", "1", "∞", "Undefined"],
        correct: 1,
        explanation: "This is a famous limit that equals 1.",
        analogy: "A fundamental limit in calculus."
    },
    {
        id: 14,
        question: "The Mean Value Theorem guarantees:",
        options: ["A point where f'(c) equals average rate", "Function is continuous", "Derivative exists everywhere", "Function is linear"],
        correct: 0,
        explanation: "MVT says there's a point where instantaneous rate equals average rate.",
        analogy: "Like finding a moment when your speed equals your average speed."
    },
    {
        id: 15,
        question: "What is the derivative of e^x?",
        options: ["e^x", "xe^(x-1)", "e", "1"],
        correct: 0,
        explanation: "The exponential function is its own derivative.",
        analogy: "A unique property of e^x."
    },
    {
        id: 16,
        question: "Implicit differentiation is used when:",
        options: ["y is explicitly defined", "y is not isolated", "Function is linear", "Derivative is zero"],
        correct: 1,
        explanation: "When we can't easily solve for y, we differentiate both sides.",
        analogy: "Like working with equations where variables are mixed together."
    },
    {
        id: 17,
        question: "The quotient rule formula is:",
        options: ["(u/v)' = u'/v'", "(u/v)' = (u'v - uv')/v²", "(u/v)' = u'v + uv'", "(u/v)' = uv'/v²"],
        correct: 1,
        explanation: "Quotient rule: low d-high minus high d-low, over low squared.",
        analogy: "A mnemonic: lo-d-hi minus hi-d-lo over lo-lo."
    },
    {
        id: 18,
        question: "What is ∫x dx?",
        options: ["x", "x²", "x²/2 + C", "2x + C"],
        correct: 2,
        explanation: "Integrate by adding 1 to the power and dividing, plus constant C.",
        analogy: "The reverse of differentiation."
    },
    {
        id: 19,
        question: "L'Hôpital's Rule applies to:",
        options: ["All limits", "Indeterminate forms like 0/0", "Definite integrals", "Continuous functions"],
        correct: 1,
        explanation: "L'Hôpital's Rule helps evaluate limits of indeterminate forms.",
        analogy: "Like a special tool for tricky limits."
    },
    {
        id: 20,
        question: "The Fundamental Theorem of Calculus connects:",
        options: ["Algebra and geometry", "Differentiation and integration", "Limits and continuity", "Functions and graphs"],
        correct: 1,
        explanation: "It shows that differentiation and integration are inverse operations.",
        analogy: "Like addition and subtraction being opposites."
    },
    {
        id: 21,
        question: "What is the dot product of vectors [1, 2] and [3, 4]?",
        options: ["7", "10", "11", "14"],
        correct: 2,
        explanation: "(1×3) + (2×4) = 3 + 8 = 11.",
        analogy: "Measuring how much two vectors point in the same direction."
    },
    {
        id: 22,
        question: "Solving the differential equation dy/dx = y leads to which function?",
        options: ["x²", "sin(x)", "e^x", "ln(x)"],
        correct: 2,
        explanation: "The exponential function's derivative is itself, satisfying dy/dx = y.",
        analogy: "A population that grows based on its current size."
    },
    {
        id: 23,
        question: "What is the determinant of a 2x2 identity matrix?",
        options: ["0", "1", "2", "-1"],
        correct: 1,
        explanation: "Identity matrix [[1,0],[0,1]] has determinant (1×1) - (0×0) = 1.",
        analogy: "The scaling factor of an unchanged area."
    },
    {
        id: 24,
        question: "A square matrix is invertible if and only if its determinant is:",
        options: ["Zero", "Non-zero", "Positive", "One"],
        correct: 1,
        explanation: "A matrix with a zero determinant is singular and cannot be inverted.",
        analogy: "A door that can be opened and closed - zero determinant is a locked door."
    },
    {
        id: 25,
        question: "What is the derivative of f(x) = ln(x)?",
        options: ["e^x", "1/x", "x", "1"],
        correct: 1,
        explanation: "The derivative of the natural logarithm is the reciprocal function.",
        analogy: "The rate of change of growth."
    },
    {
        id: 26,
        question: "If a function is continuous at a point, does the derivative necessarily exist there?",
        options: ["Yes", "No", "Always", "Only if it is linear"],
        correct: 1,
        explanation: "Continuity doesn't guarantee differentiability (e.g., y = |x| at x=0).",
        analogy: "A sharp corner in a road is continuous but has no single direction."
    },
    {
        id: 27,
        question: "What is the integral of cos(x)?",
        options: ["sin(x) + C", "-sin(x) + C", "cos(x) + C", "tan(x) + C"],
        correct: 0,
        explanation: "The derivative of sine is cosine, so the integral of cosine is sine.",
        analogy: "Moving between circular positions."
    },
    {
        id: 28,
        question: "In linear algebra, what are 'eigenvalues'?",
        options: ["Vector lengths", "Scaling factors for specific axes", "Matrix sums", "Integration constants"],
        correct: 1,
        explanation: "Eigenvalues are scalars λ such that Av = λv for some non-zero vector v.",
        analogy: "The 'natural' frequencies or growth rates of a system."
    },
    {
        id: 29,
        question: "A Taylor series approximates a function using a sum of:",
        options: ["Logarithms", "Polynomials", "Sines", "Square roots"],
        correct: 1,
        explanation: "Taylor series uses derivatives to create an approximating polynomial.",
        analogy: "Using simpler curves to mimic a complex shape."
    },
    {
        id: 30,
        question: "Partial derivatives are used when a function has:",
        options: ["One input", "Multiple inputs", "No inputs", "Complex outputs"],
        correct: 1,
        explanation: "Partial derivatives measure how a multivariable function changes with one variable at a time.",
        analogy: "Checking how height changes as you move North vs East separately."
    },
    {
        id: 31,
        question: "What is the 'cross product' of two vectors in 3D used for?",
        options: ["Finding dot product", "Finding a perpendicular vector", "Finding vector length", "Adding vectors"],
        correct: 1,
        explanation: "The cross product result is a vector perpendicular to both input vectors.",
        analogy: "Finding the axis of rotation for two hands on a clock."
    },
    {
        id: 32,
        question: "A sequence 'converges' if:",
        options: ["It keeps getting larger", "Its terms approach a specific limit", "It alternates signs", "It ends at zero"],
        correct: 1,
        explanation: "Convergence means the terms get arbitrarily close to a fixed number.",
        analogy: "Approaching a destination without ever quite reaching it."
    },
    {
        id: 33,
        question: "The 'divergence' of a vector field measures:",
        options: ["Rotation", "Outflow from a point", "Length", "Surface area"],
        correct: 1,
        explanation: "Divergence measures the extent to which the vector field flow 'exits' a small region.",
        analogy: "Like water spraying out of a fountain (positive divergence)."
    },
    {
        id: 34,
        question: "Stokes' Theorem relates which two types of integrals?",
        options: ["Line and Surface", "Line and Volume", "Surface and Volume", "Single and Double"],
        correct: 0,
        explanation: "Stokes' Theorem relates the surface integral of the curl to the line integral around its boundary.",
        analogy: "The flow around a rim vs the activity on the surface inside."
    },
    {
        id: 35,
        question: "What is a 'basis' in linear algebra?",
        options: ["The bottom of a matrix", "A set of vectors that span a space", "The first row", "The determinant"],
        correct: 1,
        explanation: "A basis is a set of linearly independent vectors that span the entire vector space.",
        analogy: "The primary colors needed to mix any other color in the spectrum."
    },
    {
        id: 36,
        question: "The technique of 'integration by parts' is based on which derivative rule?",
        options: ["Chain rule", "Product rule", "Quotient rule", "Power rule"],
        correct: 1,
        explanation: "Integration by parts is essentially the product rule for derivatives in reverse.",
        analogy: "Unwinding a product of two changing quantities."
    },
    {
        id: 37,
        question: "What is the 'rank' of a matrix?",
        options: ["Number of rows", "Number of columns", "Number of linearly independent rows/columns", "Its largest value"],
        correct: 2,
        explanation: "Rank represents the dimension of the vector space spanned by its rows or columns.",
        analogy: "The true number of unique directions a system can actually move."
    },
    {
        id: 38,
        question: "Euler's formula states that e^(iθ) equals:",
        options: ["cos θ + i sin θ", "cos θ - i sin θ", "sin θ + i cos θ", "tan θ"],
        correct: 0,
        explanation: "This formula establishes the fundamental relationship between trigonometric functions and complex exponentials.",
        analogy: "Connecting straight line growth to circular rotation."
    },
    {
        id: 39,
        question: "A 'Fourier series' represents a periodic function as a sum of:",
        options: ["Polynomials", "Sines and Cosines", "Logarithms", "Exponentials only"],
        correct: 1,
        explanation: "Fourier series break down periodic signals into their constituent frequencies.",
        analogy: "Breaking down a complex sound into its individual pure musical notes."
    },
    {
        id: 40,
        question: "The 'gradient vector' ∇f always points in the direction of:",
        options: ["Steepest descent", "Steepest ascent", "Zero change", "Tangent plane"],
        correct: 1,
        explanation: "The gradient points in the direction where the function value increases most rapidly.",
        analogy: "The most direct path to the mountaintop."
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
    },
    {
        id: 7,
        question: "What is a saddle point?",
        options: ["A local minimum", "A local maximum", "Neither minimum nor maximum", "An inflection point"],
        correct: 2,
        explanation: "A saddle point is a critical point that's a minimum in one direction and maximum in another.",
        analogy: "Like a mountain pass - uphill in one direction, downhill in another."
    },
    {
        id: 8,
        question: "The Newton-Raphson method uses:",
        options: ["Only first derivatives", "First and second derivatives", "No derivatives", "Third derivatives"],
        correct: 1,
        explanation: "Newton's method uses both gradient and Hessian for faster convergence.",
        analogy: "Like using both speed and acceleration to predict position."
    },
    {
        id: 9,
        question: "What is the convergence rate of Newton's method?",
        options: ["Linear", "Quadratic", "Cubic", "Exponential"],
        correct: 1,
        explanation: "Newton's method has quadratic convergence near the solution.",
        analogy: "Like doubling your accuracy with each step."
    },
    {
        id: 10,
        question: "In convex optimization, any local minimum is:",
        options: ["Not optimal", "A global minimum", "A saddle point", "Undefined"],
        correct: 1,
        explanation: "Convex functions have the property that local minima are global.",
        analogy: "Like a bowl with only one lowest point."
    },
    {
        id: 11,
        question: "What is the gradient of a scalar field?",
        options: ["A scalar", "A vector pointing to steepest ascent", "A matrix", "A constant"],
        correct: 1,
        explanation: "The gradient is a vector of partial derivatives showing steepest increase.",
        analogy: "Like an arrow pointing uphill on a mountain."
    },
    {
        id: 12,
        question: "The Jacobian matrix contains:",
        options: ["Second derivatives", "First partial derivatives", "Eigenvalues", "Determinants"],
        correct: 1,
        explanation: "The Jacobian is a matrix of all first-order partial derivatives.",
        analogy: "Like a table showing how each output changes with each input."
    },
    {
        id: 13,
        question: "What does positive definite Hessian indicate?",
        options: ["Saddle point", "Local minimum", "Local maximum", "Inflection point"],
        correct: 1,
        explanation: "Positive definite Hessian means the function curves upward in all directions.",
        analogy: "Like sitting at the bottom of a bowl."
    },
    {
        id: 14,
        question: "The method of steepest descent uses:",
        options: ["Random directions", "Negative gradient direction", "Positive gradient direction", "Fixed direction"],
        correct: 1,
        explanation: "Steepest descent moves opposite to the gradient to minimize the function.",
        analogy: "Like water flowing downhill."
    },
    {
        id: 15,
        question: "What is the purpose of line search in optimization?",
        options: ["Find critical points", "Determine optimal step size", "Calculate gradients", "Solve constraints"],
        correct: 1,
        explanation: "Line search finds how far to move in the chosen direction.",
        analogy: "Like deciding how many steps to take in a direction."
    },
    {
        id: 16,
        question: "The conjugate gradient method is efficient for:",
        options: ["Small problems", "Large sparse systems", "Nonlinear problems only", "Constrained problems"],
        correct: 1,
        explanation: "Conjugate gradient works well for large sparse linear systems.",
        analogy: "Like finding shortcuts through a maze."
    },
    {
        id: 17,
        question: "What is the Lipschitz constant?",
        options: ["Integration constant", "Bound on gradient magnitude", "Eigenvalue", "Determinant"],
        correct: 1,
        explanation: "Lipschitz constant bounds how fast a function can change.",
        analogy: "Like a speed limit for function changes."
    },
    {
        id: 18,
        question: "In multi-objective optimization, Pareto optimality means:",
        options: ["Single best solution", "No improvement without trade-off", "All objectives maximized", "Random solution"],
        correct: 1,
        explanation: "Pareto optimal means you can't improve one objective without worsening another.",
        analogy: "Like balancing quality and cost - improving one hurts the other."
    },
    {
        id: 19,
        question: "What is the trust region method?",
        options: ["A constraint type", "A region where model is trusted", "An integration technique", "A differentiation rule"],
        correct: 1,
        explanation: "Trust region methods limit steps to where the quadratic model is reliable.",
        analogy: "Like only walking where you can see clearly."
    },
    {
        id: 20,
        question: "The penalty method handles constraints by:",
        options: ["Ignoring them", "Adding penalty terms to objective", "Solving separately", "Linearizing them"],
        correct: 1,
        explanation: "Penalty methods add large costs for violating constraints.",
        analogy: "Like adding fines for breaking rules."
    },
    {
        id: 21,
        question: "What is a 'Banach space'?",
        options: ["A finite space", "A complete normed vector space", "A space with no norm", "A discrete set"],
        correct: 1,
        explanation: "A Banach space is a vector space with a norm where every Cauchy sequence converges within the space.",
        analogy: "A world where every traveler following a map eventually finds a home."
    },
    {
        id: 22,
        question: "The Fourier Transform converts a signal from which domain to which domain?",
        options: ["Space to Time", "Time to Frequency", "Real to Imaginary", "Linear to Nonlinear"],
        correct: 1,
        explanation: "It decomposes a time-based signal into its constituent frequencies.",
        analogy: "Seeing the individual ingredients in a baked cake after it's finished."
    },
    {
        id: 23,
        question: "What is the primary feature of the 'Monte Carlo method'?",
        options: ["Exact solutions", "Random sampling", "Linear regression", "Determinism"],
        correct: 1,
        explanation: "Monte Carlo methods use repeated random sampling to obtain numerical results.",
        analogy: "Predicting an election result by asking a few hundred random people."
    },
    {
        id: 24,
        question: "A Markov Chain is characterized by being:",
        options: ["Infinite", "Memoryless", "Reversible", "Continuous"],
        correct: 1,
        explanation: "The Markov property states that the future state depends only on the current state, not the history.",
        analogy: "Only the present matters for the future, not how you got here."
    },
    {
        id: 25,
        question: "What is the 'dual space' of an L^p space for 1 < p < ∞?",
        options: ["L^p itself", "L^q where 1/p + 1/q = 1", "L²", "L^∞"],
        correct: 1,
        explanation: "The dual of L^p is L^q where p and q are conjugate exponents.",
        analogy: "The hidden 'mirror' space where measurements and functions live together."
    },
    {
        id: 26,
        question: "In 'Galerkin methods', we approximate solutions in:",
        options: ["Infinite spaces", "Finite-dimensional subspaces", "Random sets", "Discrete grids only"],
        correct: 1,
        explanation: "Galerkin methods project a continuous problem into a simpler finite-dimensional space to solve it numerically.",
        analogy: "Trying to paint a masterpiece using only a few basic brushes and colors."
    },
    {
        id: 27,
        question: "What is a 'Sobolev space' used to measure?",
        options: ["Function values only", "Smoothness and derivative integrability", "Set cardinality", "Matrix rank"],
        correct: 1,
        explanation: "Sobolev spaces provide a framework for studying solutions to differential equations with weak derivatives.",
        analogy: "Measuring the smoothness of a function more precisely than just continuity."
    },
    {
        id: 28,
        question: "Singular Value Decomposition (SVD) is highly effective for:",
        options: ["Addition", "Data compression and noise reduction", "Finding derivatives", "Integration"],
        correct: 1,
        explanation: "SVD identifies the most significant patterns in a matrix, allowing for efficient representation.",
        analogy: "Identifying the most important features in a messy photograph."
    },
    {
        id: 29,
        question: "The 'Central Limit Theorem' states that the sum of independent variables approaches which distribution?",
        options: ["Uniform", "Normal (Gaussian)", "Poisson", "Exponential"],
        correct: 1,
        explanation: "As the sample size increases, the distribution of the sample mean approaches a normal distribution.",
        analogy: "Diverse small errors cancel each other out to form a predictable bell curve."
    },
    {
        id: 30,
        question: "In the 'Calculus of Variations', we search for functions that minimize:",
        options: ["Values", "Functionals (integrals)", "Slopes", "Roots"],
        correct: 1,
        explanation: "Variational calculus finds functions that are extrema of integral expressions.",
        analogy: "Finding the exact shape of a hanging chain to minimize its energy."
    },
    {
        id: 31,
        question: "The 'condition number' of a linear system measures:",
        options: ["The number of iterations", "Sensitivity to errors or perturbations", "The matrix size", "The sum of elements"],
        correct: 1,
        explanation: "A high condition number indicates that small changes in input can cause large changes in output.",
        analogy: "How much a small nudge at the start of a journey affects your final destination."
    },
    {
        id: 32,
        question: "The 'Residue Theorem' is a powerful tool in which field?",
        options: ["Real Analysis", "Complex Analysis", "Linear Algebra", "Graph Theory"],
        correct: 1,
        explanation: "It allows for the evaluation of complex line integrals by looking at singularities.",
        analogy: "Calculating the total whirlpool effect around 'holes' in a flat plane."
    },
    {
        id: 33,
        question: "A function is called 'analytic' if it can be represented by:",
        options: ["A graph", "A power series", "A limit", "A constant"],
        correct: 1,
        explanation: "Analytic functions are infinitely differentiable and equal to their Taylor series locally.",
        analogy: "A function so smooth that its past behavior perfectly predicts its future."
    },
    {
        id: 34,
        question: "What is the purpose of the 'Expectation-Maximization' (EM) algorithm?",
        options: ["Sorting data", "Finding MLE in models with hidden variables", "Differentiating functions", "Integrating sines"],
        correct: 1,
        explanation: "EM is an iterative method to find maximum likelihood estimates when some data is missing or latent.",
        analogy: "Iteratively guessing hidden information to find the best possible explanation for what you see."
    },
    {
        id: 35,
        question: "What is a 'Hilbert space'?",
        options: ["An empty space", "A complete inner product space", "A space of integers", "A finite field"],
        correct: 1,
        explanation: "A Hilbert space generalizes Euclidean space to infinite dimensions with an inner product.",
        analogy: "The ultimate mathematical playground for geometry and analysis."
    },
    {
        id: 36,
        question: "'Brownian motion' is a classic example of a:",
        options: ["Linear process", "Stochastic process", "Deterministic process", "Algebraic group"],
        correct: 1,
        explanation: "It is a continuous-time random walk that models physical phenomena like particle diffusion.",
        analogy: "The erratic, unpredictable dance of a dust particle in a glass of water."
    },
    {
        id: 37,
        question: "The 'Power Method' is an algorithm used to find:",
        options: ["The sum of a matrix", "The dominant eigenvalue", "The smallest element", "The matrix inverse"],
        correct: 1,
        explanation: "By repeatedly multiplying a vector by a matrix, it converges to the eigenvector of the largest eigenvalue.",
        analogy: "Repeatedly applying a process until only the strongest effect remains visible."
    },
    {
        id: 38,
        question: "The 'Laplace Transform' is especially useful for solving:",
        options: ["Linear equations", "Differential equations", "Integrals", "Logic puzzles"],
        correct: 1,
        explanation: "It transforms differential equations into simpler algebraic ones in the s-domain.",
        analogy: "Translating a difficult book into an easier language to solve the mystery more quickly."
    },
    {
        id: 39,
        question: "What is a 'Hidden Markov Model' (HMM)?",
        options: ["A model with hidden states", "A model with secret inputs", "A model with no history", "A model used in encryption"],
        correct: 0,
        explanation: "An HMM is a system where the state is not directly visible, but the output depending on the state is.",
        analogy: "Guessing the weather inside a building by watching what people carry when they enter."
    },
    {
        id: 40,
        question: "A 'Green's function' essentially represents:",
        options: ["The derivative", "The impulse response of a linear operator", "The area", "The boundary value"],
        correct: 1,
        explanation: "It is a type of function used to solve inhomogeneous differential equations subject to boundary conditions.",
        analogy: "Seeing how a single drop of water creates ripples that travel across an entire pond."
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
    },
    {
        id: 8,
        question: "What is the Wolfe condition used for?",
        options: ["Constraint satisfaction", "Line search step size", "Eigenvalue computation", "Matrix factorization"],
        correct: 1,
        explanation: "Wolfe conditions ensure both sufficient decrease and curvature in line search.",
        analogy: "Like having two quality checks before accepting a solution."
    },
    {
        id: 9,
        question: "The Frank-Wolfe algorithm is particularly suited for:",
        options: ["Unconstrained problems", "Problems with simple constraint geometry", "Integer programming", "Stochastic optimization"],
        correct: 1,
        explanation: "Frank-Wolfe works well when projecting onto constraints is expensive but linear optimization is cheap.",
        analogy: "Like taking advantage of the shape of your constraints."
    },
    {
        id: 10,
        question: "What is the convergence rate of gradient descent with Lipschitz continuous gradient?",
        options: ["Exponential", "Linear", "Quadratic", "Cubic"],
        correct: 1,
        explanation: "Standard gradient descent has linear convergence for smooth strongly convex functions.",
        analogy: "Like reducing error by a constant factor each step."
    },
    {
        id: 11,
        question: "In the interior point method, what happens to the barrier parameter?",
        options: ["Increases to infinity", "Decreases to zero", "Stays constant", "Oscillates"],
        correct: 1,
        explanation: "The barrier parameter is gradually reduced to approach the constraint boundary.",
        analogy: "Like slowly removing training wheels from a bicycle."
    },
    {
        id: 12,
        question: "What is the purpose of momentum in optimization?",
        options: ["Increase step size", "Accelerate convergence and dampen oscillations", "Satisfy constraints", "Compute Hessian"],
        correct: 1,
        explanation: "Momentum helps accelerate in consistent directions and dampen oscillations.",
        analogy: "Like a heavy ball that keeps rolling in the same direction."
    },
    {
        id: 13,
        question: "The Nesterov accelerated gradient achieves:",
        options: ["Linear convergence", "Optimal convergence rate for first-order methods", "Quadratic convergence", "No guaranteed convergence"],
        correct: 1,
        explanation: "Nesterov's method achieves the optimal O(1/k²) rate for smooth convex functions.",
        analogy: "Like finding the theoretical speed limit for gradient-based methods."
    },
    {
        id: 14,
        question: "What is the dual problem in optimization?",
        options: ["A second objective", "Optimization over Lagrange multipliers", "A backup solution", "An approximation"],
        correct: 1,
        explanation: "The dual problem optimizes over the Lagrange multipliers of the primal problem.",
        analogy: "Like looking at a problem from the opposite perspective."
    },
    {
        id: 15,
        question: "Strong duality holds when:",
        options: ["Problem is linear", "Slater's condition is satisfied", "Hessian is positive definite", "Gradient is Lipschitz"],
        correct: 1,
        explanation: "Slater's condition (strict feasibility) ensures strong duality for convex problems.",
        analogy: "Like having a guarantee that two perspectives give the same answer."
    },
    {
        id: 16,
        question: "What is the proximal gradient method used for?",
        options: ["Smooth problems only", "Non-smooth regularized problems", "Linear systems", "Eigenvalue problems"],
        correct: 1,
        explanation: "Proximal methods handle non-smooth terms like L1 regularization efficiently.",
        analogy: "Like having a special tool for rough edges."
    },
    {
        id: 17,
        question: "The ADMM algorithm is based on:",
        options: ["Newton's method", "Augmented Lagrangian and decomposition", "Gradient descent", "Simplex method"],
        correct: 1,
        explanation: "ADMM uses augmented Lagrangian and alternating minimization for decomposable problems.",
        analogy: "Like divide and conquer - split the problem and solve pieces alternately."
    },
    {
        id: 18,
        question: "What is variance reduction in stochastic optimization?",
        options: ["Reducing problem size", "Reducing gradient estimate noise", "Reducing iterations", "Reducing memory"],
        correct: 1,
        explanation: "Variance reduction techniques like SVRG reduce noise in stochastic gradient estimates.",
        analogy: "Like using a better camera to get clearer pictures."
    },
    {
        id: 19,
        question: "The Adam optimizer combines:",
        options: ["Momentum and RMSprop", "Newton and gradient descent", "SGD and BFGS", "Proximal and dual methods"],
        correct: 0,
        explanation: "Adam uses both momentum and adaptive learning rates (like RMSprop).",
        analogy: "Like combining the best features of two approaches."
    },
    {
        id: 20,
        question: "What is the subgradient method used for?",
        options: ["Smooth optimization", "Non-differentiable convex functions", "Linear programming", "Quadratic programming"],
        correct: 1,
        explanation: "Subgradient methods extend gradient descent to non-smooth convex functions.",
        analogy: "Like using a generalized slope when the function has corners."
    },
    {
        id: 21,
        question: "In semidefinite programming, variables are:",
        options: ["Scalars", "Vectors", "Positive semidefinite matrices", "Integers"],
        correct: 2,
        explanation: "SDP optimizes over the cone of positive semidefinite matrices.",
        analogy: "Like optimizing over shapes that satisfy matrix constraints."
    },
    {
        id: 22,
        question: "What is the cutting plane method?",
        options: ["A matrix decomposition", "Iteratively adding constraints to approximate feasible region", "A differentiation technique", "A sampling method"],
        correct: 1,
        explanation: "Cutting plane methods progressively refine the feasible region by adding constraints.",
        analogy: "Like sculpting a statue by removing pieces."
    },
    {
        id: 23,
        question: "The ellipsoid method guarantees:",
        options: ["Fast practical performance", "Polynomial time complexity", "Quadratic convergence", "Global optimum always"],
        correct: 1,
        explanation: "Ellipsoid method was the first polynomial-time algorithm for linear programming.",
        analogy: "Like having a theoretical guarantee even if not the fastest in practice."
    },
    {
        id: 24,
        question: "What is coordinate descent?",
        options: ["Descending in all directions", "Optimizing one variable at a time", "Using coordinates as constraints", "A projection method"],
        correct: 1,
        explanation: "Coordinate descent optimizes with respect to one coordinate while fixing others.",
        analogy: "Like adjusting one knob at a time on a control panel."
    },
    {
        id: 25,
        question: "The mirror descent algorithm uses:",
        options: ["Euclidean geometry", "Bregman divergence", "Manhattan distance", "Cosine similarity"],
        correct: 1,
        explanation: "Mirror descent generalizes gradient descent using Bregman divergences.",
        analogy: "Like using a curved mirror instead of a flat one - different geometry."
    },
    {
        id: 26,
        question: "What is the 'Manifold Hypothesis' in data science?",
        options: ["Data is random", "High-dimensional data lies on low-dimensional manifolds", "Data is always linear", "Data cannot be compressed"],
        correct: 1,
        explanation: "It suggests that natural high-dimensional data actually sits on a much simpler lower-dimensional structure.",
        analogy: "A crumpled piece of paper is a complex 3D object, but its surface is still just a 2D sheet."
    },
    {
        id: 27,
        question: "What is the primary goal of 'Differential Privacy'?",
        options: ["Speed up queries", "Protect individual privacy while sharing aggregate info", "Encrypt all data", "Delete noisy data"],
        correct: 1,
        explanation: "It adds controlled noise to queries so that the presence of any single individual cannot be determined.",
        analogy: "Adding just enough blur to a photo so you recognize the scene but not the specific faces."
    },
    {
        id: 28,
        question: "The 'Attention mechanism' in Transformers allows the model to:",
        options: ["Ignore inputs", "Weight the importance of different input parts", "Add more layers", "Speed up training"],
        correct: 1,
        explanation: "It computes a weighted sum of values based on how relevant they are to a specific query.",
        analogy: "Focusing on specific key words in a long sentence to understand its true meaning."
    },
    {
        id: 29,
        question: "In Information Theory, what does 'Entropy' measure?",
        options: ["Energy", "Average uncertainty or information content", "System speed", "Data size"],
        correct: 1,
        explanation: "Entropy quantifies the 'surprise' or bits of information needed to describe a state.",
        analogy: "How surprised you are by a result - a coin flip has more entropy than a fixed outcome."
    },
    {
        id: 30,
        question: "What is a 'Lie Group'?",
        options: ["A deceptive set", "A group that is also a differentiable manifold", "A finite group", "A group of integers"],
        correct: 1,
        explanation: "Lie groups provide a framework for studying continuous symmetry in mathematics and physics.",
        analogy: "A mathematical object that describes smooth, continuous motions like rotations."
    },
    {
        id: 31,
        question: "The 'Atiyah-Singer Index Theorem' is famous for connecting:",
        options: ["Algebra and Number Theory", "Analysis and Topology", "Logic and Sets", "Chaos and Order"],
        correct: 1,
        explanation: "It relates the analytical index of a differential operator to the topological index of the manifold.",
        analogy: "Bridging the world of differential equations with the world of geometric shapes."
    },
    {
        id: 32,
        question: "What is the purpose of 'Shor's algorithm' in quantum computing?",
        options: ["Searching databases", "Factoring large integers", "Optimizing routes", "Sorting lists"],
        correct: 1,
        explanation: "It factors integers in polynomial time on a quantum computer, threatening RSA encryption.",
        analogy: "Finding the secret combination of a lock by exploring all possible paths simultaneously."
    },
    {
        id: 33,
        question: "In Reinforcement Learning, the 'Bellman Equation' describes:",
        options: ["Reward sum", "Relationship between current and future value", "Agent speed", "Environment size"],
        correct: 1,
        explanation: "It breaks down the value of a state into the immediate reward plus the discounted future value.",
        analogy: "Planning your career by considering the value of today's work plus every possible future opportunity."
    },
    {
        id: 34,
        question: "What is a 'Generative Adversarial Network' (GAN)?",
        options: ["A network that fights humans", "Two networks competing to create and detect data", "A single network that sorts data", "A network that adds noise"],
        correct: 1,
        explanation: "A generator tries to create realistic data while a discriminator tries to tell real from fake.",
        analogy: "An art forger and an investigator training each other to become better and better."
    },
    {
        id: 35,
        question: "'Homology' in Algebraic Topology is used to measure:",
        options: ["Set size", "Holes of various dimensions in a space", "Function slopes", "Point distances"],
        correct: 1,
        explanation: "Homology groups provide a way to distinguish between shapes based on their connectivity and 'holes'.",
        analogy: "Distinguishing a donut from a ball by counting the number of loops that can't be shrunk."
    },
    {
        id: 36,
        question: "The 'Navier-Stokes' problem is famous for being related to:",
        options: ["Prime numbers", "Fluid flow existence and smoothness", "Graph coloring", "Infinite sets"],
        correct: 1,
        explanation: "One of the Millennium Prize Problems, it asks about the fundamental nature of 3D fluid motion.",
        analogy: "Proving whether water will always flow predictably or if it can suddenly turn into chaos."
    },
    {
        id: 37,
        question: "The 'P vs NP' problem fundamentally asks if:",
        options: ["Verification is harder than discovery", "Easy verification implies easy solution", "Primes are infinite", "Computers can think"],
        correct: 1,
        explanation: "It asks whether every problem whose solution can be quickly verified can also be quickly solved.",
        analogy: "Does being able to appreciate a great book mean you could have easily written it yourself?"
    },
    {
        id: 38,
        question: "What is an 'Autoencoder' primary function?",
        options: ["Driving cars", "Dimensionality reduction and feature learning", "Sending emails", "Multiplying matrices"],
        correct: 1,
        explanation: "An autoencoder compresses input into a bottleneck and then reconstructs it to find key features.",
        analogy: "Summarizing a long complex story into a few key points, then trying to tell the whole story from just those points."
    },
    {
        id: 39,
        question: "The 'Black-Scholes model' is a mathematical model for:",
        options: ["Weather prediction", "Pricing financial derivatives (options)", "Protein folding", "Social networks"],
        correct: 1,
        explanation: "It provides a theoretical estimate of the price of European-style options over time.",
        analogy: "Calculating the fair price for a bet on the future value of a company's stock."
    },
    {
        id: 40,
        question: "What is 'Compressed Sensing'?",
        options: ["Zipping files", "Reconstructing signals from sparse measurements", "Slow data transfer", "Lossy compression only"],
        correct: 1,
        explanation: "It allows for the recovery of signals from far fewer samples than the Nyquist rate would suggest.",
        analogy: "Reconstructing a high-resolution photograph using only a few random pixels' worth of information."
    },
    {
        id: 41,
        question: "A 'Calabi-Yau manifold' is a concept important in:",
        options: ["Biology", "String Theory", "Economics", "Sociology"],
        correct: 1,
        explanation: "These complex manifolds are used to compactify the extra dimensions required by string theory.",
        analogy: "The tiny, hidden dimensions where mathematical 'strings' vibrate to create the physics of the universe."
    },
    {
        id: 42,
        question: "The 'Langlands Program' is often described as:",
        options: ["A coding bootcamp", "A Grand Unified Theory for mathematics", "A space program", "A new computer OS"],
        correct: 1,
        explanation: "It is a vast web of conjectures linking number theory, representation theory, and harmonic analysis.",
        analogy: "Creating a master dictionary that translates every field of math into every other field."
    },
    {
        id: 43,
        question: "Grigori Perelman used 'Ricci Flow' to prove which famous conjecture?",
        options: ["Fermat's Last Theorem", "Poincaré Conjecture", "Riemann Hypothesis", "Goldbach Conjecture"],
        correct: 1,
        explanation: "Ricci flow is a process that deforms a manifold to smooth out its geometry, eventually revealing simple shapes.",
        analogy: "Smoothing out a lumpy, irregular ball of clay until it becomes a perfect, identifiable sphere."
    },
    {
        id: 44,
        question: "'Differential Geometry' provides the mathematical language for:",
        options: ["Modern Cooking", "General Relativity", "Binary Logic", "Linear Programming"],
        correct: 1,
        explanation: "Einstein used differential geometry to describe gravity as the curvature of the spacetime manifold.",
        analogy: "Using the language of curved surfaces and slopes to explain how the entire universe behaves."
    },
    {
        id: 45,
        question: "In Game Theory, a 'Nash Equilibrium' is a state where:",
        options: ["Everyone wins", "No player can benefit by changing strategy alone", "The game ends", "One player wins everything"],
        correct: 1,
        explanation: "In a Nash Equilibrium, each player's strategy is optimal given the strategies of all other players.",
        analogy: "An 'unbeatable' standoff where everyone is doing their best given what everyone else is doing."
    }
];

export const QUESTIONS_BY_CATEGORY: Record<StudentCategory, Question[]> = {
    school: SCHOOL_QUESTIONS,
    ug: UG_QUESTIONS,
    pg: PG_QUESTIONS,
    research: RESEARCH_QUESTIONS,
};

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
        <div className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-4">
                <h3 className="text-4xl font-black leading-tight">{question.question}</h3>
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
                            <p className="text-2xl leading-relaxed">{question.explanation}</p>
                            {question.analogy && (
                                <p className="text-xl text-slate-400 italic">💡 Analogy: {question.analogy}</p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
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
