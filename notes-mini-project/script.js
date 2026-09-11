const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  //Reading all the files and sending their names to EJS page
  //fs.readdir() is a Node.js File System method used to read the contents of a directory.
  fs.readdir(path.join(__dirname, "files"), function (err, files) {
    res.render("index", { files: files }); //Render the index.ejs file and send the files data to it.
    //if there will be no file initially inside the files folder , it will send an empty array to the index.ejs
  });
});
app.post("/create", function (req, res) {
  console.log(req.body);
});
app.listen("3001", () => {
  console.log("Server is running on http://localhost:3001");
});
