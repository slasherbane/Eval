import { Request, Response } from 'express';
import Reflexion from '../utils/Reflexion';
import User from '../entities/User';
import Bdd from '../bdd/bdd';
import Role from '../entities/Role';
import { DateUtil } from '../utils/DateUtil';


export class UserMiddle {
    static register = async (req: Request, res: Response, next: () => void) => {

        try {
            const properties: string[] = Reflexion.getFields(User)
            for (const key of properties) {
                if (key === "id" || key === "role" || key === "subscription" || key === "createdAt" || key === "updatedAt") {
                    continue;
                }



                if (UserMiddle.checkVal(req.body[key])) {
                    console.log(key)
                    res.status(400).json({ error: "true", message: "Une ou plusieurs données obligatoire sont manquantes" }).end();
                    return;
                }
      
                if (UserMiddle.checkSexe(req.body.sexe) || !(DateUtil.isValidDate(req.body.date_naissance))) {
                    res.status(409).json({ error: "true", message: "Une ou plusieurs données sont érronées" }).end();
                    return;
                }



                let body = req.body;
                let u: User = new User(body["firstname"], body["lastname"], body["firstname"], body["email"], body["password"], body["date_naissance"], new Role(1, "tuteur"), body["sexe"]);
                await Bdd.insert(u);
                res.status(201).json().end();
                return;
            }

        } catch (err) {
            if (err.code === "ER_DUP_ENTRY") {
                console.log("DUP ENTRY !");
                res.status(409).json({ error: "true", message: "Un compte utilisant cette adresse mail est déjà enregistré" }).end();
                return
            }
            res.status(409).json({ error: "true", message: "Une ou plusieurs données sont érronées" }).end();
        }

    }


    static checkVal(value: string) {

        return (!value || value.length === 0 || value === undefined) ? true : false;
    }

    static checkSexe(value: string) {
        return (this.checkVal(value) || !(value === "Homme" || value === "Femme" || value === "Autre")) ? true : false;

    }
}