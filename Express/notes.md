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

# Cookies and Sessions

---

## What is a Cookie?

A cookie is a small piece of data stored in the user's browser by a website.

Cookies are used to remember information between different requests.

Examples of information that can be stored in cookies include:

- User preferences
- Language preference
- Theme preference
- Session ID
- Other small pieces of client-side information

---

## Why are Cookies Needed?

HTTP is stateless.

This means that the server does not automatically remember previous requests from the same user.

Cookies allow the browser to store information and send it back to the server with future requests.

---

## Cookie Flow

The basic flow of a cookie is:

Browser sends request
→
Server sends a cookie
→
Browser stores the cookie
→
Browser sends the cookie with future requests
→
Server reads the cookie

---

## What is a Session?

A session is information maintained by the server for a particular user's interaction with an application.

A session can store information such as:

- User identity
- Login status
- User-related temporary data
- Other server-side information

Sessions are commonly used to keep a user logged in.

---

## Why are Sessions Needed?

HTTP is stateless, so after one request the server does not automatically know who the user is in the next request.

A session allows the server to maintain information about a user across multiple requests.

---

## Session ID

A session usually has a unique session ID.

For example:

Session ID: abc123

The server stores session information associated with this ID.

The browser commonly stores the session ID inside a cookie.

---

## Cookie and Session Together

Cookies and sessions are often used together.

The cookie stores the session ID in the browser.

The actual session information is maintained by the server.

For example:

Browser:
Session ID = abc123

Server:
Session abc123
- username = Nancy
- loggedIn = true

When the browser makes another request, it sends the session ID.

The server uses the session ID to find the corresponding session.

---

## Cookie vs Session

Cookie:
- Stored on the client/browser
- Contains small amounts of data
- Sent with requests to the server
- Can store preferences or a session ID

Session:
- Maintained on the server
- Stores user-related information
- Commonly used for login state
- Usually identified using a session ID

---

## Simple Example

A user logs into a website.

1. The user sends login information to the server.
2. The server verifies the login.
3. The server creates a session.
4. The server generates a session ID.
5. The session ID is sent to the browser using a cookie.
6. The browser stores the cookie.
7. The browser sends the cookie with future requests.
8. The server uses the session ID to find the user's session.
9. The server knows that the user is logged in.

---

## Important Difference

A cookie and a session are not the same thing.

Cookie:
Information stored in the browser.

Session:
User-related information maintained by the server.

A cookie can contain a session ID that allows the server to identify the correct session.

---

## Security

Sensitive information should generally not be stored directly in cookies.

Examples of sensitive information that should not be stored directly in cookies:

- Passwords
- Bank details
- Private information

Instead, applications commonly store a session ID in the cookie and keep the actual session information on the server.

---

## Important Cookie Security Options

HttpOnly:
Helps prevent client-side JavaScript from accessing the cookie.

Secure:
The cookie is sent only over HTTPS connections.

SameSite:
Controls when cookies can be sent with cross-site requests.

Expires / Max-Age:
Controls how long the cookie remains valid.

---

## Cookies and Sessions in Express

Express applications can use cookies and sessions to remember users between requests.

The `express-session` package is commonly used to manage sessions in Express applications.

The general flow is:

User logs in
→
Server creates a session
→
Session ID is stored in a cookie
→
Browser sends the cookie with future requests
→
Server identifies the session
→
User remains logged in

---

## Key Concepts

- HTTP is stateless.
- Cookies are stored in the browser.
- Sessions are maintained by the server.
- Cookies can store a session ID.
- Sessions are commonly used for authentication and login state.
- Cookies and sessions are often used together.
- Sensitive information should not be stored directly in cookies.
- `HttpOnly`, `Secure`, and `SameSite` are important cookie security options.

---

# Express Request Body Middleware

---

## express.json()

`express.json()` is middleware that allows Express to read data sent in JSON format.

The parsed data is available through:

`req.body`

---

## express.urlencoded()

`express.urlencoded()` is middleware that allows Express to read data sent from HTML forms.

The parsed data is available through:

`req.body`

---

## Key Concept

- `express.json()` → handles JSON data
- `express.urlencoded()` → handles form data
- Both make the data available through `req.body`

---
# Express Recent Concepts

---

## Dynamic Routing

Dynamic routing is used when a part of the URL needs to change dynamically.

A colon `:` is used to define a dynamic route parameter.

The value can be accessed using `req.params`.

Example concept:

`/profile/:username`

If the URL is `/profile/nancy`, the username can be accessed through `req.params.username`.

---

## EJS

EJS (Embedded JavaScript Templates) is a template engine used with Express.

It is similar to HTML, but it allows us to add dynamic data and JavaScript logic inside HTML.

EJS files use the `.ejs` extension.

EJS is commonly used to create dynamic HTML pages on the server.

---

## EJS View Engine

Express can be configured to use EJS as its view engine.

Once EJS is set as the view engine, Express can render EJS files using `res.render()`.

EJS files are commonly stored inside a `views` folder.

---

## EJS Dynamic Expression

EJS allows dynamic values to be inserted into HTML using:

`<%= %>`

It evaluates the expression and displays the result in the HTML.

EJS comments can be written using:

`<%# %>`

---

## Static Files

Static files are files that are served directly to the browser without being dynamically generated.

Common static files include:

- CSS
- JavaScript
- Images
- Fonts

Express provides `express.static()` middleware to serve static files.

---

## Public Folder

A `public` folder is commonly used to store static files.

The `express.static()` middleware makes the files inside the `public` folder accessible to the browser.

For example:

`public/style/style.css`

can be accessed through:

`/style/style.css`

---

## Connecting Static Files with EJS

Static files such as CSS can be connected to an EJS page using the HTML `<link>` tag.

The browser requests the CSS file, and Express serves it from the `public` folder.

---

## Key Concepts

- Dynamic routing → allows changing values in URLs.
- `req.params` → accesses dynamic route parameters.
- EJS → creates dynamic HTML pages.
- `res.render()` → renders an EJS file.
- `views` → commonly stores EJS files.
- `public` → commonly stores static files.
- `express.static()` → serves static files.
- `<%= %>` → displays dynamic values in EJS.
- `<%# %>` → EJS comment.

---