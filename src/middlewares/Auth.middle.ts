// equivalent a un filter Java
// dans une boucle utiliser un break si on a fini de chercher ce que l'on veux  !
import { Request, Response } from 'express';

import { decode, verify } from 'jsonwebtoken';
import Util from '../utils/Util';
import User from '../entities/User';
import { JWTSecurity } from '../security/JWTSecurity';
import { Connection, createConnection, createConnections, getConnection, getRepository, Repository } from "typeorm";
import { jsonIgnoreReplacer } from 'json-ignore';

export class AuthMiddle {

    // verifie si l'utilisateur existe ou non dans la bdd et determine dans le cas échéant un incrementation d'essaie a max 5
    static loginCheck = async (req: Request, res: Response, next: () => void) => {
        try {

            let data: any = req.body;
            if (Util.checkVal(data.Password) || Util.checkVal(data.Email)) {
                return res.status(400).json({ error: "true", message: "Email/password manquants" }).end();
            }

            try {
                await createConnection();
            } catch (err) {
                await getConnection();
            }
            let repository = getRepository(User)
            await repository.findOne({ where: { email: data.Email } }).then(async u => {
                if (!(u === undefined)) {
                    if (u.$try >= 5) {
                        console.log("ici")
                        return res.status(429).json({ error: "true", message: "Trop de tentive sur email " + u.$email + " (5max) - Veuillez patienter (2min)" }).end();
                    }
                    if (data.Password === u?.$password) {
                        let content = JSON.stringify(u, jsonIgnoreReplacer);
                        let stringUser = JSON.parse(content);
                        u.$connected = true;
                        await repository.save(u)
                        return res.status(200).json({ error: "false", message: "L'utilisateur a été authentifié succès", token: "Bearer " + JWTSecurity.encode(u), user: stringUser })
                    } else {
                        u.$try += parseInt("1");
                        await repository.save(u);
                        return res.status(400).json({ error: "true", message: "Un compte utilisant cette adresse mail est déjà enregistré" })
                    }
                } else {
                    return res.status(400).json({ error: "true", message: "Un compte utilisant cette adresse mail est déjà enregistré" })
                }
            })
        } catch (err) {
            return res.status(401).json({ error: true, message: err }).end();
        }
    }

    // verifie tous simplement si le token est valide ou non
    static token = (req: Request, res: Response, next: () => void) => {
        try {
            if (req.headers.authorization && verify(Util.split(req.headers.authorization), <string>process.env.JWT_KEY))
                next();
        } catch (err) {
            console.log(err)
            return res.status(401).json({ error: true, message: "Votre token n'est pas correct" }).end();
        }
    }

    // verifie le role dans le token
    static tokenRole = (req: Request, res: Response, next: () => void) => {
        try {
            const str: string = <string>req.headers.authorization;
            const decodeStr: any = decode(Util.split(str))
            const role = decodeStr["role"];
            if (role =="Enfant") {
                return res.status(403).json({ error: true, message: "Vos droits d'accès ne permettent pas d'accéder à la ressource" }).end();
            }
            next()
        } catch (err) {
            console.log(err)
            return res.status(401).json({ error: true, message: "Votre token n'est pas correct" }).end();
        }
    }


}