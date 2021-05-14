const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Player = new Schema({
  name: String,
  nickname: String,
  wins: Number,
  draws: Number,
  loses: Number
});

module.exports = mongoose.model("player", Player);
