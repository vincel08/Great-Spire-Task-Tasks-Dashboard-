import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import tasksRouter from "./routes/tasks.js";
import { requestLogger } from "./middleware/logger.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(requestLogger);

// Use tasks router
app.use("/", tasksRouter);

app.listen(PORT, () => {
  console.log(`Backend is listening at http://localhost:${PORT}`);
});
