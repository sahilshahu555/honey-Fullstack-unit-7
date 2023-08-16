const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    location: { type: String, required: false },
    rating: { type: String, required: true },
    price: { type: String, required: true },
  },
  {
    
    versionKey: false,
    timestamps: true,
  }
);
module.exports = new mongoose.model("products", productSchema);
