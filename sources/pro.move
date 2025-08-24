module MyModule::NFTMarketplace {
    use aptos_framework::signer;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;
    use std::string::{Self, String};
    use std::vector;
    use aptos_framework::timestamp;
    
    /// NFT structure representing digital artifacts
    struct NFT has store, key, copy, drop {
        token_id: u64,              // Unique identifier for the NFT
        name: String,               // NFT name (e.g., "Warli Art #1")
        description: String,        // Description of the artwork
        creator: address,           // Original creator's wallet address
        current_owner: address,     // Current owner's wallet address
        price: u64,                 // Price in APT (Octas)
        is_for_sale: bool,         // Whether NFT is available for purchase
        creation_time: u64,        // Timestamp when NFT was created
        image_url: String,         // IPFS or storage URL for the image
        category: String,          // Category (e.g., "Art NFTs", "Cultural Heritage")
    }
    
    /// Marketplace registry to track all NFTs and marketplace stats
    struct MarketplaceRegistry has key {
        next_token_id: u64,        // Counter for generating unique token IDs
        total_nfts: u64,           // Total number of NFTs created
        total_sales: u64,          // Total number of sales completed
        platform_fee_rate: u64,   // Platform fee percentage (e.g., 250 = 2.5%)
        owner: address,            // Marketplace owner address
    }
    
    /// User's NFT collection
    struct UserNFTs has key {
        owned_nfts: vector<NFT>,   // Vector of NFTs owned by user
        created_nfts: vector<u64>, // Token IDs of NFTs created by user
        purchase_history: vector<u64>, // Token IDs of purchased NFTs
    }
    
    /// Initialize the marketplace (called once during deployment)
    public fun initialize_marketplace(admin: &signer, platform_fee_rate: u64) {
        let admin_addr = signer::address_of(admin);
        let registry = MarketplaceRegistry {
            next_token_id: 1,
            total_nfts: 0,
            total_sales: 0,
            platform_fee_rate, // Platform fee (e.g., 250 for 2.5%)
            owner: admin_addr,
        };
        move_to(admin, registry);
    }
    
    /// Function 1: Create and list NFT for sale
    /// This allows creators to mint new NFTs and list them on the marketplace
    public fun create_and_list_nft(
        creator: &signer,
        name: String,
        description: String,
        price: u64,
        image_url: String,
        category: String,
        marketplace_owner: address
    ) acquires MarketplaceRegistry, UserNFTs {
        let creator_addr = signer::address_of(creator);
        
        // Get next token ID from marketplace registry
        let registry = borrow_global_mut<MarketplaceRegistry>(marketplace_owner);
        let token_id = registry.next_token_id;
        registry.next_token_id = registry.next_token_id + 1;
        registry.total_nfts = registry.total_nfts + 1;
        
        // Create the NFT
        let nft = NFT {
            token_id,
            name,
            description,
            creator: creator_addr,
            current_owner: creator_addr,
            price,
            is_for_sale: true,
            creation_time: timestamp::now_seconds(),
            image_url,
            category,
        };
        
        // Initialize user's NFT collection if it doesn't exist
        if (!exists<UserNFTs>(creator_addr)) {
            let user_nfts = UserNFTs {
                owned_nfts: vector::empty<NFT>(),
                created_nfts: vector::empty<u64>(),
                purchase_history: vector::empty<u64>(),
            };
            move_to(creator, user_nfts);
        };
        
        // Add NFT to creator's collection
        let user_nfts = borrow_global_mut<UserNFTs>(creator_addr);
        vector::push_back(&mut user_nfts.owned_nfts, nft);
        vector::push_back(&mut user_nfts.created_nfts, token_id);
    }
    
    /// Function 2: Purchase NFT from marketplace
    /// This allows buyers to purchase NFTs and handles payment distribution
    public fun purchase_nft(
        buyer: &signer,
        seller_address: address,
        token_id: u64,
        marketplace_owner: address
    ) acquires UserNFTs, MarketplaceRegistry {
        let buyer_addr = signer::address_of(buyer);
        assert!(buyer_addr != seller_address, 1); // Can't buy from yourself
        
        // Get seller's NFTs
        let seller_nfts = borrow_global_mut<UserNFTs>(seller_address);
        
        // Find the index of the NFT to transfer
        let len = vector::length(&seller_nfts.owned_nfts);
        let found_index = len; // Use len as "not found"
        let i = 0;
        while (i < len) {
    let nft_ref = vector::borrow(&seller_nfts.owned_nfts, i);
    if (nft_ref.token_id == token_id && nft_ref.is_for_sale) {
        found_index = i;
        break;
    };
    i = i + 1;
};
        assert!(found_index < len, 2); // NFT not found or not for sale

        // Remove NFT from seller's collection and get ownership
        let nft_to_transfer = vector::remove(&mut seller_nfts.owned_nfts, found_index);
        
        // Calculate payments
        let registry = borrow_global_mut<MarketplaceRegistry>(marketplace_owner);
        let total_price = nft_to_transfer.price;
        let platform_fee = (total_price * registry.platform_fee_rate) / 10000;
        
        // Process payments
        let buyer_payment = coin::withdraw<AptosCoin>(buyer, total_price);
        let platform_fee_coin = coin::extract(&mut buyer_payment, platform_fee);
        
        // Transfer payments
        coin::deposit<AptosCoin>(seller_address, buyer_payment);
        coin::deposit<AptosCoin>(marketplace_owner, platform_fee_coin);
        
        // Update NFT ownership
        nft_to_transfer.current_owner = buyer_addr;
        nft_to_transfer.is_for_sale = false;
        
        // Initialize buyer's NFT collection if needed
        if (!exists<UserNFTs>(buyer_addr)) {
            let user_nfts = UserNFTs {
                owned_nfts: vector::empty<NFT>(),
                created_nfts: vector::empty<u64>(),
                purchase_history: vector::empty<u64>(),
            };
            move_to(buyer, user_nfts);
        };
        
        // Add NFT to buyer's collection
        let buyer_nfts = borrow_global_mut<UserNFTs>(buyer_addr);
        vector::push_back(&mut buyer_nfts.owned_nfts, nft_to_transfer);
        vector::push_back(&mut buyer_nfts.purchase_history, token_id);
        
        // Update marketplace stats
        registry.total_sales = registry.total_sales + 1;
    }
    
    /// Helper function to get user's NFT count
    public fun get_user_nft_count(user_address: address): u64 acquires UserNFTs {
        if (!exists<UserNFTs>(user_address)) {
            return 0
        };
        let user_nfts = borrow_global<UserNFTs>(user_address);
        vector::length(&user_nfts.owned_nfts)
    }
    
    /// Helper function to get marketplace statistics
    public fun get_marketplace_stats(marketplace_owner: address): (u64, u64, u64) acquires MarketplaceRegistry {
        let registry = borrow_global<MarketplaceRegistry>(marketplace_owner);
        (registry.total_nfts, registry.total_sales, registry.platform_fee_rate)
    }
    
    /// Helper function to check if user has NFTs
    public fun user_has_nfts(user_address: address): bool {
        exists<UserNFTs>(user_address)
    }
    
    /// View function to get NFT details by owner and index
    public fun get_nft_by_index(owner: address, index: u64): (u64, String, String, address, u64, bool, String, String) acquires UserNFTs {
        let user_nfts = borrow_global<UserNFTs>(owner);
        let nft = vector::borrow(&user_nfts.owned_nfts, index);
        (
            nft.token_id,
            nft.name,
            nft.description,
            nft.creator,
            nft.price,
            nft.is_for_sale,
            nft.image_url,
            nft.category
        )
    }
}