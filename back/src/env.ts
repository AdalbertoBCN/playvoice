import z from "zod";
import 'dotenv/config';

const envSchema = z.object({

    LIVEKIT_API_KEY: z.string(),
    LIVEKIT_API_SECRET: z.string()
});

export const env = envSchema.parse(process.env);
