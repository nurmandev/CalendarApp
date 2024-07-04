//Taylor Zweigle, 2024
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  color: {
    type: String,
  },
  duration: {
    type: String,
  },
  metadata: {
    type: String,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  creationTime: {
    type: Date,
    required: true,
  },
  creationUser: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Event", eventSchema);
