import { Request, Response } from 'express';
import Bdd from '../bdd/bdd';
import Role from '../entities/Role';
import User from '../entities/User';
import { ConnexionOrm } from '../bdd/ConnexionOrm';
import { jsonIgnoreReplacer, jsonIgnore } from 'json-ignore';
import { Connection, createConnection, createConnections, getConnection, getRepository } from "typeorm";
import Util from '../utils/Util';
import { decode, verify } from 'jsonwebtoken';

export class UserController {



    static register = async (req: Request, res: Response, next: () => void) => {
        try {

            let body = req.body;
            let u: User = new User(body["firstname"], body["lastname"], body["firstname"], body["email"], body["password"], body["date_naissance"], "Tuteur", body["sexe"], 0, null, null, 0, null);
            // ConnexionOrm.createUser(u);
            await createConnection().then(connection => {
                connection.manager.save(u).then(u => {
                    console.log("User saved " + u.$id);
                    connection.close()
                    let content = JSON.stringify(u, jsonIgnoreReplacer);
                    let test = JSON.parse(content);
                    return res.status(201).json({ error: "false", message: "L'utilisateur a bien été créé avec succès", test }).end();
                }).catch(err => {
                    connection.close()
                    if (err.code === "ER_DUP_ENTRY") {
                        return res.status(409).json({ error: "true", message: "Un compte utilisant cette adresse mail est déjà enregistré" }).end();
                    }
                });
            })
        } catch (err) {

            return res.status(500).json({ error: true, message: "server error" }).end();
        }

    }

    static suppress = async (req: Request, res: Response, next: () => void) => {
        const str: string = <string>req.headers.authorization;
        //const a = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDYsImZpcnN0bmFtZSI6InRlc3QiLCJsYXN0bmFtZSI6ImFsb3JzIiwiZW1haWwiOiJ0ZXNkIiwic2V4ZSI6IkhvbW1lIiwicm9sZSI6IlR1dGV1ciIsImRhdGVOYWlzc2FuY2UiOiIyMDIwLTEyLTEyVDAwOjAwOjAwLjAwMFoiLCJjcmVhdGVkQXQiOiIyMDIxLTAxLTAyVDA5OjMxOjEwLjAwMFoiLCJ1cGRhdGVkQXQiOm51bGwsInN1YnNjcmlwdGlvbiI6MCwiaWF0IjoxNjA5NTkzMDUwLCJleHAiOjE2MDk1OTMzNTB9.AQ0joMPj3aGwAhJAYd9LvF_jlAa2pTHcFZ1QVTUk-7c"
        const decodeStr: any = decode(Util.split(str))
        const idUser = parseInt(decodeStr["id"]);

        try {
            await createConnection();
        } catch (err) {
            await getConnection();
        }




        const repo = getRepository(User)

        repo.findOne(idUser).then(u => {
            if (u === undefined) {
                return res.status(401).json({ error: true, message: "Votre token n'est pas correct" }).end();
            }

            repo.delete(idUser).then(result => {
                console.log("ici")
                return res.status(200).json({ message: "c DELETE ^^" }).end();
            })
        })



    }
}