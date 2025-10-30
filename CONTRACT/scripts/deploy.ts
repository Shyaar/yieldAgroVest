import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  // 1️⃣ Deploy UserRegistry
  const UserRegistry = await ethers.getContractFactory("UserRegistry");
  const userRegistry = await UserRegistry.deploy();
  await userRegistry.waitForDeployment();
  const userRegistryAddress = await userRegistry.getAddress();
  console.log("✅ UserRegistry deployed at:", userRegistryAddress);

  // 2️⃣ Deploy farmNFT
  const FarmNFT = await ethers.getContractFactory("FarmNFT");
  const farmNFT = await FarmNFT.deploy();
  await farmNFT.waitForDeployment();
  const farmNFTAddress = await farmNFT.getAddress();
  console.log("✅ farmNFT deployed at:", farmNFTAddress);

  // 3️⃣ Deploy investorsNFTs
  const InvestorsNFTs = await ethers.getContractFactory("InvestorNFT");
  const investorsNFTs = await InvestorsNFTs.deploy();
  await investorsNFTs.waitForDeployment();
  const investorsNFTsAddress = await investorsNFTs.getAddress();
  console.log("✅ investorsNFTs deployed at:", investorsNFTsAddress);

  // 4️⃣ Deploy YieldMvp with registry addresses
  const YieldMvp = await ethers.getContractFactory("YieldMvp");
  const yieldMvp = await YieldMvp.deploy(
    userRegistryAddress,
    farmNFTAddress,
    investorsNFTsAddress
  );
  await yieldMvp.waitForDeployment();
  console.log("🚀 YieldMvp deployed at:", await yieldMvp.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
