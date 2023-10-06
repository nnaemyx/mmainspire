import User from "@/models/userModel";
import { connectDB } from "@/libs/ConnectDB";
import initMiddleware from "@/utils/init-Middleware";
import Cors from "cors";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { compare } from "bcryptjs";

const cors = initMiddleware(
  Cors({
    // Set allowed origins based on your requirements
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 86400,
  });
};

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(422).json({ message: "Please add email or password" });
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
      const passwordIsCorrect = await compare(password, user.password);
      
      const token = generateToken(user._id);

      if (user && passwordIsCorrect) {
        const newUser = await User.findOne({ email }).select("-password");
        const parsedCookie = cookie.serialize("cookie", token, {
          maxAge: new Date(Date.now() + 1000 * 86400),
          path: "/", // Path where the cookie is available
          httpOnly: true, // Make the cookie accessible only via HTTP (not JavaScript)
          // secure: process.env.NODE_ENV === 'production', // Set to true in production for secure cookies
          // sameSite: 'strict', // Set the SameSite attribute for cross-site requests
        });
        res.status(201).json(newUser);
        // Send the cookie in the response header
        res.setHeader("Set-Cookie", parsedCookie);
      } else {
        res.status(400);
        throw new Error("Incorrect email or password");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      res
        .status(500)
        .json({ message: "An error occurred while creating the user" });
    }
  } else {
    res.status(200).json({ message: "Route not valid" });
  }
}

export default handler;
