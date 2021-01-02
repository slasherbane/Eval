import Bdd from "../bdd/bdd";
import { Request, Response } from 'express';
import User from '../entities/User';
export class AuthController{
    static login = async (req: Request, res: Response) => {
        try{
        let data: any = req.body;
  
      return res.status(400).json({ error: "ok"})
        
    }catch(err){
        
    }
    }
}