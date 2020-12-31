import { Router } from 'express';
import Bdd from '../bdd/bdd';

// Declaration de route concernant leqs informations direct du user
const route: Router = Router();
route.put('/user')
route.delete('/user')
//route.post('/register', registerMidd, AuthController.register)

export { route as UserRoute }