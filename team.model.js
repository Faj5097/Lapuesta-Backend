const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Team = new Schema({
  country: String,
  league: String,
  name: String,
  shortName: String,
  stars: Number
});

module.exports = mongoose.model("team", Team);
