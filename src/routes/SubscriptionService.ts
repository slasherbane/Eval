import { Router } from 'express';
import Bdd from '../bdd/bdd';
import { UserMiddle } from '../middlewares/User.middle';
import { UserController } from '../controller/UserController';

// Declaration des route en rapport avec la fourniture de service ( facture , souscription )
const route: Router = Router();
route.put('/subscription' );
route.get('/bills');

export { route as SubscriptionRoute }