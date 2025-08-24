import { create } from 'ipfs-http-client';

const ipfs = create({ url: 'https://ipfs.infura.io:5001/api/v0' });

export async function uploadToIPFS(file) {
  const added = await ipfs.add(file);
  return `https://ipfs.io/ipfs/${added.path}`;
}