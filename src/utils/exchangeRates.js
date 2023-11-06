const axios = require("axios");
const apiKey = "a03657f6665942e2810e896bd411ba2e"; // Replace with your actual API key

// Make the API request to get the exchange rate
const getExchangeRate = async () => {
  try {
    const response = await axios.get(
      `https://openexchangerates.org/api/latest.json?app_id=${apiKey}`
    );
    console.log(response.data.rates.NGN);
    return response.data.rates.NGN;
    // This will give you the NGN to USD exchange rate
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    throw error;
  }
};

export default getExchangeRate;
