import React, { useState, useEffect } from "react";
import { getTasks, addTask, updateTask, deleteTask } from "./api/tasksService";
import TaskBoard from "./components/TaskBoard";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  /**
   * Get all tasks
   */
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  /**
   * Add task
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle || trimmedTitle.length < 3) {
      alert("Task title must be at least 3 characters");
      return;
    }

    try {
      const res = await addTask({
        title: trimmedTitle,
        description: description,
        status: "todo",
      });
      setTasks((prev) => [...prev, res.data]);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Add task error:", err);
    }
  };

  /**
   * Update task status
   */
  const handleStatusChange = async (id, newStatus) => {
    try {
      const task = tasks.find((t) => t.id === id);
      await updateTask(id, { ...task, status: newStatus });
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
      );
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  /**
   * Delete task
   */
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Mini Task Board</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button type="submit">Add Task</button>
        <button
          type="button"
          onClick={fetchTasks}
          style={{ marginLeft: "10px" }}
        >
          Refresh Tasks
        </button>
      </form>

      {loading && <p>Loading tasks...</p>}

      <TaskBoard
        tasks={tasks}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </div>
  );
}
