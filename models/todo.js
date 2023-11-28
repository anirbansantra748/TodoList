const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  task: {
    type:String,
    required: true,
  },
  duration:String,
  done:Boolean,
});

const TODO = mongoose.model("TODO",todoSchema);
module.exports = TODO;
