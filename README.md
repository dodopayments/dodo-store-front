# Dodo Payments Storefront

<p align="center">
  <img src="./.github/banner.png" alt="Storefront Banner" width="100%" />

  <div align="center">
    <a href="https://docs.dodopayments.com/features/storefront">
      <img src="https://img.shields.io/badge/docs-live-brightgreen.png" alt="Live Documentation" />
    </a>
    <a href="https://discord.gg/bYqAp4ayYh">
      <img src="https://img.shields.io/discord/1305511580854779984?label=Join%20Discord&logo=discord" alt="Join Discord" />
    </a>
  </div>
</p>

Simple, branded, mobile‑first storefront for selling one‑time and subscription products with Dodo Payments. Built with Next.js App Router, TypeScript, shadcn/ui, Radix UI, and Tailwind CSS.

### Overview

The Storefront lets you publish products from your Dodo Payments dashboard without building a full website. Customers can browse products and purchase via Dodo’s secure checkout.

For full product docs, see the Storefront guide: [docs.dodopayments.com/features/storefront](https://docs.dodopayments.com/features/storefront).

### Key Features

- **Branded storefront**: Store name, logo, and cover image
- **Product segregation**: One‑time vs subscription sections
- **Simple checkout**: "Buy Now" redirects to Dodo checkout
- **Publish/unpublish**: Control what’s visible from the dashboard
- **No extra CMS**: Manage products where you already set pricing and details
- **Mobile‑friendly**: Responsive layout for all devices
- **Test Mode**: Separate test and live storefronts

### Tech Stack

- **Runtime**: Next.js 15 (App Router), React 19
- **Language**: TypeScript
- **UI**: shadcn/ui, Radix UI, Tailwind CSS
- **State/Utils**: Redux Toolkit, zod, date‑fns

---

## Getting Started

1) Install dependencies

```bash
npm install
```

2) Run the dev server

```bash
npm run dev
```

Open http://localhost:3000

### Scripts

- `npm run dev`: Start dev server
- `npm run build`: Create production build
- `npm run start`: Start production server
- `npm run lint`: Lint codebase

---

## Project Structure

Key folders:

- `src/app`: Next.js App Router pages, layouts, and route handlers
- `src/components`: UI components (custom, product, and shadcn‑based primitives)
- `src/lib` and `src/constants`: Utilities and constants
- `public`: Static assets (logos, banners, images)

Example brand assets used in docs/social embeds live under `public/images/brand-assets/`.

---

## Storefront Basics

This repository focuses on the customer‑facing storefront. Product data, pricing, and publish/unpublish are managed in your Dodo Payments dashboard. Customers select quantity and proceed to secure checkout on Dodo. After payment, Dodo shows confirmation and can optionally redirect back to your storefront.

Refer to the Storefront documentation for end‑to‑end setup and merchant workflows: [docs.dodopayments.com/features/storefront](https://docs.dodopayments.com/features/storefront).

---

## Contributing

Contributions are welcome! Please read [`CONTRIBUTING.md`](CONTRIBUTING.md) for local setup, coding style, and pull request guidelines. For issue/PR authoring, use the templates in `.github/`.

We take inspiration for structure and DX from the Billing SDK project: [dodopayments/billingsdk](https://github.com/dodopayments/billingsdk).

---

## Security

If you discover a vulnerability, please review [`SECURITY.md`](SECURITY.md) for our coordinated disclosure process.

---

## License

Licensed under the GPL‑3.0. See [`LICENSE`](LICENSE) for details.

