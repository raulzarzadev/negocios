const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");

const cors = require("cors");

const app = express();

//settings
app.set("port", process.env.PORT || 3001);

//middlewares

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});
app.use(multer({ storage: storage }).single("image"));

//routes
app.use("/api/barrios", require("./routes/barrios.routes"));
app.use("/api/adverts", require("./routes/adverts.routes"));
app.use("/api/users", require("./routes/users.routes"));

module.exports = app;
