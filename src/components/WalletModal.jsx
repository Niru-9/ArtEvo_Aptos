// src/components/WalletModal.jsx
import React from "react";
import { walletOptions } from "../utils/walletConfig";
import { connectWallet } from "../utils/aptosWallets.js";

const WalletModal = ({ onClose, onConnect }) => {
  const handleConnect = async (walletId) => {
    const address = await connectWallet(walletId);
    if (address) {
      onConnect(address); // send connected address to parent
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
        <h2 className="text-2xl font-bold mb-6 text-black">Connect Wallet</h2>

        <div className="grid grid-cols-2 gap-4">
          {walletOptions.map((wallet) => (
            <button
              key={wallet.id}
              onClick={() => handleConnect(wallet.id)}
              className={`flex flex-col items-center justify-center rounded-lg border shadow-md p-4 hover:scale-105 transition-transform ${wallet.color}`}
            >
              {wallet.logo && (
                <img
                  src={wallet.logo}
                  alt={wallet.name}
                  className="w-12 h-12 mb-2 object-contain"
                />
              )}
              <span className="text-sm font-medium text-gray-800">
                {wallet.name}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-6 text-gray-600 hover:text-gray-900"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default WalletModal;
