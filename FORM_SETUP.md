# Registration form → Google Sheet (Vercel backend)

The interest form (`RegisterForm`) posts to a same-origin serverless function
(`api/register.ts`). Google credentials live only in server-side env vars, so
nothing sensitive ships to the browser.

## 1. Create the Google Sheet

Create a sheet with this header row in **Sheet1**, columns A–G:

| Timestamp | Name | Occupation/Domain | Email | Using AI now | Expectations | Lang |

## 2. Create a service account

1. Google Cloud Console → create/select a project.
2. **APIs & Services → Library →** enable **Google Sheets API**.
3. **APIs & Services → Credentials → Create credentials → Service account.**
4. Open the new service account → **Keys → Add key → JSON**. Download it.
5. Copy the service account email (`…@….iam.gserviceaccount.com`).
6. In the Google Sheet, **Share** it with that email as **Editor**.

## 3. Set environment variables

Copy `.env.example` → `.env.local` (gitignored) and fill from the JSON key:

| Var | Value |
| --- | --- |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | `client_email` from the JSON |
| `GOOGLE_PRIVATE_KEY` | `private_key` from the JSON, quoted, `\n` kept literal |
| `SHEET_ID` | the id in the sheet URL `/spreadsheets/d/<SHEET_ID>/edit` |
| `SHEET_RANGE` | optional, defaults to `Sheet1!A:G` |

In production, set the **same** vars in **Vercel → Project → Settings → Environment Variables**.

## 4. Run locally

The form needs the serverless function, so use the Vercel CLI (plain `vite` won't serve `/api`):

```bash
npm i -g vercel      # once
vercel dev           # serves the site + /api together
```

## 5. Deploy

- Import the repo in Vercel and set the **Root Directory to `code/`**.
- Framework preset auto-detects **Vite**; `/api` is picked up automatically.
- Add the env vars (step 3), then deploy.

## Notes

- Validation, length limits, and a honeypot (`company` field) run server-side in `api/register.ts`.
- To add/rename fields: update `api/register.ts`, the sheet columns, and `RegisterForm.tsx` + `form.*` keys in `src/data/translations.ts`.
