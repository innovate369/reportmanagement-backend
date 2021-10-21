const express = require("express");
const cors = require('cors');
const app = express();


const url = require('url');
const querystring = require('querystring');

app.use(express.json());
app.use(express.urlencoded({extended: true, type: "application/x-www-form-urlencoded"}));
app.use(express.static(`${__dirname}/uploads`))
app.use(cors());

const router = require("./routes/index");

app.use("/api", router);




app.listen(3000, () => console.log('Server running on port 3000!'))