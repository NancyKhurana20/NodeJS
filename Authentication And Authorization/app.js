const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

app.use(cookieParser());

// app.get("/", function (req, res) {
//   //Creation of a cookie
//   res.cookie("name", "nancy");
//   res.send("done");
// });

app.get("/", function (req, res) {
  //encryption
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash("abcdxyz", salt, function (err, hash) {
      // Store hash in your password DB.
      console.log(hash); //$2b$10$SFw6vCnr0LqpGfLnRMZIbe75LgZIAVg2dct/lvLRlvglx93dPEx2q
    });
  });
  //decryption
  bcrypt.compare(
    "abcdxyz",
    "$2b$10$SFw6vCnr0LqpGfLnRMZIbe75LgZIAVg2dct/lvLRlvglx93dPEx2q",
    function (err, result) {
      // result == true
      console.log(result);
    },
  );
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
