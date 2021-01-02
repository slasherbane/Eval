import { Router } from 'express';
import Bdd from '../bdd/bdd';

import { AuthMiddle } from '../middlewares/Auth.middle';
import { UserController } from '../controller/UserController';
import {UserMiddle } from '../middlewares/User.middle';
import { AuthController } from '../controller/AuthControler';


// declaration des route en rapport avec l'authentification , Authorization et connexion
const route: Router = Router();
route.post('/login',AuthMiddle.loginCheck,AuthController.login);
route.put('/register',UserMiddle.registerCheck,UserController.register);

export { route as AuthRoute }