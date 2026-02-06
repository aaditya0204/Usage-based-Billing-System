import mongoose, { Schema } from "mongoose";

const invoiceSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    invoiceDate: {
      type: Date,
      required: true,
    },
    billingPeriodStart: {
      type: Date,
      required: true,
    },
    billingPeriodEnd: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "issued", "paid", "overdue"],
      default: "draft",
    },
  },
  { timestamps: true }
);

const INVOICE = mongoose.model("Invoice", invoiceSchema);
export default INVOICE;
