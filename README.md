# Capital Tours — Deploy & Run

This repository contains the Capital Tours frontend (Vite + React + Tailwind).

Quick local commands

Install dependencies:
```bash
npm ci
```

Run dev server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

Deploy to GitHub

1. Create a repository on GitHub (or use the `gh` CLI):

```bash
gh repo create <owner>/<repo> --public --source=. --remote=origin --push
```

Or add a remote manually and push:

```bash
git remote add origin https://github.com/<owner>/<repo>.git
git branch -M main
git add .
git commit -m "chore: initial commit"
git push -u origin main
```

2. The project contains a GitHub Actions workflow `.github/workflows/deploy.yml` that builds the site and deploys the `dist` folder to GitHub Pages on pushes to `main`/`master`.

3. After the first push, check Actions: https://github.com/<owner>/<repo>/actions. The Pages site will be available at `https://<owner>.github.io/<repo>/` once deployment completes.

Notes

- The Vite build output directory is `dist` (default). The workflow uploads `dist` and deploys it with the official Pages action.
- If you prefer a different hosting (Netlify, Vercel), I can add configuration for that.
