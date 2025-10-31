import ListingCard from "../../components/ui/ListingCard";
import { useNavigate } from "react-router-dom"; // Import useNavigate

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
  imageUrl: string;
};

export default function InvestorBrowse() {
  const navigate = useNavigate(); // Initialize useNavigate

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
      imageUrl: "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=800",
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
      imageUrl: "https://images.pexels.com/photos/2889441/pexels-photo-2889441.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: BigInt(3),
      farmer: "0x0000000000000000000000000000000000000002",
      budget: BigInt(15000),
      farmSize: BigInt(70),
      totalShares: BigInt(150),
      sharePrice: BigInt(100),
      totalInvested: BigInt(10000),
      description: "Dairy farm with pasture-raised cows.",
      isFunded: false,
      isCompleted: false,
      escrowBalance: BigInt(5000),
      farmDurationDays: BigInt(200),
      startTime: BigInt(Date.now()),
      milestoneCount: BigInt(4),
      periodSeconds: BigInt(60 * 60 * 24 * 50),
      milestonesReleased: BigInt(0),
      imageUrl: "https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: BigInt(4),
      farmer: "0x0000000000000000000000000000000000000003",
      budget: BigInt(30000),
      farmSize: BigInt(150),
      totalShares: BigInt(300),
      sharePrice: BigInt(100),
      totalInvested: BigInt(30000),
      description: "Fruit orchard with diverse seasonal produce.",
      isFunded: true,
      isCompleted: false,
      escrowBalance: BigInt(15000),
      farmDurationDays: BigInt(400),
      startTime: BigInt(Date.now() - 86400000 * 60),
      milestoneCount: BigInt(8),
      periodSeconds: BigInt(60 * 60 * 24 * 50),
      milestonesReleased: BigInt(3),
      imageUrl: "https://images.pexels.com/photos/1083822/pexels-photo-1083822.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: BigInt(5),
      farmer: "0x0000000000000000000000000000000000000004",
      budget: BigInt(12000),
      farmSize: BigInt(60),
      totalShares: BigInt(120),
      sharePrice: BigInt(100),
      totalInvested: BigInt(6000),
      description: "Vegetable farm specializing in leafy greens.",
      isFunded: false,
      isCompleted: false,
      escrowBalance: BigInt(6000),
      farmDurationDays: BigInt(150),
      startTime: BigInt(Date.now()),
      milestoneCount: BigInt(3),
      periodSeconds: BigInt(60 * 60 * 24 * 50),
      milestonesReleased: BigInt(0),
      imageUrl: "https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: BigInt(6),
      farmer: "0x0000000000000000000000000000000000000005",
      budget: BigInt(18000),
      farmSize: BigInt(90),
      totalShares: BigInt(180),
      sharePrice: BigInt(100),
      totalInvested: BigInt(18000),
      description: "Poultry farm producing organic eggs.",
      isFunded: true,
      isCompleted: false,
      escrowBalance: BigInt(8000),
      farmDurationDays: BigInt(250),
      startTime: BigInt(Date.now() - 86400000 * 40), // Started 40 days ago
      milestoneCount: BigInt(5),
      periodSeconds: BigInt(60 * 60 * 24 * 50),
      milestonesReleased: BigInt(2),
      imageUrl: "https://images.pexels.com/photos/162240/chicken-egg-biologically-naturally-162240.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: BigInt(7),
      farmer: "0x0000000000000000000000000000000000000006",
      budget: BigInt(22000),
      farmSize: BigInt(110),
      totalShares: BigInt(220),
      sharePrice: BigInt(100),
      totalInvested: BigInt(11000),
      description: "Aquaculture farm raising sustainable fish.",
      isFunded: false,
      isCompleted: false,
      escrowBalance: BigInt(11000),
      farmDurationDays: BigInt(300),
      startTime: BigInt(Date.now()),
      milestoneCount: BigInt(6),
      periodSeconds: BigInt(60 * 60 * 24 * 50),
      milestonesReleased: BigInt(0),
      imageUrl: "https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: BigInt(8),
      farmer: "0x0000000000000000000000000000000000000007",
      budget: BigInt(8000),
      farmSize: BigInt(40),
      totalShares: BigInt(80),
      sharePrice: BigInt(100),
      totalInvested: BigInt(4000),
      description: "Herb garden with medicinal plants.",
      isFunded: false,
      isCompleted: false,
      escrowBalance: BigInt(4000),
      farmDurationDays: BigInt(100),
      startTime: BigInt(Date.now()),
      milestoneCount: BigInt(2),
      periodSeconds: BigInt(60 * 60 * 24 * 50),
      milestonesReleased: BigInt(0),
      imageUrl: "https://images.pexels.com/photos/235986/pexels-photo-235986.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: BigInt(9),
      farmer: "0x0000000000000000000000000000000000000008",
      budget: BigInt(17000),
      farmSize: BigInt(85),
      totalShares: BigInt(170),
      sharePrice: BigInt(100),
      totalInvested: BigInt(17000),
      description: "Specialty mushroom farm.",
      isFunded: true,
      isCompleted: false,
      escrowBalance: BigInt(7000),
      farmDurationDays: BigInt(220),
      startTime: BigInt(Date.now() - 86400000 * 20),
      milestoneCount: BigInt(4),
      periodSeconds: BigInt(60 * 60 * 24 * 50),
      milestonesReleased: BigInt(1),
      imageUrl: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: BigInt(10),
      farmer: "0x0000000000000000000000000000000000000009",
      budget: BigInt(13000),
      farmSize: BigInt(65),
      totalShares: BigInt(130),
      sharePrice: BigInt(100),
      totalInvested: BigInt(6500),
      description: "Flower farm for local florists.",
      isFunded: false,
      isCompleted: false,
      escrowBalance: BigInt(6500),
      farmDurationDays: BigInt(160),
      startTime: BigInt(Date.now()),
      milestoneCount: BigInt(3),
      periodSeconds: BigInt(60 * 60 * 24 * 50),
      milestonesReleased: BigInt(0),
      imageUrl: "https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Browse Farms</h1>
      <p className="text-gray-600 mb-6">
        Investors can see verified farmers and choose who to support.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockFarms.map((farm) => (
          <ListingCard
            key={Number(farm.id)}
            title={`Farm #${Number(farm.id)}`}
            description={farm.description || ""}
            imageUrl={farm.imageUrl}
            actionText="View Details"
            onAction={() => navigate(`/investor/farm/${farm.id}`)} // Updated onAction
          >
            <div className="p-4">
              <p>Budget: {Number(farm.budget)}</p>
              <p>Total Invested: {Number(farm.totalInvested)}</p>
              <p>Is Funded: {farm.isFunded ? "Yes" : "No"}</p>
              <p>Is Completed: {farm.isCompleted ? "Yes" : "No"}</p>
            </div>
          </ListingCard>
        ))}
      </div>
    </div>
  );
}
