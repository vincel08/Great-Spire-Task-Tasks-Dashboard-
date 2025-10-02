const express = require("express");
const router = express.Router();
const db = require("../db");

/**
 * Get all tasks
 */
router.get("/tasks", (req, res) => {
  try {
    const tasks = db.prepare("SELECT * FROM tasks").all();
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * Add task
 */
router.post("/task", (req, res) => {
  try {
    const { title, description, status, completed } = req.body;

    if (!title || title.length < 3) {
      return res.status(400).json({ error: "Title must be ≥ 3 chars" });
    }

    const stmt = db.prepare(`
      INSERT INTO tasks (title, description, status, completed)
      VALUES (?, ?, ?, ?)
    `);

    const result = stmt.run(
      title,
      description || "",
      ["todo", "in-progress", "done"].includes(status) ? status : "todo",
      completed ? 1 : 0
    );

    res.status(201).json({
      id: result.lastInsertRowid,
      title,
      description: description || "",
      status: status || "todo",
      completed: !!completed,
    });
  } catch (err) {
    console.error("POST /task error:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * Update task
 */
router.patch("/tasks/:id", (req, res) => {
  try {
    const { id } = req.params;
    let { title, status, completed } = req.body;

    // Convert completed to 0/1 if defined
    if (typeof completed === "boolean") {
      completed = completed ? 1 : 0;
    }

    // Validate status if provided
    if (status && !["todo", "in-progress", "done"].includes(status)) {
      status = undefined; // ignore invalid status
    }

    const stmt = db.prepare(`
      UPDATE tasks
      SET title = COALESCE(?, title),
          status = COALESCE(?, status),
          completed = COALESCE(?, completed)
      WHERE id = ?
    `);

    const result = stmt.run(title, status, completed, id);

    if (result.changes === 0)
      return res.status(404).json({ error: "Task not found" });

    res.json({
      id,
      title,
      status,
      completed: completed !== undefined ? !!completed : undefined,
    });
  } catch (err) {
    console.error("PATCH /tasks/:id error:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * Delete task
 */
router.delete("/tasks/:id", (req, res) => {
  try {
    const { id } = req.params;
    const stmt = db.prepare("DELETE FROM tasks WHERE id=?");
    const result = stmt.run(id);

    if (result.changes === 0)
      return res.status(404).json({ error: "Task not found" });

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("DELETE /tasks/:id error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
