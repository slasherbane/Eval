import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Audio } from "../entities/Audio";
import { Error } from '../error/Error';
import Util from "../utils/Util";

export class AudioController {
    static getAllAudio = async (req: Request, res: Response, next: () => void) => {

        await Util.getOrCreateConnexion()
        let repository = await getRepository(Audio)

        await repository.find({ order: { id: "ASC" } }).then(result => {

            if ((result === undefined)) {
                return Error.E403Audio(res)

            } else {
                return res.status(200).json({
                    error: "false", songs: result
                })
            }
        })


    }


    static getOneAudio = async (req: Request, res: Response, next: () => void) => {

 
        await Util.getOrCreateConnexion();
        let repository = await getRepository(Audio)
        await repository.findOne({ where: { id: req.params["id"] } }).then(result => {

            if ((result === undefined)) {
                return Error.E409Audio(res);
            } else {
                return res.status(200).json({
                    error: "false", song: result
                })
            }
        })

    }
}