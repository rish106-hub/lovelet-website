# LoveLet — Marketing Website 🌐

> Pre-launch landing page for **LoveLet** — the widget-first iOS app for couples.
>
> Built with vanilla HTML, CSS, and JavaScript. Zero dependencies. Zero build step.

[![Status](https://img.shields.io/badge/status-live-brightgreen?style=flat-square)]()
[![HTML](https://img.shields.io/badge/html5-E34F26?style=flat-square&logo=html5&logoColor=white)]()
[![CSS](https://img.shields.io/badge/css3-1572B6?style=flat-square&logo=css3&logoColor=white)]()
[![JS](https://img.shields.io/badge/javascript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)]()

---

## What's on the page

| Section | Description |
|---|---|
| **Preloader** | Typewriter animation → dramatic curtain reveal |
| **Hero** | Big headline, floating iPhone mockup with live moment cycling, animated clouds |
| **Marquee** | Infinite-scroll feature keywords strip |
| **The Deal** | 3-column feature cards with fishhook SVG arrows between them |
| **How it Works** | Dark-bg step-by-step guide with S-curve arrow connectors |
| **Vibe Check** | Bento-grid of testimonials, illustrations, stats, and feature list |
| **Pre-registration** | Email capture form with loading/success states |
| **Footer** | Minimal — clean |

---

## Design Details

### Fonts
- **Headings:** [Syne](https://fonts.google.com/specimen/Syne) — geometric, bold, confident
- **Body:** [DM Sans](https://fonts.google.com/specimen/DM+Sans) — clean, modern, readable
- Both served via Google Fonts

### Colour Palette
| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#F0EBE3` | Warm cream background |
| `--bg-dark` | `#0F0A1A` | Dark sections (How it Works, Register, Footer) |
| `--purple` | `#6D28D9` | Primary accent — buttons, arrows, tags |
| `--purple-soft` | `#EDE9FE` | Soft purple backgrounds |
| `--amber` | `#F59E0B` | Secondary accent — stickers, between-arrows |
| `--coral` | `#FB7185` | Error states, preloader gradient pop |
| `--cream` | `#F9F5EE` | Light text on dark backgrounds |

### Gen-Z Design Elements
- Fishhook / S-curve SVG arrows with draw-on animation (stroke-dashoffset)
- Pure CSS animated floating clouds (on hero + dark sections)
- Custom smooth-follow cursor with expand-on-hover
- Click sparkle (✦) effect
- Rotated sticker badges
- Infinite marquee strip (pauses on hover)
- Bento-style asymmetric grid
- iPhone mockup — pure CSS (no images)
- Moment cycling animation in iPhone mockup

---

## File Structure

```
lovelet-website/
├── index.html      # All markup — semantic HTML5, ARIA labels
├── style.css       # All styles — custom properties, responsive, animations
└── app.js          # All interactions — preloader, cursor, reveal, form, etc.
```

No npm. No bundler. No framework. Just files.

---

## Local Development

```bash
# Clone
git clone https://github.com/rish106-hub/lovelet-website.git
cd lovelet-website

# Open in browser — any static server works
npx serve .
# or
python3 -m http.server 3000
# or just open index.html directly in a browser
open index.html
```

---

## Email Capture Integration

The pre-registration form is wired to work out of the box with **any POST endpoint**. Currently it simulates submission for demo purposes.

To connect to a real service:

### Option A — Formspree (recommended, free tier available)
1. Create an account at [formspree.io](https://formspree.io)
2. Create a new form → copy the form ID
3. In `app.js`, replace `simulateSubmit(1600)` with:

```js
const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
  body: JSON.stringify({ email }),
});
if (!res.ok) throw new Error('submission failed');
```

### Option B — Mailchimp
Replace the fetch URL with your Mailchimp list's POST action URL.

### Option C — Custom backend
Replace with any POST endpoint that accepts `{ email: string }`.

---

## Deployment

The site is pure static — deploy anywhere:

| Platform | Command |
|---|---|
| **Vercel** | `vercel --prod` or drag-and-drop in the dashboard |
| **Netlify** | Drag the folder into [netlify.com/drop](https://netlify.com/drop) |
| **GitHub Pages** | Push to `main` → enable Pages in repo settings |
| **Cloudflare Pages** | Connect repo → build command: *(none)* · output: `/` |

---

## Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| `> 1024px` | Full desktop — 2-col hero, 3-col bento grid, arrows visible |
| `768–1024px` | Tablet — 2-col bento, single-col feature cards, arrows hidden |
| `< 768px` | Mobile — stacked hero (phone on top), single-col everything, simplified cursor |
| `< 400px` | Small mobile — reduced iPhone size, widget badge hidden |

---

## Accessibility

- Semantic HTML5 elements throughout (`<nav>`, `<main>`, `<section>`, `<footer>`, etc.)
- All decorative elements marked `aria-hidden="true"`
- Form inputs have labels (`.sr-only` for visual cleanliness)
- `aria-live` regions for form error and success states
- `prefers-reduced-motion` media query disables all animations for users who prefer it
- Custom cursor is disabled on touch/mobile devices automatically
- Colour contrast meets WCAG AA for all text/background combinations

---

## Browser Support

| Browser | Support |
|---|---|
| Chrome 90+ | ✅ |
| Safari 15+ | ✅ |
| Firefox 90+ | ✅ |
| Edge 90+ | ✅ |
| IE | ❌ Not supported |

---

## Related

- [LoveLet iOS App](https://github.com/rish106-hub/idea) — the SwiftUI + WidgetKit app
- [LoveLet Waitlist](https://lovelet.app) *(coming soon)*

---

## License

Private and proprietary. All rights reserved © 2025 LoveLet.
