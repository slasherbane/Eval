import { Router } from 'express';
import Bdd from '../bdd/bdd';
import { UserMiddle } from '../middlewares/User.middle';


// declaration des route en rapport avec l'authentification , Authorization et connexion
const route: Router = Router();
route.post('/login');
route.put('/register',UserMiddle.register);

export { route as AuthRoute }