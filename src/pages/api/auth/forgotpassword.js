import { connectDB } from "@/libs/ConnectDB";
import initMiddleware from "@/utils/init-Middleware";
import User from "@/models/userModel";
import Cors from "cors";
import jwt from "jsonwebtoken";
import sendPasswordResetEmail from "@/libs/sendEmail";
import crypto from "crypto";

const cors = initMiddleware(
  Cors({
    // Set allowed origins based on your requirements
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: Date.now() + 3600000,
  });
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;
    if (!email) {
      res.status(422).json({ message: "Please add email" });
      return;
    }
    await cors(req, res);
    try {
      await connectDB();
      const user = await User.findOne({ email });

      if(!user) {
        res.status(400);
        throw new Error("User does not exist");
      }

      const resetToken = crypto.randomBytes(20).toString("hex");

      // Calculate the token expiration time (e.g., 1 hour from now)
      const expiration = new Date();
      expiration.setMinutes(expiration.getMinutes() + 3); // Set expiration to 3 minutes from now
      user.resetToken = resetToken;
      user.resetTokenExpires = expiration;

      // Save the updated user document
      await user.save();

      // Generate a JWT token
    //   const token = generateToken(user._id);

      // Send the password reset email with the reset token
      await sendPasswordResetEmail(email, resetToken);

      return res.status(200).json({ message: "Check your email for link" });

    } catch (error) {
        console.error("Error sending mail:", error);
        res.status(500).json({ message: "An error occurred while sending mail" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
