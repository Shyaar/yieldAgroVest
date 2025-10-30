// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

library YieldMvpErrors {
    error FarmerAlreadyRegistered();
    error InvestorAlreadyRegistered();
    error NotOwner();
    error InvalidFarmParameters();
    error NotFarmOwner();
    error SharesMustBeGreaterThanZero();
    error FarmFullyFunded();
    error IncorrectPayment();
    error FarmNotFound();
    error FarmNotFunded();
    error AllMilestonesReleased();
    error MilestoneReleaseTooEarly();
    error TransferFailed();
    error MustRepay();
    error NoInvestors();
    error NoROI();
    error WithdrawFailed();
    error FarmerNotFound();
    error UserNotRegisteredOrNotFarmer();
    error UserNotRegisteredOrNotInvestor();
    error ExceedsBudget();
}