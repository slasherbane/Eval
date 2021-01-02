require('dotenv').config();
var stripeSecretKey = process.env.STRIPE_SECRET_KEY;
console.log(stripeSecretKey);
var express = require("express");
var app = express();
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
app.listen(3000, function () {
    console.log("localhost3000");
});
//# sourceMappingURL=app.js.map