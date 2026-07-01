const express = require('express'); // require() is Node.js's module loading function. express exports a function.
const cors = require('cors'); // CORS middleware - Cross-Origin Resource Sharing or CORS is a browser security mechanism that restricts web pages from requesting resources from a different domain than the one that served the original page.
require('dotenv').config(); // require('dotenv') part loads the environment variables. The Dotenv package exports an object containing a method called config(). It then stores every variable in .env into process.env.

const app = express(); // Run the function. The returned object (app) contains lots of methods such as: app.get(), app.post(), app.put(), app.delete(), app.use(), app.listen().

app.use(cors());
app.use(express.json()); // It is a built-in middleware function in Express.js that automatically parses incoming HTTP requests with JSON payloads. You must place this middleware BEFORE your routes. Always place app.use(express.json()) above your route definitions. If placed below them, it will not execute for those routes. The incoming client request (from tools like Postman, Frontend Fetch, or Axios) must include the header Content-Type: application/json, otherwise this middleware will safely ignore it.

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server has started on port ${process.env.PORT}!`);
});