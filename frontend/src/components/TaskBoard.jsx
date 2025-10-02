import React from "react";
import "../styles/TaskBoard.css";

export default function TaskBoard({ tasks, onStatusChange, onDelete }) {
  const statuses = ["todo", "in-progress", "done"];

  return (
    <div className="task-board">
      {statuses.map((status) => (
        <div key={status} className="status-column">
          <h2>{status.toUpperCase()}</h2>
          <ul>
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <li
                  key={task.id}
                  className={`task-item ${task.completed ? "completed" : ""}`}
                >
                  <span>{task.title}</span>
                  <div className="task-actions">
                    {statuses
                      .filter((s) => s !== status)
                      .map((s) => (
                        <button
                          key={s}
                          className="move-btn"
                          onClick={() => onStatusChange(task.id, s)}
                        >
                          Move to {s}
                        </button>
                      ))}
                    <button
                      className="delete-btn"
                      onClick={() => onDelete(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
