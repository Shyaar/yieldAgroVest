
// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useReadYieldMvp } from '../../hooks/yieldmvp/useReadYieldMvp';
// import { useYieldMvpActions } from '../../hooks/yieldmvp/useYieldMvpActions';
// import { useAccount } from 'wagmi';

// const FarmDetails: React.FC = () => {
//   const { farmId } = useParams<{ farmId: string }>();
//   const { address, isConnected } = useAccount();
//   const parsedFarmId = farmId ? parseInt(farmId) : undefined;

//   const { farmBasicDetails, loadingFarmBasicDetails, farmMilestoneDetails, loadingFarmMilestoneDetails, farmInvestors, loadingFarmInvestors } = useReadYieldMvp(parsedFarmId);
//   const { buyShares, releaseMilestone } = useYieldMvpActions();

//   if (!isConnected) {
//     return <div className="container mx-auto p-4">Please connect your wallet.</div>;
//   }

//   if (loadingFarmBasicDetails || loadingFarmMilestoneDetails || loadingFarmInvestors) {
//     return <div className="container mx-auto p-4">Loading farm details...</div>;
//   }

//   if (!farmBasicDetails) {
//     return <div className="container mx-auto p-4">Farm not found.</div>;
//   }

//   const isFarmOwner = address === farmBasicDetails.farmer;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">Farm Details</h1>

//       <div className="bg-white shadow-md rounded-lg p-6 mb-6">
//         <h2 className="text-2xl font-semibold mb-3">Basic Information</h2>
//         <p><strong>Farm ID:</strong> {farmBasicDetails.id.toString()}</p>
//         <p><strong>Farmer:</strong> {farmBasicDetails.farmer}</p>
//         <p><strong>Budget:</strong> {farmBasicDetails.budget.toString()}</p>
//         <p><strong>Farm Size:</strong> {farmBasicDetails.farmSize.toString()}</p>
//         <p><strong>Total Shares:</strong> {farmBasicDetails.totalShares.toString()}</p>
//         <p><strong>Share Price:</strong> {farmBasicDetails.sharePrice.toString()}</p>
//         <p><strong>Total Invested:</strong> {farmBasicDetails.totalInvested.toString()}</p>
//         <p><strong>Description:</strong> {farmBasicDetails.description}</p>
//         <p><strong>Funded:</strong> {farmBasicDetails.isFunded ? 'Yes' : 'No'}</p>
//         <p><strong>Completed:</strong> {farmBasicDetails.isCompleted ? 'Yes' : 'No'}</p>
//         <p><strong>Escrow Balance:</strong> {farmBasicDetails.escrowBalance.toString()}</p>
//         <p><strong>Duration:</strong> {farmBasicDetails.farmDurationDays.toString()} days</p>
//         <p><strong>Start Time:</strong> {new Date(Number(farmBasicDetails.startTime) * 1000).toLocaleString()}</p>
//         <p><strong>Milestone Count:</strong> {farmBasicDetails.milestoneCount.toString()}</p>
//         <p><strong>Milestones Released:</strong> {farmBasicDetails.milestonesReleased.toString()}</p>
//       </div>

//       {farmMilestoneDetails && (
//         <div className="bg-white shadow-md rounded-lg p-6 mb-6">
//           <h2 className="text-2xl font-semibold mb-3">Milestone Details</h2>
//           {/* Assuming farmMilestoneDetails is an array of milestones */}
//           {farmMilestoneDetails.map((milestone: any, index: number) => (
//             <div key={index} className="mb-2">
//               <p><strong>Milestone {index + 1}:</strong> {milestone.description} - {milestone.amount.toString()}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {farmInvestors && farmInvestors.length > 0 && (
//         <div className="bg-white shadow-md rounded-lg p-6 mb-6">
//           <h2 className="text-2xl font-semibold mb-3">Investors</h2>
//           <ul>
//             {farmInvestors.map((investorAddress: `0x${string}`, index: number) => (
//               <li key={index}>{investorAddress}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {isFarmOwner && !farmBasicDetails.isCompleted && (
//         <div className="bg-white shadow-md rounded-lg p-6 mb-6">
//           <h2 className="text-2xl font-semibold mb-3">Farmer Actions</h2>
//           <button
//             onClick={() => parsedFarmId && releaseMilestone(BigInt(parsedFarmId))}
//             className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Release Next Milestone
//           </button>
//         </div>
//       )}

//       {!isFarmOwner && !farmBasicDetails.isFunded && (
//         <div className="bg-white shadow-md rounded-lg p-6 mb-6">
//           <h2 className="text-2xl font-semibold mb-3">Investor Actions</h2>
//           {/* Placeholder for buying shares - needs input for amountShares and cost */}
//           <button
//             onClick={() => {
//               // Example values, replace with actual input from user
//               const amountShares = BigInt(1);
//               const cost = BigInt(farmBasicDetails.sharePrice) * amountShares;
//               parsedFarmId && buyShares(BigInt(parsedFarmId), amountShares, cost);
//             }}
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Buy 1 Share
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FarmDetails;
