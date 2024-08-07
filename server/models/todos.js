import { Schema, model } from "mongoose";

const todoSchema = Schema(
  {
    title: {
      type: String,
      require: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [100, "Title must be less than 100 characters long"],
    },
    description: {
      type: String,
      require: [true, "Description is required"],
      trim: true,
      minlength: [5, "Description must be at least 5 characters long"],
      maxlength: [500, "Description must be less than 500 characters long"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

todoSchema.index({ title: 1 }, { unique: true });

const Todo = model("Todo", todoSchema);
export default Todo;
