const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema({
  lines: Array
});

module.exports = mongoose.model("Board", BoardSchema);
