// Module Npm,,library
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const methodOverride = require("method-override");
const cors = require("cors");
// Penggunaan Npm express
const app = express();

//Port lokalhost pada website
const port = process.env._PORT;

//Koneksi kedatabase
mongoose.set("strictQuery", false);
mongoose
  .connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`)
  .then(() => {
    console.log("Database has been connected");
  })
  .catch((err) => {
    console.log("database not connected");
  });

// express setup
app.use(methodOverride("_"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env._SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
// Menggunakan middleware CORS untuk mengatasi keterbatasan akses pada endpoint
app.use(cors());

// middleware routes
require("./src/routes")(express, app);

app.listen(port, () => {
  console.log(`Server ${port} Activided`);
});
