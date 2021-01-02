import { Router } from 'express';
import Bdd from '../bdd/bdd';
import { TestController } from '../controller/TestController';
import express from 'express';
import { HttpController } from '../controller/HtppController';
import { ConnexionOrm } from '../bdd/ConnexionOrm';

// Declaration des route de test et d'initialisation de /
const route: Router = Router();
route.get('/', HttpController.htmlPage);
route.post('/test',TestController.testBddConexxion)
//route.get('/orm',ConnexionOrm.getUser)
//route.post('/register', registerMidd, AuthController.register)

export { route as HttpRoute }