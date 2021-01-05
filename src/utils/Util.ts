import { Request } from "express";
import { decode } from "jsonwebtoken";
import { createConnection, getConnection, getRepository } from "typeorm";
import User from "../entities/User";

export default class Util {

    // verifie si la valeur passe en parametre est vide ou inexistante.
    static checkVal(value: string) {
        return (!value || value.length === 0 || value === undefined) ? true : false;
    }

    // code permetant de recupererr le token dans le header
    static bearer = (token: string) => { return token.split('Bearer ').join('') }

    // cree un connexiona la bdd s'il n'en existe pas ou essaie de la recuperer
    static async getOrCreateConnexion(){
        try {
            await createConnection();
        } catch (err) {
            await getConnection();
        }
    }

    static getIdUserFromBearer(req: Request): number {
        const decodeStr: any = Util.getDecodeBearer(req)
        return parseInt(decodeStr["id"]);

    }

    static getDecodeBearer(req: Request) {
        const str: string = <string>req.headers.authorization;
        return decode(Util.bearer(str));
    }

    static async openUserRepo(){
        await Util.getOrCreateConnexion();
        return await getRepository(User);
    }
}