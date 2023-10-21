const mongoose = require("mongoose"); // Erase if already required
const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
if (!mongoose.models.Coupon) {
  const couponSchema = Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
      },
      expiry: {
        type: Date,
        required: true,
      },
      discount: {
        type: Number,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
  mongoose.model("Coupon", couponSchema);
}

module.exports = mongoose.model("Coupon");
