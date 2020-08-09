const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  mood: {
    type: Number,
    required: false,
    default: 0,
  },
});

module.exports = mongoose.model("Question", questionSchema);
