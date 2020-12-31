import Bdd from '../bdd/bdd';
import Role from '../entities/Role';
export class TestController {


    static testBddConexxion = async (req: Request, res: any) => {
        let data: any = req.body;
        try {
            let a = await Bdd.select(Role)
            return res.status(200).json(a);
        } catch (err) {
            return res.status(401).json({ error: true, message: err.message }).end();
        }
    }

}