const mongoose = require("mongoose");
const { Schema } = mongoose;

const MovieSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  movieId: { type: String, required: true }, 
  name: { type: String, required: true },
  genres: { type: Array },
  image: { type: String },
  tag: { type: String }
});

module.exports = mongoose.model("movie", MovieSchema);
