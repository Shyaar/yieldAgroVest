// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

library YieldMvpEvents {
    event FarmerRegistered(
        address indexed farmerAddress,
        string indexed farmLocation,
        string firstName,
        string lastName
    );
    event InvestorRegistered(
        address indexed investorAddress,
        string indexed country,
        string firstName,
        string lastName
    );
    event FarmCreated(
        uint256 farmId,
        address farmer,
        uint256 budget,
        uint256 farmSize,
        uint256 durationDays
    );
    event SharesPurchased(
        uint256 farmId,
        address investor,
        uint256 shares,
        uint256 amount
    );
    event RepaymentMade(uint256 farmId, uint256 amount);
    event ROIAllocated(address investor, uint256 amount);
    event ROIWithdrawn(address investor, uint256 amount);
    event MilestoneReleased(
        uint256 indexed farmId,
        uint256 milestoneIndex,
        uint256 amount,
        uint256 remainingEscrow
    );
}
