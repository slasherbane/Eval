
import bodyParser from "body-parser";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import User from './src/entities/User';
import Reflexion from './src/utils/Reflexion';
import { HttpRoute } from "./src/routes/HttpService";
import { SubscriptionRoute } from "./src/routes/SubscriptionService";
import { AuthRoute } from "./src/routes/AuthService";
import { UserRoute } from "./src/routes/ManagerUserService";
import { ChildRoute } from "./src/routes/ManagerChildService";
import { AudioRoute } from "./src/routes/AudioService";


config();
try{
const app = express();

app.use(cors())
//leger changement du parse Json par defaut afin qu'il renvoie un 409 en cas de contenu vide
app.use((req, res, next) => {
    bodyParser.json({
        verify: addRawBody,
    })(req, res, (err) => {
        if (err) {
            console.log(err);
            res.status(409).json({error:"true",message:"Une ou plusieurs données sont erronées"});
            return;
        }
        next();
    });
});

function addRawBody(req:any, res:any, buf:any, encoding:any) {
    req.rawBody = buf.toString();
     
}
app.use(bodyParser.urlencoded({ extended: true }))
app.use(HttpRoute);
app.use(AuthRoute);
app.use(UserRoute);
app.use(ChildRoute);
app.use(AudioRoute)
// si JWT a verifier partout mettre le middleware ici app.use() est generale app.type_methode ne concerne que cette route specific
//app.use('/auth',authMidd, AuthRoute); exemple 

app.listen(process.env.PORT, () => {
    console.log(`Server run to http://localhost:${process.env.PORT}`);
})
}catch(err){
    console.log(err)
}

