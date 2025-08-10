// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {SomnifansClaim} from "./Somnifans.claim.sol";

abstract contract SomnifansPlaceBet is SomnifansClaim {
    constructor(address _token, address _oracle) SomnifansClaim(_token, _oracle) {}

    function placeBet(bytes4 hypeId, bool teamA, uint256 amount) external onlyValidPlaceBet(hypeId, amount) {
        // Transfer HYPE from user to contract
        if (!token.transferFrom(msg.sender, address(this), amount)) {
            revert(TokenTransferFailed);
        }

        // Register bet
        bets[hypeId][msg.sender] = Bet({amount: amount, teamA: teamA});
        if (teamA) {
            prizePoolA[hypeId] += amount;
        } else {
            prizePoolB[hypeId] += amount;
        }

        emit BetPlaced(hypeId, msg.sender, teamA, amount);
    }
}
