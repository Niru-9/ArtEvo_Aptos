# 🚀 Complete NFT Marketplace Deployment Guide

This guide will walk you through deploying your NFT Marketplace with React frontend and IPFS integration.

## 📋 Prerequisites

- Node.js 16+ installed
- Aptos CLI installed
- Git installed
- Pinata account (for IPFS)
- Aptos wallet (Petra, Martian, or Pontem)

## 🏗️ Project Setup

### 1. Create React Application

```bash
# Create new React app
npx create-react-app nft-marketplace
cd nft-marketplace

# Install dependencies
npm install aptos lucide-react

# Install additional utilities (optional)
npm install axios react-router-dom @headlessui/react
```

### 2. Environment Configuration

Create `.env` file in project root:

```env
# Aptos Configuration
REACT_APP_APTOS_NODE_URL=https://fullnode.testnet.aptoslabs.com/v1
REACT_APP_APTOS_FAUCET_URL=https://faucet.testnet.aptoslabs.com
REACT_APP_MODULE_ADDRESS=0x1
REACT_APP_MARKETPLACE_OWNER=0x1

# IPFS Configuration (Get from Pinata)
REACT_APP_PINATA_API_KEY=your_pinata_api_key
REACT_APP_PINATA_SECRET_KEY=your_pinata_secret_key
REACT_APP_IPFS_GATEWAY=https://gateway.pinata.cloud/ipfs/

# Network Configuration
REACT_APP_NETWORK=testnet
```

### 3. Project Structure

```
nft-marketplace/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── NFTMarketplace.js
│   │   ├── NFTCard.js
│   │   └── WalletConnect.js
│   ├── services/
│   │   ├── aptosService.js
│   │   └── ipfsService.js
│   ├── utils/
│   │   ├── walletUtils.js
│   │   └── errorUtils.js
│   ├── App.js
│   └── index.js
├── .env
├── package.json
└── README.md
```

## 🔧 Backend Deployment (Move Contract)

### 1. Setup Aptos CLI

```bash
# Install Aptos CLI
curl -fsSL "https://aptos.dev/scripts/install_cli.py" | python3

# Initialize Aptos account
aptos init --network testnet
# Save the generated private key and address
```

### 2. Create Move Project

```bash
# Create new Move project
mkdir nft-marketplace-move
cd nft-marketplace-move

# Initialize Move project
aptos move init --name NFTMarketplace
```

### 3. Update Move.toml

```toml
[package]
name = "NFTMarketplace"
version = "1.0.0"

[addresses]
MyModule = "_"  # Will be replaced with your address during deployment

[dependencies]
AptosFramework = { 
  git = "https://github.com/aptos-labs/aptos-core.git", 
  subdir = "aptos-move/framework/aptos-framework/", 
  rev = "mainnet" 
}

[dev-dependencies]
```

### 4. Deploy Contract

```bash
# Compile the contract
aptos move compile

# Deploy to testnet
aptos move publish --named-addresses MyModule=<YOUR_ADDRESS>

# Save the deployed module address for frontend
```

## 🌐 IPFS Setup (Pinata)

### 1. Create Pinata Account

