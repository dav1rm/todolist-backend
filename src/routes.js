const express = require("express");
const TodoController = require("./controllers/TodoController");

const routes = express.Router();

routes.get("/todos", TodoController.index);
routes.get("/todos/:id", TodoController.show);
routes.post("/todos", TodoController.store);
routes.put("/todos/:id", TodoController.update);
routes.delete("/todos/:id", TodoController.destroy);

module.exports = routes;
