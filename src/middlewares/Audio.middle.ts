import { Request, Response } from "express";
import { Error } from '../error/Error';
import Util from '../utils/Util';

export class AudioMiddle {
    static audioCheck = async (req: Request, res: Response, next: () => void) => {

        if( req.params["id"] === undefined || req.params["id"] === ""){
            return Error.E409Audio(res);
        }     
        
        next()
    }

    static subscriptionCheck = async (req: Request, res: Response, next: () => void) => {
        const decodeStr:any = Util.getDecodeBearer(req);
        if(decodeStr["subscription"] === 0 ){
            return Error.E403Audio(res);
        }
        next()
    }
}