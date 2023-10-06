
import { connectDB } from "@/libs/ConnectDB";
import initMiddleware from "@/utils/init-Middleware";
import User from "@/models/userModel";
import Cors from "cors";
import { hash } from "bcryptjs";

const cors = initMiddleware(
  Cors({
    // Set allowed origins based on your requirements
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { newPassword,resetToken } = req.body;
    await cors(req, res);
    try {
    await connectDB();
      // Find the user by their reset token
      const user = await User.findOne({
        resetToken,
        resetTokenExpires: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }

      // Hash the new password
      const hashedPassword = await hash(newPassword, 10);

      // Update the user's password and reset token
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpires = undefined;
    //   user.resetTokenExpires = undefined;

      await user.save();

      // Respond with a success message
      return res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
      console.error("Error resetting password:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
