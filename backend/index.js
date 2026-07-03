import express from "express"; // express exports a function.
import cors from "cors"; // CORS middleware - Cross-Origin Resource Sharing or CORS is a browser security mechanism that restricts web pages from requesting resources from a different domain than the one that served the original page.
import dotenv from "dotenv"; // The Dotenv package exports an object containing a method called config(). It then stores every variable in .env into process.env.
dotenv.config();
import pool from './db.js';

const app = express(); // Run the function. The returned object (app) contains lots of methods such as: app.get(), app.post(), app.put(), app.delete(), app.use(), app.listen().

app.use(cors());
app.use(express.json()); // It is a built-in middleware function in Express.js that automatically parses incoming HTTP requests with JSON payloads. You must place this middleware BEFORE your routes. Always place app.use(express.json()) above your route definitions. If placed below them, it will not execute for those routes. The incoming client request (from tools like Postman, Frontend Fetch, or Axios) must include the header Content-Type: application/json, otherwise this middleware will safely ignore it. req.body.

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server has started on port ${process.env.PORT}!`);
});

// Routes
// Create a todo
app.post("/todos", async(req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]); // description -> $1 variable. RETURNING * is a PostgreSQL feature that tells the database: "After inserting (or updating/deleting) the row, return the affected row(s)."
        res.json(newTodo.rows[0]);  
    } catch (error) {
        console.log(error.message);
    }
})

// Get all todos
app.get("/todos", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message);
    }
})

// Get a todo
app.get("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const allTodos = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(allTodos.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})

// Update a todo
app.put("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *", [description, id]);
        res.json(updateTodo.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})

// Delete a todo
app.delete("/todos/:id", async(req, res) => {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.json({
        message: "Todo was deleted!",
        todo: deleteTodo.rows[0]
    });
})