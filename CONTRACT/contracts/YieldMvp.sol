// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "./lib/events/yieldMvpEvents.sol";
import "./lib/errors/yieldMvpErrors.sol";
import "./UserRegistry.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./farmNFT.sol";
import "./investorsNFTs.sol";

contract YieldMvp is ReentrancyGuard, Ownable {
    UserRegistry public userRegistry;
    FarmNFT public farmsNft;
    InvestorNFT public investorsNfts;

    uint256 public nextFarmId;
    mapping(uint256 => Farm) private farms;
    uint256[] public farmIds;
    mapping(address => uint256[]) private farmerFarms;
    mapping(address => uint256) public roiBalances;

    struct Farm {
        uint256 id;
        address farmer;
        uint256 budget;
        uint256 farmSize;
        uint256 totalShares;
        uint256 sharePrice;
        uint256 totalInvested;
        string description;
        bool isFunded;
        bool isCompleted;
        uint256 escrowBalance;
        uint256 farmDurationDays;
        uint256 startTime;
        uint256 milestoneCount;
        uint256 periodSeconds;
        uint256 milestonesReleased;
        address[] investors;
        mapping(address => uint256) investments;
    }

    struct FarmView {
        uint256 id;
        address farmer;
        uint256 budget;
        uint256 farmSize;
        uint256 totalShares;
        uint256 sharePrice;
        uint256 totalInvested;
        string description;
        bool isFunded;
        bool isCompleted;
        uint256 escrowBalance;
        uint256 farmDurationDays;
        uint256 startTime;
        uint256 milestoneCount;
        uint256 periodSeconds;
        uint256 milestonesReleased;
    }

    constructor(
        address _userRegistry,
        address _farmNft,
        address _investorNft
    ) Ownable(msg.sender) {
        userRegistry = UserRegistry(_userRegistry);
        farmsNft = FarmNFT(_farmNft);
        investorsNfts = InvestorNFT(_investorNft);
    }

    modifier onlyFarmer(uint256 _farmId) {
        if (farms[_farmId].farmer != msg.sender)
            revert YieldMvpErrors.NotFarmOwner();
        _;
    }

    // ------------------ Internal Helpers ------------------
    function _deriveSchedule(
        uint256 durationDays
    ) internal pure returns (uint256 periodSeconds, uint256 milestoneCount) {
        if (durationDays >= 180) {
            periodSeconds = 30 days;
            milestoneCount = (durationDays + 29) / 30;
        } else if (durationDays >= 60) {
            periodSeconds = 14 days;
            milestoneCount = (durationDays + 13) / 14;
        } else {
            periodSeconds = 7 days;
            milestoneCount = (durationDays + 6) / 7;
        }
        if (milestoneCount == 0) milestoneCount = 1;
    }

    // ------------------ Farm Creation ------------------
    function createFarm(
        uint256 _budget,
        uint256 _farmSize,
        uint256 _totalShares,
        uint256 _durationDays,
        string memory _description,
        string memory _tokenUri
    ) external {
        UserRegistry.User memory farmer = userRegistry.getUser(msg.sender);

        bool isRegistered = farmer.isRegistered && farmer.role == UserRegistry.Role.Farmer; 


        if (!isRegistered) revert YieldMvpErrors.UserNotRegisteredOrNotFarmer();

        if (
            _budget == 0 ||
            _farmSize == 0 ||
            _totalShares == 0 ||
            _durationDays == 0
        ) {
            revert YieldMvpErrors.InvalidFarmParameters();
        }

        uint256 sharePrice = _budget / _totalShares;
        uint256 farmId = nextFarmId++;
        Farm storage farm = farms[farmId];

        farm.id = farmId;
        farm.farmer = msg.sender;
        farm.budget = _budget;
        farm.farmSize = _farmSize;
        farm.totalShares = _totalShares;
        farm.sharePrice = sharePrice;
        farm.description = _description;
        farm.isFunded = false;
        farm.isCompleted = false;
        farm.escrowBalance = 0;
        farm.farmDurationDays = _durationDays;
        farm.startTime = 0;
        farm.milestonesReleased = 0;

        (farm.periodSeconds, farm.milestoneCount) = _deriveSchedule(
            _durationDays
        );
        farmIds.push(farmId);
        farmerFarms[msg.sender].push(farmId);

        emit YieldMvpEvents.FarmCreated(
            farmId,
            msg.sender,
            _budget,
            _farmSize,
            _durationDays
        );

        // ✅ Mint Farm NFT to the farmer
        farmsNft.mintFarmNFT(msg.sender, farmId, _tokenUri);
    }

    // ------------------ Buying Shares ------------------
    function buyShares(
        uint256 _farmId,
        uint256 _amountShares,
        string memory _tokenUri
    ) external payable nonReentrant {
        Farm storage farm = farms[_farmId];

        UserRegistry.User memory investor = userRegistry.getUser(msg.sender);

        bool isRegistered = investor.isRegistered && investor.role == UserRegistry.Role.Farmer;

        if (!isRegistered)
            revert YieldMvpErrors.UserNotRegisteredOrNotInvestor();

        if (_amountShares == 0)
            revert YieldMvpErrors.SharesMustBeGreaterThanZero();
        if (farm.totalInvested >= farm.budget)
            revert YieldMvpErrors.FarmFullyFunded();

        uint256 cost = _amountShares * farm.sharePrice;
        if (msg.value != cost) revert YieldMvpErrors.IncorrectPayment();

        if (farm.totalInvested + cost > farm.budget)
            revert YieldMvpErrors.ExceedsBudget();

        if (farm.investments[msg.sender] == 0) farm.investors.push(msg.sender);
        farm.investments[msg.sender] += _amountShares;
        farm.totalInvested += cost;
        farm.escrowBalance += cost;

        if (farm.totalInvested >= farm.budget && !farm.isFunded) {
            farm.isFunded = true;
            farm.startTime = block.timestamp;
            farm.milestonesReleased = 0;
        }

        emit YieldMvpEvents.SharesPurchased(
            _farmId,
            msg.sender,
            _amountShares,
            cost
        );

        // ✅ Mint Investor NFT automatically
        investorsNfts.mintInvestorNFT(msg.sender, _farmId, _tokenUri);
    }

    // ------------------ Milestone Release ------------------
    function releaseMilestone(uint256 _farmId) external nonReentrant {
        Farm storage farm = farms[_farmId];

        if (!farm.isFunded) revert YieldMvpErrors.FarmNotFunded();
        if (farm.milestonesReleased >= farm.milestoneCount)
            revert YieldMvpErrors.AllMilestonesReleased();

        uint256 nextIndex = farm.milestonesReleased;
        uint256 scheduledTime = farm.startTime +
            (nextIndex * farm.periodSeconds);
        if (block.timestamp < scheduledTime)
            revert YieldMvpErrors.MilestoneReleaseTooEarly();

        uint256 baseTranche = farm.budget / farm.milestoneCount;
        uint256 amount = nextIndex + 1 == farm.milestoneCount
            ? farm.escrowBalance
            : baseTranche;

        farm.milestonesReleased += 1;
        farm.escrowBalance -= amount;

        (bool ok, ) = payable(farm.farmer).call{value: amount}("");
        if (!ok) revert YieldMvpErrors.TransferFailed();

        emit YieldMvpEvents.MilestoneReleased(
            _farmId,
            farm.milestonesReleased,
            amount,
            farm.escrowBalance
        );

        if (farm.milestonesReleased == farm.milestoneCount)
            farm.isCompleted = true;
    }

    // ------------------ ROI & Repayments ------------------
    function _allocateROI(Farm storage farm, uint256 totalRepayment) private {
        uint256 distributed = 0;
        uint256 len = farm.investors.length;

        for (uint256 i = 0; i < len; i++) {
            address investor = farm.investors[i];
            uint256 shares = farm.investments[investor];
            if (shares == 0) continue;

            uint256 investedAmount = shares * farm.sharePrice;
            uint256 amt = (totalRepayment * investedAmount) /
                farm.totalInvested;

            if (i == len - 1) amt = totalRepayment - distributed;
            else distributed += amt;

            roiBalances[investor] += amt;
            emit YieldMvpEvents.ROIAllocated(investor, amt);
        }
    }

    function farmerMakeRepayment(
        uint256 _farmId
    ) external payable onlyFarmer(_farmId) nonReentrant {
        Farm storage farm = farms[_farmId];
        if (msg.value == 0) revert YieldMvpErrors.MustRepay();
        if (farm.investors.length == 0) revert YieldMvpErrors.NoInvestors();

        emit YieldMvpEvents.RepaymentMade(_farmId, msg.value);
        _allocateROI(farm, msg.value);
    }

    function withdrawROI() external nonReentrant {
        uint256 amount = roiBalances[msg.sender];
        if (amount == 0) revert YieldMvpErrors.NoROI();

        roiBalances[msg.sender] = 0;
        (bool ok, ) = payable(msg.sender).call{value: amount}("");
        if (!ok) revert YieldMvpErrors.WithdrawFailed();

        emit YieldMvpEvents.ROIWithdrawn(msg.sender, amount);
    }

    // ------------------ Getters ------------------
    function getAllFarmsView() external view returns (FarmView[] memory) {
        uint256 len = farmIds.length;
        FarmView[] memory result = new FarmView[](len);

        for (uint256 i = 0; i < len; i++) {
            uint256 farmId = farmIds[i];
            Farm storage farm = farms[farmId];

            result[i] = FarmView({
                id: farm.id,
                farmer: farm.farmer,
                budget: farm.budget,
                farmSize: farm.farmSize,
                totalShares: farm.totalShares,
                sharePrice: farm.sharePrice,
                totalInvested: farm.totalInvested,
                description: farm.description,
                isFunded: farm.isFunded,
                isCompleted: farm.isCompleted,
                escrowBalance: farm.escrowBalance,
                farmDurationDays: farm.farmDurationDays,
                startTime: farm.startTime,
                milestoneCount: farm.milestoneCount,
                periodSeconds: farm.periodSeconds,
                milestonesReleased: farm.milestonesReleased
            });
        }

        return result;
    }

    function getFarmInvestors(
        uint256 _farmId
    ) external view returns (address[] memory) {
        return farms[_farmId].investors;
    }

    function getInvestorShares(
        uint256 _farmId,
        address _investor
    ) external view returns (uint256) {
        return farms[_farmId].investments[_investor];
    }

    function getFarmsByFarmer(address _farmer) external view returns (uint256[] memory) {
        return farmerFarms[_farmer];
    }
}