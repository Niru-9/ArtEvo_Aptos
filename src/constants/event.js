// Listen for specific events
const subscribeToEvents = async () => {
  const eventHandle = `${MODULE_ADDRESS}::HeritageArtifacts::ArtifactRegistered`;
  
  // Poll for events (simplified approach)
  setInterval(async () => {
    try {
      const events = await client.getEventsByEventHandle(
        account.address,
        eventHandle,
        0,
        10
      );
      console.log("New events:", events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }, 5000); // Poll every 5 seconds      
};