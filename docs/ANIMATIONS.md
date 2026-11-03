# TK Muzenda Properties — Animation & Motion System Specification

This document details the motion design tokens, scroll-reveal mechanics, micro-interactions, hardware-acceleration techniques, and accessibility safeguards implemented across **TK Muzenda Properties**.

---

## 1. Motion Design Philosophy

In luxury real estate design, motion must communicate **refinement, stability, and calm**.
- **No Disorienting Motion**: Transitions avoid bouncy, cartoonish physics in favor of weighted, architectural easing curves.
- **Hardware-Accelerated**: Transforms strictly utilize GPU compositor layers (`opacity`, `transform: translate3d/scale`) to guarantee 60fps performance on mobile and desktop devices.
- **Accessible & Respectful**: Built-in support for users who have requested reduced motion at the OS level.

---

## 2. Centralized Motion Tokens

All motion durations and cubic-bezier easing curves are centralized in [`src/app/globals.css`](../src/app/globals.css):

```css
:root {
  /* Duration Tokens */
  --duration-micro: 180ms;   /* Button clicks, tag hovers, toggle states */
  --duration-ui: 240ms;      /* Dropdown menus, mobile drawers */
  --duration-reveal: 600ms;  /* Scroll section reveals, card entries */
  --duration-image: 850ms;   /* Lightbox modals, image zoom transitions */
  --duration-hero: 1100ms;   /* Initial hero image curtain reveal */

  /* Easing Curves */
  --ease-architectural: cubic-bezier(0.16, 1, 0.3, 1); /* Rapid start, smooth architectural deceleration */
  --ease-curtain: cubic-bezier(0.25, 1, 0.5, 1);      /* Image mask wiping */
  --ease-in-out-smooth: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring-gentle: cubic-bezier(0.34, 1.25, 0.64, 1);
}
```

---

## 3. Core Interaction Animations

### 3.1 Hero Image Curtain Reveal
- **Effect**: On page load, the main hero image scales gently from `1.05` to `1.0` while wiping vertically into view over `1100ms`.
- **CSS Definition**:
  ```css
  @keyframes heroReveal {
    from {
      opacity: 0;
      transform: scale(1.06);
      clip-path: inset(0 0 100% 0);
    }
    to {
      opacity: 1;
      transform: scale(1);
      clip-path: inset(0 0 0% 0);
    }
  }
  ```

### 3.2 Property Card Hover Micro-interaction
- **Effect**: When a user hovers over a property card in the listing grid, the image smoothly zooms by 5% and reveals a dark gradient scrim with an "Explore Residence" prompt.
- **Tailwind Classes**:
  ```html
  <div class="group relative overflow-hidden rounded-xl">
    <img class="transition-transform duration-500 ease-out group-hover:scale-105" ... />
    <div class="absolute inset-0 bg-gradient-to-t from-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </div>
  ```

### 3.3 Scroll-Triggered Section Reveals (`ScrollReveal`)
The [`ScrollReveal`](../src/components/ui/ScrollReveal.tsx) component wraps any section or card element to trigger an entry reveal once it enters the viewport:
```tsx
import ScrollReveal from '@/components/ui/ScrollReveal';

<ScrollReveal direction="up" delay={150} duration={600}>
  <div className="card">...</div>
</ScrollReveal>
```

Supported directions:
- `up`: Translates from `+20px` to `0` with fade-in.
- `down`: Translates from `-20px` to `0` with fade-in.
- `left`: Translates horizontally from `-20px` to `0`.
- `right`: Translates horizontally from `+20px` to `0`.
- `curtain`: Vertical clip-path reveal.
- `fade`: Pure opacity dissolve.

---

## 4. Accessibility: Reduced-Motion Support

TK Muzenda Properties respects the user's operating system preferences via two layers of protection:

### Layer 1: CSS Global Override
In `src/app/globals.css`:
```css
@media (prefers-reduced-motion: reduce) {
  *,
  ::before,
  ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Layer 2: JavaScript Observer Guard
In `ScrollReveal.tsx` and interactive charts:
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  requestAnimationFrame(() => setIsVisible(true));
  return;
}
```

---

## 5. How to Tune or Disable Animations

- **Global Speed Adjustment**: Modify `--duration-reveal` or `--duration-image` in `src/app/globals.css`.
- **Per-Component Disabling**: Set `duration={0}` on `<ScrollReveal>` instances or remove the wrapper component.
- **Test in Real-Time**: Run the application locally and inspect transitions on the landing, service, project, product, and accommodation routes.
