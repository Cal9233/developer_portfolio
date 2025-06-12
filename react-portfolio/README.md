# Calvin Malagon Portfolio - React/TypeScript Version

A modern, responsive portfolio website built with React, TypeScript, and styled-components.

## Features

- ⚡ Built with Vite for lightning-fast development
- 🎨 Styled with styled-components for component-scoped styling
- 📱 Fully responsive design
- 🎭 Smooth animations and transitions
- 🔍 TypeScript for type safety
- 🎯 Intersection Observer for scroll-based animations

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
cd /var/www/cal.lueshub.com/react-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
react-portfolio/
├── src/
│   ├── components/
│   │   ├── Background.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Loader.tsx
│   │   ├── Navbar.tsx
│   │   ├── Projects.tsx
│   │   ├── Sandbox.tsx
│   │   └── Skills.tsx
│   ├── styles/
│   │   └── GlobalStyle.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Technologies Used

- React 18
- TypeScript
- Vite
- styled-components
- react-intersection-observer

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking