# BFHL API — Vercel Starter (POST /bfhl)

Ready-to-deploy Node.js serverless API for the VIT BFHL assignment.

## Quick Deploy (Vercel)
1. Create a new GitHub repo and upload these files (or import this folder in Vercel directly).
2. Go to https://vercel.com/new → "Import Project" → select your repo/folder.
3. After deploy, set **Environment Variables** (Project Settings → Environment Variables):
   - `EMAIL` → your_email@vit.edu
   - `ROLL_NUMBER` → e.g., 24BCE0000
   - `FULL_NAME` → your_full_name_in_lowercase (e.g., `john_doe`)
   - `DOB_DDMMYYYY` → e.g., `17091999`
4. Redeploy.

Your endpoints will be:
- `POST https://<your-project>.vercel.app/bfhl` (rewrite to `/api/bfhl` is configured)
- `GET  https://<your-project>.vercel.app/bfhl` (health/info)

## Request Body
```json
{ "data": ["a", "1", "334", "4", "R", "$"] }
```

## Example (curl)
```bash
curl -X POST https://<your-project>.vercel.app/bfhl        -H "Content-Type: application/json"        -d '{"data":["a","1","334","4","R","$"]}'
```

## Output Shape
```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "your_email@vit.edu",
  "roll_number": "24BCE0000",
  "odd_numbers": ["1"],
  "even_numbers": ["334","4"],
  "alphabets": ["A","R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

## Notes
- Numbers are returned as strings (as required).
- `concat_string` takes **all letters found**, reverses them, and applies **alternating caps starting with uppercase**.
- Errors return `400` with `is_success: false` and a message.
- Hosted endpoint must be `/bfhl` (configured via `vercel.json` rewrite).