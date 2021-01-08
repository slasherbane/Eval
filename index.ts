import "reflect-metadata";
import {createConnection, getConnection} from "typeorm";
import {User} from "./src/entities/User";
import {Audio} from "./src/entities/Audio";
import { Response, Request } from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";
import express from "express";
import { routeAudio } from "./src/routes/Audio_routes";


 
const affichage = async (req: Request, res: Response) => {
    
    try {
        await createConnection();
    } catch (err) {
        await getConnection();
    }
    
    const connection = await getConnection()

        console.log("Inserting a new user into the database...");
        const user = new User();
        user.id = 3
        user.firstName = "Zoubida";
        user.lastName = "cd";
        user.age = 20;
    
        const audio = new Audio(new Date()) 
        audio.name = "test2";
        audio.url = "https://www.youtube.com/watch?v=YQHsXMglC9A&list=PLc7M6di8_xBtaqBickFmlGxldFiM9jXwy&index=1";
        audio.time = "6:06";
        // await connection.manager.save(user);
        //await connection.manager.save(audio);
        console.log("id de la chanson: " + audio.id);
    
        console.log("Loading users from the database...");
        const users = await connection.manager.find(User);
        const banques = await connection.manager.find(Audio);
        console.log("Loaded users: ", users);
        //console.log("Loaded accounts: ", banques);
    
        console.log("Zoubida");
    
    }


config();
const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routeAudio)
app.listen(process.env.PORT, () => {
    console.log('Server run to http://localhost:${process.env.PORT}');
})

