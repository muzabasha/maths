# Applied Mathematics Explorer

An interactive, projector-friendly web application that teaches applied mathematics concepts to 10th standard students using real-life analogies, interactive visualizations, and gamified quizzes.

## 🎯 Target Audience
- **School Students** - Basic mathematical concepts with simple analogies
- **UG Students** - Intermediate calculus and optimization concepts
- **PG Students** - Advanced optimization and numerical methods
- **Research Scholars** - Expert-level algorithms and theoretical foundations

## ✨ Features

- **Multi-Level Content** — Separate tabs for School, UG, PG, and Research Scholar students
- **Adaptive Quizzes** — 20+ questions per category with difficulty-appropriate content
- **Full-Screen Projector Mode** — Press `F` or click the Presentation Mode button
- **Keyboard Navigation** — `→` Next slide, `←` Previous slide, `Space` to reveal steps
- **Interactive Slides** — Covering polynomials, optimization, derivatives, and more
- **Real-time Graphs** — Powered by Plotly.js with interactive sliders
- **Gamified Quiz** — Instant feedback with analogies and explanations
- **Celebration Effects** — Confetti animations for correct answers
- **Dark Theme** — Optimized for projector display

## 🧠 Slide Topics

| Slide | Topic |
|-------|-------|
| 1 | Math is Everywhere! (Intro) |
| 2 | The Lemonade Problem |
| 3 | From Words to Equations |
| 4 | Polynomial as a Recipe |
| 5 | The Power of Powers (x, x², x³) |
| 6 | Checking Direction (Derivatives) |
| 7 | Solving Step by Step |
| 8 | How Close are We? (Error Analysis) |
| 9 | Which Tool is Best? (Method Comparison) |
| 10 | Stable as a Rock (Stability) |
| 11 | Knowledge Challenge (Quiz) |
| 12 | Conclusion & Celebration |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Math Rendering**: KaTeX (react-katex)
- **Charts**: Plotly.js (react-plotly.js)
- **Icons**: Lucide React
- **Celebrations**: canvas-confetti

## 📐 NEP 2020 Alignment

- ✅ Experiential Learning
- ✅ Competency-Based Approach
- ✅ Research-Based Inquiry
- ✅ Hands-On Experimentation
- ✅ Cross-Disciplinary Modeling

## 🌐 Deployment

This project is configured for automatic deployment on [Vercel](https://vercel.com).

### Automatic Deployment
- Push to `main` branch triggers automatic deployment
- Vercel will build and deploy within 2-3 minutes
- Check deployment status at [Vercel Dashboard](https://vercel.com/dashboard)

### Manual Deployment
If changes don't reflect:
1. Go to your Vercel project dashboard
2. Click "Deployments" tab
3. Click "Redeploy" on the latest deployment
4. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

### Local Testing
```bash
npm run build
npm start
```

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

*Built for REVA University | Resource Person Programme | Applied Mathematics 2026*
