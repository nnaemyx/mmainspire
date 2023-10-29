export const saveUserToLocalStorage = (user) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('users', JSON.stringify(user));
    }
  };
  
  
  export const getUserFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('users');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      return parsedUser
    }
    return null;
  };
  
  
  export const removeUserFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('users');
    }
  };


  export const saveColorToLocalStorage = (color) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('colors', JSON.stringify(color));
    }
  };
  
  
  export const getColorFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const storedColors = localStorage.getItem('colors');
      const parsedColors = storedColors ? JSON.parse(storedColors) : null;
      return parsedColors
    }
    return null;
  };
  
  
  export const removeColorFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('colors');
    }
  };


  export const saveProductsToLocalStorage = (product) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('products', JSON.stringify(product));
    }
  };
  
  
  export const getProductsFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const storedProducts = localStorage.getItem('products');
      const parsedProducts = storedProducts ? JSON.parse(storedProducts) : null;
      return parsedProducts
    }
    return null;
  };
  
  
  export const removeProductsFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('products');
    }
  };


  export const saveCategoryToLocalStorage = (category) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('categorys', JSON.stringify(category));
    }
  };
  
  
  export const getCategoryFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const storedProducts = localStorage.getItem('categorys');
      const parsedProducts = storedProducts ? JSON.parse(storedProducts) : null;
      return parsedProducts
    }
    return null;
  };
  
  
  export const removeCategoryFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('categorys');
    }
  };