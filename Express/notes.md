# Express.js

---

## What is Express.js?

Express.js is a **web application framework for Node.js**.

It is used to build:

- Web servers
- Web applications
- APIs
- Backend applications

Express makes server-side development easier by providing features for handling **HTTP requests, responses, and routing**.

---

## Installing Express

Express is installed using **npm (Node Package Manager)**.

Once installed, it becomes a dependency of the Node.js project.

---

## Importing Express

Express can be imported into a JavaScript file and used to create an Express application.

When using ES Modules, the project must be configured to support the `import` syntax.

---

## Creating an Express Application

An Express application is created using the Express function.

The application object is commonly stored in a variable named `app`.

The `app` object is used to:

- Define routes
- Handle requests
- Send responses
- Start the server
- Add middleware

---

## Routes

A **route** defines how the application responds to a request made to a particular URL.

A route generally consists of:

- HTTP method
- URL/path
- Request handler
- Response

For example, an application can have different routes for:

- Home page
- Profile page
- About page
- Contact page

---

## GET Request

`GET` is an HTTP method used to **request or retrieve data** from a server.

In Express, `app.get()` is used to create a route that handles GET requests.

---

## `req` and `res`

Every route handler commonly receives two important objects:

### `req` — Request

The `req` object contains information about the request received from the client.

It can contain information such as:

- Requested URL
- HTTP method
- Request headers
- Request data

### `res` — Response

The `res` object is used to send a response from the server back to the client.

---

## Sending a Response

`res.send()` is used to send a response to the client.

The response can contain text, HTML, or other types of data.

Once the response is sent, the request is completed.

---

## Multiple Routes

An Express application can have multiple routes.

Each route can have:

- A different URL
- A different HTTP method
- A different response

For example:

- `/` → Home page
- `/profile` → Profile page
- `/about` → About page

Express checks the incoming request and matches it with the appropriate route.

---

## Starting the Server

`app.listen()` is used to start the Express server and make it listen for incoming requests on a specified port.

A port acts as a communication endpoint through which clients can access the server.

For example, a server running on port `3000` can be accessed through:

`http://localhost:3000`

---

## Localhost

**localhost** refers to the computer on which the server is currently running.

When an Express application runs on:

`http://localhost:3000`

it means the server is running locally on your own computer using port `3000`.

---

## Express vs Node.js HTTP Module

Node.js provides the built-in `http` module for creating HTTP servers.

Express is a framework built for Node.js that makes working with servers and HTTP requests easier.

With the basic HTTP module, routing and request handling need to be handled more manually.

Express provides simpler methods for creating routes and handling requests.

---

## Basic Express Flow

Client sends a request

↓

Express receives the request

↓

Express checks the HTTP method and URL

↓

Matching route is found

↓

Route handler executes

↓

Response is sent to the client

---

## Important Concepts Learned

- **Express.js** → Web framework for Node.js
- **Express application** → Application created using Express
- **Route** → Defines how the server responds to a particular request
- **`app.get()`** → Handles GET requests
- **`req`** → Contains information about the incoming request
- **`res`** → Used to send a response
- **`res.send()`** → Sends a response to the client
- **`app.listen()`** → Starts the Express server
- **localhost** → Refers to the local computer
- **Port** → Communication endpoint used by the server

---