import { Request, Response } from 'express';
import User from '../entities/User';
import { jsonIgnoreReplacer, jsonIgnore } from 'json-ignore';
import { Connection, createConnection, createConnections, getConnection, getRepository } from "typeorm";
import Util from '../utils/Util';
import { decode, verify } from 'jsonwebtoken';
import { Error } from '../error/Error';
import { UserMiddle } from '../middlewares/User.middle';
import { PasswordUtil } from '../utils/PasswordUtil';

export class UserController {

    //Enregistre un nouvelle utilisateur en bdd
    static register = async (req: Request, res: Response, next: () => void) => {
        try {
            const body = req.body;
            console.log("allo ?")
            const hashPass = await PasswordUtil.makeHash(body["password"]);
            console.log("allo 2 ?")
            const u: User = new User(body["firstname"], body["lastname"], body["firstname"],<string>body["email"].toLowerCase().trim(), hashPass, body["date_naissance"], "Tuteur", body["sexe"], 0, null, null, 0, null);
            await Util.getOrCreateConnexion();
            let co = getConnection();
            
            await co.manager.save(u).then(u => {
                const content = JSON.stringify(u, jsonIgnoreReplacer);
                const test = JSON.parse(content);
                return res.status(201).json({ error: "false", message: "L'utilisateur a bien été créé avec succès", test }).end();
            }).catch(err => {

                if (err.code === "ER_DUP_ENTRY") {
                    return Error.E409(res);
                }
            });

        } catch (err) {
            console.log("Erreur register " + err)
            return res.status(500).json({ error: true, message: "server error" }).end();
        }
    }

    // enregistyre un enfant depuis le token d'un parent a des propriété similaire a la fonction au dessus
    static registerChild = async (req: Request, res: Response, next: () => void) => {
        try {
            const body = req.body;
            const hashPass = await PasswordUtil.makeHash(body["password"]);
            let child: User = new User(body["firstname"], body["lastname"], body["firstname"], body["email"].toLowerCase().trim(), hashPass, body["date_naissance"], "Enfant", body["sexe"], 1, null, null, 0, null);
            const uid = Util.getIdUserFromBearer(req)
            // verification de la connexion a la bdd
            await Util.getOrCreateConnexion();
            let co = getConnection();
            await co.manager.findAndCount<User>(User, { where: { parent: uid } }).then(async results => {
                if (results[1] >= 3) {
                    return Error.E409Child(res);
                } else {
                    child.$parent = uid;
                    await co.manager.save(child).then(u => {
                        const content = JSON.stringify({ firstname: u.$firstname, lastname: u.$lastname, sexe: u.$sexe, role: u.$role, dateNaissance: u.$date_naissance?.toString(), createdAt: u.$createdAt.toString(), updatedAt: u.$updatedAt?.toString(), subscription: u.$subscription });
                        const test = JSON.parse(content);
                        return res.status(201).json({ error: "false", message: "Votre enfant a bien  été créé avec succès", user: test }).end();
                    })
                }
            })
        } catch (err) {
            console.log("Erreur registerChild " + err)
            return Error.E500(res, err);
        }
    }



    static suppress = async (req: Request, res: Response, next: () => void) => {
        try {
            const idUser = Util.getIdUserFromBearer(req)
            await Util.getOrCreateConnexion();
            const repo = getRepository(User)
            await repo.findOne(idUser).then(async u => {
                if (u === undefined) {
                    return Error.E401(res);
                }
                await repo.delete(idUser).then(result => {
                    return res.status(200).json({ error: "false", message: "Votre compte a été supprimée avec succès" }).end();
                })
            })
        } catch (err) {
            console.log("Erreur suppress " + err)
            return Error.E500(res, err)
        }
    }

