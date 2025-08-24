import { AptosClient, AptosAccount } from 'aptos';

const NODE_URL = 'https://fullnode.mainnet.aptoslabs.com/v1';
const aptosClient = new AptosClient(NODE_URL);

export async function mintNFT({
  account,
  name,
  description,
  price,
  imageUrl,
  category,
  marketplaceOwner
}) {
  const payload = {
    type: 'entry_function_payload',
    function: 'MyModule::NFTMarketplace::create_and_list_nft',
    type_arguments: [],
    arguments: [
      name,
      description,
      price,
      imageUrl,
      category,
      marketplaceOwner
    ],
  };
  const txnRequest = await aptosClient.generateTransaction(account.address(), payload);
  const signedTxn = await aptosClient.signTransaction(account, txnRequest);
  const txnRes = await aptosClient.submitTransaction(signedTxn);
  await aptosClient.waitForTransaction(txnRes.hash);
  return txnRes.hash;
}