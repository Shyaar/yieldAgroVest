import { useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";
import yieldMvpABI from "../../../abi/yieldMVP.json"; // ABI for YieldMvp contract

export function useYieldMvpActions() {
  const { writeContract, data: txHash, isPending, error } = useWriteContract();
  const { isConnected } = useAccount();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const yieldMvpContractAddress = process.env.NEXT_PUBLIC_YIELD_MVP_CONTRACT_ADDRESS as `0x${string}`;

  const createFarm = (
    budget: bigint,
    farmSize: bigint,
    totalShares: bigint,
    durationDays: bigint,
    description: string,
    tokenUri: string
  ) => {
    if (!isConnected) {
      console.error("Wallet not connected.");
      return;
    }
    try {
      writeContract({
        address: yieldMvpContractAddress,
        abi: yieldMvpABI,
        functionName: "createFarm",
        args: [budget, farmSize, totalShares, durationDays, description, tokenUri],
      });
    } catch (err) {
      console.error("Error calling createFarm:", err);
    }
  };

  const buyShares = (farmId: bigint, amountShares: bigint, cost: bigint, tokenUri: string) => {
    if (!isConnected) {
      console.error("Wallet not connected.");
      return;
    }
    try {
      writeContract({
        address: yieldMvpContractAddress,
        abi: yieldMvpABI,
        functionName: "buyShares",
        args: [farmId, amountShares, tokenUri],
        value: cost,
      });
    } catch (err) {
      console.error("Error calling buyShares:", err);
    }
  };

  const releaseMilestone = (farmId: bigint) => {
    if (!isConnected) {
      console.error("Wallet not connected.");
      return;
    }
    try {
      writeContract({
        address: yieldMvpContractAddress,
        abi: yieldMvpABI,
        functionName: "releaseMilestone",
        args: [farmId],
      });
    } catch (err) {
      console.error("Error calling releaseMilestone:", err);
    }
  };

  const farmerMakeRepayment = (farmId: bigint, amount: bigint) => {
    if (!isConnected) {
      console.error("Wallet not connected.");
      return;
    }
    try {
      writeContract({
        address: yieldMvpContractAddress,
        abi: yieldMvpABI,
        functionName: "farmerMakeRepayment",
        args: [farmId],
        value: amount,
      });
    } catch (err) {
      console.error("Error calling farmerMakeRepayment:", err);
    }
  };

  const withdrawROI = () => {
    if (!isConnected) {
      console.error("Wallet not connected.");
      return;
    }
    try {
      writeContract({
        address: yieldMvpContractAddress,
        abi: yieldMvpABI,
        functionName: "withdrawROI",
      });
    } catch (err) {
      console.error("Error calling withdrawROI:", err);
    }
  };

  const renounceOwnership = () => {
    if (!isConnected) {
      console.error("Wallet not connected.");
      return;
    }
    try {
      writeContract({
        address: yieldMvpContractAddress,
        abi: yieldMvpABI,
        functionName: "renounceOwnership",
      });
    } catch (err) {
      console.error("Error calling renounceOwnership:", err);
    }
  };

  const transferOwnership = (newOwner: `0x${string}`) => {
    if (!isConnected) {
      console.error("Wallet not connected.");
      return;
    }
    try {
      writeContract({
        address: yieldMvpContractAddress,
        abi: yieldMvpABI,
        functionName: "transferOwnership",
        args: [newOwner],
      });
    } catch (err) {
      console.error("Error calling transferOwnership:", err);
    }
  };

  return {
    createFarm,
    buyShares,
    releaseMilestone,
    farmerMakeRepayment,
    withdrawROI,
    renounceOwnership,
    transferOwnership,
    txHash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}
