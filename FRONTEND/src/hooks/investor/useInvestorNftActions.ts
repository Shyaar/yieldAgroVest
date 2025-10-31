
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";
import investorNftABI from "../../../abi/investorNft.json";

export function useInvestorNftActions() {
  const { writeContract, data: txHash, isPending, error } = useWriteContract();
  const { isConnected } = useAccount();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const investorNftContractAddress = import.meta.env.VITE_INVESTOR_NFT_CONTRACT_ADDRESS as `0x${string}`;

  const mintInvestorNFT = (investor: `0x${string}`, farmId: number, tokenURI: string) => {
    if (!isConnected) {
      console.error("Wallet not connected.");
      return;
    }
    try {
      writeContract({
        address: investorNftContractAddress,
        abi: investorNftABI,
        functionName: "mintInvestorNFT",
        args: [investor, farmId, tokenURI],
      });
    } catch (err) {
      console.error("Error calling mintInvestorNFT:", err);
    }
  };

  return {
    mintInvestorNFT,
    txHash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}
