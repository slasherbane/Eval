import { decode, sign, verify } from "jsonwebtoken";
import User from "../entities/User";

export class JWTSecurity {

    static toTimestamp(strDate:string){
        var datum = Date.parse(strDate);
        return datum/1000;
     }
     
    static encode(u: User) {
        return sign({
            id: u.$id,
            firstname: u.$firstname,
            lastname: u.$lastname,
            email: u.$email,
            sexe: u.$sexe,
            role: u.$role,
            dateNaissance: u.$date_naissance,
            createdAt: u.$createdAt,
            updatedAt: u.$updatedAt,
            subscription: u.$subscription,
            connected:u.$connected
        }
            , <string>process.env.JWT_KEY, { expiresIn: "300s"})
    }

    static isExpired(token: string) {
        console.log("date now" + Date.now());
        // if (req.headers.authorization && verify(split(req.headers.authorization), < string > process.env.JWT_KEY))
        //    return next()
        const t :any= verify(token, < string > process.env.JWT_KEY);
       
       (Date.now() >= t.exp * 1000 ) ? true : false 
    }

    
}