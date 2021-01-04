import { Router } from 'express';
import { AuthMiddle } from '../middlewares/Auth.middle';
import { UserController } from '../controller/UserController';
import {UserMiddle } from '../middlewares/User.middle';



// Declaration des route en rapport avec l'authentification , Authorization et connexion
const route: Router = Router();
route.post('/login',AuthMiddle.loginCheck);
route.put('/register',UserMiddle.registerCheck,UserController.register);

export { route as AuthRoute }