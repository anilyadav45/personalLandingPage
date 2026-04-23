# Anil Yadav — Portfolio 2026

A premium, futuristic React portfolio with 3D animations, dark/light mode, and glassmorphism design.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## ⚡ Tech Stack

- **React 18** + **Vite** — lightning-fast dev experience
- **Framer Motion** — smooth animations & transitions
- **Three.js / @react-three/fiber** — 3D canvas in the Hero
- **Tailwind CSS** — utility-first styling
- **Lucide React** — icons

## 📁 Project Structure

```
src/
├── components/
│   ├── Loader.jsx       # Animated intro loader
│   ├── Navbar.jsx       # Sticky nav with theme toggle
│   ├── Hero.jsx         # 3D Three.js hero + typed text
│   ├── About.jsx        # Bio, info cards, stats
│   ├── Projects.jsx     # 3D-tilt project cards
│   ├── Skills.jsx       # Animated skill bars by category
│   ├── Contact.jsx      # Form + social links
│   ├── Footer.jsx       # Footer with nav + socials
│   └── CustomCursor.jsx # Custom cursor (desktop only)
├── data.js              # All portfolio content (edit this!)
├── App.jsx              # Root with theme + loader state
├── index.css            # Global styles + CSS variables
└── main.jsx             # Entry point
```

## 🎨 Customisation

All personal data is in **`src/data.js`** — edit your:
- Name, bio, roles
- Contact details & social links  
- Projects (title, description, images, tech stack, URLs)
- Skills and proficiency levels

To swap your profile photo: add `profile.jpeg` to `/public/` and update `About.jsx`.

## 🌙 Theme

- **Dark mode** is default (deep space aesthetic)
- **Light mode** toggle button in Navbar
- CSS variables in `index.css` control both themes

## 🔧 Contact Form

The form uses `formsubmit.co` — to enable real email delivery:
1. In `Contact.jsx`, replace the `handleSubmit` simulation with a real fetch call to `https://formsubmit.co/your@email.com`
2. Or use EmailJS, Resend, or any backend of your choice

## 🚢 Deployment

Works out of the box on **Vercel**, **Netlify**, or **GitHub Pages**.

```bash
npm run build   # outputs to /dist
```
