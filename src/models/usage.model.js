import mongoose, { Schema } from "mongoose";

const usageSchema = new Schema(
  {
    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      required: true,
    },
    usageDate: {
      type: Date,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    totalCost: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const USAGE = mongoose.model("Usage", usageSchema);
export default USAGE;
