// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../../src/HypeToken.sol";
import "../../src/Oracle.sol";
import "../../src/somnifans/Somnifans.sol";
import "../BaseSetup.t.sol";

contract Fase1Cenario2Test is BaseSetup {
    HypeToken public token;
    Oracle public oracle;
    Somnifans public somnifans;
    address casa = address(0xCAFE);
    address payable[] apostadores;
    uint256[10] apostasA = [100, 200, 100, 200, 200, 200, 200, 400, 800, 1000];
    uint256[5] apostasB = [100, 200, 100, 800, 1000];

    function setUp() public override {
        super.setUp();
        token = new HypeToken();
        oracle = new Oracle();
        // Deploy Somnifans com casa como owner
        vm.prank(casa);
        somnifans = new Somnifans(address(token), address(oracle));

        // Schedule match for future time
        uint256 scheduledTime = block.timestamp + 1 hours;
        oracle.scheduleMatch(0x12345678, scheduledTime, "AAA", "BBB", "#aaa_bbb");

        // Update hype (70% for Team A, 30% for Team B)
        oracle.updateHype(0x12345678, 7000, 3000);

        // Open match for betting
        oracle.openToBets(0x12345678);

        apostadores = createUsers(15);
        for (uint256 i = 0; i < 15; i++) {
            token.mint(apostadores[i], 10000 ether);
            vm.prank(apostadores[i]);
            token.approve(address(somnifans), type(uint256).max);
        }
    }

    function testCenario2() public {
        // Place bets on Team A (10 users)
        for (uint256 i = 0; i < 10; i++) {
            vm.prank(apostadores[i]);
            somnifans.placeBet(0x12345678, true, apostasA[i] * 1 ether);
        }

        // Place bets on Team B (5 users)
        for (uint256 i = 0; i < 5; i++) {
            vm.prank(apostadores[10 + i]);
            somnifans.placeBet(0x12345678, false, apostasB[i] * 1 ether);
        }

        // Close bets (match status becomes Closed)
        oracle.closeBets(0x12345678);

        // Update score: Team B wins (0-1)
        oracle.updateScore(0x12345678, 0, 1);

        // Finish match (match status becomes Finished)
        oracle.finishMatch(0x12345678);

        // Winners claim prizes (Team B bettors)
        for (uint256 i = 10; i < 15; i++) {
            uint256 saldoAntes = token.balanceOf(apostadores[i]);
            vm.prank(apostadores[i]);
            somnifans.claimPrize(0x12345678);
            uint256 ganho = token.balanceOf(apostadores[i]) - saldoAntes;
            assertGt(ganho, 0, "Apostador B sem ganho");
        }

        // Losers should not receive anything (Team A bettors)
        for (uint256 i = 0; i < 10; i++) {
            vm.prank(apostadores[i]);
            vm.expectRevert(bytes("E008")); // Espera revert porque perdeu
            somnifans.claimPrize(0x12345678);
        }

        // House withdraws profit
        vm.prank(casa);
        somnifans.withdrawHouseProfit(0x12345678);
        uint256 lucroCasa = token.balanceOf(casa);
        uint256 totalApostado = 5600 ether;
        assertEq(lucroCasa, totalApostado * 5 / 100, "Lucro da casa incorreto");
    }
}
