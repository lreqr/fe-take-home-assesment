import { z } from 'zod';

const raw = import.meta.env;

const envSchema = z.object({
  APP_BASE_PATH: z.string().default('/'),
  MOCK_API: z.string().optional()
});

const parsed = envSchema.parse({
  APP_BASE_PATH: raw.VITE_APP_BASE_PATH ?? raw.BASE_URL ?? '/',
  MOCK_API: raw.VITE_MOCK_API
});

export const env = parsed;
