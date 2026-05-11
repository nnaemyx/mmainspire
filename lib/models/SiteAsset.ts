import mongoose from "mongoose";

const SiteAssetSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.SiteAsset || mongoose.model("SiteAsset", SiteAssetSchema);
