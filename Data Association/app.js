const express = require("express");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");

app.get("/", function (req, res) {
  res.send("hey");
});

app.get("/create", async function (req, res) {
  let user = await userModel.create({
    username: "nancy",
    email: "nancy@gmail.com",
    age: 20,
  });
  res.send(user);
});

app.get("/post/create", async function (req, res) {
  let post = await postModel.create({
    postdata: "Hello everyone",
    user: "6ab290cf8c85b6178a8e1036",
  });

  let user = await userModel.findOne({ _id: "6ab290cf8c85b6178a8e1036" });
  user.posts.push(post._id);
  await user.save();
  res.send({ post, user });
});

app.listen("3005", function () {
  console.log("Server running on http://localhost:3005");
});
