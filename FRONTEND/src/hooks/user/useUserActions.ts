import { useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";
import userRegistryABI from "../../../abi/userRegistry.json";
import { Role } from "./useUserRegistry";

export function useUserActions() {
  const { writeContractAsync, data: txHash, isPending, error } = useWriteContract();
  const { isConnected } = useAccount();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const userRegistryAddress = import.meta.env.VITE_USER_REGISTRY_CONTRACT_ADDRESS as `0x${string}`;

  const registerUser = async (firstName: string, lastName: string, role: Role) => {
    console.log("useUserActions: registerUser called with:", { firstName, lastName, role });
    if (!isConnected) {
      console.error("useUserActions: Wallet not connected.");
      return;
    }
    if (!firstName || !lastName) {
      console.error("useUserActions: Missing arguments for user registration.");
      return;
    }

    try {
      console.log("useUserActions: Calling writeContractAsync for registerUser...");
      const tx = await writeContractAsync({
        address: userRegistryAddress,
        abi: userRegistryABI,
        functionName: "registerUser",
        args: [firstName, lastName, role],
      });

      console.log("useUserActions: [Tx Sent] Hash:", tx);
      if(isConfirmed){
        console.log("completed :::", isConfirmed)
      }

      // optional: wait for the transaction to be mined immediately
      // const receipt = await tx.wait();
      // console.log("useUserActions: [Tx Confirmed]", receipt);
    } catch (err) {
      console.error("useUserActions: Error calling registerUser:", err);
    }
  };

  const changeRole = async (newRole: Role) => {
    console.log("useUserActions: changeRole called with:", { newRole });
    if (!isConnected) {
      console.error("useUserActions: Wallet not connected.");
      return;
    }

    try {
      console.log("useUserActions: Calling writeContractAsync for changeRole...");
      const tx = await writeContractAsync({
        address: userRegistryAddress,
        abi: userRegistryABI,
        functionName: "changeRole",
        args: [newRole],
      });

      console.log("useUserActions: [Tx Sent] Hash:", tx);

      // optional: wait for the transaction to be mined immediately
      // const receipt = await tx.wait();
      // console.log("useUserActions: [Tx Confirmed]", receipt);
    } catch (err) {
      console.error("useUserActions: Error calling changeRole:", err);
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
