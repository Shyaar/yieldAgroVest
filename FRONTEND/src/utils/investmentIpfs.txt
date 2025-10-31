import { create } from "ipfs-http-client";

const client = create({
  url: "https://ipfs.infura.io:5001/api/v0",
});

export async function uploadToIpfs(data: string | File): Promise<string> {
  const result = await client.add(data);
  return `ipfs://${result.path}`;
}

interface InvestorMetadata {
  name: string;
  description: string;
  image: string; // IPFS link to farm image
  attributes: Array<{ trait_type: string; value: string | number }>;
}

export async function generateInvestorMetadata(
  farmName: string,
  farmId: number,
  imageIpfsHash: string,
  investorAddress: string,
  amountInvested: number,
  investmentDate: string
): Promise<string> {
  const metadata: InvestorMetadata = {
    name: `${farmName} — Investor NFT`,
    description: `This NFT represents ${investorAddress}'s stake in ${farmName}`,
    image: imageIpfsHash, // same as farm image
    attributes: [
      { trait_type: "Farm ID", value: farmId },
      { trait_type: "Farm Name", value: farmName },
      { trait_type: "Investor Address", value: investorAddress },
      { trait_type: "Investment Amount", value: `${amountInvested} USDT` },
      { trait_type: "Investment Date", value: investmentDate },
    ],
  };

  const metadataResult = await uploadToIpfs(JSON.stringify(metadata));
  return metadataResult; // returns ipfs:// link
}
