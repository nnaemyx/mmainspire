const mongoose = require("mongoose"); // Erase if already required
const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
if (!mongoose.models.Cart) {
  const cartSchema = Schema(
    {
      products: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
          count: Number,
          color: String,
          price: Number,
        },
      ],
      cartTotal: Number,
      totalAfterDiscount: Number,
      orderby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  );
  mongoose.model("Cart", cartSchema);
}

module.exports = mongoose.model("Cart");
