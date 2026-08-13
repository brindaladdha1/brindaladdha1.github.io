# Brinda Laddha — Portfolio

A single-page portfolio site built with plain HTML/CSS/JS, styled in a navy-and-blue theme and modeled on the layout of [alliajagbe.github.io](https://alliajagbe.github.io).

## Files

- `index.html` — page structure
- `styles.css` — blue color theme and layout
- `content.js` — all of Brinda's resume content (edit this to update text)
- `script.js` — renders content.js into the page, tab switching, mobile nav
- `assets/` — headshot image and resume PDF

## Before you deploy

This project references two files at the repo root:

1. **`Brinda_Laddha.jpeg`** — your headshot photo
2. **`Brinda Laddha- FInal Resume 8.6.pdf`** — your resume PDF (powers the "Resume" button)

Make sure both are uploaded with those exact names, or update the paths in `index.html` to match whatever filenames you use.

## Deploy to GitHub Pages

1. Create a new GitHub repo named `<your-username>.github.io` (or any repo name if you don't mind a `/repo-name` URL suffix).
2. Push these files to the repo's `main` branch:
   ```
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**, set the source branch to `main` and folder to `/ (root)`.
4. Your site will be live at `https://<your-username>.github.io` within a few minutes.

## Customizing

- **Colors:** all theme colors live at the top of `styles.css` under `:root` (`--blue`, `--navy`, etc.) — change these to retint the whole site.
- **Content:** everything text-based (experience, projects, leadership, skills) lives in `content.js` as a single data object — no need to touch the HTML to update wording.
- **Sections:** section order/titles are set in `index.html`; each section has a numbered heading (`01.`–`06.`) matching the nav links.
