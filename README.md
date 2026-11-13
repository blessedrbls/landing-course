# Python з нуля за 8 тижнів — course landing page

A responsive, bilingual landing page for a fictional online course "Python from Scratch in 8 Weeks". Built as a portfolio demo with plain HTML, CSS and JavaScript — no frameworks, no build step, no server.

> **Demo project.** The course, instructor, prices and reviews are fictional.

## Live demo

https://blessedrbls.github.io/landing-course/

## Demo video

A 48-second walkthrough of the page and its animations (1920×1080, 60 fps): [video/pystart-demo-1080p60.mp4](video/pystart-demo-1080p60.mp4)

## Features

- **Two languages** — English (default) and Ukrainian, switchable in the header; the choice is remembered in `localStorage`. All texts live in one `I18N` object in `script.js`.
- **Countdown timer** to the course start. The date is set in a single variable (`COURSE_START` at the top of `script.js`); the hero badge is derived from it.
- **Fully responsive** layout with a mobile burger menu.
- **Accordions** for the 8-week curriculum and the FAQ, keyboard accessible (`aria-expanded`, `aria-controls`).
- **Pricing** with three plans; the middle one is highlighted as the most popular. "Choose plan" buttons pre-select the plan in the form.
- **Signup form** with client-side validation (name, email, phone, plan), localized error messages and a success state. No data is sent anywhere — see the comment in the `submit` handler in `script.js` for where to connect a backend.
- **Extra sections**: how the course works (4 steps) and a showcase of student projects with CSS-only mock-ups.
- **Interactive details**: self-typing code in the hero, count-up stats, reading progress bar, active nav link, a program timeline that fills on scroll, a full / two-part payment toggle, cursor glow on cards.
- **Scroll reveal animations** via `IntersectionObserver`, disabled for users with `prefers-reduced-motion`.
- Light design with an animated aurora (northern lights) background, frosted-glass cards, a bento grid, a dark code window and a running-line strip.

## Tech stack

- HTML5
- CSS3 (custom properties, Grid, Flexbox, `clamp()`)
- Vanilla JavaScript (ES2018+)
- [Google Fonts](https://fonts.google.com/): Geologica, Onest, JetBrains Mono

## Project structure

```
index.html     markup
style.css      styles
script.js      texts (uk / en) and all logic
images/        teacher photo and favicon
video/         demo recording of the page
```

## How to run

No installation needed — open `index.html` in a browser.

Or serve the folder locally:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

To change the course start date, edit `COURSE_START` in `script.js`.

## Image credits

- `images/teacher.jpg` — photo by [Joseph Gonzalez](https://unsplash.com/@miracletwentyone) on [Unsplash](https://unsplash.com/photos/iFgRcqHznqg), free to use under the [Unsplash License](https://unsplash.com/license). The person in the photo is not affiliated with this project.
- `images/favicon.svg`, all icons and the hero illustration — hand-written SVG / HTML & CSS made for this project.

---

Need a website like this? Contact me on Telegram: @nonelyyo
