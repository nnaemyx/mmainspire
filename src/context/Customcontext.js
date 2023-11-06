import React, { createContext, useContext, useState } from "react";

const CustomContext = createContext();

export const useCustomContext = () => useContext(CustomContext);

export const CustomContextProvider = ({ children }) => {
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);
  const [isBottomOpen, setIsBottomOpen] = useState(false);

  const initialCurrency = () => {
    if (typeof window !== "undefined") {
      const storedCurrency = localStorage.getItem("selectedcurrency");
      return storedCurrency || "NGN";
    }
    return "NGN"
  };

  const [selectedCurrency, setSelectedCurrency] = useState(initialCurrency());

  const handleCurrencyChange = (newCurrency) => {
    setSelectedCurrency(newCurrency);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedcurrency", newCurrency);
    }
    // Store the new currency in local storage
    
  };

  const openLeft = () => setIsLeftOpen(true);
  const closeLeft = () => setIsLeftOpen(false);

  const openRight = () => setIsRightOpen(true);
  const closeRight = () => setIsRightOpen(false);

  const openBottom = () => setIsBottomOpen(true);
  const closeBottom = () => setIsBottomOpen(false);

  return (
    <CustomContext.Provider
      value={{
        isLeftOpen,
        isRightOpen,
        isBottomOpen,
        openLeft,
        closeLeft,
        openRight,
        closeRight,
        openBottom,
        closeBottom,
        selectedCurrency,
        handleCurrencyChange,
      }}
    >
      {children}
    </CustomContext.Provider>
  );
};
