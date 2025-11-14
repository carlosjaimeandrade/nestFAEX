import { Injectable } from "@nestjs/common";
import bcrypt from "bcrypt"

@Injectable()
export class BcryptHelper {
    private salt = 10

    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, this.salt)
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash)
    }
}