import Todo from "../models/todos.js";
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.status(200).send(todos);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

// Create Todo
export const createTodo = async (req, res) => {
  const { title, description, completed } = req.body;
  try {
    const newTodo = {
      title,
      description,
      completed,
    };
    const todo = await Todo.create(newTodo);
    return res.status(201).send({ todo, message: "Created" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).send({
        message: `Please chooose another title, "${error.keyValue.title}" exists`,
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).send(error.errors.title.message);
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Mark todo completed
export const markCompleted = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  try {
    const completedTodo = await Todo.findByIdAndUpdate(
      { _id: id },
      { completed },
      { new: true }
    );
    res.status(201).send({ message: "Completed", completedTodo });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Update Todo
export const updateTodo = async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;
  try {
    const todo = await Todo.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    res.status(201).send({ message: "Updated", todo });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Delete Todo

export const deleteTode = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      res.status(404).send({ message: "Todo Not Found" });
    } else {
      res.status(200).send({ message: "Deleted", todo });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
