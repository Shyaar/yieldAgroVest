import { useAccount } from "wagmi";
import { Button } from "../../components/ui/Button";
import ListingCard from "../../components/ui/ListingCard";
import { useSingleUser } from "../../hooks/user/useUserRegistry";
import { useEffect } from "react";
import { useFarmsByFarmer } from "../../hooks/yieldmvp/useFarmsByFarmer";
import { useNavigate } from "react-router-dom";

type FarmDetails = {
  id: bigint;
  farmer: `0x${string}`;
  budget: bigint;
  farmSize: bigint;
  totalShares: bigint;
  sharePrice: bigint;
  totalInvested: bigint;
  description: string;
  isFunded: boolean;
  isCompleted: boolean;
  escrowBalance: bigint;
  farmDurationDays: bigint;
  startTime: bigint;
  milestoneCount: bigint;
  periodSeconds: bigint;
  milestonesReleased: bigint;
};

const InvestorDashboard = () => {
  const { address, isConnected } = useAccount();
  const { user, loadingUser, refetchUser } = useSingleUser(
    isConnected ? address : undefined
  );
  const { farms, loadingFarms } = useFarmsByFarmer(address);
  const navigate = useNavigate();

  // Mock data for demonstration
  const mockFarms: FarmDetails[] = [
    {
      id: BigInt(1),
      farmer: "0x0000000000000000000000000000000000000001",
      budget: BigInt(10000),
      farmSize: BigInt(50),
      totalShares: BigInt(100),
      sharePrice: BigInt(100),
      totalInvested: BigInt(5000),
      description: "Organic corn farm in fertile plains.",
      isFunded: false,
      isCompleted: false,
      escrowBalance: BigInt(5000),
      farmDurationDays: BigInt(180),
      startTime: BigInt(Date.now()),
      milestoneCount: BigInt(3),
      periodSeconds: BigInt(60 * 60 * 24 * 60),
      milestonesReleased: BigInt(1),
    },
    {
      id: BigInt(2),
      farmer: "0x0000000000000000000000000000000000000001",
      budget: BigInt(25000),
      farmSize: BigInt(120),
      totalShares: BigInt(250),
      sharePrice: BigInt(100),
      totalInvested: BigInt(25000),
      description: "Sustainable wheat farm with advanced irrigation.",
      isFunded: true,
      isCompleted: false,
      escrowBalance: BigInt(10000),
      farmDurationDays: BigInt(365),
      startTime: BigInt(Date.now() - 86400000 * 30), // Started 30 days ago
      milestoneCount: BigInt(6),
      periodSeconds: BigInt(60 * 60 * 24 * 60),
      milestonesReleased: BigInt(2),
    },
  ];

  useEffect(() => {
    if (loadingUser) {
      console.log("userLoading");
    }
    if (user) {
      console.log("user :", user);
    }

    if (isConnected && address) {
      console.log("✅ User Address:", address);
      getUser(); // optional
    }
  }, [loadingUser, user, address]);

  async function getUser() {
    const userData = await refetchUser();

    if (userData) {
      console.log(
        "User object:",
        userData,
        "Loading user:",
        "user name",
        typeof userData,
        loadingUser,
        "username",
        user
      );
    }
  }

  const handleNavigate = (farmId: bigint) => {
    navigate(`/investor/farm/${farmId}`);
  };

  const investorFarms = farms as FarmDetails[] | undefined;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Investor Dashboard</h1>
          <p className="text-gray-500">
            {loadingUser
              ? "fetching user..."
              : user?.name
              ? `Welcome, ${user.name}`
              : "user not found"}
          </p>
        </div>
        <Button onClick={() => navigate("/investors/browse")}>Find Farms</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border-2 border-amber-500/20 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Farms Bought</h2>
          <p className="text-3xl font-bold">{(investorFarms?.length || 0) + mockFarms.length}</p>
        </div>
        <div className="bg-white border-2 border-amber-500/20 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Investments</h2>
          <p className="text-3xl font-bold">{"totalInvestments"} HBAR</p>
        </div>
        {/* <div className="bg-white border-2 border-amber-500/20 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Investors</h2>
          <p className="text-3xl font-bold">{"totalInvestors"}</p>
        </div> */}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Your Investments</h2>
        {loadingFarms ? (
          <p>Loading investments...</p>
        ) : (investorFarms && investorFarms.length > 0) || mockFarms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(investorFarms || []).concat(mockFarms).map((farm) => (
              farm && (
                <ListingCard
                  key={Number(farm.id)}
                  title={`Farm #${Number(farm.id)}`}
                  description={farm.description || ""}
                  imageUrl={
                    "https://images.pexels.com/photos/2889441/pexels-photo-2889441.jpeg?auto=compress&cs=tinysrgb&w=400"
                  }
                  actionText="View Details"
                  onAction={() => handleNavigate(farm.id)}
                >
                  <div className="p-4">
                    <p>Budget: {Number(farm.budget)} HBAR</p>
                    <p>Total Invested: {Number(farm.totalInvested)} HBAR</p>
                    <p>Is Funded: {farm.isFunded ? "Yes" : "No"}</p>
                    <p>Is Completed: {farm.isCompleted ? "Yes" : "No"}</p>
                  </div>
                </ListingCard>
              )
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">No investments yet.</p>
            <Button onClick={() => navigate("/investors/browse")} className="mt-4">
              Find Farms to Invest
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestorDashboard;
