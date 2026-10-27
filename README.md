# BiteBox: React Food Ordering (portfolio demo)

A premium, responsive food-ordering front end built with React, Vite and React Router.
**Frontend demo only:** no backend, no real orders, no payments, no delivery.

## Run it
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build
```
Requires Node.js 18+.

## IMPORTANT: add your hero video
The homepage hero plays a local MP4. Put your file here (exact name):

```
public/videos/hero.mp4
```
Until it exists the hero shows a photo fallback (with a slow zoom), so nothing looks broken.
See `public/videos/README.txt` for free sources (Mixkit / Pexels) and an ffmpeg command that
compresses a clip to a web-friendly size (aim for 6-12 s, about 1280px wide, no audio, under ~3 MB).
To use another name or path, change `HERO_VIDEO` in `src/components/Hero.jsx`.

## What's inside
- Cinematic video hero (muted, looping, playsInline, pause button, reduced-motion aware, photo fallback)
- Dark/light theme toggle (remembered), scroll progress bar, back-to-top, add-to-cart toast
- 33 dishes in 11 categories, search / category filter / sort, quick-view modal, skeleton loading
- Deals, Build-Your-Meal, testimonial slider, live countdown, animated counters, newsletter promo
- Cart (localStorage), checkout validation with simulated confirmation, About and Contact pages

## Structure
```
src/
  components/  Navbar, Hero, Marquee, MenuBrowser, FoodCard, QuickView, HomeSections, Toast, ScrollUI, ...
  pages/       Home, Menu, Cart, Checkout, About, Contact
  context/     CartContext.jsx (cart + toast + localStorage)
  hooks/       useInView.js (IntersectionObserver), useTheme.js
  data/        foods.js (menu, categories, reviews, stats)
```
Food photos load from Unsplash URLs; if one fails, a built-in placeholder is shown.
Reviews, statistics, contact details and the countdown are sample/demo content.
