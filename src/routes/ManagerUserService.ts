import { Router } from 'express';

import { AuthMiddle } from '../middlewares/Auth.middle';
import { UserController } from '../controller/UserController';
import { UserMiddle } from '../middlewares/User.middle';

// Declaration de route concernant leqs informations direct du user
const route: Router = Router();
route.put('/user')
route.delete('/user',AuthMiddle.token,UserController.suppress)
route.delete('/user/off',AuthMiddle.token,UserController.disconnect)
route.put('/user',AuthMiddle.token,UserMiddle.modifyCheck,UserController.modify)
//route.post('/register', registerMidd, AuthController.register)

export { route as UserRoute }