import { Request, Response } from 'express';
import Bdd from '../bdd/bdd';
import Role from '../entities/Role';
import User from '../entities/User';
import { ConnexionOrm } from '../bdd/ConnexionOrm';

export class UserController{



    static register = async  (req: Request, res: Response, next: () => void) => {
     try {
          
        let body = req.body;
        let u: User = new User(body["firstname"], body["lastname"], body["firstname"], body["email"], body["password"], body["date_naissance"], "Tuteur", body["sexe"],0,null,null,0,null);
        //await Bdd.insert(u);
        ConnexionOrm.createUser(u);
        return res.status(201).json({ error: "false", message: "L'utilisateur a bien été créé avec succès", "user": { "firstname": u.$firstname, "lastname": u.$lastname, "email": u.$email, "sexe": u.$sexe, "role": u.$role, "dateNaissance": u.$date_naissance, "createdAt": u.$createdAt, "updatedAt": u.$updatedAt, "subscription": u.$subscription } }).end();
         
     
        } catch (err) {
            return res.status(404).json({ error: true, message: err.message }).end();
        }
    
    }
}