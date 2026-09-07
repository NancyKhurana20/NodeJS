import express from "express";

const app = express();

//Middleware --> Middleware is a function that runs between the incoming request and the final response.
app.use(function (req, res, next) {
  console.log("Server acceeepted the request and sent to middleware");
  next(); //Pass control to the next middleware/route
});

app.use(function (req, res, next) {
  console.log("Middleware passed the req to next middleware");
  next();
});

//Routing
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/profile", (req, res) => {
  res.send("This is profile page");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
