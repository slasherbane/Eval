import { Connection, createConnection, createConnections, getConnection, getRepository, Repository } from "typeorm";
import { Audio } from "../entities/Audio";
import { Request, Response } from 'express';
import { User } from '../entities/User';



export class AudioMidd {

    static checkAudio = async (req: Request, res: Response, next: () => void) => {
        let data: any = req.body;
        try {
            await createConnection();
        } catch (err) {
            await getConnection();
        }
        console.log(Audio);

        let repository = getRepository(Audio)
        console.log(Audio)
        await repository.find({ order: { id: "ASC" } }).then(result => {

            if ((result === undefined)) {
                return res.status(400).json({ error: "true", message: "essai encore bouffon !!" })

            } else {
                
             
                console.log(result[0]);
                console.log(result[1]);
                return res.status(200).json({
                    error: "false", songs: result
                })
            }
        })


    }


    static CheckoneAudio = async (req: Request, res: Response, next: () => void) => {

        console.log(req.params["id"])
    }
}

