import { useReadContract, useAccount } from "wagmi";
import yieldMvpABI from "../../../abi/yieldMVP.json";

const yieldMvpAddress = import.meta.env.VITE_YIELD_MVP_CONTRACT_ADDRESS as `0x${string}`;

// ------------------ 1️⃣ useNextFarmId ------------------
export function useNextFarmId() {
  const { isConnected } = useAccount();
  const { data, isLoading, isError, refetch } = useReadContract({
    address: yieldMvpAddress,
    abi: yieldMvpABI,
    functionName: "nextFarmId",
    query: { enabled: isConnected },
  });
  return { nextFarmId: data, loadingNextFarmId: isLoading, errorNextFarmId: isError, refetchNextFarmId: refetch };
}

// ------------------ 2️⃣ useOwner ------------------
export function useOwner() {
  const { isConnected } = useAccount();
  const { data, isLoading, isError, refetch } = useReadContract({
    address: yieldMvpAddress,
    abi: yieldMvpABI,
    functionName: "owner",
    query: { enabled: isConnected },
  });
  return { owner: data, loadingOwner: isLoading, errorOwner: isError, refetchOwner: refetch };
}

// ------------------ 3️⃣ useRoiBalances ------------------
export function useRoiBalances() {
  const { address, isConnected } = useAccount();
  const { data, isLoading, isError, refetch } = useReadContract({
    address: yieldMvpAddress,
    abi: yieldMvpABI,
    functionName: "roiBalances",
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });
  return { roiBalances: data, loadingRoiBalances: isLoading, errorRoiBalances: isError, refetchRoiBalances: refetch };
}

// ------------------ 4️⃣ useFarmBasicDetails ------------------
export function useFarmBasicDetails(farmId?: number) {
  const { isConnected } = useAccount();
  const { data, isLoading, isError, refetch } = useReadContract({
    address: yieldMvpAddress,
    abi: yieldMvpABI,
    functionName: "getFarmBasicDetails",
    args: farmId !== undefined ? [farmId] : undefined,
    query: { enabled: !!farmId && isConnected },
  });
  return { farmBasicDetails: data, loadingFarmBasicDetails: isLoading, errorFarmBasicDetails: isError, refetchFarmBasicDetails: refetch };
}

// ------------------ 5️⃣ useFarmMilestoneDetails ------------------
export function useFarmMilestoneDetails(farmId?: number) {
  const { isConnected } = useAccount();
  const { data, isLoading, isError, refetch } = useReadContract({
    address: yieldMvpAddress,
    abi: yieldMvpABI,
    functionName: "getFarmMilestoneDetails",
    args: farmId !== undefined ? [farmId] : undefined,
    query: { enabled: !!farmId && isConnected },
  });
  return { farmMilestoneDetails: data, loadingFarmMilestoneDetails: isLoading, errorFarmMilestoneDetails: isError, refetchFarmMilestoneDetails: refetch };
}

// ------------------ 6️⃣ useFarmInvestors ------------------
export function useFarmInvestors(farmId?: number) {
  const { isConnected } = useAccount();
  const { data, isLoading, isError, refetch } = useReadContract({
    address: yieldMvpAddress,
    abi: yieldMvpABI,
    functionName: "getFarmInvestors",
    args: farmId !== undefined ? [farmId] : undefined,
    query: { enabled: !!farmId && isConnected },
  });
  return { farmInvestors: data, loadingFarmInvestors: isLoading, errorFarmInvestors: isError, refetchFarmInvestors: refetch };
}

// ------------------ 7️⃣ useInvestorShares ------------------
export function useInvestorShares(farmId?: number, investorAddress?: `0x${string}`) {
  const { isConnected } = useAccount();
  const { data, isLoading, isError, refetch } = useReadContract({
    address: yieldMvpAddress,
    abi: yieldMvpABI,
    functionName: "getInvestorShares",
    args: farmId !== undefined && investorAddress ? [farmId, investorAddress] : undefined,
    query: { enabled: !!farmId && !!investorAddress && isConnected },
  });
  return { investorShares: data, loadingInvestorShares: isLoading, errorInvestorShares: isError, refetchInvestorShares: refetch };
}

// ------------------ 8️⃣ useAllFarmsView ------------------
export function useAllFarmsView() {
  const { isConnected } = useAccount();
  const { data, isLoading, isError, refetch } = useReadContract({
    address: yieldMvpAddress,
    abi: yieldMvpABI,
    functionName: "getAllFarmsView",
    query: { enabled: isConnected },
  });
  return { allFarms: data, loadingAllFarms: isLoading, errorAllFarms: isError, refetchAllFarms: refetch };
}

// ------------------ 9️⃣ useYieldMvp (master hook) ------------------
export function useYieldMvp(farmId?: number, investorAddress?: `0x${string}`) {
  const { address, isConnected } = useAccount();

  const { nextFarmId, loadingNextFarmId, errorNextFarmId, refetchNextFarmId } = useNextFarmId();
  const { owner, loadingOwner, errorOwner, refetchOwner } = useOwner();
  const { roiBalances, loadingRoiBalances, errorRoiBalances, refetchRoiBalances } = useRoiBalances();
  const { farmBasicDetails, loadingFarmBasicDetails, errorFarmBasicDetails, refetchFarmBasicDetails } = useFarmBasicDetails(farmId);
  const { farmMilestoneDetails, loadingFarmMilestoneDetails, errorFarmMilestoneDetails, refetchFarmMilestoneDetails } = useFarmMilestoneDetails(farmId);
  const { farmInvestors, loadingFarmInvestors, errorFarmInvestors, refetchFarmInvestors } = useFarmInvestors(farmId);
  const { investorShares, loadingInvestorShares, errorInvestorShares, refetchInvestorShares } = useInvestorShares(farmId, investorAddress);
  const { allFarms, loadingAllFarms, errorAllFarms, refetchAllFarms } = useAllFarmsView();

  return {
    // account info
    currentAccountAddress: address,
    isConnected,

    // nextFarmId
    nextFarmId,
    loadingNextFarmId,
    errorNextFarmId,
    refetchNextFarmId,

    // owner
    owner,
    loadingOwner,
    errorOwner,
    refetchOwner,

    // roiBalances
    roiBalances,
    loadingRoiBalances,
    errorRoiBalances,
    refetchRoiBalances,

    // farmBasicDetails
    farmBasicDetails,
    loadingFarmBasicDetails,
    errorFarmBasicDetails,
    refetchFarmBasicDetails,

    // farmMilestoneDetails
    farmMilestoneDetails,
    loadingFarmMilestoneDetails,
    errorFarmMilestoneDetails,
    refetchFarmMilestoneDetails,

    // farmInvestors
    farmInvestors,
    loadingFarmInvestors,
    errorFarmInvestors,
    refetchFarmInvestors,

    // investorShares
    investorShares,
    loadingInvestorShares,
    errorInvestorShares,
    refetchInvestorShares,

    // allFarms
    allFarms,
    loadingAllFarms,
    errorAllFarms,
    refetchAllFarms,
  };
}