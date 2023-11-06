const mongoose = require("mongoose"); // Erase if already required
const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
if (!mongoose.models.Product) {
  const productSchema = Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      usdPrice: {
        type: Number,
      },
      category: {
        type: String,
        required: true,
      },
      brand: {
        type: String,
      },
      material: {
        type: String,
      },
      quantity: {
        type: Number,
        required: true,
      },
      sold: {
        type: Number,
        default: 0,
      },
      images: {
        type: [String],
      },
      color: [
        {
          hex: {
            type: String,
            required: true,
          },
          title: {
            type: String,
            required: true,
          },
        },
      ],
      sizes: {
        S: { type: Number, default: 0 },
        M: { type: Number, default: 0 },
        L: { type: Number, default: 0 },
        XL: { type: Number, default: 0 },
      },
      tags: String,
      ratings: [
        {
          star: Number,
          comment: String,
          postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        },
      ],
      totalrating: {
        type: String,
        default: 0,
      },
    },
    { timestamps: true }
  );

  mongoose.model("Product", productSchema);
}

//Export the model
module.exports = mongoose.model("Product");
