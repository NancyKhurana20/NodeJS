const express = require("express");
const app = express();

const path = require("path");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("./config/mongoose-connection");

const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/users", usersRouter);
app.use("/owners", ownersRouter);
app.use("/products", productsRouter);

app.listen("3009", function () {
  console.log("Server running on http://localhost:3009");
});
