
import bodyParser from "body-parser";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import Role from './src/entities/Role';
import User from './src/entities/User';
import Reflexion from './src/utils/Reflexion';
import Bdd from "./src/bdd/bdd";


config();

//console.log("test");

//let a  = Reflexion.getFields(Role);
//console.log(a);
//Bdd.select(Role).then(function(result) {
 //   console.log(result); // "initResolve"
 //   return ;
 // });
//Bdd.Asyncfun();
