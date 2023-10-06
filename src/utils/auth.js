// utils/auth.js

import { getUserFromLocalStorage } from "./Localstorage";


export const useAuth = () => {
  const user = getUserFromLocalStorage();

  return {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role
  };
};
