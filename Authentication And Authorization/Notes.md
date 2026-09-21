# Authentication and Authorization Notes

## 1. Authentication

Authentication means:

> "Who are you?"

It is the process of verifying the identity of a user.

Example:

Email: nancy@gmail.com
Password: mypassword123

The server checks whether these credentials belong to a registered user.

If the credentials are correct, the user is authenticated.

---

## 2. Authorization

Authorization means:

> "What are you allowed to do?"

After a user is authenticated, authorization determines what the user is allowed to access or perform.

Example:

User
  ↓
Login
  ↓
Authentication
  ↓
Authenticated User
  ↓
Authorization
  ↓
Access allowed resources

Example:

A normal user may be allowed to view their profile, while an admin may also be allowed to delete users.

---

# 3. Cookies

A cookie is a small piece of information stored by the browser.

Cookies can be used to store information that needs to be sent back to the server with future requests.

Example:

res.cookie("name", "nancy");

This creates a cookie:

name = nancy

The browser stores the cookie.

When the browser makes another request to the same server, the cookie can be sent along with the request.

---

## 4. cookie-parser

Express does not automatically provide an easy way to read cookies.

We can use the cookie-parser package.

Install it using:

npm install cookie-parser

Import it:

const cookieParser = require("cookie-parser");

Use it as middleware:

app.use(cookieParser());

Now cookies can be accessed using:

req.cookies

Example:

app.get("/read", function (req, res) {
  console.log(req.cookies);
  res.send("reader page");
});

If the browser contains:

name = nancy

The server can access it through:

req.cookies.name

---

# 5. Creating a Cookie

A cookie can be created using:

res.cookie("name", "nancy");

Example:

app.get("/", function (req, res) {
  res.cookie("name", "nancy");
  res.send("done");
});

The browser will store the cookie.

The same cookie can then be available when visiting another route.

---

# 6. Bcrypt

Bcrypt is used for securely hashing passwords.

Passwords should NOT be stored directly in the database.

For example, we should not store:

mypassword123

Instead, bcrypt converts the password into a hash.

Example:

mypassword123
      ↓
   bcrypt
      ↓
$2b$10$SFw6vCnr0LqpGfLnRMZIbe75...

The hash is stored in the database instead of the original password.

---

# 7. Hashing vs Encryption

Bcrypt is mainly used for password hashing, not normal reversible encryption.

Hashing is a one-way process.

Example:

Password
   ↓
Hash
   ↓
Stored in database

The original password cannot simply be converted back from the hash.

When the user logs in, bcrypt checks whether the entered password matches the stored hash.

---

# 8. Installing Bcrypt

Install bcrypt using:

npm install bcrypt

Import it:

const bcrypt = require("bcrypt");

---

# 9. Generating a Salt

Bcrypt uses a salt while creating a password hash.

Example:

bcrypt.genSalt(10, function (err, salt) {
  // salt generated here
});

The number 10 represents the salt rounds.

---

# 10. Hashing a Password

Example:

bcrypt.genSalt(10, function (err, salt) {
  bcrypt.hash("abcdxyz", salt, function (err, hash) {
    console.log(hash);
  });
});

The result will look similar to:

$2b$10$SFw6vCnr0LqpGfLnRMZIbe75LgZIAVg2dct/lvLRlvglx93dPEx2q

This hash can be stored in the database.

---

# 11. Comparing a Password

When the user logs in, we need to check whether the entered password is correct.

We use:

bcrypt.compare()

Example:

bcrypt.compare(
  "abcdxyz",
  storedHash,
  function (err, result) {
    console.log(result);
  }
);

If the password is correct:

true

If the password is incorrect:

false

Important:

bcrypt.compare() is used for password verification.

It is NOT decryption.

---

# 12. JWT

JWT stands for:

JSON Web Token

JWT is commonly used to securely represent information about an authenticated user.

A JWT is signed using a secret key.

Example:

let token = jwt.sign(
  { email: "nancy@gmail.com" },
  "secret"
);

The token contains information called the payload.

Example payload:

{
  email: "nancy@gmail.com"
}

The token is then signed using the secret.

---

# 13. Installing JWT

Install the jsonwebtoken package using:

npm install jsonwebtoken

Import it:

const jwt = require("jsonwebtoken");

---

# 14. Creating a JWT

JWT can be created using:

jwt.sign()

Example:

