import Bdd from "../bdd/bdd";
import { Request, Response } from 'express';
import User from '../entities/User';
export class AuthController{
    static login = async (req: Request, res: Response) => {
        try{
        let data: any = req.body;
       // const u:any = await Bdd.getUserFromEmail(data.Email);
    
     /*   if(u === undefined){
           // console.log(u.$try)
            return res.status(400).json({ error: "true", message: "Un compte utilisant cette adresse mail est déjà enregistré" })
        }*/

        // let a =  await Bdd.updateTryUser(u);
      //  }
      return res.status(400).json({ error: "true", message: "Un compte utilisant cette adresse mail est déjà enregistré" })
        
    }catch(err){
        
    }
    }
}