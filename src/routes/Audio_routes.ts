
import {Router} from 'express';
import { AudioMidd } from '../middlewares/audioMidd';



const route: Router = Router();
route.get('/audio',AudioMidd.checkAudio);
route.get('/audio/:id',AudioMidd.CheckoneAudio);

export { route as routeAudio}




 