<img width="1899" height="948" alt="Screenshot 2026-03-02 121930" src="https://github.com/user-attachments/assets/85a23a07-e671-47d5-bc78-7c4ab1348b1a" />

---

# Barber Shop Management System

## A full-featured **barber shop management system** built with the PERN stack. This system allows you to manage customers, services, appointments, invoices, and payments — all in one place.

---

## ✦ Demo Access

> **Demo:** [https://barber-appsw.vercel.app/](https://barber-appsw.vercel.app/)  
> **Username:** `admin@gmail.com`  
> **Password:** `12345678`

**System Features:**

- **Customers** — manage client profiles
- **Services** — add and update services offered
- **Appointments** — schedule, edit, and track bookings
- **Invoices** — generate, view, and manage invoices
- **Payment Methods** — track and manage payments

---

## ✦ Tech Stack

| Tool                                         | Version | Purpose                          |
| -------------------------------------------- | ------- | -------------------------------- |
| [React](https://react.dev)                   | 19      | Frontend UI framework            |
| [TypeScript](https://www.typescriptlang.org) | 5       | Type safety                      |
| [Vite](https://vitejs.dev)                   | 6       | Frontend build tool & dev server |
| [Node.js](https://nodejs.org/)               | 22      | Backend runtime                  |
| [Express](https://expressjs.com/)            | 5       | Backend API framework            |
| [PostgreSQL](https://www.postgresql.org/)    | 18      | Database                         |
| [Tailwind CSS](https://tailwindcss.com)      | v4      | Styling                          |
| [shadcn/ui](https://ui.shadcn.com)           | latest  | Component primitives             |
| [React Router](https://reactrouter.com)      | v7      | Frontend routing                 |
| [TanStack Query](https://tanstack.com/query) | latest  | Data fetching & caching          |
| [Lucide React](https://lucide.dev)           | —       | Icons                            |

---

## ✦ Features

- **Collapsible sidebar** — expands and collapses to icon-only mode
- **Sticky navbar** — stays fixed at the top while content scrolls
- **Active link highlighting** — clear visual feedback on current page
- **Dark mode** — fully supported via shadcn's CSS variable token system
- **Responsive layout** — navbar and content expand when sidebar collapses
- **Consistent color system** — centralized style tokens for easy theming
- **Clean routing** — nested routes with a shared layout via React Router `<Outlet />`
- **Full backend integration** — Node/Express API with PostgreSQL database

---

## ✦ Color System

```ts
// src/styles/index.ts
export const styles = {
  primaryBgColor: "bg-[#1C1C1C]",
  secondaryBgColor: "bg-[#B0B0B0]",
  accentBgColor: "bg-[#D4AF37]",
  primaryColor: "text-[#1C1C1C]",
  secondaryColor: "text-[#B0B0B0]",
  accentColor: "text-[#D4AF37]",
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

## ✦ Contributing

If you find this useful and want to improve it, pull requests are welcome. If you build something with it, I'd love to see it.

---

## ✦ License

MIT — free to use in personal and commercial projects.
