const express = require("express");
const app = express();

const router = require("./routes/index");

app.use("/api", router);

app.listen(3000, () => console.log('Server running on port 3000!'))