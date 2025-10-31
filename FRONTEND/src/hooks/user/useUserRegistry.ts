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

const userRegistryAddress = import.meta.env.VITE_USER_REGISTRY_CONTRACT_ADDRESS as `0x${string}`;

// 🪵 Debug
console.log("🔍 UserRegistry Contract Address:", userRegistryAddress);

// ------------------ 1️⃣ useSingleUser ------------------
export function useSingleUser(userAddress?: `0x${string}`) {
  const { isConnected } = useAccount();

  console.log("👤 useSingleUser called with:", userAddress);
  console.log("🔌 Wallet connected:", isConnected);

  const {
    data,
    isLoading,
    isError,
    refetch,
    error,
  } = useReadContract({
    address: userRegistryAddress,
    abi: userRegistryABI,
    functionName: "getUser",
    args: userAddress ? [userAddress] : undefined,
    query: { enabled: !!userAddress && isConnected },
  });

  // 🪵 Debug logs for every state
  if (isLoading) console.log("⏳ Fetching user data from contract...");
  if (error) console.error("❌ Error fetching user data:", error);
  if (data) console.log("✅ User data fetched:", data);

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

  console.log("🧩 useUserRole called with:", userAddress);
  console.log("🔌 Wallet connected:", isConnected);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useReadContract({
    address: userRegistryAddress,
    abi: userRegistryABI,
    functionName: "getUserRole",
    args: userAddress ? [userAddress] : undefined,
    query: { enabled: !!userAddress && isConnected },
  });

  if (isLoading) console.log("⏳ Fetching user role...");
  if (isError) console.error("❌ Error fetching role:", error);
  if (data !== undefined) console.log("✅ User role fetched:", data);

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

  console.log("📋 useAllUsers called. Wallet connected:", isConnected);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useReadContract({
    address: userRegistryAddress,
    abi: userRegistryABI,
    functionName: "getAllUsers",
    query: { enabled: isConnected },
  });

  if (isLoading) console.log("⏳ Fetching all users...");
  if (isError) console.error("❌ Error fetching all users:", error);
  if (data) console.log("✅ All users fetched:", data);

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

  console.log("🚀 useUserRegistry called with:", userAddress);
  console.log("👛 Connected address:", address);
  console.log("🔌 Connection status:", isConnected);

  const { user, loadingUser, errorUser, refetchUser } = useSingleUser(userAddress);
  const { userRole, loadingUserRole, errorUserRole, refetchUserRole } = useUserRole(userAddress);
  const { allUsers, loadingAllUsers, errorAllUsers, refetchAllUsers } = useAllUsers();

  console.log("📦 Hook results:", {
    user,
    userRole,
    allUsers,
    loadingUser,
    errorUser,
    loadingUserRole,
    errorUserRole,
    loadingAllUsers,
    errorAllUsers,
  });

  return {
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
