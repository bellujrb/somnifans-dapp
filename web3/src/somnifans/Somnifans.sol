// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {SomnifansPlaceBet} from "./Somnifans.placebet.sol";

contract Somnifans is SomnifansPlaceBet {
    constructor(address _token, address _oracle) SomnifansPlaceBet(_token, _oracle) {}

    function withdrawHouseProfit(bytes4 hypeId) external onlyOwner {
        uint256 profit = houseProfit[hypeId];
        if (profit == 0) {
            revert(NoProfitToWithdraw);
        }

        houseProfit[hypeId] = 0;
        if (!token.transfer(owner, profit)) {
            revert(TokenTransferFailed);
        }

        emit HouseProfitWithdrawn(hypeId, profit);
    }
}
