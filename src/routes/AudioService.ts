

import {Router} from 'express';
import { AuthMiddle } from '../middlewares/Auth.middle';
import { AudioMiddle } from '../middlewares/Audio.middle';
import { AudioController } from '../controller/AudioController';





const route: Router = Router();
route.get('/songs',AuthMiddle.token,AudioMiddle.subscriptionCheck,AudioController.getAllAudio);
route.get('/songs/:id',AuthMiddle.token,AudioMiddle.subscriptionCheck,AudioMiddle.audioCheck,AudioController.getOneAudio);

export { route as AudioRoute}