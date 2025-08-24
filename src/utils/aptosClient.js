import { AptosClient } from "aptos";

export const NODE_URL = "https://fullnode.testnet.aptoslabs.com"; // or devnet/mainnet
export const client = new AptosClient(NODE_URL);
