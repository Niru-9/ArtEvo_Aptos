const payload = {
  type: "entry_function_payload",
  function: `${MODULE_ADDRESS}::HeritageArtifacts::register_artifact`,
  arguments: [
    "Paithani Saree",           // artifact_type: String
    "Maharashtra Paithani",     // gi_tag: String
    100,                    // verification_fee: u64 (in Octas)
    MODULE_ADDRESS              // registry_owner: address
  ],
  type_arguments: [],
};