# STCA Academy v2 (original content kept + new learning platform)

## Your original site is preserved
Same pages and URLs: `/`, `/html/courses`, `/html/contact`, `/html/python-course`, `/html/web-course`, `/html/scratch-course`, `/html/math-course`, `/html/digital-course`, `/html/exam-course`. Same text, hourly prices (500/600 Birr), testimonials, FAQ, contact options, map, registration form link, Telegram, YouTube and email.

## IMPORTANT: copy your original images
Copy everything from your repo's `Images/` folder into `public/Images/` (ict.avif, math.avif, maths.jpg, scratch-cta.webp, scratch.jpg, python.avif, digital-literacy.avif, digital.jpg, final-exam.avif, exam.jpg, logo.jpg). If a file is missing, a built-in illustration (the .svg files) is shown instead. Do not delete the .svg files or `logo-mark.svg`.

## New: learn online (`/learn`)
Free and paid self-paced courses with quizzes and certificates. There are NO student accounts: progress is saved in the visitor's browser and the certificate asks for a name. Paid courses unlock with an access code you create in the admin panel and send after payment.

## Admin (`/admin`, owner only)
Sign in with the ADMIN_EMAIL and ADMIN_PASSWORD you set in Netlify (see DEPLOY.md). Create, edit, publish and delete courses; draft lessons with AI.

## Run
1. `npm install`   2. copy `.env.example` to `.env`   3. `npx netlify dev` (or `npm run dev` without AI)

## Deploy (Netlify)
Build `npm run build`, publish `dist`. Add the variables from `.env.example`.

## Demo mode warning
Courses you edit and student progress are saved in each browser (`src/store.js`). The admin login is checked in the browser, so it is not secure. Replace with a real backend (Supabase) before real students use it. Your tutoring pages and contact page do not depend on this.


## Exams, paid courses, links
- Every online course has interactive lessons and a **final exam of 10 questions**. The certificate is issued only with **70% or higher** (`PASS` in `src/data.js`). Content lives in `src/content.js`.
- Free online courses: Scratch and Digital Literacy. Paid: Web Development, Mathematics, Python (300 ETB), Exam Preparation (400 ETB), JavaScript sample (300 ETB). Prices are placeholders; change them in Admin or `src/content.js`. 1:1 tutoring prices (500/600 Birr/hour) are unchanged.
- Lesson 1 of every paid course is a free preview.

## One-time access codes (how learners get access)
1. In Netlify set `ADMIN_EMAIL` and `ADMIN_PASSWORD` (Site configuration > Environment variables) and redeploy.
2. A learner pays you on Telegram.
3. Open `/admin`, sign in, go to the **Access codes** tab, choose the course, type the student's name, press **Generate code**, then **Send on Telegram** (or Copy message).
4. The learner opens the course page, types the code under "Have an access code?" and presses Unlock.
5. The code is burned the moment it works. A friend who tries it later gets "This code has already been used". Each student needs their own code. **All codes** shows Unused/Used; you can Revoke an unused one.
Codes are stored with Netlify Blobs by `netlify/functions/codes.mjs`. They work only on Netlify (deployed, or `npx netlify dev`), not with plain `npm run dev`.

## Links
Platform: https://stca-platform.vercel.app (top bar, footer, Learn pages). Developer link in the footer: https://sol-ethio-coder.netlify.app

## Images
Copy your originals into `public/Images/`. If a file is missing, a colorful built-in cover shows instead of a broken image.

## Limits to know
Unlocking is remembered in the learner's browser, so a different device or cleared browser data needs a new code. Lesson text is still in the site's code, so a technical visitor could read paid lessons; truly locking content needs a backend (planned: Supabase). Course edits made in Admin are saved only in the admin's browser until courses move to the backend.


## Courses (v3)
- 61 lessons across 7 courses, organised in modules. Lesson text lives in `src/content.js` (format notes at the top of that file).
- Interactive activities: real Python in the browser (Pyodide, loads from a CDN on first use, needs internet), sandboxed JavaScript tasks, HTML/CSS tasks with live preview and automatic checks, drag-to-order, matching, fill-in, quizzes, hands-on checklists, a graph explorer and a Scratch stage.
- Each course has a capstone project and a 10-12 question final exam. Certificate needs 70% or higher.
- Course images are bundled from `src/assets/courses/` so they always show, whatever happens to `public/Images`.
- Because lesson ids changed, the browser data key was bumped (v5). Admin-edited courses saved in your browser earlier will reset once.

## AI tutor and Groq models
Groq retires models regularly (llama-3.3-70b-versatile was shut down on 16 Aug 2026). The function in `netlify/functions/ai.mjs` therefore ignores retired names, defaults to `openai/gpt-oss-120b`, and if Groq reports that a model is gone it asks Groq for its current model list and picks one automatically. In Netlify, delete the `GROQ_MODEL` variable (or set it to a current model from console.groq.com/docs/models) and redeploy.

## Admin access
There is no public link to `/admin`. Open it by typing the address. The page asks search engines not to index it.

## Contact requests
The Contact page form sends each request to `netlify/functions/requests.mjs`, which stores it (Netlify Blobs). Open `/admin` > **Requests** to read them, then mark them contacted/done or delete them. It has a hidden spam trap, a minimum fill time and a 30-second limit per visitor. If the server is unreachable, the form shows Telegram and email buttons instead, so no visitor is ever stuck.

### Instant Telegram alerts (optional)
1. In Telegram, message @BotFather, send `/newbot`, follow the steps, and copy the **token**.
2. Open your new bot and send it any message (for example "hi").
3. Open `https://api.telegram.org/bot<TOKEN>/getUpdates` in your browser and copy the number after `"chat":{"id":`.
4. In Netlify add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`, then redeploy. Every new request now also arrives as a Telegram message.

## STCA AI Tutor
The chat is called **STCA AI Tutor**. The server prompt (`netlify/functions/ai.mjs`) holds the fixed facts about STCA (contact details, how tutoring works, how certificates and access codes work). Course names and prices are sent live from the website, so they are always current. Edit the `KB` text at the top of that file if your policies change.

## Deploy (GitHub + Netlify)
1. Push this folder to GitHub (the project root must contain `package.json`, `netlify.toml`, `src`, `public`, `netlify`).
2. Netlify: Site configuration > Build & deploy. Build command `npm run build`, publish directory `dist` (both are also set in `netlify.toml`).
3. Environment variables: `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `GROQ_API_KEY` (and optionally `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`). Leave `GROQ_MODEL` empty.
4. Deploys > Trigger deploy > Clear cache and deploy site.