1. Go to [Pinata.cloud](https://pinata.cloud)
2. Sign up for free account
3. Go to API Keys section
4. Create new API key with permissions:
   - `pinFileToIPFS`
   - `pinJSONToIPFS`
   - `unpin`

### 2. Test IPFS Connection

```javascript
// Test script (test-ipfs.js)
const FormData = require('form-data');
const fs = require('fs');

const testIPFS = async () => {
  const data = new FormData();
  data.append('pinataContent', JSON.stringify({ test: 'data' }));
  
  const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
    method: 'POST',
    headers: {
      'pinata_api_key': 'your_api_key',
      'pinata_secret_api_key': 'your_secret_key',
    },
    body: data
  });
  
  console.log(await response.json());
};

testIPFS();
```

## 🔗 Frontend Integration

### 1. Update src/App.js

```javascript
import React from 'react';
import NFTMarketplace from './components/NFTMarketplace';
import './App.css';

function App() {
  return (
    <div className="App">
      <NFTMarketplace />
    </div>
  );
}

export default App;
```

### 2. Add Service Files

Copy the service files from the backend configuration artifact:
- `src/services/aptosService.js`
- `src/services/ipfsService.js`
- `src/utils/walletUtils.js`
- `src/utils/errorUtils.js`

### 3. Update Component Imports

In your React component, import the services:

```javascript
import aptosService from '../services/aptosService';
import ipfsService from '../services/ipfsService';
import { WalletUtils, ErrorUtils } from '../utils';
```

## 🚀 Deployment Options

### 1. Local Development

```bash
# Start development server
npm start

# Open http://localhost:3000
```

### 2. Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Set environment variables in Vercel dashboard
```

### 3. Netlify Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build project
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=build
```

### 4. IPFS Deployment (Fleek)

```bash
# Build project
npm run build

# Upload to Fleek (IPFS hosting)
# Configure build settings:
# - Build Command: npm run build
# - Publish Directory: build
```

## 🔐 Security Configuration

### 1. Environment Variables Security

```javascript
// Never expose private keys in frontend
// Use environment variables for API keys only
const config = {
  apiKey: process.env.REACT_APP_PINATA_API_KEY,
  // Never: privateKey: process.env.PRIVATE_KEY (NO!)
};
```

### 2. Contract Security

```move
// Add access controls
public fun admin_only_function(admin: &signer) {
    assert!(signer::address_of(admin) == @MyModule, 1);
    // Function logic
}
```

### 3. Frontend Validation

```javascript
// Validate inputs
const validateNFTData = (data) => {
  if (!data.name || data.name.length < 3) {
    throw new Error('Name must be at least 3 characters');
  }
  if (!data.price || data.price <= 0) {
    throw new Error('Price must be greater than 0');
  }
  // More validations...
};
```

## 🧪 Testing

### 1. Unit Tests

```javascript
// src/tests/aptosService.test.js
import aptosService from '../services/aptosService';

describe('AptosService', () => {
  test('should format address correctly', () => {
    const address = '0x1234567890abcdef';
    const formatted = aptosService.formatAddress(address);
    expect(formatted).toBe('0x1234...cdef');
  });
});
```

### 2. Integration Tests

```bash
# Test contract deployment
aptos move test

# Test frontend integration
npm test
```

### 3. E2E Testing

```javascript
// Use Cypress or Playwright for E2E testing
// Test wallet connection, NFT creation, purchasing flow
```

## 📊 Monitoring & Analytics

### 1. Transaction Monitoring

```javascript
// Monitor transaction success rates
const trackTransaction = async (txHash) => {
  try {
    await aptosService.client.waitForTransaction(txHash);
    // Analytics: Transaction successful
  } catch (error) {
    // Analytics: Transaction failed
  }
};
```

### 2. IPFS Monitoring

```javascript
// Monitor IPFS upload success
const trackIPFSUpload = async (file) => {
  const startTime = Date.now();
  try {
    const url = await ipfsService.uploadFile(file);
    const duration = Date.now() - startTime;
    // Analytics: Upload successful, duration
  } catch (error) {
    // Analytics: Upload failed
  }
};
```

## 🔄 CI/CD Pipeline

### 1. GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy NFT Marketplace

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build
      run: npm run build
      env:
        REACT_APP_PINATA_API_KEY: ${{ secrets.PINATA_API_KEY }}
    
    - name: Deploy to Vercel
      uses: vercel/action@v1
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

## 📱 Mobile Optimization

### 1. Responsive Design

```css
/* Mobile-first responsive design */
@media (max-width: 768px) {
  .nft-grid {
    grid-template-columns: 1fr;
  }
  
  .wallet-section {
    flex-direction: column;
    gap: 1rem;
  }
}
```

### 2. Touch Interactions

```javascript
// Add touch-friendly interactions
const handleTouchStart = (e) => {
  // Handle touch events for mobile users
};
```

## 🐛 Troubleshooting

### Common Issues

1. **Wallet Connection Issues**
   ```javascript
   // Check if wallet is installed
   if (!window.aptos) {
     alert('Please install Aptos wallet extension');
   }
   ```

2. **IPFS Upload Failures**
   ```javascript
   // Retry mechanism for IPFS uploads
   const uploadWithRetry = async (file, maxRetries = 3) => {
     for (let i = 0; i < maxRetries; i++) {
       try {
         return await ipfsService.uploadFile(file);
       } catch (error) {
         if (i === maxRetries - 1) throw error;
         await new Promise(resolve => setTimeout(resolve, 1000 * i));
       }
     }
   };
   ```

3. **Transaction Failures**
   ```javascript
   // Better error handling
   try {
     await aptosService.createNFT(data);
   } catch (error) {
     console.error('Transaction failed:', error);
     // Show user-friendly error message
   }
   ```

## 📚 Additional Resources

- [Aptos Documentation](https://aptos.dev/)
- [Move Programming Language](https://move-language.github.io/move/)
- [Pinata IPFS Documentation](https://docs.pinata.cloud/)
- [React Documentation](https://reactjs.org/docs)

## 🎯 Next Steps

1. **Phase 1**: Basic marketplace functionality
2. **Phase 2**: Add auction system
3. **Phase 3**: Implement royalty system
4. **Phase 4**: Add social features
5. **Phase 5**: Mobile app development

---

**🚨 Important Notes:**

- Always test on testnet first
- Keep private keys secure
- Validate all user inputs
- Monitor transaction costs
- Regular security audits

**💡 Pro Tips:**

- Use TypeScript for better type safety
- Implement proper error boundaries
- Add loading states for better UX
