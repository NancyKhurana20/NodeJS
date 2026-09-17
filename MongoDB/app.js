const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("hey");
});

app.listen("3002", function () {
  console.log("Server running on http://localhost:3002");
});
