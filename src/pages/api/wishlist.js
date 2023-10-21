import User from "@/models/userModel";
import { connectDB } from "@/libs/ConnectDB";
import initMiddleware from "@/utils/init-Middleware";
import Cors from "cors";

const cors = initMiddleware(
  Cors({
    // Set allowed origins based on your requirements
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    await cors(req, res);
    const { _id } = req.query._id;
    try {
      await connectDB();
      const findUser = await User.findById(_id).populate("wishlist");
      res.json(findUser);
    } catch (error) {
      throw new Error(error);
    }
  }
}
