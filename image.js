const mongoose = require("mongoose");

// Define Schemes
const imageSchema = new mongoose.Schema({
  image: { type: String },
});

// Create Model & Export
module.exports = mongoose.model("Image", imageSchema);
