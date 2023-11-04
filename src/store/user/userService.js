import { base_url } from "@/utils/baseUrl";
import axios from "axios";

const login = async (user) => {
  const response = await axios.post(`${base_url}auth/login`, user);
  return response.data;
};


const userService = {
    login,
  };
  
  export default userService;