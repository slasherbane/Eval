
import bodyParser from "body-parser";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import Role from './src/entities/Role';
import User from './src/entities/User';
import Reflexion from './src/utils/Reflexion';
import Bdd from "./src/bdd/bdd";
import { HttpRoute } from "./src/routes/HttpService";
import { SubscriptionRoute } from "./src/routes/SubscriptionService";
import { AuthRoute } from "./src/routes/AuthService";


config();
try{
const app = express();

app.use(cors())
//app.use(bodyParser.json())
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
// si JWT a verifier partout mettre le middleware ici app.use() est generale app.type_methode ne concerne que cette route specific
//app.use('/auth',authMidd, AuthRoute); exemple 

app.listen(process.env.PORT, () => {
    console.log(`Server run to http://localhost:${process.env.PORT}`);
})
}catch(err){
    console.log("dezde")
}

