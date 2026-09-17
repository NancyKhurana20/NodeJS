const express = require("express");
const app = express();

const userModel = require("./usermodel");

app.get("/", function (req, res) {
  res.send("hey");
});

app.get("/create", async (req, res) => {
  let createdUser = await userModel.create({
    name: "Nancy",
    email: "nancy@gmail.com",
    username: "nancy",
  });
  res.send(createdUser);
});

app.get("/update", async (req, res) => {
  let user = await userModel.findOneAndUpdate(
    { username: "nancy" },
    { name: "Nancy Khurana" },
    { returnDocument: "after" },
  );
  res.send(user);
});

app.get("/read", async (req, res) => {
  let users = await userModel.find({ username: "nancy" });
  res.send(users);
});

app.get("/delete", async (req, res) => {
  let users = await userModel.findOneAndDelete({ username: "nancy" });
  res.send(users);
});
app.listen("3002", function () {
  console.log("Server running on http://localhost:3002");
});
