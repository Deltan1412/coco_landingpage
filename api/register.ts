import type { VercelRequest, VercelResponse } from '@vercel/node';
import { google } from 'googleapis';

/**
 * POST /api/register
 * Appends a course-interest submission to a Google Sheet.
 *
 * The Google credentials live only in server-side env vars and are never
 * shipped to the browser. The frontend talks to this same-origin endpoint.
 *
 * Required env vars (set locally in code/.env.local and in the Vercel dashboard):
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL  service account email (…@…iam.gserviceaccount.com)
 *   GOOGLE_PRIVATE_KEY            service account private key (with literal \n escapes)
 *   SHEET_ID                      the spreadsheet id from its URL
 *   SHEET_RANGE                   optional, defaults to "Sheet1!A:G"
 */

const MAX = { name: 120, occupation: 160, email: 160, aiUsage: 2000, expectations: 2000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Payload {
  name?: unknown;
  occupation?: unknown;
  email?: unknown;
  aiUsage?: unknown;
  expectations?: unknown;
  lang?: unknown;
  company?: unknown; // honeypot — real users never fill this
}

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const body = (typeof req.body === 'string' ? safeParse(req.body) : req.body) as Payload | null;
  if (!body) return res.status(400).json({ ok: false, error: 'Invalid JSON body' });

  // Honeypot: silently accept bots without writing a row.
  if (str(body.company)) return res.status(200).json({ ok: true });

  const name = str(body.name);
  const occupation = str(body.occupation);
  const email = str(body.email);
  const aiUsage = str(body.aiUsage);
  const expectations = str(body.expectations);
  const lang = str(body.lang) === 'vi' ? 'vi' : 'en';

  const errors: Record<string, string> = {};
  if (!name) errors.name = 'required';
  if (!occupation) errors.occupation = 'required';
  if (!email) errors.email = 'required';
  else if (!EMAIL_RE.test(email)) errors.email = 'invalid';
  if (!aiUsage) errors.aiUsage = 'required';
  if (!expectations) errors.expectations = 'required';

  for (const [field, limit] of Object.entries(MAX)) {
    const value = { name, occupation, email, aiUsage, expectations }[field] ?? '';
    if (value.length > limit) errors[field] = 'too_long';
  }

  if (Object.keys(errors).length) {
    return res.status(400).json({ ok: false, error: 'Validation failed', fields: errors });
  }

  const { GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, SHEET_ID } = process.env;
  if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY || !SHEET_ID) {
    console.error('Missing Google Sheets env vars');
    return res.status(500).json({ ok: false, error: 'Server not configured' });
  }

  try {
    const auth = new google.auth.JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: process.env.SHEET_RANGE || 'Sheet1!A:G',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [[new Date().toISOString(), name, occupation, email, aiUsage, expectations, lang]],
      },
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Sheets append failed', err);
    return res.status(502).json({ ok: false, error: 'Could not save submission' });
  }
}

function safeParse(s: string): Payload | null {
  try {
    return JSON.parse(s) as Payload;
  } catch {
    return null;
  }
}
