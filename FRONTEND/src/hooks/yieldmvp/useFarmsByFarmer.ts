import { useReadContract, useReadContracts, useAccount } from "wagmi";
import yieldMvpABI from "../../../abi/yieldMVP.json";

const yieldMvpAddress = import.meta.env.VITE_YIELD_MVP_CONTRACT_ADDRESS as `0x${string}`;

export function useFarmsByFarmer(farmerAddress?: `0x${string}`) {
  const { isConnected } = useAccount();

  const { data: farmIds, isLoading: loadingFarmIds } = useReadContract({
    address: yieldMvpAddress,
    abi: yieldMvpABI,
    functionName: "getFarmsByFarmer",
    args: farmerAddress ? [farmerAddress] : undefined,
    query: { enabled: !!farmerAddress && isConnected },
  });

  const farmContracts = (farmIds as bigint[] | undefined)?.map(id => ({
    address: yieldMvpAddress,
    abi: yieldMvpABI,
    functionName: 'getFarmBasicDetails',
    args: [id],
  }));

  const { data: farmsData, isLoading: loadingFarmsData, isError, refetch, error } = useReadContracts({
    contracts: farmContracts,
    query: { enabled: !!farmContracts && farmContracts.length > 0 },
  });

  if (loadingFarmIds || loadingFarmsData) console.log("⏳ Fetching farms by farmer...");
  if (error) console.error("❌ Error fetching farms by farmer:", error);
  if (farmsData) console.log("✅ Farms by farmer fetched:", farmsData);

  return {
    farms: farmsData?.map(farm => farm.result) as any[] | undefined,
    loadingFarms: loadingFarmIds || loadingFarmsData,
    errorFarms: isError,
    refetchFarms: refetch,
  };
}