# MongoDB Notes

## 1. What is a Database?

A database is a structured collection of data that allows us to store, manage, and retrieve information efficiently.

Example:

A user database may contain:

- Name
- Email
- Username
- Profile Image

Databases allow applications to store data permanently instead of losing it when the application stops.

---

## 2. Why Do We Need a Database?

Databases are used to:

- Store large amounts of data
- Retrieve data quickly
- Update existing data
- Delete data
- Organize data
- Maintain data even after the application is closed

---

## 3. SQL vs NoSQL

### SQL

SQL databases store data in tables consisting of rows and columns.

Examples:

- MySQL
- PostgreSQL
- SQLite
- Oracle

Structure:

```text
Database
   ↓
Tables
   ↓
Rows
   ↓
Columns
```

### NoSQL

NoSQL databases do not use the traditional table and row structure.

MongoDB stores data in documents.

Examples:

- MongoDB
- Firebase
- Cassandra
- Redis

MongoDB is a NoSQL database.

Structure:

```text
Database
   ↓
Collection
   ↓
Document
   ↓
Fields
```

---

## 4. MongoDB

MongoDB is a NoSQL, document-oriented database.

MongoDB stores data in JSON-like documents instead of traditional rows and columns.

Example:

```json
{
  "name": "Nancy",
  "email": "nancy@gmail.com",
  "username": "nancy"
}
```

The above object represents a MongoDB document.

---

## 5. MongoDB Terminology

### Database

A database contains collections.

Example:

```text
mongopractice
```

### Collection

A collection contains multiple documents.

It is similar to a table in SQL.

Example:

```text
users
```

### Document

A document is an individual record inside a collection.

Example:

```json
{
  "name": "Nancy",
  "email": "nancy@gmail.com"
}
```

### Field

A field is a key-value pair inside a document.

Example:

```json
"name": "Nancy"
```

Here:

```text
name → field
Nancy → value
```

---

## 6. SQL vs MongoDB Terminology

| SQL | MongoDB |
|---|---|
| Database | Database |
| Table | Collection |
| Row | Document |
| Column | Field |

---

## 7. BSON

MongoDB internally stores documents using BSON.

BSON stands for:

```text
Binary JSON
```

BSON provides additional data types and is designed for efficient storage and processing.

We generally work with MongoDB using JSON-like syntax.

---

## 8. MongoDB Compass

MongoDB Compass is a graphical user interface for MongoDB.

It allows us to:

- View databases
- View collections
- View documents
- Insert documents
- Update documents
- Delete documents
- Search and filter data

Local MongoDB server:

```text
mongodb://localhost:27017/
```

Default MongoDB port:

```text
27017
```

---

## 9. Mongoose

Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js.

It makes it easier to:

- Connect Node.js with MongoDB
- Define schemas
- Create models
- Insert data
- Read data
- Update data
- Delete data

Install Mongoose:

```bash
npm install mongoose
```

---

## 10. Connecting Mongoose with MongoDB

Basic connection:

```js
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/mongopractice");
```

Here:

```text
127.0.0.1 → Local computer
27017 → MongoDB default port
mongopractice → Database name
```

---

## 11. Mongoose Schema

A schema defines the structure of documents.

Example:

```js
const userSchema = mongoose.Schema({
  name: String,
  username: String,
  email: String,
});
```

For our user interface, we also added an image field:

```js
const userSchema = mongoose.Schema({
  name: String,
  username: String,
  email: String,
  image: String,
});
```

---

## 12. Mongoose Model

A model is created from a schema.

Example:

```js
module.exports = mongoose.model("user", userSchema);
```

The model can then be imported into `app.js`:

```js
const userModel = require("./models/user");
```

The model is used to perform CRUD operations.

---

# CRUD Operations

## 13. CRUD

CRUD stands for:

```text
C → Create
R → Read
U → Update
D → Delete
```

These are the four basic operations performed on database data.

---

## 14. Create Operation

Mongoose provides `.create()` to create a new document.

Example:

```js
let createdUser = await userModel.create({
  name: "Nancy",
  email: "nancy@gmail.com",
  username: "nancy",
});
```

The created document can be sent as a response:

```js
res.send(createdUser);
```

---

## 15. Read Operation

The `.find()` method is used to retrieve documents.

Example:

```js
let users = await userModel.find();
```

This retrieves all users.

To find specific users:

```js
let users = await userModel.find({
  username: "nancy",
});
```

---

## 16. findOne()

`.findOne()` returns one matching document.

Example:

