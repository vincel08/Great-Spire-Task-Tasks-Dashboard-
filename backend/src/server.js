require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const tasksRouter = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Use tasks router
app.use("/", tasksRouter);

app.listen(PORT, () => {
  console.log(`Backend is listening at http://localhost:${PORT}`);
});