    static suppressChild = async (req: Request, res: Response, next: () => void) => {
        try {
            if (Util.checkVal(req.body["id child"])) {
                return Error.E403Child(res)
            }

            const decodeStr: any = Util.getDecodeBearer(req)
            const idUser = parseInt(decodeStr["id"]);
            const repo = await Util.openUserRepo();
            await repo.findOne(req.body["id child"]).then(async u => {
                if (u === undefined) {
                    return Error.E403Child(res)
                }
                if (!(u.$parent === idUser)) {
                    return Error.E403Child(res)
                }
                await repo.delete(req.body["id child"]).then(result => {
                    return res.status(200).json({ error: "false", message: "L'utilisateur a été supprimée avec succès" }).end();
                })
            })
        } catch (err) {
            console.log("Erreur suppressChild " + err)
            return Error.E500(res, err);
        }
    }

    static listChild = async (req: Request, res: Response, next: () => void) => {
        try {
            const uid: number = Util.getIdUserFromBearer(req);
            // verification de la connexion a la bdd
            await Util.getOrCreateConnexion();
            let co = getConnection();
            await co.manager.findAndCount<User>(User, { where: { parent: uid } }).then(async results => {
                console.log(results[1])
                if (results === undefined || results[1] < 1 || results[1] === undefined) {
                    return Error.E409(res);
                } else {
                    let listUser: any = [];
                    for (const us of results[0]) {
                        const content = JSON.stringify({ firstname: us.$firstname, lastname: us.$lastname, sexe: us.$sexe, role: us.$role, dateNaissance: us.$date_naissance?.toString(), createdAt: us.$createdAt.toString(), updatedAt: us.$updatedAt?.toString(), subscription: us.$subscription });
                        const child = JSON.parse(content);
                        listUser.push(child)
                    }
                    return res.status(200).json({ error: "false", users: listUser })
                }
            })
        } catch (err) {
            console.log("Erreur lisChild " + err)
            return Error.E500(res, err);
        }
    }

    static modify = async (req: Request, res: Response, next: () => void) => {

        const decodeStr: any = Util.getDecodeBearer(req);
        const body = req.body;
        const u: User = new User(decodeStr["firstname"], decodeStr["lastname"], decodeStr["firstname"], decodeStr["email"], decodeStr["password"], decodeStr["dateNaissance"], decodeStr["role"], decodeStr["sexe"], decodeStr["subscription"], decodeStr["createdAt"], decodeStr["updatedAt"], decodeStr["try"], decodeStr["parent"]);
        u.$id = decodeStr["id"];
        u.$updatedAt = new Date();

        if (!(Util.checkVal(body["firstname"]))) {
            u.$firstname = body["firstname"];
        }
        if (!(Util.checkVal(body["lastname"]))) {
            u.$lastname = body["lastname"];
        }
        if (!(Util.checkVal(body["date_naissance"]))) {
            u.$date_naissance = body["date_naissance"];
        }
        if (!(Util.checkVal(body["sexe"])) && !(UserMiddle.checkSexe(body["sexe"]))) {
            u.$sexe = body["sexe"];
        }

        await Util.getOrCreateConnexion();
        let co = getConnection();
        await co.manager.getRepository(User).update(<number>u.$id, u).then(u => {
            console.log(u);
        })

        return res.status(200).json({ error:"false", message: "Vos données ont été mises à jour" })
    }

    static disconnect = async (req: Request, res: Response, next: () => void) => {
        try {
            const decodeStr: any = Util.getDecodeBearer(req);
            const idUser = Util.getIdUserFromBearer(req)
            const connected = decodeStr["connected"];
            const repo = await Util.openUserRepo();
            await repo.findOne(idUser).then(async u => {
                if (connected == true && u?.$connected == true) {
                    u.$connected = false;
                    await repo.save(u);
                    return res.status(200).json({ error: "false", message: "L'utilisateur a été déconnecté avec succès" }).end();
                } else {
                    return Error.E401(res);
                }
            })
        } catch (err) {
            console.log("Erreur diconnect " + err)
            return Error.E500(res, err);
        }
    }



}