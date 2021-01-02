import { Request, Response } from 'express';
import User from '../entities/User';
import { jsonIgnoreReplacer, jsonIgnore } from 'json-ignore';
import { Connection, createConnection, createConnections, getConnection, getRepository } from "typeorm";
import Util from '../utils/Util';
import { decode, verify } from 'jsonwebtoken';

export class UserController {

    //enregistre un nouvelle utilisateur en bdd
    static register = async (req: Request, res: Response, next: () => void) => {
        try {
            const body = req.body;
            let u: User = new User(body["firstname"], body["lastname"], body["firstname"], body["email"], body["password"], body["date_naissance"], "Tuteur", body["sexe"], 0, null, null, 0, null);
            await createConnection().then(async connection => {
                await connection.manager.save(u).then(u => {
                    connection.close()
                    const content = JSON.stringify(u, jsonIgnoreReplacer);
                    const test = JSON.parse(content);
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

    // enregistyre un enfant depuis le token d'un parent a des propriété similaire a la fonction au dessus
    static registerChild = async (req: Request, res: Response, next: () => void) => {
        try {
            const body = req.body;
            let child: User = new User(body["firstname"], body["lastname"], body["firstname"], body["email"], body["password"], body["date_naissance"], "Enfant", body["sexe"], 1, null, null, 0, null);
            const str: string = <string>req.headers.authorization;
            const decodeStr: any = decode(Util.split(str))
            const uid: number = decodeStr["id"]
            // verification de la connexion a la bdd
            try {
                await createConnection();
            } catch (err) {
                await getConnection();
            }
            let co = getConnection();
            await co.manager.findAndCount<User>(User, { where: { parent: uid } }).then(async results => {
                console.log(results[1])
                if (results[1] >= 3) {
                    return res.status(409).json({ error: "true", message: "Vous avez dépassé le cota de trois enfants" }).end();
                } else {
                    child.$parent = uid;
                    await co.manager.save(child).then(u => {
                        const content = JSON.stringify(u, jsonIgnoreReplacer);
                        const test = JSON.parse(content);
                        return res.status(201).json({ error: "false", message: "L'utilisateur a bien été créé avec succès", test }).end();

                    })

                }
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: true, message: "server error" }).end();
        }
    }



    static suppress = async (req: Request, res: Response, next: () => void) => {
        const str: string = <string>req.headers.authorization;
        const decodeStr: any = decode(Util.split(str))
        const idUser = parseInt(decodeStr["id"]);
        try {
            await createConnection();
        } catch (err) {
            await getConnection();
        }
        const repo = getRepository(User)
        await repo.findOne(idUser).then(u => {
            if (u === undefined) {
                return res.status(401).json({ error: "true", message: "Votre token n'est pas correct" }).end();
            }
            repo.delete(idUser).then(result => {
                console.log("ici")
                return res.status(200).json({ error: "false", message: "Votre compte a été supprimée avec succès" }).end();
            })
        })
    }

    static disconnect = async (req: Request, res: Response, next: () => void) => {
        const str: string = <string>req.headers.authorization;
        const decodeStr: any = decode(Util.split(str))
        const idUser = parseInt(decodeStr["id"]);
        const connected = decodeStr["connected"];
        try {
            await createConnection();
        } catch (err) {
            await getConnection();
        }
        const repo = getRepository(User)
        await repo.findOne(idUser).then(async u => {
            if (connected == true && u?.$connected == true) {
                u.$connected = false;
                await repo.save(u);
                return res.status(200).json({ error: "false", message: "L'utilisateur a été déconnecté avec succès" }).end();
            } else {
                return res.status(401).json({ error: "true", message: "Votre token n'est pas correct" }).end();
            }
        })
    }
}