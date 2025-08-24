try {
  const response = await signAndSubmitTransaction(payload);
  await client.waitForTransaction(response.hash);
  console.log("Transaction successful:", response.hash);
} catch (error) {
  console.error("Transaction failed:", error);
  // Handle specific error types
  if (error.message.includes("INSUFFICIENT_BALANCE")) {
    alert("Insufficient balance for transaction");
  }
}