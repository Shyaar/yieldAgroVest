import { useReadContract, useAccount } from "wagmi";
import farmNftABI from "../../../abi/farmNft.json";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_FARM_NFT_CONTRACT_ADDRESS as `0x${string}`;

// ------------------ 1️⃣ useFarmData ------------------
export function useFarmData(farmId?: number) {
  const { isConnected } = useAccount();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: farmNftABI,
    functionName: "getFarmData",
    args: farmId !== undefined ? [farmId] : undefined,
    query: { enabled: !!farmId && isConnected },
  });

  return {
    farmData: data,
    loadingFarmData: isLoading,
    errorFarmData: isError,
    refetchFarmData: refetch,
  };
}

// ------------------ 2️⃣ useFarmerFarms ------------------
export function useFarmerFarms(farmerAddress?: `0x${string}`) {
  const { isConnected } = useAccount();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: farmNftABI,
    functionName: "getFarmerFarms",
    args: farmerAddress ? [farmerAddress] : undefined,
    query: { enabled: !!farmerAddress && isConnected },
  });

  return {
    farmerFarms: data,
    loadingFarmerFarms: isLoading,
    errorFarmerFarms: isError,
    refetchFarmerFarms: refetch,
  };
}

// ------------------ 3️⃣ useFarmNft (master hook) ------------------
export function useFarmNft(farmId?: number, farmerAddress?: `0x${string}`) {
  const { address, isConnected } = useAccount();

  const { farmData, loadingFarmData, errorFarmData, refetchFarmData } = useFarmData(farmId);
  const { farmerFarms, loadingFarmerFarms, errorFarmerFarms, refetchFarmerFarms } = useFarmerFarms(farmerAddress);

  return {
    // account info
    currentAccountAddress: address,
    isConnected,

    // farm data
    farmData,
    loadingFarmData,
    errorFarmData,
    refetchFarmData,

    // farmer farms
    farmerFarms,
    loadingFarmerFarms,
    errorFarmerFarms,
    refetchFarmerFarms,
  };
}