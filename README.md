# 🛍️ Meraya — Customer Storefront

## 🚀 Overview

**Meraya** is a fully functional e-commerce platform for an Indian clothing brand. This repository is the **customer-facing storefront** — the public shopping website — built as a React single-page app.

Meraya is split across **three separate repositories**, not one monorepo:

| Repo | What it is | Where it runs |
|---|---|---|
| `MERAYA-frontend` (this repo) | The customer storefront | Self-hosted on a VPS, behind Cloudflare — `https://meraya.co.in` |
| [`MERAYA-backend`](https://github.com/RohanRanjan250/MERAYA-backend) | Django + MySQL API | Same VPS, behind Cloudflare — `https://api.meraya.co.in` |
| [`MERAYA_ADMIN-frontend`](https://github.com/RohanRanjan250/MERAYA_ADMIN-frontend) | The staff-only admin dashboard | Vercel — `https://admin.meraya.co.in` |

This repo only contains the storefront's frontend code — to run the full system locally you'll also need the backend repo running (see its own README for setup).

> 💡 *From product discovery to secure checkout, returns, and exchanges — this is the customer's entire shopping journey.*

---

## ✨ Features

- 👤 **Authentication** — email OTP sign-in/sign-up (no passwords) and Google OAuth, with automatic session refresh.
- 👗 **Product Catalog** — browse by category/collection, filter and sort, search with live suggestions, detailed product pages with an image gallery, size selection, and a size chart.
- 🛒 **Shopping Cart** — add/remove items, adjust quantities, live stock validation.
- ❤️ **Wishlist** — save items for later, move them straight to cart.
- 👛 **Account Management** — contact info, saved addresses, order history.
- 💰 **Wallet** — store-credit balance from refunds, viewable transaction history.
- 🏷️ **Coupons** — apply discount codes at checkout, including free-shipping coupons.
- 🔒 **Checkout** — a 3-step flow (Cart → Address → Summary) with live stock re-validation at every step.
- 💳 **Payments** — Razorpay integration (Cards, UPI, Netbanking).
- 📦 **Order Tracking** — a delivery status timeline (Order placed → Shipped → Out for delivery → Delivered).
- ↩️ **Returns & Exchanges** — request a return or a size exchange within the return window, with live status updates.
- ⭐ **Reviews** — rate and review delivered products, like/dislike other reviews.
- 📣 **Site Announcement Banner** — an admin-controlled marquee shown across the storefront.
- 📈 **Analytics** — Google Analytics 4 ecommerce event tracking (view item, add to cart, checkout funnel, purchase).
- 🔍 **SEO** — per-page meta tags, canonical URLs, JSON-LD structured data (Product/Organization/BreadcrumbList), and an auto-generated sitemap that pulls real product URLs from the live catalog on every build.
- 📱 **Responsive Design** — works across desktop, tablet, and mobile.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Build tool** | Vite |
| **Framework** | React 19 |
| **Routing** | React Router v7 |
| **State/data** | Context API (`ToastContext`, `LandingpageContext`), Axios |
| **Auth** | `@react-oauth/google`, JWT via httpOnly cookies (issued by the backend) |
| **Icons** | FontAwesome, `react-icons`, `lucide-react` |
| **Images** | Cloudinary (on-the-fly optimization via `f_auto,q_auto,w_{width}` URL transforms) |
| **Payments** | Razorpay Checkout.js (loaded client-side) |
| **Analytics** | Google Analytics 4 (`gtag.js`) |
| **Deployment** | Self-hosted VPS (nginx serving the static build), Cloudflare in front |

---

## ⚙️ Local Setup

### Prerequisites

- Node.js (18+) and npm
- The [`MERAYA-backend`](https://github.com/RohanRanjan250/MERAYA-backend) repo running locally (this frontend has nothing to talk to without it)

### 1. Clone and install

```bash
git clone https://github.com/RohanRanjan250/MERAYA-frontend.git
cd MERAYA-frontend
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env` and fill in real values:

```bash
cp .env.example .env
```

| Variable | Purpose |
|---|---|
| `VITE_API_BASE_URL` | The backend's base URL. Locally this is `http://localhost:8000` (**no** `/api` prefix — the backend's routes aren't namespaced under one). In production this is `https://api.meraya.co.in`, hardcoded as a fallback in `src/API/instance.jsx` when the hostname isn't `localhost`/a LAN IP. |
| `VITE_GOOGLE_CLIENT_ID` | The Google OAuth Client ID used for "Sign in with Google." Must have `http://localhost:5173` (or whichever port you run on) listed as an authorized JavaScript origin in Google Cloud Console, or Google sign-in will fail with `origin_mismatch`. |

### 3. Run the dev server

```bash
npm run dev
```

Vite's default port is **`http://localhost:5173`** (not 3000).

### 4. Build for production

```bash
npm run build
```

This also automatically runs `scripts/generate-sitemap.mjs` afterward (via the `postbuild` npm hook), which fetches the current live product catalog and regenerates `dist/sitemap.xml` with a real `<url>` entry per product, alongside the static pages. No separate step needed — it's part of `npm run build`.

---

## 📁 Project Structure (high level)

```
src/
├── API/              # axios wrappers, one file per backend domain (auth, cart, orders, wishlist, ...)
├── components/       # feature components (Product, Navbar, UnifiedCheckout, OrderHistory, ...)
├── Context/          # ToastContext, LandingpageContext
├── pages/            # route-level page components, one per URL
├── UI/               # small shared presentational components (cards, breadcrumbs, dividers)
└── utils/            # cloudinaryImages (image optimization), analytics (GA4), authCookie
scripts/
└── generate-sitemap.mjs   # runs after every build, regenerates dist/sitemap.xml
```

---

## 🚀 Deployment

Production builds are deployed to a self-hosted VPS: nginx serves the static `dist/` output directly, with Cloudflare sitting in front for CDN/SSL/DDoS protection. There is no serverless/Vercel deployment for this repo — only the separate admin dashboard repo is on Vercel.
