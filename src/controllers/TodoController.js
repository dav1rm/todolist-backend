const Todo = require("../models/Todo");

class TodoController {
  async index(req, res) {
    const todos = await Todo.find({}).sort("-createdAt");

    return res.json(todos);
  }

  async show(req, res) {
    const todo = await Todo.findById(req.params.id);

    return res.json(todo);
  }

  async store(req, res) {
    const todo = await Todo.create({ ...req.body, author: req.userId });

    req.io.emit("todoAdd", todo);

    return res.json(todo);
  }

  async update(req, res) {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    req.io.emit("todoUpdate", todo);

    return res.json(todo);
  }

  async destroy(req, res) {
    const todo = await Todo.findByIdAndRemove(req.params.id);

    req.io.emit("todoDelete", todo);

    return res.send();
  }
}

module.exports = new TodoController();
