// equivalent a un filter Java
// dans une boucle utiliser un break si on a fini de chercher ce que l'on veux  !
import { Request, Response } from 'express';

import { verify } from 'jsonwebtoken';
import Util from '../utils/Util';
import Bdd from '../bdd/bdd';
import User from '../entities/User';
import { JWTSecurity } from '../security/JWTSecurity';

export class AuthMiddle {

    static loginCheck = (req: Request, res: Response, next: () => void) => {
        try {
          
            let data: any = req.body;
            if (Util.checkVal(data.Password) || Util.checkVal(data.Email)) {
                return res.status(400).json({ error: "true", message: "Email/password manquants" }).end();
            }
            next()
        } catch (err) {
            console.log(err);
            return res.status(401).json({ error: true, message: err }).end();
        }
    }

    static token = (req: Request, res: Response, next: () => void) => {

        const split = (token: string) => { return token.split('Bearer ').join('') }
        try {
            if (req.headers.authorization && verify(split(req.headers.authorization), <string>process.env.JWT_KEY))
                return next()
        } catch (err) {
            return res.status(401).json({ error: true, message: "Votre token n'est pas correct" }).end();
        }

    }

    
}