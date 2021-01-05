// equivalent a un filter Java
// dans une boucle utiliser un break si on a fini de chercher ce que l'on veux  !
import { Request, Response } from 'express';

import { decode, verify } from 'jsonwebtoken';
import Util from '../utils/Util';
import User from '../entities/User';
import { JWTSecurity } from '../security/JWTSecurity';
import { Connection, createConnection, createConnections, getConnection, getRepository, Repository } from "typeorm";
import { jsonIgnoreReplacer } from 'json-ignore';
import { UserController } from '../controller/UserController';
import { Error } from '../error/Error';

export class AuthMiddle {

    // verifie si l'utilisateur existe ou non dans la bdd et determine dans le cas échéant un incrementation d'essaie a max 5
    static loginCheck = async (req: Request, res: Response, next: () => void) => {
        try {
            const data: any = req.body;
            if (Util.checkVal(data.Password) || Util.checkVal(data.Email)) {
                // return res.status(400).json({ error: "true", message: "Email/password manquants" });
                return Error.E400Bis(res)
            }
            await Util.getOrCreateConnexion();
            let repository = getRepository(User)
            await repository.findOne({ where: { email: data.Email } }).then(async u => {
                if (!(u === undefined)) {
                    if (u.$try >= 5) {
                        console.log("ici")
                        return Error.E429(res, <string>u?.$email);
                    }
                    if (data.Password === u?.$password) {
                        const content = JSON.stringify(u, jsonIgnoreReplacer);
                        const stringUser = JSON.parse(content);
                        u.$connected = true;
                        await repository.save(u)
                        return res.status(200).json({ error: "false", message: "L'utilisateur a été authentifié succès", token: "Bearer " + JWTSecurity.encode(u), user: stringUser })
                    } else {
                        u.$try += parseInt("1");
                        await repository.save(u);
                        return Error.E400(res);
                    }
                } else {
                    return Error.E400(res);
                }
            })
        } catch (err) {
            console.log("Erreur login check " + err)
            return Error.E401(res);

        }
    }

    // verifie tous simplement si le token est valide ou non
    static token = (req: Request, res: Response, next: () => void) => {
        try {
            if (req.headers.authorization && verify(Util.bearer(req.headers.authorization), <string>process.env.JWT_KEY))
                next();
        } catch (err) {
            console.log("Erreur token " + err)
            return Error.E401(res);
        }
    }

    // verifie le role dans le token
    static tokenRole = (req: Request, res: Response, next: () => void) => {
        try {
            const decodeStr: any = Util.getDecodeBearer(req)
            const role = decodeStr["role"];
            if (role == "Enfant") {
                return Error.E403(res);
            }
            next()
        } catch (err) {
            console.log("Erreur token role " + err)
            return Error.E401(res);

        }
    }


}