```js
let user = await userModel.findOne({
  _id: req.params.id,
});
```

---

## 17. Update Operation

`.findOneAndUpdate()` can be used to update a document.

Example:

```js
let user = await userModel.findOneAndUpdate(
  {
    _id: req.params.id,
  },
  {
    image,
    name,
    email,
  },
  {
    returnDocument: "after",
  }
);
```

The first object specifies which document to update.

The second object contains the new values.

The third object contains options.

---

## 18. returnDocument

```js
{
  returnDocument: "after"
}
```

This tells Mongoose to return the updated document instead of the old document.

---

## 19. Delete Operation

`.findOneAndDelete()` can delete a matching document.

Example:

```js
let deletedUser = await userModel.findOneAndDelete({
  _id: req.params.id,
});
```

Another convenient method is:

```js
let deletedUser = await userModel.findByIdAndDelete(
  req.params.id
);
```

---

# Express + MongoDB

## 20. Express and MongoDB

Express handles HTTP requests while Mongoose communicates with MongoDB.

Basic flow:

```text
Browser
   ↓
Express Route
   ↓
Mongoose Model
   ↓
MongoDB
   ↓
Mongoose
   ↓
Express
   ↓
EJS
   ↓
Browser
```

---

## 21. Express Middleware

JSON data:

```js
app.use(express.json());
```

Form data:

```js
app.use(express.urlencoded({ extended: true }));
```

Static files:

```js
app.use(express.static(path.join(__dirname, "public")));
```

---

# EJS + MongoDB

## 22. EJS

EJS is a templating engine that allows us to generate HTML using JavaScript data.

Set EJS as the view engine:

```js
app.set("view engine", "ejs");
```

Render an EJS page:

```js
res.render("index");
```

Pass data to an EJS page:

```js
res.render("read", {
  users: allUser,
});
```

---

## 23. EJS Syntax

### Execute JavaScript

```ejs
<% %>
```

Example:

```ejs
<% users.forEach(user => { %>
<% }) %>
```

### Display a value

```ejs
<%= %>
```

Example:

```ejs
<%= user.name %>
```

---

## 24. Displaying Users Using EJS

We can loop through all users:

```ejs
<% users.forEach(user => { %>

  <h3>
    <%= user.name %>
  </h3>

  <h5>
    <%= user.email %>
  </h5>

<% }) %>
```

---

## 25. Displaying User Image

If the MongoDB document contains an image URL:

```json
{
  "name": "Nancy",
  "email": "nancy@gmail.com",
  "image": "https://example.com/image.jpg"
}
```

It can be displayed using:

```ejs
<img src="<%= user.image %>">
```

The URL should directly point to an image.

---

# Creating Users

## 26. HTML Form for Creating a User

Example:

```html
<form action="/create" method="post">

  <input
    type="text"
    name="name"
    placeholder="name"
  />

  <input
    type="text"
    name="email"
    placeholder="email"
  />

  <input
    type="text"
    name="image"
    placeholder="imageurl"
  />

  <input
    type="submit"
    value="Create User"
  />

</form>
```

The `name` attribute is important because Express uses it to access the submitted data through:

```js
req.body
```

---

## 27. Create User Route

```js
app.post("/create", async function (req, res) {

  let { name, email, image } = req.body;

  let createdUser = await userModel.create({
    name,
    email,
    image,
  });

  res.redirect("/read");
});
```

Flow:

```text
HTML Form
    ↓
POST /create
    ↓
req.body
    ↓
userModel.create()
    ↓
MongoDB
    ↓
redirect("/read")
```

---

# Reading Users

## 28. Read All Users

Route:

```js
app.get("/read", async function (req, res) {

  let allUser = await userModel.find();

  res.render("read", {
    users: allUser,
  });

});
```

Here:

```js
userModel.find()
```

gets all users from MongoDB.

Then:

```js
res.render("read", {
  users: allUser,
});
```

passes those users to `read.ejs`.

---

# Dynamic Routes

## 29. Dynamic Route

Dynamic routes allow us to use values from the URL.

Example:

```js
app.get("/delete/:id", async function (req, res) {
```

Here:

```text
:id
```

is a dynamic parameter.

If the URL is:

```text
/delete/6aacd758c87d80da92aed0ce
```

we can access the ID using:

```js
req.params.id
```

---

## 30. req.params

`req.params` is used to access dynamic route parameters.

Example:

```js
app.get("/user/:id", function (req, res) {
  console.log(req.params.id);
});
```

For:

