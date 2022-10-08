
// contracts/MyVaultNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.1;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

abstract contract VaultNFTv2 is ERC721Enumerable {
            
    constructor(string memory _name, string memory _symbol) {
    }

    function _transferFrom(address from, address to, uint256 tokenId) internal {
        revert("transfer: disabled");
    }
}