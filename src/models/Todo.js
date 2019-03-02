const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  content: String,
  done: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Todo", TodoSchema);
