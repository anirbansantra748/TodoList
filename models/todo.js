const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const TODO = mongoose.model("TODO", todoSchema);
module.exports = TODO;
