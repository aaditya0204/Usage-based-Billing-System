import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    billingCycle: {
      type: String,
      enum: ["monthly", "yearly"],
      required: true,
    },
    includedQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
    overageUnitPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "INR",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const PLAN = mongoose.model("Plan", planSchema);
export default PLAN;
