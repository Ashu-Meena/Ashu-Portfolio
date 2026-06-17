# Ashu Meena - Interactive Portfolio

A modern, highly interactive, and visually striking portfolio website built for the future. It features a sci-fi/cyberpunk aesthetic with holographic UI elements, dynamic theme switching, 3D elements, and smooth animations.

## 🚀 Features

- **Futuristic UI & UX**: Glassmorphism, CRT scanline overlays, neon accents, and glitch text effects.
- **Interactive 3D Elements**: Powered by Three.js and React Three Fiber.
- **Dynamic Theming**: An admin dashboard to dynamically change color palettes (Cyberpunk, Matrix, Iron Man, etc.).
- **Smooth Animations**: Seamless transitions powered by Framer Motion and GSAP.
- **Admin Dashboard**: Manage profile details, projects, skills, and site appearance on the fly.
- **Command Menu**: Quick navigation via an interactive command palette (`cmdk`).
- **Backend Integration**: Supabase integration for data storage, guestbook, and blog.

## 💻 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **3D Graphics**: [Three.js](https://threejs.org/) & [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- **Database & Backend**: [Supabase](https://supabase.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🛠️ Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ashu-Meena/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root of your project and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `src/app/` - Next.js App Router pages and layouts.
- `src/components/` - Reusable UI components (Hero, Navbar, Admin Dashboard, etc.).
- `src/lib/` - Utility functions and Supabase client configuration.
- `src/data/` - Local JSON fallback data for the portfolio.
- `public/` - Static assets like images and fonts.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Ashu-Meena/portfolio/issues) if you want to contribute.

## 📝 License

This project is licensed under the MIT License.
