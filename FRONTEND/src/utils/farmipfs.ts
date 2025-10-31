import { create } from "ipfs-http-client";

const client = create({
  url: `https://ipfs-api.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_IPFS_API_KEY}`,
});


export async function uploadToIpfs(data: string | File): Promise<string> {
  console.log(data)
  try {
    const result = await client.add(data);
    return `ipfs://${result.path}`;
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    throw error;
  }
}


interface FarmMetadata {
  name: string;
  description: string;
  image: string; // IPFS hash of the image
  attributes: Array<{ trait_type: string; value: string | number }>;
}

export async function generateFarmMetadata(
  farmName: string,
  farmDescription: string,
  imageIpfsHash: string,
  farmDetails: Record<string, string | number>
): Promise<string> {
  const attributes = Object.entries(farmDetails).map(([key, value]) => ({
    trait_type: key,
    value: value,
  }));

  const metadata: FarmMetadata = {
    name: farmName,
    description: farmDescription,
    image: imageIpfsHash,
    attributes: attributes,
  };

  const metadataResult = await uploadToIpfs(JSON.stringify(metadata));
  return metadataResult;
}
