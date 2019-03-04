const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Configurando realtime
const server = require("http").Server(app);
const io = require("socket.io")(server);

// Configurando banco de dados mongoDB
mongoose.connect(
  "mongodb://davi:davi123456@ds157735.mlab.com:57735/todolist-backend",
  {
    useCreateIndex: true,
    useNewUrlParser: true
  }
);

app.use((req, res, next) => {
  req.io = io;

  return next();
});

app.use(cors());
// Entender requisições via json
app.use(bodyParser.json());
// Entender parametros via url
app.use(bodyParser.urlencoded({ extended: false }));

// Rotas da aplicação
app.use(require("./routes.js"));

server.listen(process.env.PORT || 3000);
