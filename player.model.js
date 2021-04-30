const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Player = new Schema({
  name: String
});

module.exports = mongoose.model("player", Player);
