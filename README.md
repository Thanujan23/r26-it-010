# R26-IT-010 — Project website

Static website for the SLIIT final-year research project
**AI-Based Electricity Demand Intelligence System for Sri Lanka** (R26-IT-010).

Plain HTML, CSS and vanilla JavaScript. There is no build step and nothing to install:
open `index.html` in a browser to preview it.

```
index.html              page structure and the Domain section text
assets/css/style.css    all styling
assets/js/data.js       ALL editable content (edit this file)
assets/js/main.js       renders data.js into the page; tabs, search, forms
assets/img/             optimised images (member photos go here)
documents/              PDFs served from the site, one folder per milestone
assets/img/thumbs/      page-1 thumbnails of those PDFs
vercel.json             optional response headers (safe to delete)
```

## Updating content: edit `assets/js/data.js`

Everything that changes during the project lives in `assets/js/data.js`. You do not need to touch the HTML.

| To change | Edit in `data.js` |
|---|---|
| Title, abstract, stat strip, GitHub link | `project` |
| Supervisor / co-supervisor name, affiliation, email | `supervisors` |
| Member name, ID, email, photo, component, summary | `members` |
| Milestone date, marks, status, description | `milestones` |
| Documents (one entry per file) | `documents` |
| Slide decks and presentation blocks | `presentations`, `presentationBlocks` |
| Group email, phone, address, email template | `contact` |

Rules of thumb:

- Keep the quotes and the trailing commas exactly as they are. If the page goes blank after an edit, a quote or comma is missing: open the browser console (F12) to see the line number.
- **Status values** are fixed words: files use `"Submitted"`, `"Draft"` or `"Pending"`.
- Unknown milestone dates or marks stay as `"TBA"`.
- Search for `TODO:` in the file to find every value that still needs a real answer. Delete the `// TODO:` comment once it is filled in.
- To add another presentation or document, copy an existing `{ ... }` block, paste it after the previous one, and edit it.

The Domain section (literature survey, research gap, problem, objectives, methodology, technologies) is prose, so it is written directly in `index.html` inside `<section id="domain">`.

### Member photos

1. Crop each photo square, resize to about 400 × 400 px and export as WebP or JPG **under 200 KB** (for example with https://squoosh.app).
2. Save it in `assets/img/`, for example `assets/img/thanujan.webp`.
3. Set `photo: "assets/img/thanujan.webp"` for that member in `data.js`.

Until a photo is set, the card shows the member's initials.

## Adding or replacing a document or slide deck

Each file shown on the site is one entry in `documents` (reports, checklists, logbook) or `presentations` (slide decks) in `data.js`. The Documents section shows both lists; the Presentations section shows only the decks.

```js
{
  milestone: "final",                       // registration, proposal, pp1, pp2, paper, final, checklist, logbook
  title: "Final Report — Explainable AI",
  owner: "Madushani R.P", id: "IT22273062", // id: "" for group files
  type: "Report", format: "PDF",            // type: Report, Slides, Checklist or Logbook
  date: "2026-11-02", size: "1.2 MB", pages: 60,
  status: "Submitted",                      // Submitted, Draft or Pending
  url: "documents/final/report-IT22273062-madushani.pdf",
  thumb: "assets/img/thumbs/final-report-IT22273062-madushani.webp"
}
```

To publish a file:

1. Save it as PDF and copy it to `documents/<milestone>/<type>-<ID or group>-<name>.pdf`, e.g. `documents/final/report-group-final-report.pdf`. Export `.pptx` and `.docx` to PDF first (File → Export) so they open in the browser.
2. Make the thumbnail: a WebP of page 1, about 360 px wide and under 40 KB, saved in `assets/img/thumbs/`. Any image tool works; with Python (`pip install pymupdf pillow`):
   ```bash
   python -c "import pymupdf,sys; p=pymupdf.open(sys.argv[1])[0]; p.get_pixmap(matrix=pymupdf.Matrix(360/p.rect.width,360/p.rect.width)).pil_save(sys.argv[2], quality=70)" documents/final/report-group-final-report.pdf assets/img/thumbs/final-report-group-final-report.webp
   ```
3. Find the matching `Pending` entry in `data.js` (or copy an existing entry), set `status: "Submitted"` and fill in `format`, `date`, `size`, `pages`, `url` and `thumb`.

Notes:

- **Pending** entries need only `milestone`, `title`, `owner`, `id`, `type` and `status`; they show as greyed cards.
- **Draft** shows an amber "Draft" badge. Replace the file and switch to `"Submitted"` when the final version is in.
- **Large files** (anything that would take the site near 18 MB) stay on SharePoint / OneDrive. Set `url` to the full `https://` share link, or to `"LINK_NEEDED"` until you have it; the card then says "Link needed".
- **Milestone status is automatic.** A milestone in the drop-down becomes "Completed" as soon as one file with the same `milestone` key has `status: "Submitted"`. Viva and Website have no files; add `status: "Completed"` to them in `milestones` when they are done.
- `site-assets/` (the raw SharePoint download) is listed in `.gitignore` and is never deployed.

## Size limit: 20 MB

The CDAP guideline limits the deployed site to 20 MB. The pages themselves are well under 1 MB; nearly all of the budget is the PDFs in `documents/`.

- Images: at most about 200 KB each, WebP or optimised JPG.
- Do not copy large PDFs or PPTX files into `documents/`; link them from SharePoint / OneDrive.
- Check the size before each deploy:
  - Windows PowerShell: `"{0:N2} MB" -f ((Get-ChildItem -Recurse -File | Measure-Object Length -Sum).Sum / 1MB)`
  - macOS / Linux / Git Bash: `du -sh --exclude=.git .`

## Deploying to Vercel

### 1. Put the site on GitHub

Create a new, empty repository on github.com (no README, no .gitignore), then in this folder:

```bash
git init
git add .
git commit -m "Project website for R26-IT-010"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

### 2. Import it in Vercel

1. Go to https://vercel.com and sign in with GitHub.
2. **Add New… → Project**, then **Import** the repository.
3. Set **Framework Preset** to **Other**. Leave Build Command and Output Directory empty; the root directory stays `./`.
4. Click **Deploy**. The site is live at `https://<project-name>.vercel.app` in under a minute.

### Updating the live site

Edit `data.js`, then:

```bash
git add .
git commit -m "Update milestones and document links"
git push
```

Vercel redeploys automatically on every push to `main`.

`vercel.json` only sets a few response headers (short image caching, no stale CSS/JS). A static site does not need it, so it can be deleted without affecting the deployment.
