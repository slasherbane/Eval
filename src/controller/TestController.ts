
import { Request, Response } from 'express';
export class TestController {
    static testBddConexxion = async (req: Request, res: any) => {
        let data: any = req.body;
        try {
            //let a = await Bdd.select(Role)
            return res.status(200).json();
        } catch (err) {
            return res.status(401).json({ error: true, message: err.message }).end();
        }
    }
}