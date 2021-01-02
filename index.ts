import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./src/entities/User";
import {Banque} from "./src/entities/Banque";

createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.id = 3
    user.firstName = "testa1";
    user.lastName = "testi1";
    user.age = 12;

    const banque = new Banque();
    banque.id = 3;
    banque.firstName = "test";
    banque.lastName = "test2";
    banque.RIB = 1025468;
    banque.PASS = 1234;
    await connection.manager.save(user);
    await connection.manager.remove(banque);
    console.log("Saved a new user with id: " + banque.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    const banques = await connection.manager.find(Banque);
    console.log("Loaded users: ", users);
    console.log("Loaded accounts: ", banques);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
