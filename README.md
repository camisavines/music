# DJ Neva Misa Beat — Portfolio & Booking App

A modern, fully responsive DJ booking and portfolio web application built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## Features

- **Hero section** — Waveform visualizer, stats, animated glows, CTA
- **Events Gallery** — Filterable grid with category badges, metadata, hover overlays
- **Gear Section** — Interactive breakdown of DJ hardware/software by category
- **Apple Music Playlists** — Embedded players per vibe/genre with filter tabs
- **Booking Form** — React Hook Form + Zod validation, all required fields, loading states, success/error toasts
- **Email Notifications** — Styled HTML emails via **Resend** to both the DJ and the client
- **SMS Alerts** — Instant text to the DJ via **Twilio** on new inquiry

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy env template and fill in your keys
cp .env.example .env.local

# 3. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Copy `.env.example` → `.env.local` and populate:

| Variable              | Description                                      |
|-----------------------|--------------------------------------------------|
| `RESEND_API_KEY`      | Your Resend API key (from resend.com)            |
| `TWILIO_ACCOUNT_SID`  | Twilio Account SID                               |
| `TWILIO_AUTH_TOKEN`   | Twilio Auth Token                                |
| `TWILIO_PHONE_NUMBER` | Twilio sending number (E.164 format)             |
| `DJ_EMAIL`            | DJ's email — receives booking notifications      |
| `DJ_PHONE_NUMBER`     | DJ's mobile — receives SMS alerts (E.164 format) |

> The app degrades gracefully: if Twilio/Resend keys are absent, the booking still succeeds and warnings are logged server-side.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout, fonts, Toaster
│   ├── page.tsx              # Home page (composes all sections)
│   ├── globals.css           # Tailwind base + custom utilities
│   └── api/
│       └── booking/
│           └── route.ts      # POST /api/booking — email + SMS
├── components/
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   └── Textarea.tsx
│   └── sections/
│       ├── HeroSection.tsx
│       ├── EventsSection.tsx
│       ├── GearSection.tsx
│       ├── PlaylistsSection.tsx
│       └── BookingSection.tsx
└── lib/
    ├── utils.ts              # cn() helper
    ├── booking-schema.ts     # Zod validation schema
    └── email-templates.ts    # HTML email templates
```

---

## Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Framework    | Next.js 15 (App Router)             |
| Language     | TypeScript                          |
| Styling      | Tailwind CSS 3                      |
| Animation    | Framer Motion                       |
| Forms        | React Hook Form + Zod               |
| Email        | Resend (REST API)                   |
| SMS          | Twilio (REST API)                   |
| Icons        | Lucide React                        |
| Toasts       | Sonner                              |

---

## Deployment

Deploy to [Vercel](https://vercel.com) with zero config — just add your environment variables in the project settings.

```bash
npm run build   # Verify production build
```
