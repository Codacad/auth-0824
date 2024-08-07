import { Router } from "express";
import {
  createTodo,
  deleteTode,
  getTodos,
  markCompleted,
  updateTodo,
} from "../controllers/todos_conroller.js";
const router = Router();

router.get("/", getTodos);
router.post("/create", createTodo);
router.patch("/mark_completed/:id", markCompleted);
router.put("/update/:id", updateTodo);
router.delete("/delete/:id", deleteTode);

export default router;
