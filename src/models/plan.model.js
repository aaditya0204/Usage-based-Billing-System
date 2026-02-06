import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const PLAN = mongoose.model("Plan", planSchema);
export default PLAN;
