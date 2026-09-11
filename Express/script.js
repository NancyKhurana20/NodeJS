const express = require("express");

const app = express();

//for static files
const path = require("path");

app.use(express.json()); //Used when the client sends JSON data.
app.use(express.urlencoded({ extended: true })); //Used mainly for data submitted through HTML forms.

//Adding the ejs file --> ejs is similar to html , the difference is that in ejs we can perform dynamic calculations
//first we need to install ejs using npm i ejs
app.set("view engine", "ejs"); //now by this the app will use the ejs file as an view engine , then at the routing part we will mention res.render('ejs file name') , for creating the ejs file we will first make a folder named views then inside it we will create the ejs file

//Adding static files
app.use(express.static(path.join(__dirname, "public")));
//console.log(__dirname); //this gives the path of your current folder in which you are working and then in app.use we added the public so then it will direct us to the public folder in which the static files are present
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
  res.render("index");
});

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

app.get("/profile", (req, res) => {
  res.send("This is profile page");
});

app.get("/about", (req, res, next) => {
  return next(new Error("Not implemented"));
});

//dynamic routing --> whenever we need the route which will change dynamically we will add colon (:) to that part which is going to change
app.get("/profile/:username", (req, res) => {
  //first we enter the url in the frontend and send it here to backend
  //console.log(req.params); //this contains the object  { username: 'nancy' }
  res.send(`Welcome ${req.params.username}`); //this will print welcome nancy  //then the backend returns it to the frontend
});

//Error handling -->Error handling is the process of **detecting, handling, and responding to errors** that occur while processing a request.Express provides special middleware for handling errors.
app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send("Something broke");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
