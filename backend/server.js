const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const colors = require("colors");
const morgan = require("morgan");
const port = process.env.PORT;
app.use(express.json());
const cors = require("cors");
const authRoutes = require("./routes/authRoute");
// app.use(express.static("public"));
// app.use(express.static("views"));

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.get("/", (req, res) => {    
    res.send("hello");
});
app.use("/api/v1/auth", authRoutes);

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB".bgGreen.white.bold))
    .catch((err) => console.log(err));

app.listen(port, () => {
    console.log("Backend server is running http://localhost:" + port);
});