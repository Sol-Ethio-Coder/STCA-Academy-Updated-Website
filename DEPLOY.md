# Push to GitHub and deploy on Netlify

Repo: https://github.com/Sol-Ethio-Coder/Sol-Tutoring-And-Coding-Academy

## 1. Test locally first (5 minutes)
```
npm install
copy .env.example .env      (Mac/Linux: cp .env.example .env)
```
Open `.env` and fill ADMIN_EMAIL, ADMIN_PASSWORD, GROQ_API_KEY. Then:
```
npx netlify dev
```
Check: the site opens, the AI tutor answers, /admin signs in, the contact form sends a request, then `npm run build` finishes without errors.

## 2. Push to GitHub
```
git clone https://github.com/Sol-Ethio-Coder/Sol-Tutoring-And-Coding-Academy.git
cd Sol-Tutoring-And-Coding-Academy
git branch                                  (note the main branch name: main or master)
git checkout -b old-site
git push -u origin old-site                 (safe backup of your current site)
git checkout main
```
Delete every old file and folder inside this folder EXCEPT the hidden `.git` folder. Copy everything from the new `stca` project into it (include hidden files such as `.gitignore` and `.env.example`; do NOT copy `node_modules` or `.env`). Then:
```
git add -A
git commit -m "Rebuild STCA: new design, online courses, admin, AI tutor"
git push origin main
```

## 3. Netlify
- Your site `stca-academy` should already be linked to this repo, so the push starts a deploy by itself. If it is not linked: Add new site > Import an existing project > GitHub > choose the repo.
- Site configuration > Build & deploy: build command `npm run build`, publish directory `dist`, functions directory `netlify/functions` (already set in `netlify.toml`).
- Site configuration > Environment variables > add:

| Name | Value |
|---|---|
| ADMIN_EMAIL | your admin email |
| ADMIN_PASSWORD | a long strong password |
| GROQ_API_KEY | key from console.groq.com/keys |
| TELEGRAM_BOT_TOKEN | optional: instant alerts for new requests |
| TELEGRAM_CHAT_ID | optional: your Telegram chat id |

Do NOT add GROQ_MODEL (or leave it empty). Then Deploys > Trigger deploy > Clear cache and deploy site. Netlify Blobs (where requests and access codes are stored) needs no setup.

## 4. Telegram alerts for new requests (optional, 3 minutes)
1. In Telegram open @BotFather, send /newbot, follow the steps, copy the token.
2. Open your new bot and send it any message.
3. Open https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates in a browser and copy the number after "chat":{"id": ... .
4. Put the token and the number in the two variables above and redeploy.

## 5. Test the live site
- Contact page: send a test request, then see it in /admin > Requests.
- /admin > Access codes: generate a code, unlock a paid course with it, try the same code again (must be refused).
- Open the STCA AI Tutor and ask "How much is Python tutoring?"
- Complete a course and pass the exam to see the certificate.

## Troubleshooting
- AI says "not available": check GROQ_API_KEY and remove GROQ_MODEL, then redeploy.
- Admin or requests say "not configured": ADMIN_EMAIL / ADMIN_PASSWORD missing in Netlify; redeploy after adding.
- Functions 404: the functions directory must be `netlify/functions`.
- Build fails: run `npm run build` locally and read the first error.

## Build fails with "secrets scanning" (Netlify)
Netlify fails a build when the VALUE of an environment variable marked "Contains secret values" appears anywhere in your repo or built files, or when a file contains something that looks like a password or key.
1. Open the failed deploy log and find the lines about secrets. They name the file and the variable.
2. Make sure no `.env` file is in the repo: `git ls-files | grep -i "\.env"` (Windows: `git ls-files | findstr /i ".env"`). Only `.env.example` may be listed. If `.env` is listed: `git rm --cached .env`, commit, push, and then CHANGE the keys/passwords it contained (they were public on GitHub).
3. Use a strong, random ADMIN_PASSWORD (a password-manager one, 16+ characters). A short or common word (for example one that also appears in lesson text) matches the site's own text and fails the scan.
4. ADMIN_EMAIL is not a secret. Untick "Contains secret values" for it, or keep the `SECRETS_SCAN_OMIT_KEYS` line in `netlify.toml`.
5. Never set an environment variable to a value that already appears in the code (like the public contact email or a demo word).
6. Do not turn scanning off. If smart detection flags a harmless string, add it to a variable named `SECRETS_SCAN_SMART_DETECTION_OMIT_VALUES` (comma separated) and redeploy.

## The "Powered by Netlify" badge
New free-plan sites created after 19 Aug 2026 show a small "Powered by Netlify" badge at the bottom-right. It is drawn by Netlify in its own frame, so the site's code cannot move or hide it. The floating Telegram and AI tutor buttons are placed above it so they never overlap. To remove the badge for everyone: Project configuration > General > Powered by Netlify badge > turn off. Visitors can also dismiss it themselves.
