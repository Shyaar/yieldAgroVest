
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";
import farmNftABI from "../../../abi/farmNft.json";

export function useFarmNftActions() {
  const { writeContract, data: txHash, isPending, error } = useWriteContract();
  const { isConnected } = useAccount();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const farmNftContractAddress = import.meta.env.VITE_FARM_NFT_CONTRACT_ADDRESS as `0x${string}`;

  const mintFarmNFT = (farmer: `0x${string}`, farmId: number, tokenURI: string) => {
    if (!isConnected) {
      console.error("Wallet not connected.");
      return;
    }
    try {
      writeContract({
        address: farmNftContractAddress,
        abi: farmNftABI,
        functionName: "mintFarmNFT",
        args: [farmer, farmId, tokenURI],
      });
    } catch (err) {
      console.error("Error calling mintFarmNFT:", err);
    }
  };

  return {
    mintFarmNFT,
    txHash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}
