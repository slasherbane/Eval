import { Request, Response } from 'express';

export class HttpController{



    static htmlPage= (req: Request, res: Response, next: () => void) => {
     try {
          

         let b :Object[] = req.body;
        
         console.log("test body "+  JSON.stringify(b));
         console.log(req.body["test"]);
          return res.status(200).end();
        } catch (err) {
            return res.status(404).json({ error: true, message: err.message }).end();
        }
    
    }
}