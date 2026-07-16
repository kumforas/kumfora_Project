# Kumfora - Girls' Hygiene Brand E-commerce

A fully functional Next.js 14 e-commerce storefront for Kumfora, a girls' hygiene brand with 2 pad products (Day & Night).

## Features

- **Full Storefront**: Home, Shop (PLP), Product Detail (PDP), Cart, Checkout, Account
- **Modern Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **State Management**: Zustand for cart persistence
- **Design System**: Custom warm color palette (kumfora-cream, kumfora-terracotta, kumfora-sage, etc.)
- **Accessibility**: Semantic HTML, ARIA labels, focus management, keyboard navigation
- **Responsive**: Mobile-first, works on all screen sizes
- **Performance**: Optimized images, code splitting, minimal bundle

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, trust strip, featured products, about preview, newsletter |
| Shop | `/shop` | Product listing with filters, search, pagination |
| Product Detail | `/product/[slug]` | Gallery, details, specs, reviews, FAQs, related products |
| Cart | `/cart` | Drawer + full page, quantity controls, order summary |
| Checkout | `/checkout` | 3-step (shipping, payment, review), COD + card |
| Account | `/account` | Orders, addresses, payments, wishlist, settings |
| About | `/about` | Mission, values, timeline, team, trust signals |
| Period Guide | `/guide` | First period, cycle tracking, product guide, self-care, myths |
| FAQs | `/faqs` | Categorized, searchable accordion FAQs |
| Contact | `/contact` | Form, quick answers, business hours |

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (main)/            # Route group with shared layout
│   │   ├── layout.tsx     # Header + Footer + CartDrawer
│   │   ├── page.tsx       # Home
│   │   ├── shop/          # Product listing
│   │   ├── product/[slug]/ # Product detail
│   │   ├── cart/          # Shopping cart
│   │   ├── checkout/      # Multi-step checkout
│   │   ├── account/       # User dashboard
│   │   ├── about/         # Brand story
│   │   ├── guide/         # Period education
│   │   ├── faqs/          # FAQs
│   │   └── contact/       # Contact form
│   ├── globals.css        # Tailwind + custom styles
│   └── layout.tsx         # Root layout with fonts
├── components/
│   ├── layout/            # Header, Footer
│   ├── cart/              # CartDrawer
│   ├── product/           # ProductCard, ProductGallery, ProductDetails
│   ├── home/              # Hero, FeaturedProducts, TrustStrip, AboutPreview, Newsletter
│   └── ui/                # Button, Input, Select, Badge
├── lib/
│   ├── store.ts           # Zustand cart store
│   ├── products.ts        # Product data & helpers
│   └── utils.ts           # Formatters, helpers
└── types/
    └── index.ts           # TypeScript interfaces
```

## Customization

### Colors
Edit `tailwind.config.js` → `theme.extend.colors.kumfora` to match your brand.

### Products
Edit `src/lib/products.ts` to add/remove/update products.

### Fonts
Edit `src/app/layout.tsx` to change `Inter` and `Playfair Display` fonts.

## Design Decisions

- **Warm Palette**: Cream, blush, terracotta, sage - approachable for girls/parents
- **Typography**: Playfair Display (display) + Inter (body) - elegant yet readable
- **Cart Drawer**: Slide-in from right, persists via localStorage
- **Checkout**: 3-step wizard with progress indicator
- **Trust Signals**: Prominently displayed (dermatologically tested, biodegradable, free shipping)

## License

Private - Kumfora Brand