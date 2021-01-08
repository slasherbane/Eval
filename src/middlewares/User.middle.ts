import { Request, Response } from 'express';
import Reflexion from '../utils/Reflexion';
import User from '../entities/User';
import { DateUtil } from '../utils/DateUtil';
import Util from '../utils/Util';
import { AuthMiddle } from './Auth.middle';
import { decode } from 'jsonwebtoken';
import { Error } from '../error/Error';
import { UserController } from '../controller/UserController';
import { getConnection } from 'typeorm';
import { PasswordUtil } from '../utils/PasswordUtil';


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

            if(Util.isValidEmail(req.body["email"]) || !(PasswordUtil.isValidLengthPassword(req.body["password"]))){         
                return Error.E409(res);
            }

            if (UserMiddle.checkSexe(req.body.sexe) || !(DateUtil.isValidDate(req.body.date_naissance))) {
                console.log(DateUtil.isValidDate(req.body.date_naissance));
                return Error.E409(res);
            }
            next()
        } catch (err) {
                console.log("Erreur registerCheck " + err)          
            return Error.E409(res)
        }
    }

    static suppressChildCheck = (req: Request, res: Response, next: () => void) => {
        if (Util.checkVal(req.body["id child"])) {
            return Error.E403(res);
        }
    }

    static modifyCheck = async (req: Request, res: Response, next: () => void) => {

        const decodeStr: any = Util.getDecodeBearer(req);
        const body = req.body;
        await Util.getOrCreateConnexion()
        let co = getConnection();
        await co.manager.getRepository(User).findOne(decodeStr["id"]).then(u => {
            if (!(u?.$firstname === decodeStr["firstname"]) || !(u?.$lastname === decodeStr["lastname"]) || !(u?.$date_naissance === decodeStr["dateNaissance"]) || !(u?.$sexe === decodeStr["sexe"])) {
                return Error.E401(res);
            }

            console.log(Util.checkSameVal(body, decodeStr, "firstname"))
            if (Util.checkSameVal(body, decodeStr, "firstname") && Util.checkSameVal(body, decodeStr, "lastname") && Util.checkSameVal(body, decodeStr, "date_naissance") && Util.checkSameVal(body, decodeStr, "sexe")) {
                return Error.E409(res);
            }

            if (!(Util.checkVal(body["sexe"])) && (UserMiddle.checkSexe(body["sexe"]))) {
                return Error.E409(res);
            }
            next()
        })




    }


    //  verifie si le sexe est uns l'enumeration : Homme , Femme ,Autre
    static checkSexe(value: string) {
        return (Util.checkVal(value) || !(value === "Homme" || value === "Femme" || value === "Autre")) ? true : false;
    }
}