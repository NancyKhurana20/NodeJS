const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

app.use(cookieParser());

app.get("/", function (req, res) {
  //Creation of a cookie
  res.cookie("name", "nancy");
  res.send("done");
});

app.get("/read", function (req, res) {
  //same cookie created on "/" will be present here on read route also
  //for consoling the cookie we need to cookie-parser so we need to install that and then also require and use it
  console.log(req.cookies);
  res.send("reader page");
});

app.listen("3003", function () {
  console.log("Server running on http://localhost:3003");
});
