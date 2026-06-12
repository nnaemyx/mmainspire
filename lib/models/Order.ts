import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    unitPrice: { type: Number, required: true },
    amount: { type: Number, required: true },
  },
  { _id: false }
);

const PaymentSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    note: { type: String },
  },
  { _id: true }
);

const OrderSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, unique: true },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    date: { type: Date, default: Date.now },
    items: { type: [OrderItemSchema], default: [] },
    total: { type: Number, default: 0 },
    payments: { type: [PaymentSchema], default: [] },
    advance: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },
    collectionDate: { type: Date },
    designImages: { type: [String], default: [] },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "In Progress", "Ready", "Delivered"],
    },
    notes: { type: String },
  },
  { timestamps: true }
);

// Auto-generate invoice number before saving
OrderSchema.pre("save", async function () {
  if (!this.invoiceNumber) {
    const Order = mongoose.models.Order;
    const lastOrder = await Order.findOne({}, {}, { sort: { createdAt: -1 } });

    let nextNum = 500; // Start at 500 to avoid conflicts with paper invoices
    if (lastOrder && lastOrder.invoiceNumber) {
      const lastNum = parseInt(lastOrder.invoiceNumber, 10);
      if (!isNaN(lastNum)) {
        nextNum = lastNum + 1;
      }
    }
    this.invoiceNumber = String(nextNum).padStart(6, "0");
  }

  // Recalculate totals
  this.total = this.items.reduce((sum: number, item: any) => sum + (item.amount || 0), 0);
  this.advance = this.payments.reduce((sum: number, p: any) => sum + (p.amount || 0), 0);
  this.balance = this.total - this.advance;
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
