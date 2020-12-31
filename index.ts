
import bodyParser from "body-parser";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import Role from './src/entities/Role';
import User from './src/entities/User';
import Reflexion from './src/utils/Reflexion';
import Bdd from "./src/bdd/bdd";
import { HttpRoute } from "./src/routes/HttpService";


config();

//console.log("test");

//let a  = Reflexion.getFields(Role);
//console.log(a);
//Bdd.select(Role).then(function(result) {
 //   console.log(result); // "initResolve"
 //   return ;
 // });
//Bdd.Asyncfun();

const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// app.get('/', (req: any, res: any) => {
//     res.end("<h1>Hello Mike!</h1>")
// })

// app.post('/', authMidd, (req: any, res: any) => {
//     res.end("<h1>Hello is good!</h1>")
// })
// app.post('/register', registerMidd, AuthController.register)
// app.post('/login',loginMidd,AuthController.login)

app.use(HttpRoute);// si JWT a verifier partout mettre le middleware ici app.use() est generale app.type_methode ne concerne que cette route specific
//app.use('/auth',authMidd, AuthRoute); exemple 
app.listen(process.env.PORT, () => {
    console.log(`Server run to http://localhost:${process.env.PORT}`);
})