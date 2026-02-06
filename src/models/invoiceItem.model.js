import mongoose from "mongoose";

const invoiceItemSchema = new mongoose.Schema(
  {
    invoiceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
      required: true,
    },
    usageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usage",
    },
    description: {
      type: String,
      required: true,
    },
    itemType: {
      type: String,
      enum: ["usage", "fixed", "tax", "discount"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const INVOICE_ITEM = mongoose.model("InvoiceItem", invoiceItemSchema);
export default INVOICE_ITEM;
