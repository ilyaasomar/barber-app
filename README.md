![alt text](<public/Screenshot 2026-02-17 130030.png>)

---
# React Admin Dashboard

A production-ready **admin dashboard boilerplate** built with modern React tooling. This is my personal base template — every time I start a new application I use this as the foundation. Feel free to clone it, use it, and build on top of it.
---

## ✦ What Is This?

This is a **prepared starter template** (boilerplate) — meaning everything is already wired up and ready to go. No configuration headaches, no setup from scratch. Clone it, add your pages, and start building your product immediately.

It comes with a fully working layout system: collapsible sidebar with navigation links, a sticky navbar with theme toggle and user menu, dark mode support, and a consistent color system — all the things you'd spend days setting up yourself.

---

## ✦ Perfect For

- SaaS application dashboards
- E-commerce admin panels
- CRM & business tools
- Analytics platforms
- Any project that needs a clean admin interface

---

## ✦ Tech Stack

| Tool                                         | Version | Purpose                     |
| -------------------------------------------- | ------- | --------------------------- |
| [React](https://react.dev)                   | 19      | UI framework                |
| [TypeScript](https://www.typescriptlang.org) | 5       | Type safety                 |
| [Vite](https://vitejs.dev)                   | 6       | Build tool & dev server     |
| [Tailwind CSS](https://tailwindcss.com)      | v4      | Utility-first styling       |
| [shadcn/ui](https://ui.shadcn.com)           | latest  | Component primitives        |
| [React Router](https://reactrouter.com)      | v7      | Client-side routing         |
| [Geist](https://vercel.com/font)             | —       | Typography (via fontsource) |
| [Lucide React](https://lucide.dev)           | —       | Icons                       |

---

## ✦ Features

- **Collapsible sidebar** — expands and collapses to icon-only mode
- **Sticky navbar** — stays fixed at the top while content scrolls
- **Active link highlighting** — clear visual feedback on current page
- **Dark mode** — fully supported via shadcn's CSS variable token system
- **Responsive layout** — navbar and content expand when sidebar collapses
- **Consistent color system** — centralized style tokens for easy theming
- **Clean routing** — nested routes with a shared layout via React Router `<Outlet />`
- **Geist font** — clean, modern typography out of the box

---

## ✦ Color System

All colors are defined in one place — change them once and they apply everywhere.

```ts
// src/styles/index.ts
export const styles = {
  primaryBgColor: "bg-[#4191F9]", // Bright Blue  — active states, links, highlights
  secondaryBgColor: "bg-[#10B981]", // Emerald Green — success, confirm, save actions
  accentBgColor: "bg-[#6B7280]", // Gray          — hover states
  primaryColor: "text-[#4191F9]",
  secondaryColor: "text-[#10B981]",
  accentColor: "text-[#6B7280]",
};
```

---

## ✦ Project Structure

```
src/
├── components/
│   ├── AppSidebar.tsx      # Sidebar — logo, nav links, footer menu
│   ├── Navbar.tsx          # Top bar — sidebar trigger, theme toggle, user avatar
│   └── ui/                 # shadcn/ui components
├── layout/
│   └── RootLayout.tsx      # Shared layout wrapping all routes via <Outlet />
├── pages/                  # One component per route
├── routers/
│   └── Routers.tsx         # All route definitions in one place
├── styles/
│   └── index.ts            # Centralized color and style tokens
└── index.css               # Tailwind v4 + shadcn tokens + Geist font
```

---

## ✦ Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/your-username/main_react_dashboard.git
cd main_react_dashboard

# 2. Install dependencies
pnpm install

# 3. Start the dev server
pnpm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ✦ How To Use This As Your Base

This boilerplate is designed to be your starting point. Here is how to adapt it for a new project:

**Add a new page:**

```tsx
// 1. Create src/pages/Customers.tsx
const Customers = () => <div>Customers page</div>;
export default Customers;

// 2. Register the route in src/routers/Routers.tsx
<Route path="/customers" element={<Customers />} />

// 3. Add to sidebar in src/components/AppSidebar.tsx
{ name: "Customers", icon: "users", path: "/customers" }
```

**Swap the logo:**

```tsx
// In AppSidebar.tsx SidebarHeader, replace the SVG:
<img src="/your-logo.svg" alt="Logo" className="size-5" />

// Update the name and subtitle:
<span className="font-semibold">Your App Name</span>
<span className="text-muted-foreground text-xs">Your Subtitle</span>
```

**Change the brand colors:**

```ts
// Edit src/styles.ts
primaryBgColor: "bg-[#YOUR_COLOR]",
```

---

## ✦ Contributing

If you find this useful and want to improve it, pull requests are welcome. If you build something with it, I'd love to see it.

---

## ✦ License

MIT — free to use in personal and commercial projects.
