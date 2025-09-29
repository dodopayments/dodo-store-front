# Contributing to Dodo Payments Storefront

Thanks for your interest in contributing! This document outlines how to set up your environment, coding standards, and how to submit changes.

## Development Setup

1. Install Node.js 20+ and npm 10+
2. Install dependencies

```bash
npm install
```

3. Start the dev server

```bash
npm run dev
```

Open http://localhost:3000

## Tech & Conventions

- Next.js App Router, React Server Components preferred
- TypeScript everywhere; prefer interfaces over types
- shadcn/ui + Radix UI + Tailwind CSS for UI
- Descriptive variable names with auxiliary verbs (e.g., `isLoading`, `hasError`)
- Functional, declarative patterns; avoid classes
- Avoid unnecessary client components and effects; use Suspense and streaming where possible

### Code Style

- Match existing formatting; run `npm run lint` locally
- Prefer early returns, small pure functions, and narrow component props
- No enums; use objects/maps
- Organize files: exported component first, subcomponents, helpers, types

## Branching & Commits

- Create feature branches: `feature/<short-desc>` or `fix/<short-desc>`
- Write clear commit messages in the imperative mood
- Keep PRs focused and reasonably small

## Tests

- Include tests or add clear reasoning if not applicable
- For UI, include screenshots or short videos in the PR when changes are visible

## Pull Requests

- Fill out the PR template
- Link related issues: `Closes #123`
- Ensure CI passes and the app builds locally: `npm run build`

## Security

Please report vulnerabilities via the process in [`SECURITY.md`](SECURITY.md). Do not open a public issue for security reports.

## Inspiration

We take structural and DX inspiration from the Billing SDK project: [dodopayments/billingsdk](https://github.com/dodopayments/billingsdk).


