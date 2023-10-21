const mongoose = require("mongoose"); // Erase if already required
const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
if (!mongoose.models.Order) {
  const orderSchema = Schema(
    {
      products: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
          count: Number,
          color: String,
        },
      ],
      paymentIntent: {},
      orderStatus: {
        type: String,
        default: "Not Processed",
        enum: [
          "Not Processed",
          "Cash on Delivery",
          "Processing",
          "Dispatched",
          "Cancelled",
          "Delivered",
        ],
      },
      orderby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  );
  mongoose.model("Order", orderSchema);
}

module.exports = mongoose.model("Order");
