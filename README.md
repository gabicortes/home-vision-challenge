# Home Vision Challenge

This project is my submission for the Home Vision frontend challenge.

The goal is to present house listings with a clean and performant user experience, including progressive data loading and filtering.

## What I built

- Responsive UI that adapts from mobile to desktop layouts.
- Infinite scrolling using an `IntersectionObserver` sentinel.
- Price range filter (min/max) with debounced input updates.
- Loading, retry, error, and empty-state handling for a smoother UX.

## Main technical decisions

### Custom components for the challenge

For this challenge, I intentionally built my own UI components (`AppHeader`, `Card`, `CardGrid`, `PriceFilter`) instead of relying on a component kit.

I made this choice to show:

- component architecture and separation of concerns
- styling consistency and responsive behavior
- accessibility basics (labels, alt text, button states, focus states)

### Thoughts on shadcn/ui

I am also very open to using [shadcn/ui](https://ui.shadcn.com/) in a production environment.

I think it is a solid library because:

- it provides accessible and well-structured primitives
- it speeds up development without forcing a rigid design system
- it keeps control in the project (components are copied into the codebase)
- it integrates very well with Tailwind for custom branding/themes

So for this challenge I chose custom components to demonstrate core frontend skills, but in a real product context I would absolutely consider shadcn/ui to move faster while keeping quality high.

### Design system with tokens (why this is scalable)

I also structured styles with design-token thinking (colors, spacing, typography, radius, shadows) so visual decisions can be reused consistently instead of being redefined component by component.

Why this helps:

- **Consistency at scale**: shared tokens keep pages and components visually aligned.
- **Faster development**: teams reuse the same values rather than debating new ones every time.
- **Simpler maintenance**: updating one token can propagate safely through many components.
- **Theme support**: tokens make dark mode, branding changes, and white-label variants easier.
- **Better collaboration**: design and engineering share a common language (`primary-600`, `space-4`, etc.).

How it scales over time:

1. **Foundation tokens**
   - raw values (e.g. color palette, spacing steps, font sizes).
2. **Semantic tokens**
   - usage-based names (e.g. `text-primary`, `surface-muted`, `border-subtle`) independent from raw color names.
3. **Component tokens**
   - local mappings for each component (card, button, input), so components evolve without breaking the whole system.

With this approach, the UI can grow from a challenge-size app to a larger product with multiple screens and teams, while preserving coherence and reducing redesign/rework costs.

## Tech stack

- React + TypeScript
- Vite
- Tailwind CSS
- TanStack Query
- Vitest + Testing Library

## Running locally

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` - start local dev server
- `npm run build` - type-check + production build
- `npm run test` - run tests once
- `npm run test:watch` - run tests in watch mode
- `npm run lint` - run ESLint

## What can be improved

If I had more time, these are the improvements I would prioritize:

1. **Server-side filtering/search support in the API**
   - Right now price filtering is done on the client against loaded pages.
   - Better approach: support query params like `min_price`, `max_price`, and maybe `search`.
   - This would reduce data transfer, improve performance, and return more accurate results across the full dataset.

2. **Sorting and richer search**
   - Add sort options (price ascending/descending).
   - Add text search by address/homeowner (ideally API-backed for scale).

3. **Caching and stale-data strategy**
   - Tune TanStack Query cache/stale times based on expected data update frequency.
   - Improve perceived speed on repeated visits.

4. **Stronger integration tests**
   - Add more end-to-end UI flow tests for loading, retry, and infinite-scroll edge cases.

5. **Image/performance optimization**
   - Use smaller/responsive image variants if available from the API.
   - Consider additional optimization around large image assets.

## Notes

- The interface is fully responsive.
- Infinite scrolling is implemented and automatically loads the next pages.
- Price filtering (min/max) is included as an extra feature.
