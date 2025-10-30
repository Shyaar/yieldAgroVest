import { useReadContract, useAccount } from "wagmi";
import userRegistryABI from "../../../abi/userRegistry.json";

// ------------------ Types ------------------
export interface User {
  firstName: string;
  lastName: string;
  name: string;
  role: number;
  isRegistered: boolean;
}


export const Role = {
  Investor: 0,
  Farmer: 1,
} as const;

export type Role = (typeof Role)[keyof typeof Role];

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_USER_REGISTRY_CONTRACT_ADDRESS as `0x${string}`;

// ------------------ 1️⃣ useSingleUser ------------------
export function useSingleUser(userAddress?: `0x${string}`) {
  const { isConnected } = useAccount();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: userRegistryABI,
    functionName: "getUser",
    args: userAddress ? [userAddress] : undefined,
    query: { enabled: !!userAddress && isConnected },
  });

  return {
    user: data as User | undefined,
    loadingUser: isLoading,
    errorUser: isError,
    refetchUser: refetch,
  };
}

// ------------------ 2️⃣ useUserRole ------------------
export function useUserRole(userAddress?: `0x${string}`) {
  const { isConnected } = useAccount();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: userRegistryABI,
    functionName: "getUserRole",
    args: userAddress ? [userAddress] : undefined,
    query: { enabled: !!userAddress && isConnected },
  });

  return {
    userRole: data as number | undefined,
    loadingUserRole: isLoading,
    errorUserRole: isError,
    refetchUserRole: refetch,
  };
}

// ------------------ 3️⃣ useAllUsers ------------------
export function useAllUsers() {
  const { isConnected } = useAccount();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: userRegistryABI,
    functionName: "getAllUsers",
    query: { enabled: isConnected },
  });

  return {
    allUsers: data as User[] | undefined,
    loadingAllUsers: isLoading,
    errorAllUsers: isError,
    refetchAllUsers: refetch,
  };
}

// ------------------ 4️⃣ useUserRegistry (master hook) ------------------
export function useUserRegistry(userAddress?: `0x${string}`) {
  const { address, isConnected } = useAccount();

  const { user, loadingUser, errorUser, refetchUser } = useSingleUser(userAddress);
  const { userRole, loadingUserRole, errorUserRole, refetchUserRole } = useUserRole(userAddress);
  const { allUsers, loadingAllUsers, errorAllUsers, refetchAllUsers } = useAllUsers();

  return {
    // account info
    currentAccountAddress: address,
    isConnected,

    // single user
    user,
    loadingUser,
    errorUser,
    refetchUser,

    // user role
    userRole,
    loadingUserRole,
    errorUserRole,
    refetchUserRole,

    // all users
    allUsers,
    loadingAllUsers,
    errorAllUsers,
    refetchAllUsers,
  };
}
