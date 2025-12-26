import path from 'path';
import fs from 'fs/promises';
import dotenv from 'dotenv';
dotenv.config();

class jwtKey {

    private publicKey: string | null = null;

    async getPublicKey(): Promise<string> {
        if (this.publicKey) return this.publicKey;
        try {
            const keyPath = path.join(__dirname,'../../key/access-public.key');
            this.publicKey = await fs.readFile(keyPath, "utf8");
            return this.publicKey;
        } catch (error) {
            console.error("Error reading public key:", error);
            throw new Error("Could not load public key");
        }
    }
}

export default new jwtKey();