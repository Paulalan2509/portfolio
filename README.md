# Portfolio

Static site: `index.html`, `css/`, `js/`, `assets/`. Hosted on GitHub Pages.

## Change the styles

The page uses a compiled Tailwind stylesheet (`css/tailwind.css`). After you add or change Tailwind classes in `index.html` or `js/`:

```
npm install      # first time only
npm run build    # rebuilds css/tailwind.css
```

Commit the rebuilt `css/tailwind.css` with your change. GitHub Pages serves the committed file; it does not run the build.

Hand-written styles (colours, light theme, animations) are in `css/style.css`.

## Edit your details

Email, phone and the WhatsApp message are at the top of `js/main.js`.
If your site address is not `https://paulalan2509.github.io/`, update the address in the `<head>` of `index.html` (canonical, `og:url`, `og:image`, `twitter:image`).

## Send contact messages directly (Formspree)

1. Create a free account at formspree.io and make a new form that delivers to your email.
2. Copy the form address (it looks like `https://formspree.io/f/abcdwxyz`).
3. Paste it into `FORM_ENDPOINT` at the top of `js/main.js`.

Until you do, the form opens the visitor's email app instead. With the address set, visitors see a confirmation on the page and you receive the message by email.

## Design notes (November 2026 redesign)

- Look: warm cream paper, deep forest green hero and footer, gold accents, large tight Bricolage Grotesque headings with Figtree body text. Fonts are self-hosted in `assets/fonts` (SIL Open Font License).
- Layout comes from Tailwind utilities (`css/tailwind.css`, rebuild with `npm run build`); the look lives in `css/style.css`.
- The light and dark theme switch was removed. The page is a single light theme with a dark hero and footer.
- Work screenshots are in `assets/work/`. Replace them if you change the projects, and point each "View the code on GitHub" link at the right repository once it is published (search `index.html` for "EDIT").
- The phone number is public on purpose; change `PHONE_DISPLAY` and `PHONE_E164` in `js/main.js` if it ever changes.