```text
/user/123
```

the result is:

```text
123
```

---

# Delete User

## 31. Delete User Using ID

Route:

```js
app.get("/delete/:id", async function (req, res) {

  let deletedUser = await userModel.findOneAndDelete({
    _id: req.params.id,
  });

  res.redirect("/read");

});
```

The delete link in EJS:

```ejs
<a
  class="text-red-500"
  href="/delete/<%= user._id %>"
>
  Delete User
</a>
```

Flow:

```text
Click Delete User
        ↓
GET /delete/:id
        ↓
req.params.id
        ↓
findOneAndDelete()
        ↓
MongoDB
        ↓
redirect("/read")
```

---

## 32. findByIdAndDelete()

Instead of:

```js
userModel.findOneAndDelete({
  _id: req.params.id,
});
```

we can use:

```js
userModel.findByIdAndDelete(req.params.id);
```

Example:

```js
app.get("/delete/:id", async function (req, res) {

  let deletedUser = await userModel.findByIdAndDelete(
    req.params.id
  );

  res.redirect("/read");

});
```

---

# Update User

## 33. Update User Route

First, we need to find the user that we want to update.

```js
app.get("/update/:id", async function (req, res) {

  let user = await userModel.findOne({
    _id: req.params.id,
  });

  res.render("update", {
    user,
  });

});
```

The user is retrieved using the ID from the URL.

---

## 34. Update Form

The update form can display the existing user information.

Example:

```ejs
<form action="/edit/<%= user._id %>" method="post">

  <input
    type="text"
    name="name"
    value="<%= user.name %>"
  />

  <input
    type="text"
    name="email"
    value="<%= user.email %>"
  />

  <input
    type="text"
    name="image"
    value="<%= user.image %>"
  />

  <input
    type="submit"
    value="Update User"
  />

</form>
```

---

## 35. Edit User Route

```js
app.post("/edit/:id", async function (req, res) {

  let { image, name, email } = req.body;

  let user = await userModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      image,
      name,
      email,
    },
    {
      returnDocument: "after",
    }
  );

  res.redirect("/read");
});
```

Flow:

```text
Click Edit User
      ↓
GET /update/:id
      ↓
Find user from MongoDB
      ↓
Render update.ejs
      ↓
Show existing data
      ↓
User changes data
      ↓
POST /edit/:id
      ↓
findOneAndUpdate()
      ↓
MongoDB
      ↓
redirect("/read")
```

---

# Complete MongoDB User Flow

## 36. Create, Read, Update and Delete Flow

```text
                 MongoDB
                    ↑
                    |
                Mongoose
                    ↑
                    |
                 Express
                    ↑
                    |
                  EJS
                    ↑
                    |
                Browser
```

### Create

```text
Form
 ↓
POST /create
 ↓
req.body
 ↓
userModel.create()
 ↓
MongoDB
```

### Read

```text
GET /read
 ↓
userModel.find()
 ↓
MongoDB
 ↓
res.render()
 ↓
read.ejs
```

### Update

```text
GET /update/:id
 ↓
findOne()
 ↓
Display existing data
 ↓
POST /edit/:id
 ↓
findOneAndUpdate()
 ↓
MongoDB
```

### Delete

```text
Click Delete User
 ↓
GET /delete/:id
 ↓
findOneAndDelete()
 ↓
MongoDB
 ↓
redirect("/read")
```

---

# Current Project Structure

## 37. MongoDB Folder Structure

```text
MongoDB/
│
├── models/
│   └── user.js
│
├── public/
│   └── style/
│       └── style.css
│
├── views/
│   ├── index.ejs
│   ├── read.ejs
│   └── update.ejs
│
├── node_modules/
│
├── app.js
├── package.json
├── package-lock.json
└── Notes.md
```

---

# User Model

## 38. Current User Schema

The current user model contains:

```js
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://127.0.0.1:27017/mongopractice"
);

const userSchema = mongoose.Schema({
  name: String,
  username: String,
  email: String,
  image: String,
});

module.exports = mongoose.model("user", userSchema);
```

---

# Important Concepts Learned

## 39. Important Points

### `mongoose.connect()`

Connects Node.js/Mongoose to MongoDB.

```js
mongoose.connect(
  "mongodb://127.0.0.1:27017/mongopractice"
);
```

### `mongoose.Schema()`

Defines the structure of documents.

```js
const userSchema = mongoose.Schema({
  name: String,
  email: String,
});
```

### `mongoose.model()`

Creates a model from a schema.

