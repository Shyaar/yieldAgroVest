import { ethers } from "hardhat";


async function main() {
  // Get the signer of the tx and address for minting the token
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contract with the account:", deployer.address);

  // The deployer will also be the owner of our NFT contract
  const YieldMvp = await ethers.getContractFactory("YieldMvp", deployer);
  const contract = await YieldMvp.deploy();

  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("Contract deployed at:", address);
}

main().catch(console.error);