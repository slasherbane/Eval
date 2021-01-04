import { Router } from 'express';
import { TestController } from '../controller/TestController';
import express from 'express';
import { HttpController } from '../controller/HtppController';


// Declaration des route de test et d'initialisation de /
const route: Router = Router();
route.get('/', HttpController.htmlPage);

export { route as HttpRoute }