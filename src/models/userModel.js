import mongoose from "mongoose";
const Schema = mongoose.Schema;

if (!mongoose.models.User) {
  const userSchema = new Schema(
    {
      name: {
        type: String,
        required: [true, "Please enter a name"],
      },
      email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        trim: true,
        match: [
          /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
          "Please enter a valid email address",
        ],
      },
      password: {
        type: String,
        required: [true, "Please enter a valid password"],
        minLength: [6, "Password must be at least 6 characters"],
      },
      role: {
        type: String,
        required: [true],
        default: "customer",
        enum: ["customer", "admin"],
      },
      phone: {
        type: String,
        required: [true],
        default: "+234",
      },
      resetToken: {
        type: String,
      },
      resetTokenExpires: {
        type: String,
      },
      cart: {
        type: Array,
        default: [],
      },
      address: {
        type: String,
      },
      wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    },
    {
      timestamps: true,
    }
  );
  mongoose.model("User", userSchema);
}

module.exports = mongoose.model("User");
