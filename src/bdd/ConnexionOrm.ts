
import { Connection, createConnection, createConnections } from "typeorm";
import Role from '../entities/Role';
import { Request, Response } from 'express';
import User from '../entities/User';

export class ConnexionOrm {
    static createUser(user:User){
        createConnection().then(connection => {
            connection.manager.save(user).then(u => {
                console.log("User saved "+u.$id);
            })        
        })
    }

    static getUser (e:string) {      
       createConnection().then(async connection => {
            const repository = connection.getRepository(User);
         await repository.findOne({where:{email : e }})
        
        })
    }

   

}