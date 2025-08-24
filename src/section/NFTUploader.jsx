import React, { useState } from 'react';
import { uploadToIPFS } from '../utils/ipfs';
import { mintNFT } from '../utils/aptosMint';

const NFTUploader = ({ aptosAccount, marketplaceOwner }) => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMint = async () => {
    setLoading(true);
    try {
      const imageUrl = await uploadToIPFS(file);
      await mintNFT({
        account: aptosAccount,
        name,
        description,
        price: Number(price),
        imageUrl,
        category,
        marketplaceOwner
      });
      alert('NFT minted!');
    } catch (e) {
      alert('Error minting NFT: ' + e.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
      <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
      <button onClick={handleMint} disabled={loading}>Mint NFT</button>
    </div>
  );
};

export default NFTUploader;