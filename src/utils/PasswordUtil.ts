import { compare, hash } from "bcrypt";

export class PasswordUtil{


    // classe concernant le hashage et la comparaison en BDD du mot de passe
    private static MIN_SIZE = 8;
    private static SALT = 12;

    public static isValidLengthPassword(password: string): boolean {
        return password.length >= PasswordUtil.MIN_SIZE;
    }

    public static async makeHash(password: string): Promise <string> {
        return await hash(password,PasswordUtil.SALT);
}

    public static async compareHash(password: string, hash: string): Promise <boolean> {
        return await compare(password, hash)
    }
}