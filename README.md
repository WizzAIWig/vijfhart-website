# Vijfhart Website

Modern Next.js 14 website voor Vijfhart IT Opleidingen.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **CMS:** Drupal 10 Headless (planned)
- **Backend:** BASZ Platform (planned)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/              # Next.js App Router
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Homepage
│   └── globals.css   # Vijfhart brand colors
├── components/
│   └── layout/       # Header, Footer
├── config/
│   ├── site.ts       # Site configuration
│   └── theme.ts      # Brand colors
└── lib/
    ├── basz-client.ts    # BASZ API (placeholder)
    └── drupal-client.ts  # Drupal API (placeholder)
```

## Brand Colors

- **Primary:** #1E3A5F (Deep Blue)
- **Secondary:** #4A90A4 (Teal)
- **Accent:** #F5A623 (Orange)

## Development

```bash
npm run dev      # Development server
npm run build    # Production build
npm run lint     # ESLint
```

---

Built for Vijfhart IT Opleidingen
