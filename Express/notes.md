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

# Middleware in Express.js

---

## What is Middleware?

Middleware is a function that executes **between receiving a request and sending the final response**.

It has access to:

- The request object (`req`)
- The response object (`res`)
- The `next` function

Middleware can perform tasks before passing the request to the next middleware or route.

---

## Purpose of Middleware

Middleware is commonly used for:

- Logging requests
- Authentication
- Authorization
- Validating data
- Processing request data
- Handling errors
- Modifying request or response objects
- Performing other common operations before a request reaches a route

---

## `req`, `res`, and `next`

### `req` — Request

The `req` object contains information about the incoming request.

It can contain information such as:

- URL
- HTTP method
- Headers
- Request data

---

### `res` — Response

The `res` object is used to send a response back to the client.

---

### `next`

`next` is a function used to pass control to the **next middleware or route handler**.

Calling `next()` tells Express that the current middleware has completed its task and the request can continue.

---

## `app.use()`

`app.use()` is commonly used to register middleware in an Express application.

Middleware registered using `app.use()` can run for incoming requests before the appropriate route is executed.

---

## Middleware Flow

The general flow of an Express request is:

Request

↓

Middleware

↓

Next Middleware

↓

Route Handler

↓

Response

A middleware can either:

- Pass control using `next()`
- Send a response and end the request

---

## Using `next()`

If a middleware does not send a response, it generally needs to call `next()` so that the request can continue.

If `next()` is not called and no response is sent, the request may remain pending and the client may continue waiting.

---

## Order of Middleware

The **order in which middleware is defined matters**.

Express processes middleware and routes in the order in which they appear in the application.

For example:

Middleware 1

↓

Middleware 2

↓

Route

Therefore, middleware placed before a route can execute before that route.

---

## Middleware and Routing

Middleware and routes have different purposes.

**Middleware** performs operations during the request-response cycle and can pass control to another function.

**Routes** define how the application responds to a particular URL and HTTP method.

---

## Common Uses of Middleware

### Logging

Middleware can record information about incoming requests, such as the HTTP method and requested URL.

---

### Authentication

Middleware can check whether a user is authenticated before allowing access to protected routes.

---

### Authorization

Middleware can check whether a user has permission to perform a particular operation.

---

### Validation

Middleware can validate incoming data before passing the request to the route handler.

---

## Important Concepts Learned

- **Middleware** → Function that runs during the request-response cycle
- **`req`** → Contains information about the incoming request
- **`res`** → Used to send a response
- **`next()`** → Passes control to the next middleware or route
- **`app.use()`** → Used to register middleware
- **Middleware order** → Determines the order in which middleware executes
- Middleware can **process a request, pass it forward, or send a response**


---

# Error Handling in Express.js

## What is Error Handling?

Error handling is the process of **detecting, handling, and responding to errors** that occur while processing a request.

Express provides special middleware for handling errors.

---

## Error-Handling Middleware

Error-handling middleware is a special type of middleware that has **four parameters**:

- `err` → Contains information about the error
- `req` → Contains information about the incoming request
- `res` → Used to send a response
- `next` → Passes control to the next middleware

The presence of four parameters tells Express that the middleware is an **error-handling middleware**.

---

## `next()` vs `next(error)`

### `next()`

`next()` passes control to the next middleware or route.

It indicates that there is no error in the current middleware.

---

### `next(error)`

`next(error)` tells Express that an error has occurred.

Express then skips the normal middleware and routes and passes the error to the appropriate error-handling middleware.

---

## Creating an Error

An error can be created using the `Error` object.

The error can then be passed to Express using `next()`.

This allows the error-handling middleware to process the error.

---

## Error Status Code

A common status code used for server-side errors is:

**500 — Internal Server Error**

It indicates that the server encountered an unexpected problem while processing the request.

---

## Error Stack

The `err.stack` property contains information about the error along with the stack trace.

It can be useful for debugging and finding where the error occurred.

The error stack is generally logged on the server rather than sent directly to the client.

---

## Position of Error-Handling Middleware

Error-handling middleware is generally placed **after the routes and other middleware**.

This allows errors passed from earlier middleware or routes to reach the error handler.

---

## Error Handling Flow

Request

↓

Middleware

↓

Route

↓

Error occurs

↓

`next(error)`

↓

Error-handling middleware

↓

Error response sent to client

---

## Important Concepts Learned

- **Error handling** → Managing errors that occur during request processing
- **Error-handling middleware** → Special middleware used to handle errors
- **`err`** → Contains error information
- **`next()`** → Passes control normally
- **`next(error)`** → Passes an error to the error handler
- **`err.stack`** → Provides the error stack trace
- **Status `500`** → Internal Server Error
- Error-handling middleware has **four parameters**
- Error-handling middleware is generally placed **after routes and other middleware**

---