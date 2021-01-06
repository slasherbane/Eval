import { decode, sign, verify } from "jsonwebtoken";
import User from "../entities/User";

export class JWTSecurity {
    
    // encode un token avec les informations utilisateur
    static encode(u: User) {
        return sign({
            id: u.$id,
            firstname: u.$firstname,
            lastname: u.$lastname,
            password:u.$password,
            email: u.$email,
            sexe: u.$sexe,
            role: u.$role,
            dateNaissance: u.$date_naissance,
            createdAt: u.$createdAt,
            updatedAt: u.$updatedAt,
            subscription: u.$subscription,
            connected:u.$connected,
            try:u.$try,
            parent:u.$parent
        }
            , <string>process.env.JWT_KEY, { expiresIn: "300s"})
    }

    // absence du hashage du mot de passe

    
}