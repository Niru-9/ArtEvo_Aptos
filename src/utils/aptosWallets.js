export const connectWallet = async (wallet) => {
  try {
    if (wallet === "petra" && window.aptos) {
      const response = await window.aptos.connect();
      return response.address;
    }
    if (wallet === "martian" && window.martian) {
      const response = await window.martian.connect();
      return response.address;
    }
    if (wallet === "fewcha" && window.fewcha) {
      const response = await window.fewcha.connect();
      return response.address;
    }
    alert("Wallet not found. Please install the extension.");
    return null;
  } catch (error) {
    console.error(error);
    alert("Connection failed!");
    return null;
  }
};
