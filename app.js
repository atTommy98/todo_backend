const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
const port = 3000;
const jsonParser = bodyParser.json();

app.use(cors());
app.use(jsonParser);
app.use(bodyParser.urlencoded({ extended: false }));

//ROUTES

// Create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const sql = `INSERT INTO todo (description) VALUES (?)`;
    db.query(sql, description, (err, results, fields) => {
      res.json(results);
    });
  } catch (err) {
    console.error(err.message);
  }
});

// Get all todos
app.get("/todos", async (req, res) => {
  try {
    const sql = `SELECT * FROM todo`;
    db.query(sql, null, (err, results, fields) => {
      res.json(results);
    });
  } catch (err) {
    console.error(err.message);
  }
});

// Get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `SELECT * FROM todo WHERE todo_id=(?)`;
    db.query(sql, id, (err, results, fields) => {
      res.json(results);
    });
  } catch (err) {
    console.error(err);
  }
});

// Delete todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `DELETE FROM todo WHERE todo_id=(?)`;
    db.query(sql, id, (err, results, fields) => {
      res.json(results);
    });
  } catch (err) {
    console.error(err);
  }
});

// Update todo
app.patch("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const sql = `UPDATE todo SET description = (?) WHERE todo_id=(?)`;
    db.query(sql, [description, id], (err, results, fields) => {
      res.json(results);
    });
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
