// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FarmNFT is ERC721URIStorage, Ownable {

    uint256 public nextFarmId;

    struct FarmData {
        uint256 id;
        address farmer;
        string uri; // ✅ stores metadata URI
    }

    mapping(uint256 => FarmData) public farms;

    constructor() ERC721("FarmNFT", "FARM") Ownable(msg.sender) {}

    // ------------------ Minting ------------------
    function mintFarmNFT(address farmer, uint256 farmId, string memory tokenURI)
        external
        returns (uint256)
    {
        _safeMint(farmer, farmId);
        _setTokenURI(farmId, tokenURI);
        farms[farmId] = FarmData(farmId, farmer, tokenURI);
        return farmId;
    }

    // ------------------ Single Farm Getter ------------------
    function getFarmData(uint256 farmId)
        external
        view
        returns (FarmData memory)
    {
        return farms[farmId];
    }

    // ------------------ All Farms for a Farmer ------------------
    function getFarmerFarms(address farmer)
        external
        view
        returns (FarmData[] memory)
    {
        uint256 totalFarms = nextFarmId;
        uint256 count = 0;

        // First pass: count how many farms belong to this farmer
        for (uint256 i = 0; i < totalFarms; i++) {
            if (farms[i].farmer == farmer) {
                count++;
            }
        }

        // Create array of exact size
        FarmData[] memory result = new FarmData[](count);
        uint256 index = 0;

        // Second pass: populate the array
        for (uint256 i = 0; i < totalFarms; i++) {
            if (farms[i].farmer == farmer) {
                result[index] = farms[i]; // includes id and uri
                index++;
            }
        }

        return result;
    }
}
