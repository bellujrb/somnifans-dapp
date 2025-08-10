// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../../src/HypeToken.sol";
import "../../src/Oracle.sol";
import "../../src/somnifans/Somnifans.sol";
import "../BaseSetup.t.sol";

contract Fase1Cenario3Test is BaseSetup {
    HypeToken public token;
    Oracle public oracle;
    Somnifans public somnifans;
    address casa = address(0xCAFE);
    address payable[] apostadores;

    function setUp() public override {
        super.setUp();
        token = new HypeToken();
        oracle = new Oracle();
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

    function testAposFechamento() public {
        // Place some bets while match is open
        for (uint256 i = 0; i < 10; i++) {
            vm.prank(apostadores[i]);
            somnifans.placeBet(0x12345678, true, 100 ether);
        }

        // Close bets - match is now closed for betting
        oracle.closeBets(0x12345678);

        // Try to place a bet after match is closed - should revert
        vm.expectRevert(bytes("E009"));
        vm.prank(apostadores[0]);
        somnifans.placeBet(0x12345678, true, 100 ether);
    }
}
