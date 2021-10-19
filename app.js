const express = require("express");
const app = express();
const url = require('url');
const querystring = require('querystring');

app.use(express.json());
app.use(express.urlencoded({extended: true, type: "application/x-www-form-urlencoded"}));

const router = require("./routes/index");

app.use("/api", router);




app.listen(8000, () => console.log('Server running on port 8000!'))