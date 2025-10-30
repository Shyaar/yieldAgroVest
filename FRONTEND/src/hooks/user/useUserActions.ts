
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";
import userRegistryABI from "../../../abi/userRegistry.json";
import { Role } from "./useUserRegistry";

export function useUserActions() {
  const { writeContract, data: txHash, isPending, error } = useWriteContract();
  const { isConnected } = useAccount();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const userRegistryContractAddress = process.env.NEXT_PUBLIC_USER_REGISTRY_CONTRACT_ADDRESS as `0x${string}`;

  const registerUser = (firstName: string, lastName: string, role: Role) => {
    if (!isConnected) {
      console.error("Wallet not connected.");
      return;
    }
    if (!firstName || !lastName) {
      console.error("Missing arguments for user registration.");
      return;
    }

    try {
      writeContract({
        address: userRegistryContractAddress,
        abi: userRegistryABI,
        functionName: "registerUser",
        args: [firstName, lastName, role],
      });
    } catch (err) {
      console.error("Error calling registerUser:", err);
    }
  };

  const changeRole = (newRole: Role) => {
    if (!isConnected) {
      console.error("Wallet not connected.");
      return;
    }

    try {
      writeContract({
        address: userRegistryContractAddress,
        abi: userRegistryABI,
        functionName: "changeRole",
        args: [newRole],
      });
    } catch (err) {
      console.error("Error calling changeRole:", err);
    }
  };

  return {
    registerUser,
    changeRole,
    txHash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}
