# 3D Portfolio

A modern, interactive personal portfolio website built to showcase web development skills, projects, and experience. Featuring 3D visuals, smooth animations, and a polished dark theme — designed to leave a lasting impression on visitors.

## 🎯 What Is This?

This is a **full-featured portfolio website** built as a single-page application using **Next.js 16** and **React 19**. It serves as a professional online presence, presenting a developer's identity, skills, experience, and work in a visually engaging way.

### Sections Included

- **🏠 Home** — Hero section with a 3D Spline viewer and animated introduction
- **📋 About** — Personal background, bio, and what drives the work
- **💼 Experience** — Professional timeline and career highlights
- **🛠 Tech Stack** — Skills and technologies mastered, visually presented
- **🔑 Key Builds** — Highlighted projects and notable work
- **📁 Projects** — Curated portfolio of completed projects
- **📬 Contact** — Contact form and connection options
- **🖱 Canvas Cursor** — Custom interactive cursor effects for a unique feel

### Design Highlights

- **Spline 3D Integration** — WebGL-powered 3D visuals in the hero and background
- **Curved Loop Animations** — Smooth, eye-catching animated transitions between sections
- **Custom Canvas Cursor** — A dynamically styled cursor that reacts to scroll and movement
- **Scroll-Triggered Animations** — Sections animate into view as the user scrolls using `react-intersection-observer`
- **Dark Theme** — A cohesive, modern dark UI optimized for visual impact

## 🛠 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16 (App Router) | Framework & routing |
| **React** | 19 | UI components |
| **TypeScript** | 5 | Type safety |
| **Tailwind CSS** | v4 | Styling & layout |
| **@splinetool** | react-spline, runtime, viewer | 3D rendering |
| **Framer Motion** | 12 | Animations |
| **clsx / tailwind-merge** | — | Class name utilities |
| **react-intersection-observer** | 11 | Scroll-triggered effects |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio. Edit `app/page.tsx` to get started.

## 📁 Project Structure

```
app/                  # Next.js App Router (pages, layouts, globals)
components/           # Reusable React components
  ├── HomeSection.tsx        # Hero / landing section
  ├── AboutSection.tsx       # Bio & background
  ├── ExperienceSection.tsx  # Career timeline
  ├── TechStackSection.tsx   # Skills showcase
  ├── KeyBuildsSection.tsx   # Notable projects
  ├── ProjectSection.tsx     # Project portfolio
  ├── ContactSection.tsx     # Contact form
  ├── Header.tsx             # Navigation bar
  ├── SplineBackground.tsx   # 3D background effect
  ├── SplineViewer.tsx       # Interactive 3D viewer
  ├── CurvedLoop.tsx         # Animated loop component
  ├── CanvasCursor.tsx       # Custom cursor behavior
  └── ui/                   # Shared UI primitives
public/               # Static assets (images, videos)
docs/                 # Documentation
lib/                  # Utility libraries
next.config.ts        # Next.js configuration
tsconfig.json         # TypeScript configuration
tailwind.config.ts    # Tailwind CSS configuration
package.json          # Dependencies & scripts
```

## 📜 Available Scripts

| Script | Description |
|---|---|
| `dev` | Start development server with hot reload |
| `build` | Build the project for production |
| `start` | Start the production server |
| `lint` | Run ESLint to check for issues |

## 🌍 Deployment

The easiest way to deploy is with [Vercel](https://vercel.com). See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
