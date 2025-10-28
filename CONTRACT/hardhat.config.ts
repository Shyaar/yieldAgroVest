import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
       metadata: {
        bytecodeHash: "none"  // Ensures metadata is included
      },
      optimizer: {
        enabled: true,
        runs: 200, // or higher for production
      },
    },
  },
   networks: {
    hederaTestnet: {
      url: process.env.HEDERA_RPC_URL!,
      accounts: [process.env.PRIVATE_KEY!]
    }
  },
  etherscan: {
    apiKey: {
      "hederaTestnet": "123", // placeholder
    },
  },
  sourcify: {
    enabled: false,
  },
};

export default config;
