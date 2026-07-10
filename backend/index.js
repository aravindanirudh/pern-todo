import express from "express";
import cors from "cors"; // CORS middleware - Cross-Origin Resource Sharing or CORS is a browser security mechanism that restricts web pages from requesting resources from a different domain than the one that served the original page.
import dotenv from "dotenv"; // The Dotenv package exports an object containing a method called config().
dotenv.config(); // Actually loads the environment variables from the .env file into process.env. This allows you to access your environment variables using process.env.VARIABLE_NAME.
import pg from "pg"; // For database/table initialization.
import pool from "./db.js"; // The pool object created in db.js is imported here to be used for database operations like querying, inserting, updating, and deleting data from the PostgreSQL database.

const app = express(); // Run the function. The returned object (app) contains lots of methods such as: app.get(), app.post(), app.put(), app.delete(), app.use(), app.listen().

app.use(cors()); // Actually use the CORS middleware. This allows your backend server to accept requests from different origins (like your frontend React app running on a different port). Without this, your frontend would be blocked from making requests to your backend due to the same-origin policy enforced by browsers.
app.use(express.json()); // It is a built-in middleware function in Express.js that automatically parses incoming HTTP requests with JSON payloads. You must place this middleware BEFORE your routes. Always place app.use(express.json()) above your route definitions. If placed below them, it will not execute for those routes. The incoming client request (from tools like Postman, Frontend Fetch, or Axios) must include the header Content-Type: application/json, otherwise this middleware will safely ignore it. req.body.

// Database Initialization & Server Startup logic
const initDbAndStartServer = async () => {
  // Connect to the default 'postgres' database to check/create 'perntodo'.
  const tempClient = new pg.Client({
    user: "postgres",
    password: "200520052005",
    host: "localhost",
    port: 5432,
    database: "postgres",
  });

  try {
    await tempClient.connect();
    const res = await tempClient.query(
      "SELECT FROM pg_database WHERE datname = 'perntodo'",
    );

    if (res.rowCount === 0) {
      console.log("Database 'perntodo' not found. Creating it...");
      await tempClient.query("CREATE DATABASE perntodo");
      console.log("Database created!");
    }
  } catch (err) {
    console.error("Error creating database on startup:", err.message);
    process.exit(1); // Crash gracefully if database creation fails entirely.
  } finally {
    await tempClient.end(); // Always close temp connection.
  }

  // Now that the DB guaranteed exists, use main 'pool' to check/create the table.
  try {
    const createTableQuery = `
                CREATE TABLE IF NOT EXISTS todo(
                    todo_id SERIAL PRIMARY KEY,
                    description VARCHAR(255)
                );
            `;
    await pool.query(createTableQuery);
    console.log("Table 'todo' is verified and ready!");
  } catch (err) {
    console.error("Error creating table on startup:", err.message);
  }

  // Start the Express server so it can receive frontend requests finally.
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}!`);
  });
};

// Execute the startup function.
initDbAndStartServer();

// Routes
// Create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description],
    ); // description -> $1 variable. RETURNING * is a PostgreSQL feature that tells the database: "After inserting (or updating/deleting) the row, return the affected row(s)."
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// Get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// Get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allTodos = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(allTodos.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// Update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
      [description, id],
    );
    res.json(updateTodo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
    id,
  ]);
  res.json({
    message: "Todo was deleted!",
    todo: deleteTodo.rows[0],
  });
});