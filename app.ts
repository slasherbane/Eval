
require('dotenv').config()
const stripeSecretKey = process.env.STRIPE_SECRET_KEY

console.log(stripeSecretKey)


const express = require("express");
const app = express();
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.listen(3000, function () {
    console.log("localhost3000");
});