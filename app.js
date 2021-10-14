const express = require("express");
const app = express();

app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({extended: true, type: "application/x-www-form-urlencoded"})); //Parse URL-encoded bodies

const router = require("./routes/index");

app.use("/api", router);




app.listen(8000, () => console.log('Server running on port 8000!'))