const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/read", async function (req, res) {
  let allUser = await userModel.find();

  res.render("read", {
    users: allUser,
  });
});

app.post("/create", async function (req, res) {
  let { name, email, image } = req.body;

  let createdUser = await userModel.create({
    name,
    email,
    image,
  });
  res.redirect("/read");
});

app.get("/delete/:id", async function (req, res) {
  let deletedUser = await userModel.findOneAndDelete({
    _id: req.params.id,
  });

  res.redirect("/read");
});

app.get("/update/:id", async function (req, res) {
  let user = await userModel.findOne({
    _id: req.params.id,
  });
  res.render("update", { user });
});

app.post("/edit/:id", async function (req, res) {
  let { image, name, email } = req.body;
  let user = await userModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { image, name, email },
    { returnDocument: "after" },
  );
  res.redirect("/read");
});

// CRUD operations with MongoDB Basics

// app.get("/create", async (req, res) => {
//   let createdUser = await userModel.create({
//     name: "Nancy",
//     email: "nancy@gmail.com",
//     username: "nancy",
//   });

//   res.send(createdUser);
// });

// app.get("/update", async (req, res) => {
//   let user = await userModel.findOneAndUpdate(
//     { username: "nancy" },
//     { name: "Nancy Khurana" },
//     { returnDocument: "after" },
//   );

//   res.send(user);
// });

// app.get("/read", async (req, res) => {
//   let users = await userModel.find({ username: "nancy" });
//   res.send(users);
// });

// app.get("/delete", async (req, res) => {
//   let users = await userModel.findOneAndDelete({
//     username: "nancy",
//   });

//   res.send(users);
// });

app.listen("3002", function () {
  console.log("Server running on http://localhost:3002");
});
