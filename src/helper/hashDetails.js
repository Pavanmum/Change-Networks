import md5 from "md5";

// Function to hash data
export const hashData = (data) => {
  // Check if data is undefined or null
  if (data === undefined || data === null) {
    throw new Error("Data to hash is undefined or null");
  }
  // Return the MD5 hash of the data
  return md5(data);
};

// Function to verify hashed data
export const verifyHash = (data, hashedData) => {
  // Log inputs
  console.log('verifyHash called with:', { data, hashedData });

  // Check if data is undefined or null
  if (data === undefined || data === null) {
    throw new Error("Data to verify is undefined or null");
  }
  
  // Check if hashedData is undefined or null
  if (hashedData === undefined || hashedData === null) {
    throw new Error("Hashed data to verify is undefined or null");
  }

  // Return the original data if it matches the hash, otherwise return a message
  return md5(data) === hashedData ? data : "Data does not match the hash";
};
