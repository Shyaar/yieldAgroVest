import { useReadContract, useAccount } from "wagmi";
import investorNftABI from "../../../abi/investorNft.json";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_INVESTOR_NFT_CONTRACT_ADDRESS as `0x${string}`;

// ------------------ 1️⃣ useInvestmentData ------------------
export function useInvestmentData(tokenId?: number) {
  const { isConnected } = useAccount();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: investorNftABI,
    functionName: "getInvestmentData",
    args: tokenId !== undefined ? [tokenId] : undefined,
    query: { enabled: !!tokenId && isConnected },
  });

  return {
    investmentData: data,
    loadingInvestmentData: isLoading,
    errorInvestmentData: isError,
    refetchInvestmentData: refetch,
  };
}

// ------------------ 2️⃣ useInvestorInvestments ------------------
export function useInvestorInvestments(investorAddress?: `0x${string}`) {
  const { isConnected } = useAccount();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: investorNftABI,
    functionName: "getInvestorInvestmentsWithMetadata",
    args: investorAddress ? [investorAddress] : undefined,
    query: { enabled: !!investorAddress && isConnected },
  });

  return {
    investorInvestments: data,
    loadingInvestorInvestments: isLoading,
    errorInvestorInvestments: isError,
    refetchInvestorInvestments: refetch,
  };
}

// ------------------ 3️⃣ useInvestorNft (master hook) ------------------
export function useInvestorNft(tokenId?: number, investorAddress?: `0x${string}`) {
  const { address, isConnected } = useAccount();

  const { investmentData, loadingInvestmentData, errorInvestmentData, refetchInvestmentData } = useInvestmentData(tokenId);
  const { investorInvestments, loadingInvestorInvestments, errorInvestorInvestments, refetchInvestorInvestments } = useInvestorInvestments(investorAddress);

  return {
    // account info
    currentAccountAddress: address,
    isConnected,

    // investment data
    investmentData,
    loadingInvestmentData,
    errorInvestmentData,
    refetchInvestmentData,

    // investor investments
    investorInvestments,
    loadingInvestorInvestments,
    errorInvestorInvestments,
    refetchInvestorInvestments,
  };
}