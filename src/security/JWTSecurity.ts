import { decode, sign, verify } from "jsonwebtoken";
import User from "../entities/User";

export class JWTSecurity {


    public encode(u: User) {

        return sign({
            id: u.$id,
            firstname: u.$firstname,
            lastname: u.$lastname,
            email: u.$email,
            sexe: u.$sexe,
            role: u.$role.$id,
            dateNaissance: u.$date_naissance,
            createdAt: u.$createdAt,
            updatedAt: u.$updatedAt,
            subscription: u.$subscription
        }
            , <string>process.env.JWT_KEY, { expiresIn: "300s" })
    }

    public isExpired(token: string) {
        console.log("date now" + Date.now());
        // if (req.headers.authorization && verify(split(req.headers.authorization), < string > process.env.JWT_KEY))
        //    return next()
        const t :any= verify(token, < string > process.env.JWT_KEY);
       
       (Date.now() >= t.exp * 1000 ) ? true : false
     
       
    }
}