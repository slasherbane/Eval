import { Router } from 'express';

import { AuthMiddle } from '../middlewares/Auth.middle';
import { UserController } from '../controller/UserController';
import { UserMiddle } from '../middlewares/User.middle';


// Declaration de route concernant leqs informations direct du user
const route: Router = Router();

route.post('/user/child',AuthMiddle.token,AuthMiddle.tokenRole,UserMiddle.registerCheck,UserController.registerChild)
//route.post('/register', registerMidd, AuthController.register)

export { route as ChildRoute }