let token = jwt.sign(
  { email: "nancy@gmail.com" },
  "secret"
);

Here:

jwt.sign() → creates the token

{ email: "nancy@gmail.com" } → payload

"secret" → secret key used to sign the token

---

# 15. Storing JWT in a Cookie

A JWT can be stored inside a cookie.

Example:

let token = jwt.sign(
  { email: "nancy@gmail.com" },
  "secret"
);

res.cookie("token", token);

Now the browser stores:

token = JWT_TOKEN

The browser will send the cookie with future requests.

---

# 16. Reading the JWT from a Cookie

Because we are using cookie-parser:

req.cookies.token

can be used to access the JWT stored in the cookie.

Example:

let token = req.cookies.token;

---

# 17. Verifying a JWT

JWT can be verified using:

jwt.verify()

Example:

let data = jwt.verify(
  req.cookies.token,
  "secret"
);

console.log(data);

If the token is valid and was signed using the correct secret, the decoded information can be obtained.

Example:

{
  email: "nancy@gmail.com",
  iat: ...
}

If the token is invalid or has been modified, verification fails.

---

# 18. JWT is Signed, Not Normally Encrypted

JWT should not be thought of as a password encryption mechanism.

A standard signed JWT provides integrity and authenticity of the token contents.

The payload should therefore not contain sensitive information such as:

- Passwords
- Bank details
- Private secrets

The secret key is used to verify the signature.

---

# 19. Cookies, Bcrypt and JWT Together

These three technologies have different jobs.

Bcrypt:

Protects passwords.

Cookie:

Stores information in the browser and sends it with requests.

JWT:

Provides a signed token that can represent information about an authenticated user.

Simple idea:

Bcrypt → Protect the password

Cookie → Store/send information in the browser

JWT → Represent and verify the authenticated user's information

---

# 20. Complete Authentication Flow

A simple authentication system can work like this:

User registers
      ↓
Password
      ↓
Bcrypt
      ↓
Password Hash
      ↓
MongoDB


User logs in
      ↓
Email + Password
      ↓
Find user in MongoDB
      ↓
bcrypt.compare()
      ↓
Password correct?
      ↓
Create JWT
      ↓
Store JWT in Cookie
      ↓
Browser


User visits another page
      ↓
Browser sends Cookie
      ↓
Server reads JWT
      ↓
jwt.verify()
      ↓
User authenticated
      ↓
Allow access

---

# 21. Example Using All Three

Required packages:

const cookieParser = require("cookie-parser");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cookieParser());

Example of creating a JWT:

app.get("/", function (req, res) {
  let token = jwt.sign(
    { email: "nancy@gmail.com" },
    "secret"
  );

  res.cookie("token", token);
  res.send("done");
});

Example of reading and verifying the JWT:

app.get("/read", function (req, res) {
  let data = jwt.verify(
    req.cookies.token,
    "secret"
  );

  console.log(data);
  res.send("reader page");
});

---

# 22. Simple Difference

Bcrypt:

Password → Hash

Used when storing and checking passwords.

Cookie:

Server → Browser

Used to store information in the browser and send it back with requests.

JWT:

User information → Signed Token

Used to represent and verify authentication information.

---

# 23. Easy Way to Remember

Bcrypt:

"Protect my password."

Cookie:

"Remember this information in my browser."

JWT:

"Here is my signed authentication token."

---

# 24. Important Concepts Learned

So far in Authentication and Authorization, I have learned:

- Authentication
- Authorization
- Cookies
- cookie-parser
- Creating cookies
- Reading cookies
- Bcrypt
- Salt
- Password hashing
- Password verification
- bcrypt.compare()
- JWT
- JSON Web Token
- jwt.sign()
- jwt.verify()
- Storing JWT in cookies
- Reading JWT from cookies
- Basic authentication flow

---

# 25. Overall Concept

The three technologies can work together:

Bcrypt
  ↓
Protects the password

JWT
  ↓
Creates a signed authentication token

Cookie
  ↓
Stores and sends the JWT between the browser and server

So the basic authentication flow is:

Password
   ↓
Bcrypt
   ↓
Password Hash
   ↓
MongoDB

Login
   ↓
bcrypt.compare()
   ↓
Successful Authentication
   ↓
JWT
   ↓
Cookie
   ↓
Browser
   ↓
Future Requests
   ↓
jwt.verify()
   ↓
Authenticated User