import { z } from "zod";

const envSchema = z.object({
  VITE_NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  VITE_API_URL: z.string(),
  VITE_APP_NAME: z.string(),
});

export default envSchema.parse({
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
  VITE_NODE_ENV: import.meta.env.VITE_NODE_ENV,
});
