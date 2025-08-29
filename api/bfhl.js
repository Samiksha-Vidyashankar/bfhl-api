// /api/bfhl.js — Vercel Serverless Function
// Edit the placeholders below or set environment variables in Vercel:
// EMAIL, ROLL_NUMBER, FULL_NAME (lowercase recommended), DOB_DDMMYYYY (e.g., "17091999")

export default function handler(req, res) {
  const EMAIL = process.env.EMAIL || "your_email@vit.edu";
  const ROLL_NUMBER = process.env.ROLL_NUMBER || "YOUR_ROLL_NUMBER";
  const FULL_NAME = (process.env.FULL_NAME || "john_doe").toLowerCase();
  const DOB_DDMMYYYY = process.env.DOB_DDMMYYYY || "17091999";
  const user_id = `${FULL_NAME}_${DOB_DDMMYYYY}`;

  if (req.method !== "POST") {
    return res.status(200).json({
      is_success: true,
      message: "BFHL API is live. Use POST /bfhl with { data: [...] }",
      user_id,
      email: EMAIL,
      roll_number: ROLL_NUMBER
    });
  }

  const body = req.body;
  if (!body || !Array.isArray(body.data)) {
    return res.status(400).json({
      is_success: false,
      message: "Invalid request. Expected JSON with an array field 'data'.",
    });
  }

  const data = body.data.map(String);

  const odd_numbers = [];
  const even_numbers = [];
  const alphabets = [];
  const special_characters = [];
  const lettersForConcat = [];

  let sum = 0;

  // Helpers
  const isIntegerString = (s) => /^[+-]?\d+$/.test(s);
  const isAlphaString = (s) => /^[A-Za-z]+$/.test(s);
  const isSpecialOnly = (s) => /^[^A-Za-z0-9]+$/.test(s);

  for (const token of data) {
    // Classify whole tokens for arrays
    if (isIntegerString(token)) {
      const n = parseInt(token, 10);
      sum += n;
      if (Math.abs(n) % 2 === 0) {
        even_numbers.push(token);
      } else {
        odd_numbers.push(token);
      }
    } else if (isAlphaString(token)) {
      alphabets.push(token.toUpperCase());
    } else if (isSpecialOnly(token)) {
      special_characters.push(token);
    }

    // Extract letters for concat_string regardless of token type
    for (const ch of token) {
      if (/[A-Za-z]/.test(ch)) {
        lettersForConcat.push(ch.toLowerCase());
      }
    }
  }

  // Build concat_string: reverse all letters and apply alternating caps starting with UPPER
  let concat_string = "";
  for (let i = 0; i < lettersForConcat.length; i++) {
    const ch = lettersForConcat[lettersForConcat.length - 1 - i];
    concat_string += (i % 2 === 0) ? ch.toUpperCase() : ch.toLowerCase();
  }

  return res.status(200).json({
    is_success: true,
    user_id,
    email: EMAIL,
    roll_number: ROLL_NUMBER,
    odd_numbers,
    even_numbers,
    alphabets,
    special_characters,
    sum: String(sum),
    concat_string,
  });
}