import { z } from 'zod';

// ─────────────────────────────────────────────────────────────────────
// SERVER-ONLY ENVIRONMENT SCHEMA
// This file must ONLY be imported by server-side code (API routes).
// If this file is imported by any client component, the build will
// fail or the secrets will leak into the browser bundle.
// ─────────────────────────────────────────────────────────────────────
const serverEnvSchema = z.object({
  AUTHORIZENET_API_LOGIN_ID: z.string().min(1, 'API Login ID is required'),
  AUTHORIZENET_TRANSACTION_KEY: z.string().min(1, 'Transaction Key is required'),
  AUTHORIZENET_ENV: z.enum(['sandbox', 'production']).default('production'),
});

// Read strictly from process.env (never import.meta.env which is client-bundled)
export const serverEnv = serverEnvSchema.parse({
  AUTHORIZENET_API_LOGIN_ID: process.env.AUTHORIZENET_API_LOGIN_ID || process.env.VITE_AUTHORIZENET_API_LOGIN_ID || '',
  AUTHORIZENET_TRANSACTION_KEY: process.env.AUTHORIZENET_TRANSACTION_KEY || '',
  AUTHORIZENET_ENV: process.env.AUTHORIZENET_ENV || process.env.VITE_AUTHORIZENET_ENV || 'production',
});
