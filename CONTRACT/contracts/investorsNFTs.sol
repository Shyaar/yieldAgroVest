// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract InvestorNFT is ERC721URIStorage, Ownable {
    uint256 public nextInvestorNftId;

    struct InvestmentData {
        uint256 id;
        address investor;
        uint256 farmId;
        string uri; // ✅ stores metadata URI
    }

    mapping(uint256 => InvestmentData) public investments;

    constructor() ERC721("InvestorNFT", "INVEST") Ownable(msg.sender) {}

    // ------------------ Minting ------------------
    function mintInvestorNFT(
        address investor,
        uint256 farmId,
        string memory tokenURI
    ) external returns (uint256) {
        uint256 tokenId = nextInvestorNftId++;
        _safeMint(investor, tokenId);
        _setTokenURI(tokenId, tokenURI);
        investments[tokenId] = InvestmentData(tokenId, investor, farmId, tokenURI);
        return tokenId;
    }

    // ------------------ Single Investment Getter ------------------
    function getInvestmentData(uint256 tokenId)
        external
        view
        returns (InvestmentData memory)
    {
        return investments[tokenId];
    }

    // ------------------ All Investments for an Investor with Metadata ------------------
    function getInvestorInvestmentsWithMetadata(address investor)
        external
        view
        returns (InvestmentData[] memory)
    {
        uint256 total = nextInvestorNftId;
        uint256 count = 0;

        // First pass: count how many NFTs belong to this investor
        for (uint256 i = 0; i < total; i++) {
            if (investments[i].investor == investor) {
                count++;
            }
        }

        InvestmentData[] memory result = new InvestmentData[](count);
        uint256 index = 0;

        // Second pass: populate the array
        for (uint256 i = 0; i < total; i++) {
            if (investments[i].investor == investor) {
                result[index] = investments[i]; // includes id, farmId, and uri
                index++;
            }
        }

        return result;
    }
}
