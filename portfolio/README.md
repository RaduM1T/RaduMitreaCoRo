# Radu Mitrea — Portfolio

A portfolio and blog website built with React + Vite, Sanity CMS, and a Liquid Glass × Microsoft Dynamics 365 aesthetic.

## Stack

| Layer       | Technology                    |
|-------------|-------------------------------|
| Frontend    | React 18, Vite 5              |
| Styling     | Tailwind CSS + custom CSS vars|
| Animation   | Framer Motion                 |
| CMS         | Sanity v3                     |
| Contact     | Formspree                     |
| Deploy      | Vercel (frontend), sanity.io (studio) |

---

## Quick Start

### 1. Set up Sanity

```bash
# Go to https://sanity.io and create a new project
# Note your Project ID

cd studio
npm install
cp .env.example .env
# Fill in SANITY_STUDIO_PROJECT_ID in .env

npm run dev     # Opens studio at localhost:3333
npm run deploy  # Deploys studio to your-project.sanity.studio
```

### 2. Configure the frontend

```bash
cd ..
cp .env.example .env
# Fill in:
#   VITE_SANITY_PROJECT_ID   — from Sanity dashboard
#   VITE_SANITY_DATASET      — usually "production"
#   VITE_FORMSPREE_FORM_ID   — from formspree.io (create a free form)

npm install
npm run dev    # Starts at localhost:5173
```

### 3. Add CORS origin in Sanity

In the [Sanity dashboard](https://sanity.io/manage) → your project → **API** → **CORS Origins**:
- Add `http://localhost:5173` (for dev)
- Add your Vercel domain (for production)

---

## Deploy to Vercel (Today)

1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) → **New Project** → import the repo.
3. Set **Root Directory** to `portfolio` (or the repo root if you pushed only the portfolio folder).
4. Add Environment Variables in the Vercel dashboard:
   - `VITE_SANITY_PROJECT_ID`
   - `VITE_SANITY_DATASET`
   - `VITE_FORMSPREE_FORM_ID`
5. Click **Deploy**. Done.

> `vercel.json` is already configured with SPA rewrites and security headers.

---

## Content Model

| Type       | Fields                                                  |
|------------|---------------------------------------------------------|
| `post`     | title, slug, author, mainImage, categories, publishedAt, excerpt, body |
| `author`   | name, slug, image, bio                                  |
| `category` | title, slug, description                                |

---

## Customisation Checklist

- [ ] Update name/email in `Navigation.jsx`, `Footer.jsx`, `About.jsx`, `Contact.jsx`
- [ ] Update social links in `Footer.jsx` and `Contact.jsx`
- [ ] Replace placeholder experience/skills in `About.jsx`
- [ ] Add your author record in Sanity Studio
- [ ] Create your first blog post
- [ ] Add `public/og-image.png` (1200×630) for social previews
