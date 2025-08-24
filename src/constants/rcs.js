// Get artifact info
const getArtifactInfo = async (ownerAddress) => {
  try {
    const payload = {
      function: `${MODULE_ADDRESS}::HeritageArtifacts::get_artifact_info`,
      arguments: [ownerAddress],
      type_arguments: []
    };
    
    const result = await client.view(payload);
    return result;
  } catch (error) {
    console.error("Error reading artifact info:", error);
    return null;
  }
};