# Notes Mini Project

---

## 1. Project Setup

Created a separate mini-project folder inside the main NodeJS repository.

```bash
mkdir notes-mini-project
cd notes-mini-project
npm init -y
npm install express ejs
```

This creates a separate `package.json` and `package-lock.json` for the mini-project.

---

## 2. Project Structure

```text
notes-mini-project/
│
├── files/
│   └── task files (.txt)
│
├── public/
│   └── style/
│       └── style.css
│
├── views/
│   ├── index.ejs
│   ├── show.ejs
│   └── edit.ejs
│
├── script.js
├── package.json
└── package-lock.json
```

---

## 3. Required Modules

```js
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
```

### Express

Used to create the server and handle routes.

### Path

Used to work with file and folder paths.

### File System

The `fs` module is used to create, read, rename and manage files.

---

## 4. Express App

```js
const app = express();
```

Creates an Express application.

---

## 5. Middleware

### JSON Middleware

```js
app.use(express.json());
```

Used to handle JSON data sent in requests.

---

### URL Encoded Middleware

```js
app.use(express.urlencoded({ extended: true }));
```

Used to receive data submitted through HTML forms.

The submitted form data can be accessed using:

```js
req.body
```

Example:

```js
req.body.title
req.body.details
```

---

## 6. EJS View Engine

```js
app.set("view engine", "ejs");
```

Tells Express to use EJS as the template engine.

EJS files are stored inside the `views` folder.

---

## 7. Static Files

```js
app.use(express.static(path.join(__dirname, "public")));
```

Used to serve static files such as CSS, JavaScript and images.

Example structure:

```text
public/
└── style/
    └── style.css
```

CSS can be linked as:

```html
<link rel="stylesheet" href="/style/style.css">
```

---

## 8. Home Route

```js
app.get("/", function (req, res) {
  fs.readdir(path.join(__dirname, "files"), function (err, files) {
    res.render("index", { files: files });
  });
});
```

### `fs.readdir()`

Used to read the contents of a directory.

Here it reads the `files` folder and gets the names of all files.

The file names are then sent to `index.ejs`.

```js
res.render("index", { files: files });
```

---

## 9. Dynamic Data in EJS

EJS allows JavaScript data to be inserted into HTML.

### Display a value

```ejs
<%= filename %>
```

### Execute JavaScript

```ejs
<% %>
```

Example:

```ejs
<% files.forEach(function(val) { %>

    <h1><%= val %></h1>

<% }) %>
```

---

## 10. Create Task Form

The form in `index.ejs`:

```html
<form action="/create" method="POST">

    <input type="text" name="title">

    <textarea name="details"></textarea>

    <input type="submit" value="Create Tasks">

</form>
```

The `name` attribute is important because Express uses it to access the submitted data.

```js
req.body.title
req.body.details
```

---

## 11. POST `/create`

```js
app.post("/create", function (req, res) {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    function (err) {
      res.redirect("/");
    },
  );
});
```

### `fs.writeFile()`

Used to create a file and write data into it.

The filename is generated from the title.

Example:

```text
Title: My First Task
```

File created:

```text
MyFirstTask.txt
```

The task details are stored inside the file.

---

## 12. `res.redirect()`

```js
res.redirect("/");
```

After creating the task, the user is redirected back to the home page.

---

## 13. View Task

The task can be opened using a dynamic URL:

```ejs
<a href="/file/<%= val %>">Read More</a>
```

For example:

```text
/file/MyFirstTask.txt
```

---

## 14. Dynamic File Route

```js
app.get("/file/:filename", function (req, res) {
  fs.readFile(
    `./files/${req.params.filename}`,
    "utf-8",
    function (err, filedata) {
      res.render("show", {
        filename: req.params.filename,
        filedata: filedata
      });
    },
  );
});
```

### `:filename`

This is a dynamic route parameter.

For:

```text
/file/MyFirstTask.txt
```

we can access:

```js
req.params.filename
```

which gives:

```text
MyFirstTask.txt
```

---

## 15. `fs.readFile()`

```js
fs.readFile(
  `./files/${req.params.filename}`,
  "utf-8",
  function (err, filedata) {
    
  }
);
```

Used to read the contents of a file.

### `utf-8`

Converts the file data into readable text.

---

