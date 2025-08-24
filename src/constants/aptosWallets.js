// utils/wallets.js
export const wallets = {
  rise: {
    name: "Rise",
    provider: () => window.aptos,
  },
  petra: {
    name: "Petra",
    provider: () => window.petra,
  },
  martian: {
    name: "Martian",
    provider: () => window.martian,
  },
  pontem: {
    name: "Pontem",
    provider: () => window.pontem,
  },
};

// function to connect to any wallet
export const connectWallet = async (walletKey) => {
  const wallet = wallets[walletKey];
  if (!wallet) throw new Error("Wallet not supported!");

  const provider = wallet.provider();
  if (!provider) throw new Error(`${wallet.name} Wallet not found. Please install it.`);

  try {
    const account = await provider.connect();
    return account; // { address: "0x123...", publicKey: "..." }
  } catch (err) {
    throw new Error(`Failed to connect ${wallet.name}: ${err.message}`);
  }
};
