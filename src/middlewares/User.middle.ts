import { Request, Response } from 'express';
import Reflexion from '../utils/Reflexion';
import User from '../entities/User';
import Bdd from '../bdd/bdd';
import Role from '../entities/Role';
import { DateUtil } from '../utils/DateUtil';
import Util from '../utils/Util';


export class UserMiddle {
    static registerCheck = (req: Request, res: Response, next: () => void) => {
        try {
            const properties: string[] = Reflexion.getFields(User)
            for (const key of Reflexion.getFields(User)) {
            
                let undef = User.nonRequiredField.find(element => element === key);
                if (undef === undefined && Util.checkVal(req.body[key])) {
                   console.log  (key)
                   return res.status(400).json({ error: "true", message: "Une ou plusieurs données obligatoire sont manquantes" }).end();          
                }
            }

            if (UserMiddle.checkSexe(req.body.sexe) || !(DateUtil.isValidDate(req.body.date_naissance))) {
                return res.status(409).json({ error: "true", message: "Une ou plusieurs données sont érronées" }).end();              
            }
next()
        } catch (err) {
            if (err.code === "ER_DUP_ENTRY") {
                console.log("DUP ENTRY !");
                return res.status(409).json({ error: "true", message: "Un compte utilisant cette adresse mail est déjà enregistré" }).end();
                
            }
            return res.status(409).json({ error: "true", message: "Une ou plusieurs données sont érronées" }).end();
        }
    }

    static checkSexe(value: string) {
        return (Util.checkVal(value) || !(value === "Homme" || value === "Femme" || value === "Autre")) ? true : false;
    }
}