## 16. Rendering `show.ejs`

```js
res.render("show", {
  filename: req.params.filename,
  filedata: filedata
});
```

Two values are sent to `show.ejs`:

```text
filename → file name
filedata → file contents
```

In `show.ejs`:

```ejs
<h1><%= filename %></h1>

<p><%= filedata %></p>
```

---

## 17. Edit Task

An edit link can be added to the task card:

```ejs
<a href="/edit/<%= val %>">Edit</a>
```

For example:

```text
/edit/MyFirstTask.txt
```

---

## 18. GET `/edit/:filename`

```js
app.get("/edit/:filename", function (req, res) {
  res.render("edit", { filename: req.params.filename });
});
```

The filename from the URL is passed to `edit.ejs`.

For example:

```text
/edit/MyFirstTask.txt
```

Then:

```js
req.params.filename
```

contains:

```text
MyFirstTask.txt
```

---

## 19. Display Previous Filename

In `edit.ejs`:

```html
<input
  type="text"
  name="previous"
  value="<%= filename %>"
/>
```

The existing filename is automatically displayed in the input field.

---

## 20. Edit Form

```html
<form action="/edit" method="POST">

    <input
        type="text"
        name="previous"
        value="<%= filename %>"
    >

    <input
        type="text"
        name="new"
    >

    <input
        type="submit"
        value="Update Tasks"
    >

</form>
```

The form sends:

```text
previous → old filename
new → new filename
```

to:

```text
POST /edit
```

---

## 21. Rename Task

```js
app.post("/edit", function (req, res) {
  fs.rename(
    `./files/${req.body.previous}`,
    `./files/${req.body.new}`,
    function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send("Error renaming file");
      }

      res.redirect("/");
    },
  );
});
```

### `fs.rename()`

Used to rename or move a file.

Example:

```text
Old:
MyFirstTask.txt

New:
MyUpdatedTask.txt
```

The existing file is renamed.

---

## 22. Error Handling

The `err` parameter is used to check whether an error occurred.

```js
if (err) {
  console.log(err);
  return res.status(500).send("Error renaming file");
}
```

If there is no error:

```js
res.redirect("/");
```

redirects the user to the home page.

---

## 23. Starting the Server

```js
app.listen("3001", () => {
  console.log("Server is running on http://localhost:3001");
});
```

The project runs on:

```text
http://localhost:3001
```

---

## 24. Overall Project Flow

### Create Task

```text
User enters title and details
            ↓
       POST /create
            ↓
        req.body
            ↓
      fs.writeFile()
            ↓
     .txt file created
            ↓
       Redirect to /
```

---

### View Task

```text
User clicks Read More
            ↓
     /file/:filename
            ↓
    req.params.filename
            ↓
       fs.readFile()
            ↓
      res.render("show")
            ↓
      Task is displayed
```

---

### Edit Task

```text
User clicks Edit
            ↓
     /edit/:filename
            ↓
 Filename sent to edit.ejs
            ↓
 User enters new filename
            ↓
       POST /edit
            ↓
        fs.rename()
            ↓
       File renamed
            ↓
       Redirect to /
```

---

## 25. Concepts Learned

- Node.js
- Express.js
- EJS
- Middleware
- GET requests
- POST requests
- Routing
- Dynamic routing
- `req.body`
- `req.params`
- `res.render()`
- `res.redirect()`
- Static files
- HTML forms
- File System (`fs`)
- `fs.readdir()`
- `fs.writeFile()`
- `fs.readFile()`
- `fs.rename()`
- `path.join()`

---

## 26. Git Commits

### Project setup

```bash
git add .
git commit -m "Set up mini project"
git push
```

### Basic UI

```bash
git add .
git commit -m "Create basic task page UI"
git push
```

### Task creation

```bash
git add .
git commit -m "Implement task creation and file storage"
git push
```

### Task viewing

```bash
git add .
git commit -m "Add task file viewing"
git push
```

### Edit feature

```bash
git add .
git commit -m "Add task edit and rename feature"
git push
```

---

## 27. Final Project

The mini-project currently supports:

```text
Create Task
     ↓
View Task
     ↓
Edit / Rename Task
```

The project demonstrates how **Express.js, EJS and Node.js File System work together to create a simple file-based notes application.**