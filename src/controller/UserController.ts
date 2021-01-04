import { Request, Response } from 'express';
import User from '../entities/User';
import { jsonIgnoreReplacer, jsonIgnore } from 'json-ignore';
import { Connection, createConnection, createConnections, getConnection, getRepository } from "typeorm";
import Util from '../utils/Util';
import { decode, verify } from 'jsonwebtoken';

export class UserController {

    //Enregistre un nouvelle utilisateur en bdd
    static register = async (req: Request, res: Response, next: () => void) => {
        try {
            const body = req.body;
            const u: User = new User(body["firstname"], body["lastname"], body["firstname"], body["email"], body["password"], body["date_naissance"], "Tuteur", body["sexe"], 0, null, null, 0, null);
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
            console.log("Erreur register " + err)
            return res.status(500).json({ error: true, message: "server error" }).end();
        }
    }

    // enregistyre un enfant depuis le token d'un parent a des propriété similaire a la fonction au dessus
    static registerChild = async (req: Request, res: Response, next: () => void) => {
        try {
            const body = req.body;
            let child: User = new User(body["firstname"], body["lastname"], body["firstname"], body["email"], body["password"], body["date_naissance"], "Enfant", body["sexe"], 1, null, null, 0, null);
            const str: string = <string>req.headers.authorization;
            const decodeStr: any = decode(Util.bearer(str))
            const uid: number = decodeStr["id"]
            // verification de la connexion a la bdd
            await Util.getOrCreateConnexion();
            let co = getConnection();
            await co.manager.findAndCount<User>(User, { where: { parent: uid } }).then(async results => {
                if (results[1] >= 3) {
                    return res.status(409).json({ error: "true", message: "Vous avez dépassé le cota de trois enfants" }).end();
                } else {
                    child.$parent = uid;
                    await co.manager.save(child).then(u => {
                        const content = JSON.stringify({ firstname: u.$firstname, lastname: u.$lastname, sexe: u.$sexe, role: u.$role, dateNaissance: u.$date_naissance, createdAt: u.$createdAt, updatedAt: u.$updatedAt, subscription: u.$subscription });
                        const test = JSON.parse(content);
                        return res.status(201).json({ error: "false", message: "Votre enfant a bien  été créé avec succès", user: test }).end();

                    })

                }
            })
        } catch (err) {
            console.log("Erreur registerChild " + err)
            return res.status(500).json({ error: true, message: "server error" }).end();
        }
    }



    static suppress = async (req: Request, res: Response, next: () => void) => {
        try {
            const str: string = <string>req.headers.authorization;
            const decodeStr: any = decode(Util.bearer(str))
            const idUser = parseInt(decodeStr["id"]);
            await Util.getOrCreateConnexion();
            const repo = getRepository(User)
            await repo.findOne(idUser).then(async u => {
                if (u === undefined) {
                    return res.status(401).json({ error: "true", message: "Votre token n'est pas correct" }).end();
                }
                await repo.delete(idUser).then(result => {
                    return res.status(200).json({ error: "false", message: "Votre compte a été supprimée avec succès" }).end();
                })
            })
        } catch (err) {
            console.log("Erreur suppress " + err)
            return res.status(500).json({ error: true, message: "server error" }).end();
        }
    }

    static suppressChild = async (req: Request, res: Response, next: () => void) => {
        try {
            if (Util.checkVal(req.body["id child"])) {
                return res.status(403).json({ error: "true", message: "Vous ne pouvez pas supprimer cet enfant" })
            }
            await Util.getOrCreateConnexion();
            const str: string = <string>req.headers.authorization;
            const decodeStr: any = decode(Util.bearer(str))
            const idUser = parseInt(decodeStr["id"]);
            const repo = getRepository(User)
            await repo.findOne(req.body["id child"]).then(async u => {
                if (u === undefined) {
                    return res.status(403).json({ error: "true", message: "Vous ne pouvez pas supprimer cet enfant" })
                }
                if (!(u.$parent === idUser)) {
                    return res.status(403).json({ error: "true", message: "Vous ne pouvez pas supprimer cet enfant" })
                }
                await repo.delete(req.body["id child"]).then(result => {
                    return res.status(200).json({ error: "false", message: "L'utilisateur a été supprimée avec succès" }).end();
                })
            })
        } catch (err) {
            console.log("Erreur suppressChild " + err)
            return res.status(500).json({ error: true, message: "server error" }).end();
        }

    }

    static listChild = async (req: Request, res: Response, next: () => void) => {
        try {
            const str: string = <string>req.headers.authorization;
            const decodeStr: any = decode(Util.bearer(str))
            const uid: number = decodeStr["id"]
            // verification de la connexion a la bdd
            await Util.getOrCreateConnexion();
            let co = getConnection();
            await co.manager.findAndCount<User>(User, { where: { parent: uid } }).then(async results => {
                console.log(results[1])
                if (results === undefined || results[1] < 1 || results[1] === undefined) {
                    return res.status(409).json({ error: "true", message: "Une ou plusieurs données sont erronées" }).end();
                } else {
                    let listUser: any = [];
                    for (const us of results[0]) {
                        const content = JSON.stringify({ firstname: us.$firstname, lastname: us.$lastname, sexe: us.$sexe, role: us.$role, dateNaissance: us.$date_naissance, createdAt: us.$createdAt, updatedAt: us.$updatedAt, subscription: us.$subscription });
                        const child = JSON.parse(content);
                        listUser.push(child)
                    }
                    return res.status(200).json({ error: "false", users: listUser })
                }
            })
        } catch (err) {
            console.log("Erreur lisChild " + err)
            return res.status(500).json({ error: true, message: "server error" }).end();
        }
    }

    static disconnect = async (req: Request, res: Response, next: () => void) => {
        try {
            const str: string = <string>req.headers.authorization;
            const decodeStr: any = decode(Util.bearer(str))
            const idUser = parseInt(decodeStr["id"]);
            const connected = decodeStr["connected"];
            await Util.getOrCreateConnexion();
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
        } catch (err) {
            console.log("Erreur diconnect " + err)
            return res.status(500).json({ error: true, message: "server error" }).end();
        }
    }
}