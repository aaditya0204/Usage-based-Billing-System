import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const PRODUCT = mongoose.model("Product", productSchema);
export default PRODUCT;