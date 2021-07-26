const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  name: String,
  price: String,
  quantity: String,
  description: String,
  creationDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Product", ProductSchema);
