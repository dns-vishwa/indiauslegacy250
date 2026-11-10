import { z } from 'zod';

// ─────────────────────────────────────────────────────────────────────
// CLIENT-SAFE ENVIRONMENT SCHEMA
// Only variables safe for the browser bundle.
// NEVER include AUTHORIZENET_TRANSACTION_KEY here.
// ─────────────────────────────────────────────────────────────────────
const clientEnvSchema = z.object({
  AUTHORIZENET_ENV: z.enum(['sandbox', 'production']).default('production'),
  NEXT_PUBLIC_AUTHORIZENET_API_LOGIN_ID: z.string().min(1),
  NEXT_PUBLIC_AUTHORIZENET_CLIENT_KEY: z.string().min(1),
});

const getEnvVal = (key) => {
  // Vite: import.meta.env.VITE_* are inlined at build time
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    const viteKey = key.startsWith('NEXT_PUBLIC_')
      ? key.replace('NEXT_PUBLIC_', 'VITE_')
      : `VITE_${key}`;
    return import.meta.env[viteKey] || import.meta.env[key] || undefined;
  }
  // Node / Next.js: process.env
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  return undefined;
};

// This export is used by ALL client-side code (DonationSection, etc.)
// It intentionally EXCLUDES the Transaction Key.
export const env = clientEnvSchema.parse({
  AUTHORIZENET_ENV: getEnvVal('AUTHORIZENET_ENV') || 'production',
  NEXT_PUBLIC_AUTHORIZENET_API_LOGIN_ID: getEnvVal('NEXT_PUBLIC_AUTHORIZENET_API_LOGIN_ID') || '',
  NEXT_PUBLIC_AUTHORIZENET_CLIENT_KEY: getEnvVal('NEXT_PUBLIC_AUTHORIZENET_CLIENT_KEY') || '',
});
