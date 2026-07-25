# Bilal Asif Portfolio - Working Guide

## Goal

Build a premium, minimal freelancer portfolio for Bilal Asif that helps small
business owners hire him for websites, ecommerce, SEO, paid ads, branding and
automation. The primary market is the USA, followed by Europe.

## Communication And Speed

- The user prefers short Roman Urdu / English replies.
- For small UI requests, inspect only the relevant code and patch directly.
- Do not redesign unrelated sections or reopen settled design decisions.
- Do not ask for confirmation when the requested change is clear.
- Use `apply_patch` for edits.
- Run `npm run build` after React, TypeScript or structural changes. A tiny
  copy/CSS adjustment may be delivered without a full browser review.
- Preserve all unrelated user changes in the working tree.

## Stack And Main Files

- Next.js App Router, TypeScript, Tailwind CSS and Framer Motion.
- Lenis provides smooth scrolling.
- Route pages: `app/*/page.tsx`
- Shared page shell and navigation: `components/site-frame.tsx`
- Page-specific views: `features/portfolio/*-view.tsx`
- Global styling: `app/globals.css`
- Shared animation helpers: `components/motion.tsx`
- Fonts and SEO metadata: `app/layout.tsx`

## Typography

- Body and navigation: Hanken Grotesk.
- Main headings and metric numbers: Bricolage Grotesque.
- Small editorial labels use JetBrains Mono, including:
  `What I Do`, `( The Approach )`, `( FAQ )`, `Get in touch`,
  `( Selected Work )`, `Start Your Project` and
  `Freelance Digital Growth Partner`.
- Petrona italic is used only where the current design already uses its
  editorial serif accent. Do not replace established font styles casually.
- Text must use full readable opacity unless the user explicitly requests a
  muted treatment.

## Visual Direction

- Premium, minimal, editorial and conversion-focused.
- Main palette is clean white and true black, with restrained gray.
- Do not introduce purple gradients, decorative blobs, unnecessary cards or
  rounded containers.
- Project images should stay mostly bright, light and varied in color.
- Project card corners are straight, not rounded.
- Services are full-width rows, not cards.
- Keep mobile layouts fully responsive with no horizontal page overflow.

## Current Route Structure

1. `/` — personal intro with Bilal's portrait.
2. `/growth` — main growth message and primary calls to action.
3. `/projects` — featured work carousel, case studies and metrics.
4. `/services` — black, full-width list with eight expandable services.
5. `/process` — the growth process.
6. `/faq` — black accordion page.
7. `/contact` — final “Ready to grow your business?” contact page.
8. `/packages` — responsive service-package page.

## Navigation

- Show only centered text links: Packages, Projects, Services, Process, FAQ,
  Contact.
- No floating capsule, logo, navbar background or separate contact pill.
- Keep Hanken Grotesk and full opacity.
- Navigation must use page routes, not in-page section anchors.

## Featured Work

- Heading treatment: `( Selected Work )` and `Proof, not promises`.
- White background with black text.
- Preserve the current manually controlled project carousel and its light
  image cards.
- Clicking `Details` opens the existing case-study view.
- Do not add automatic carousel movement, hover scaling or heavy animation.
- Metrics below projects:
  `10+ Projects delivered`, `95+ Avg. Lighthouse score`,
  `4.9/5 Client satisfaction`, `3yrs Digital growth experience`.
- Metrics are centered, borderless, black on white and animate once in view.

## Services

- Black full-width section with eight rows:
  Website Development, Mobile App Development, SEO Services,
  Digital Marketing, Paid Advertising, Email Marketing & Automation,
  Branding & Strategy, UI/UX Design.
- Headings are bold and highly readable.
- Hovering makes the full row white and its content black.
- Clicking a row expands its explanation inside that same white row.
- Only one service is open at a time, and clicking it again closes it.

## FAQ

- Black background, centered narrow content (`max-w-4xl` area).
- No neon accent.
- Current questions:
  `How long does a typical project take?`
  `Can you help my business rank on Google?`
  `Can I mix services across plans?`
  `Who owns the work you produce?`

## Contact Details

- Email: `bilalasif1024@gmail.com`
- WhatsApp: `+923207998854`
- Instagram: `https://www.instagram.com/bilal.asif__/`
- LinkedIn: `https://www.linkedin.com/in/bilal-asif-034272320/`

## Do Not Restore

- Old professional sample-work grid.
- Live website references section.
- Boost-sales graph section.
- Old `Why it works` cards.
- Tool-logo marquee in the main flow.
- Large footer copy listing every tool.
- USA/Europe serving tagline.
- Automatic or sound-enabled project carousel.
