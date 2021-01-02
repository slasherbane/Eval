// equivalent a un filter Java
// dans une boucle utiliser un break si on a fini de chercher ce que l'on veux  !
import { Request, Response } from 'express';

import { verify } from 'jsonwebtoken';
import Util from '../utils/Util';
import Bdd from '../bdd/bdd';
import User from '../entities/User';
import { JWTSecurity } from '../security/JWTSecurity';
import { Connection, createConnection, createConnections, getConnection, getRepository, Repository } from "typeorm";
import { jsonIgnoreReplacer } from 'json-ignore';

export class AuthMiddle {

    static loginCheck = async (req: Request, res: Response, next: () => void) => {
        try {

            let data: any = req.body;
            if (Util.checkVal(data.Password) || Util.checkVal(data.Email)) {
                return res.status(400).json({ error: "true", message: "Email/password manquants" }).end();
            }
           
        try{
            await createConnection();
        }catch(err){
            await getConnection();
        }
        

            let  repository = getRepository(User)
            await repository.findOne({ where: { email: data.Email } }).then(u => {
                if (!(u === undefined)) {
                    if (u.$try >= 5) {
                        console.log("ici")
                        return res.status(429).json({ error: true, message: "Trop de tentive sur email " + u.$email + " (5max) - Veuillez patienter (2min)" }).end();

                    }

                    if (data.Password === u?.$password) {
                        let content = JSON.stringify(u, jsonIgnoreReplacer);
                        let stringUser = JSON.parse(content);
                        return res.status(200).json({ error: "false", message: "L'utilisateur a été authentifié succès", token: "Bearer "+JWTSecurity.encode(u), user: stringUser })
                      
                    } else {
                        u.$try += parseInt("1");
                        repository.save(u);
  
                        return res.status(400).json({ error: "true", message: "Un compte utilisant cette adresse mail est déjà enregistré" })
        
                    }
                }else{
                    return res.status(400).json({ error: "true", message: "Un compte utilisant cette adresse mail est déjà enregistré" })       
                }
            })


            


         
        } catch (err) {

            return res.status(401).json({ error: true, message: err }).end();
        }
    }

    static token = (req: Request, res: Response, next: () => void) => {

     
        try {
          if (req.headers.authorization && verify(Util.split(req.headers.authorization), <string>process.env.JWT_KEY))
               // return res.status(200).json({message:"token valid ^^"});
                next()
        } catch (err) {
            console.log(err)
            return res.status(401).json({ error: true, message: "Votre token n'est pas correct" }).end();
        }

    }


}