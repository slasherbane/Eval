import { Router } from 'express';
import Bdd from '../bdd/bdd';
import { TestController } from '../controller/TestController';

// Declaration des route de test et d'initialisation de /
const route: Router = Router();
route.get('/', (req: any, res: any) => {
    return res.end('<h1>OOUUUIII tu es connecté</h1>  <link href=" "')
})


route.post('/test',TestController.testBddConexxion)
//route.post('/register', registerMidd, AuthController.register)

export { route as HttpRoute }