```js
mongoose.model("user", userSchema);
```

### `.create()`

Creates a new document.

```js
userModel.create({
  name: "Nancy",
});
```

### `.find()`

Finds multiple documents.

```js
userModel.find();
```

### `.findOne()`

Finds one document.

```js
userModel.findOne({
  _id: id,
});
```

### `.findOneAndUpdate()`

Finds and updates one document.

```js
userModel.findOneAndUpdate(
  { _id: id },
  { name: "Nancy Khurana" }
);
```

### `.findOneAndDelete()`

Finds and deletes one document.

```js
userModel.findOneAndDelete({
  _id: id,
});
```

### `.findByIdAndDelete()`

Deletes a document using its ID.

```js
userModel.findByIdAndDelete(id);
```

---

# Important Express Concepts Used

## 40. req.body

Used to access data submitted through forms.

```js
let { name, email, image } = req.body;
```

Requires:

```js
app.use(express.urlencoded({ extended: true }));
```

---

## 41. req.params

Used to access dynamic route parameters.

Example:

```js
app.get("/delete/:id", function (req, res) {
  console.log(req.params.id);
});
```

---

## 42. res.render()

Used to render an EJS page.

```js
res.render("read", {
  users: allUser,
});
```

---

## 43. res.redirect()

Used to redirect the browser to another route.

Example:

```js
res.redirect("/read");
```

---

## 44. async and await

Database operations are asynchronous.

Therefore, we commonly use:

```js
async function
```

and:

```js
await
```

Example:

```js
app.get("/read", async function (req, res) {

  let allUser = await userModel.find();

  res.render("read", {
    users: allUser,
  });

});
```

`await` waits for the database operation to complete before continuing.

---

# GET and POST

## 45. GET

GET is generally used to request or retrieve data.

Example:

```js
app.get("/read", function (req, res) {
});
```

We also used GET routes for the learning project's delete link:

```js
app.get("/delete/:id", async function (req, res) {
});
```

---

## 46. POST

POST is generally used to send data to the server.

Example:

```js
app.post("/create", async function (req, res) {
});
```

The form sends:

```text
POST /create
```

and the data is available through:

```js
req.body
```

---

# MongoDB ObjectId

## 47. _id

MongoDB automatically gives every document a unique `_id`.

Example:

```json
{
  "_id": "6aacd758c87d80da92aed0ce",
  "name": "Nancy",
  "email": "nancy@gmail.com"
}
```

The `_id` is used to uniquely identify a document.

In EJS:

```ejs
<%= user._id %>
```

can be used to get the user's ID.

Example:

```ejs
<a href="/update/<%= user._id %>">
  Edit User
</a>
```

---

# Final MongoDB + Express + EJS Structure

## 48. Overall Architecture

```text
                    Browser
                       |
                       |
                  HTML / EJS
                       |
                       ↓
                  Express.js
                       |
              -----------------
              |               |
           Routes         Middleware
              |
              ↓
         Mongoose Model
              |
              ↓
           MongoDB
              |
              ↓
          User Data
              |
              ↓
         Mongoose
              |
              ↓
           Express
              |
              ↓
             EJS
              |
              ↓
           Browser
```

---

# 49. Main Things Learned So Far

By completing this part of the MongoDB course, I learned:

- What databases are
- Why databases are needed
- SQL vs NoSQL
- What MongoDB is
- Database, collection, document and field
- BSON
- MongoDB Compass
- MongoDB local server
- MongoDB default port
- Mongoose
- Connecting Mongoose with MongoDB
- Schema
- Model
- CRUD operations
- `create()`
- `find()`
- `findOne()`
- `findOneAndUpdate()`
- `findOneAndDelete()`
- `findByIdAndDelete()`
- MongoDB `_id`
- Express with MongoDB
- EJS with MongoDB
- Passing data from Express to EJS
- EJS loops
- Dynamic routes
- `req.params`
- `req.body`
- Creating users through forms
- Reading and displaying users
- Updating users
- Deleting users
- Using MongoDB data in an EJS UI
- `async` and `await`
- `res.render()`
- `res.redirect()`
- GET and POST routes

---

# 50. Current Learning Project

The current MongoDB folder is a **learning project** used to practice:

```text
Node.js
   +
Express.js
   +
MongoDB
   +
Mongoose
   +
EJS
```

The project currently allows us to:

```text
Create User
     ↓
Read Users
     ↓
Edit User
     ↓
Delete User
```

This completes the MongoDB CRUD and EJS UI portion learned so far.