import {create} from 'zustand';
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import userService from './userService';
import { saveUserToLocalStorage } from '@/utils/Localstorage';

const useUserStore = create(devtools(immer((set) => ({
  user: null, // Initial user state
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',

  // Async function for logging in
  login: async (userData) => {
    try {
      // Simulate the login process; replace with actual logic
      const user = await userService.login(userData);
      saveUserToLocalStorage(user);
      // Set the user in the store
      set({ user });

      return user;
    } catch (error) {
      // Handle login error
      set({ isError: true, message: error.message });
      throw error;
    }
  },

  // Function to clear the user state (log out)
  logout: () => set({ user: null, orders: [], isError: false, isLoading: false, isSuccess: false, message: '' }),
}))));

export default useUserStore;
