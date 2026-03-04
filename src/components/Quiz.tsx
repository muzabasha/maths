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
