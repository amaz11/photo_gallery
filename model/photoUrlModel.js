const { Schema, model } = require("mongoose");

const photoUrlSchema = Schema({
  filepath: { type: String },
});

const photoUrlModel = model("Photourl", photoUrlSchema);

module.exports = photoUrlModel;
