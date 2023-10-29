import { connectDB } from "@/libs/ConnectDB";
import User from "@/models/userModel";


export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectDB();

      const users = await User.find(); // Fetch all users

      return res.status(200).json({ users });
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ message: "An error occurred" });
    }
  }

}
