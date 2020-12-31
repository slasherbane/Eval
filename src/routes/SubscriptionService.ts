import { Router } from 'express';
import Bdd from '../bdd/bdd';

// Declaration des route en rapport avec la fourniture de service ( facture , souscription )
const route: Router = Router();
route.put('/subscription');
route.get('/bills');

export { route as SubscriptionRoute }