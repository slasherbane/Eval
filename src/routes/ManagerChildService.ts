import { Router } from 'express';

import { AuthMiddle } from '../middlewares/Auth.middle';
import { UserController } from '../controller/UserController';
import { UserMiddle } from '../middlewares/User.middle';


// Declaration de route concernant leqs informations direct du user
const route: Router = Router();

route.post('/user/child',AuthMiddle.token,AuthMiddle.tokenRole,UserMiddle.registerCheck,UserController.registerChild)
route.delete('/user/child',AuthMiddle.token,AuthMiddle.tokenRole,UserController.suppressChild)
route.get('/user/child',AuthMiddle.token,AuthMiddle.tokenRole,UserMiddle.suppressChildCheck,UserController.listChild)
export { route as ChildRoute }