import { connectDB } from "@/libs/ConnectDB";
import User from "@/models/userModel";


export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectDB();

      const { userId } = req.query;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ user });
    } catch (error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({ message: "An error occurred" });
    }
  }

if (req.method === "PUT") {
  const { userId, name,email, phone } = req.body;

  try {
    await connectDB();

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name;
    user.phone = phone;
    user.email = email;
    
    await user.save();

    return res.status(200).json({ message: "User updated", user });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
}

}
