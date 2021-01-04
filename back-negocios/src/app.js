const express = require("express");
const morgan = require("morgan");

const cors = require("cors");

const app = express();

//settings
app.set("port", process.env.PORT || 3001);

//middlewares

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//routes
app.use("/api/barrios", require("./routes/barrios.routes"));
app.use("/api/adverts", require("./routes/adverts.routes"));

module.exports = app;
