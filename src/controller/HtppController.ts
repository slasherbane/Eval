import { Request, Response } from 'express';
var path = require('path');

export class HttpController {
    static htmlPage = (req: Request, res: Response, next: () => void) => {
        try {
            return res.sendFile(path.join(__dirname + '/html/accueil.html'));
        } catch (err) {
            return res.status(404).json({ error: true, message: err.message }).end();
        }
    }
}