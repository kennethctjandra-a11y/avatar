# Origin Story · Avatar

_by Ken Tjandra_

A guided, 20-question web app that walks a business owner through building their
ICP — **Profile → Dreams → Pains → Solutions** — then hands them a clean one-page
PDF.

No sign-in, no API keys, no server. Just a name and an Instagram handle so their
name lands on the PDF. Everything runs in the browser; answers save to the
device as they type.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Deploy

It's a fully static site — host the `dist/` folder anywhere.

```bash
npm run build
```

Then drag `dist/` into Netlify, or:

```bash
npx vercel
```

No environment variables. Nothing to configure.

## How it's put together

```
src/
  questions.js           The entire 20-question flow as data. Edit copy here.
  App.jsx                Screen routing + autosave
  components/
    ProgressBar.jsx      Four-section progress header
    AvatarForm.jsx       Renders one question at a time
    Field.jsx            Text / textarea input
  screens/
    Welcome.jsx          Intro, name + Instagram, resume
    ExportView.jsx       The finished one-pager + Download PDF
  utils/
    document.js          Answers to finished document (screen, PDF, and clipboard
                         all render from this, so they can't drift apart)
    pdfExport.js         PDF layout
    storage.js           localStorage helpers
```

### Changing the questions

`src/questions.js` is the whole flow. Adding a question means adding one object
to `STEPS`; the progress bar, navigation, and autosave pick it up. To get a new
field onto the PDF, add a line to the matching section in `utils/document.js`.

## Notes

- **Autosave** writes to `localStorage` 400ms after typing stops. Closing the tab
  and coming back offers "Pick up where you left off."
- **jsPDF loads on demand**, only when someone clicks Download — it's ~380kB and
  most of a session happens before that.
- **Mobile-first.** Inputs are 16px so iOS doesn't zoom on focus.
