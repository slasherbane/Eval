import { Response } from "express";

export class Error{

    static EGen = (res: Response,status:number,JSON:any)=> {return res.status(status).json(JSON);}
    static E400 = (res: Response) => { return Error.EGen(res,400,{ error: "true", message: "Une ou plusieurs données obligatoire sont manquantes"})} 
    static E400Bis = (res: Response) => { return Error.EGen(res,400,{ error: "true", message: "Email/password manquants" })}   
    static E401 = (res: Response) => { return Error.EGen(res,401,{ error: true, message: "Votre token n'est pas correct" })}    
    static E403  = (res: Response) => { return Error.EGen(res,403,{ error: true, message: "Vos droits d'accès ne permettent pas d'accéder à la ressource" })}  
    static E403Child = (res: Response) => { return Error.EGen(res,403,{ error: "true", message: "Vous ne pouvez pas supprimer cet enfant" })}
    static E403Audio  = (res: Response) => { return Error.EGen(res,403,{ error: true, message: "Votre abonnement ne permet pas d'accéder à la ressource" })}    
    static E409 = (res: Response) => { return Error.EGen(res,409,{ error: "true", message: "Une ou plusieurs données sont érronées" })}
    static E409Child = (res: Response) => { return Error.EGen(res,409,{ error: "true", message: "Vous avez dépassé le cota de trois enfants" })}
    static E409Audio = (res: Response) => { return Error.EGen(res,409,{ error: "true", message: "L'audio n'est pas accessibles" })}  
    static E429 = (res: Response,email:string) => { return Error.EGen(res,429,{ error: "true", message: "Trop de tentive sur email " + email + " (5max) - Veuillez patienter (2min)" })}
    static E500 = (res: Response,err:string) => { return Error.EGen(res,500,{ error: "true", message: err })}

                    
}