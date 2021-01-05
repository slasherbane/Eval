import { Request, Response } from 'express';
import Reflexion from '../utils/Reflexion';
import User from '../entities/User';
import { DateUtil } from '../utils/DateUtil';
import Util from '../utils/Util';
import { AuthMiddle } from './Auth.middle';
import { decode } from 'jsonwebtoken';
import { Error } from '../error/Error';


export class UserMiddle {
    // verifie tous les champs permettant de creer un user et retourne les exception necessaise si besoins
    static registerCheck = (req: Request, res: Response, next: () => void) => {
        try {
            const properties: string[] = Reflexion.getFields(User)
            for (const key of Reflexion.getFields(User)) {
                let undef = User.nonRequiredField.find(element => element === key);
                if (undef === undefined && Util.checkVal(req.body[key])) {
                    return Error.E400(res);
                }
            }

            if (UserMiddle.checkSexe(req.body.sexe) || !(DateUtil.isValidDate(req.body.date_naissance))) {
                console.log(DateUtil.isValidDate(req.body.date_naissance));
                return Error.E409(res);
            }
            next()
        } catch (err) {
            if (err.code === "ER_DUP_ENTRY") {
                console.log("DUP ENTRY !");
            } else {
                console.log("Erreur registerCheck " + err)
            }
            return Error.E409(res)
        }
    }

    static suppressChildCheck = (req: Request, res: Response, next: () => void) => {
        if (Util.checkVal(req.body["id child"])) {

            return Error.E403(res);
        }
    }

    static modifyCheck = (req: Request, res: Response, next: () => void) => {
        const body = req.body;
        const decodeStr: any = Util.getDecodeBearer(req);
        if (Util.checkVal(body["lastname"]) || (decodeStr["lastname"] === body["lastname"])) {
            return Error.E409(res);
        }
    }


    //  verifie si le sexe est uns l'enumeration : Homme , Femme ,Autre
    static checkSexe(value: string) {
        return (Util.checkVal(value) || !(value === "Homme" || value === "Femme" || value === "Autre")) ? true : false;
    }
}