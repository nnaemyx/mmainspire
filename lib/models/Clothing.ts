import mongoose from "mongoose";

const ClothingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["traditional-wear", "asoebi", "wedding-gowns", "other"],
    },
    price: { type: Number }, // Optional if they want to display a price later
  },
  { timestamps: true }
);

export default mongoose.models.Clothing || mongoose.model("Clothing", ClothingSchema);
