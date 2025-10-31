import { useParams, useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { Button } from '../../components/ui/Button';

const InvestorFarmDetails: React.FC = () => {
  const { farmId } = useParams<{ farmId: string }>();
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  const mockFarm = {
    id: BigInt(farmId || 1),
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
    milestonesReleased: BigInt(1),
    imageUrl: "https://images.pexels.com/photos/2889441/pexels-photo-2889441.jpeg?auto=compress&cs=tinysrgb&w=400"
  };

  const mockMilestones = [
    { description: "Milestone 1: Land Preparation", amount: BigInt(2000) },
    { description: "Milestone 2: Planting", amount: BigInt(3000) },
    { description: "Milestone 3: Harvesting", amount: BigInt(5000) },
  ];

  const mockInvestors = [
    "0xInvestorAddress1",
    "0xInvestorAddress2",
  ];

  const farmBasicDetails = mockFarm;
  const farmMilestoneDetails = mockMilestones;
  const farmInvestors = mockInvestors;

  if (!isConnected) {
    return <div className="container mx-auto p-4">Please connect your wallet.</div>;
  }

  if (!farmBasicDetails) {
    return <div className="container mx-auto p-4">Farm not found.</div>;
  }

  // const isFarmOwner = address === farmBasicDetails.farmer; // Not needed for investor view

  return (
    <div className="container mx-auto p-4">
      <Button onClick={() => navigate(-1)} className="mb-4">
        &larr; Back
      </Button>
      <h1 className="text-3xl font-bold mb-4">Farm Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <img src={farmBasicDetails.imageUrl} alt={farmBasicDetails.description} className="w-full h-64 object-cover rounded-lg mb-4" />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-3">Basic Information</h2>
          <p><strong>Farm ID:</strong> {farmBasicDetails.id.toString()}</p>
          <p><strong>Farmer:</strong> {farmBasicDetails.farmer}</p>
          <p><strong>Budget:</strong> {farmBasicDetails.budget.toString()}</p>
          <p><strong>Farm Size:</strong> {farmBasicDetails.farmSize.toString()}</p>
          <p><strong>Total Shares:</strong> {farmBasicDetails.totalShares.toString()}</p>
          <p><strong>Share Price:</strong> {farmBasicDetails.sharePrice.toString()}</p>
          <p><strong>Total Invested:</strong> {farmBasicDetails.totalInvested.toString()}</p>
          <p><strong>Description:</strong> {farmBasicDetails.description}</p>
          <p><strong>Funded:</strong> {farmBasicDetails.isFunded ? 'Yes' : 'No'}</p>
          <p><strong>Completed:</strong> {farmBasicDetails.isCompleted ? 'Yes' : 'No'}</p>
          <p><strong>Escrow Balance:</strong> {farmBasicDetails.escrowBalance.toString()}</p>
          <p><strong>Duration:</strong> {farmBasicDetails.farmDurationDays.toString()} days</p>
          <p><strong>Start Time:</strong> {new Date(Number(farmBasicDetails.startTime)).toLocaleString()}</p>
          <p><strong>Milestone Count:</strong> {farmBasicDetails.milestoneCount.toString()}</p>
          <p><strong>Milestones Released:</strong> {farmBasicDetails.milestonesReleased.toString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {farmMilestoneDetails && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-3">Milestone Details</h2>
            {farmMilestoneDetails.map((milestone: any, index: number) => (
              <div key={index} className="mb-2">
                <p><strong>Milestone {index + 1}:</strong> {milestone.description} - {milestone.amount.toString()}</p>
              </div>
            ))}
          </div>
        )}

        {farmInvestors && farmInvestors.length > 0 && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-3">Investors</h2>
            <ul>
              {farmInvestors.map((investorAddress: string, index: number) => (
                <li key={index}>{investorAddress}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex justify-end">
        <Button
          disabled
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Buy Shares
        </Button>
      </div>
    </div>
  );
};

export default InvestorFarmDetails;
