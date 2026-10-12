import { config } from 'dotenv';

// CI secret variables take precedence over the optional local file (.env).
config({ quiet: true });

// Read and validate secrets only when requested by a test.
export function getDataFromSecret(key: string): string {
    const secret = process.env[key];
    if (!secret) {
        throw new Error(`Missing secret environment variable: ${key}`);
    }
    return secret;
}