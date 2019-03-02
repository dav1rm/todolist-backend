const Todo = require("../models/Todo");

class TodoController {
  async index(req, res) {
    const todos = await Todo.find({});

    return res.json(todos);
  }

  async show(req, res) {
    const todo = await Todo.findById(req.params.id);

    return res.json(todo);
  }

  async store(req, res) {
    const todo = await Todo.create({ ...req.body, author: req.userId });

    req.io.emit("todo", todo);

    return res.json(todo);
  }

  async update(req, res) {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    req.io.emit("todo", todo);

    return res.json(todo);
  }

  async destroy(req, res) {
    await Todo.findByIdAndRemove(req.params.id);

    req.io.emit("todo", {});

    return res.send();
  }
}

module.exports = new TodoController();
