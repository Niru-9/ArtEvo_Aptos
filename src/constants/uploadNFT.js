// src/constants/uploadNFT.js
import lighthouse from "@lighthouse-web3/sdk";

const apiKey = import.meta.env.VITE_LIGHTHOUSE_API_KEY;

// Upload NFT details (title, description, price, etc.)
export const uploadNFTData = async (nftData) => {
  try {
    const jsonBlob = new Blob([JSON.stringify(nftData)], { type: "application/json" });
    const file = new File([jsonBlob], "nft.json");

    const response = await lighthouse.upload([file], apiKey);
    console.log("NFT Data Uploaded: ", response);

    return `ipfs://${response.data.Hash}`;
  } catch (error) {
    console.error("Error uploading NFT data:", error);
  }
};

// Upload Contact Details (wallet + email/phone, etc.)
export const uploadContactData = async (contactData) => {
  try {
    const jsonBlob = new Blob([JSON.stringify(contactData)], { type: "application/json" });
    const file = new File([jsonBlob], "contact.json");

    const response = await lighthouse.upload([file], apiKey);
    console.log("Contact Data Uploaded: ", response);

    return `ipfs://${response.data.Hash}`;
  } catch (error) {
    console.error("Error uploading contact details:", error);
  }
};
console.log("uploadNFTData function loaded");
