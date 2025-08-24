🎨 NFT Marketplace on Aptos
A decentralized NFT marketplace built on the Aptos blockchain, enabling creators to mint, list, and sell digital art while providing a seamless buying experience for collectors.
Show Image
Show Image
Show Image
🌟 Features

🎯 NFT Creation & Minting: Artists can create and mint unique digital assets
💰 Marketplace Trading: Buy and sell NFTs with APT cryptocurrency
🔒 Secure Transactions: Built-in escrow and payment distribution
📊 Analytics: Track marketplace statistics and user activity
🎨 Multi-Category Support: Support for various NFT categories (Art, Cultural Heritage, etc.)
⚡ Low Fees: Configurable platform fees with transparent pricing
🔍 NFT Discovery: Browse and discover NFTs by category and creator

🏗️ Architecture
The marketplace consists of three main components:
Core Structures

NFT: Represents individual digital assets with metadata, ownership, and pricing information
MarketplaceRegistry: Global registry managing marketplace statistics and configuration
UserNFTs: User-specific collection tracking owned, created, and purchased NFTs

Smart Contract Functions
FunctionDescriptionAccessinitialize_marketplace()Set up marketplace with platform feeAdmin Onlycreate_and_list_nft()Mint and list new NFT for salePublicpurchase_nft()Buy NFT from marketplacePublicget_marketplace_stats()View marketplace analyticsPublicget_user_nft_count()Get user's NFT countPublic
🚀 Quick Start
Prerequisites

Aptos CLI installed
Aptos wallet with testnet APT tokens
Move development environment

Installation

Clone the repository
bashgit clone https://github.com/yourusername/nft-marketplace-aptos.git
cd nft-marketplace-aptos

Install dependencies
bashaptos move compile

Deploy to testnet
bashaptos move publish --named-addresses MyModule=<YOUR_ADDRESS>


Configuration
Create or update your Move.toml:
toml[package]
name = "NFTMarketplace"
version = "1.0.0"

[addresses]
MyModule = "0x5211c97b8ee9852db024e3dc1aff6f4b712b75e1e6071a7da02dc4fc124c1938" 
[dependencies]
AptosFramework = { 
  git = "https://github.com/aptos-labs/aptos-core.git", 
  subdir = "aptos-move/framework/aptos-framework/", 
  rev = "devnet" 
}
💻 Usage Examples
Initialize Marketplace
javascript// Initialize marketplace with 2.5% platform fee
const payload = {
  function: `${MODULE_ADDRESS}::NFTMarketplace::initialize_marketplace`,
  arguments: [250], // 2.5% fee (250/10000)
};
await signAndSubmitTransaction(payload);
Create and List NFT
javascriptconst payload = {
  function: `${MODULE_ADDRESS}::NFTMarketplace::create_and_list_nft`,
  arguments: [
    "Warli Art #1",                    // name
    "Traditional Indian tribal art",    // description  
    "1000000",                         // price (1 APT in octas)
    "https://ipfs.io/ipfs/...",        // image_url
    "Cultural Heritage",               // category
    MARKETPLACE_OWNER_ADDRESS          // marketplace_owner
  ],
};
await signAndSubmitTransaction(payload);
Purchase NFT
javascriptconst payload = {
  function: `${MODULE_ADDRESS}::NFTMarketplace::purchase_nft`,
  arguments: [
    SELLER_ADDRESS,           // seller_address
    "1",                     // token_id  
    MARKETPLACE_OWNER_ADDRESS // marketplace_owner
  ],
};
await signAndSubmitTransaction(payload);
🛡️ Security Features

Ownership Verification: Prevents unauthorized NFT transfers
Payment Escrow: Secure payment handling with automatic distribution
Platform Fee Protection: Configurable fees with overflow protection
Self-Purchase Prevention: Users cannot purchase their own NFTs
State Consistency: Atomic operations ensure data integrity

📊 Marketplace Economics
Fee Structure

Platform Fee: Configurable (default: 2.5%)
Creator Royalties: Handled at contract level
Gas Fees: Standard Aptos network fees

Payment Distribution
Total Sale Price = NFT Price
├── Platform Fee (2.5%) → Marketplace Owner
└── Net Proceeds (97.5%) → NFT Seller
🧪 Testing
Run Tests
bashaptos move test
Test Coverage

NFT creation and listing
Purchase functionality
Payment distribution
Edge cases and error handling

🔧 Development
Project Structure
├── sources/
│   └── NFTMarketplace.move    # Main contract
├── tests/
│   └── marketplace_tests.move # Test suite
├── Move.toml                  # Package configuration
└── README.md                 # Documentation
Local Development
bash# Compile contract
aptos move compile

# Run tests
aptos move test

# Deploy locally
aptos node run-local-testnet --with-faucet
aptos move publish --named-addresses MyModule=0x1
📈 Roadmap

 Auction System: English and Dutch auctions
 Royalty Management: Automatic creator royalties
 Batch Operations: Multiple NFT transactions
 Advanced Search: Filter and sort functionality
 Mobile SDK: React Native integration
 IPFS Integration: Decentralized metadata storage

🤝 Contributing
We welcome contributions! Please see our Contributing Guidelines for details.

Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

<img width="1277" height="563" alt="image" src="https://github.com/user-attachments/assets/0c55b338-b9de-488c-a3dc-d9e2e7d7c905" />
