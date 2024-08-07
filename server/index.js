import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import dbConnection from "./config/db.js";
import todoRoutes from "./routes/todo_routes.js";
configDotenv();
const app = express();
const PORT = process.env.PORT || 3001;
dbConnection(process.env.MONGODB_URI);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use("/api/todos", todoRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
