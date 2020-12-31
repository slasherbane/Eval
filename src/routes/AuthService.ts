import { Router } from 'express';
import Bdd from '../bdd/bdd';


// declaration des route en rapport avec l'authentification , Authorization et connexion
const route: Router = Router();
route.post('/login');
route.post('/register');

export { route as AuthRoute }