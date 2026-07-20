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
- Main page: `app/page.tsx`
- Global styling and stacked scroll behavior: `app/globals.css`
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

## Current Page Structure

1. Personal intro with Bilal's portrait.
2. Main growth hero.
3. Featured Work / project carousel.
4. Animated project metrics.
5. Services: black, full-width list with eight services.
6. The Approach / process.
7. FAQ: black accordion section.
8. Final black contact section and footer.

Packages are not part of the normal page scroll. The centered `Packages`
navigation item opens the existing packages modal.

## Navigation

- Show only centered text links: Services, Projects, Packages, Process,
  Contact.
- No floating capsule, logo, navbar background or separate contact pill.
- Keep Hanken Grotesk and full opacity.

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
- Keep the black section visible at its end while the following white section
  moves over it. This behavior is handled by `StackedScene`, `pinAtEnd` and
  the `.stacked-scene-*` CSS. Change it carefully and do not add scroll snap.

## Stacked Scroll Behavior

- Desktop sections intentionally overlap: the next section rises over the
  previous one while the previous content fades.
- Sections must look like full-page surfaces, not floating cards.
- Do not add automatic scroll settling or snap-to-section behavior.
- Preserve native user control through Lenis.
- Avoid `overflow: hidden` on ancestors of sticky scenes; horizontal clipping
  uses `overflow-x: clip`.
- Keep motion lightweight and respect `prefers-reduced-motion`.

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
- WhatsApp: `+92307998854`
- Instagram: `https://www.instagram.com/bilal.asif__/`
- LinkedIn: `https://www.linkedin.com/in/bilal-asif/`

## Do Not Restore

- Old professional sample-work grid.
- Live website references section.
- Boost-sales graph section.
- Old `Why it works` cards.
- Tool-logo marquee in the main flow.
- Large footer copy listing every tool.
- USA/Europe serving tagline.
- Automatic or sound-enabled project carousel.

