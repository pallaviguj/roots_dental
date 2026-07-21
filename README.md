# Roots Dental Speciality Clinic Website

Marketing site for Roots Dental Speciality Clinic: homepage, services, blog, and appointment booking.

## Quick start

```bash
npm install
npm run build        # output → dist/
npm run dev          # webpack dev server
```

Serve `dist/` (or use `npm run dev`) and open the site locally.

## Key links

| What | URL / path |
|------|------------|
| Sanity Studio (blog & services CMS) | [https://rootsdentalspeciality.sanity.studio/](https://rootsdentalspeciality.sanity.studio/) |
| Sanity project ID | `0i5dsfwt` (dataset: `production`) |
| Sanity manage / invite editors | [sanity.io/manage](https://www.sanity.io/manage) |
| Booking setup | [`BOOKING_SETUP.md`](BOOKING_SETUP.md) |
| Sanity setup notes | [`SANITY_QUICK_START.md`](SANITY_QUICK_START.md) |

Invite non-technical editors in Sanity → Members (**Editor** role), then share the Studio URL only.

Studio includes the **Media** tool for bulk image upload. On a Service’s **Gallery images** field, use **Select uploaded images** to multi-select and attach many at once.

## Project layout

```
├── index.html, blog.html, service.html, …
├── css/                 # modular styles (entry: css/main.css)
├── js/
│   ├── config.js        # site copy, contact, fallback services
│   ├── main.js          # homepage wiring
│   ├── booking.js       # appointment modal → booking API
│   ├── sanity-client.js # Sanity fetch helpers
│   └── …
├── server/              # Google Calendar booking API
├── studio-roots-dental-speciality-clinic/  # Sanity Studio source
├── images/
└── dist/                # production build (generated)
```

## Updating content

- **Phone, email, hours, hero stats, facility images:** edit `js/config.js`, then rebuild.
- **Blog posts & CMS services:** [Sanity Studio](https://rootsdentalspeciality.sanity.studio/) → create/edit → **Publish**.
- **Colors / spacing:** `css/variables.css`.
- **Booking calendar ID / hours:** `server/config.js` (see `BOOKING_SETUP.md`).

Config services in `js/config.js` are a fallback if Sanity returns nothing.

## Appointment booking

Custom form → Node/Express API → Google Calendar.

```bash
cd server
npm install
npm start    # default http://localhost:3000
```

Frontend booking API URL is set in `js/booking.js` (`BOOKING_API`). Point it at your live API for production.

## Deploy

```bash
npm run build
npx surge dist rootsdental-source.surge.sh
```

Upload `dist/` to any static host (cPanel, Netlify, etc.). Keep `server/` running separately for live booking.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run build` | Production webpack build |
| `npm run dev` | Dev server with hot reload |
| `npm run watch` | Rebuild on change |
| `npm run clean` | Remove `dist/` |

Studio deploy (from `studio-roots-dental-speciality-clinic/`):

```bash
npm install
npm run deploy
```

---

© 2026 Roots Dental Speciality Clinic. All rights reserved.
