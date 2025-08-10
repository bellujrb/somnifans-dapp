// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {HypeToken} from "../src/HypeToken.sol";
import {Oracle} from "../src/Oracle.sol";
import { Somnifans } from "../src/somnifans/Somnifans.sol";

contract DeployScript is Script {
    function setUp() public {}

    function run() public {
        address deployer = msg.sender;

        console.log("[1] Deployer address:", deployer);
        console.log("[2] Deployer balance:", deployer.balance);

        vm.startBroadcast();

        // Deploy HypeToken
        console.log("[3] Deploying HypeToken...");
        HypeToken hypeToken = new HypeToken();
        console.log("[4] HypeToken deployed at:", address(hypeToken));

        // Deploy Oracle
        console.log("[5] Deploying Oracle...");
        Oracle oracle = new Oracle();
        console.log("[6] Oracle deployed at:", address(oracle));

        // Deploy Somnifans
        console.log("[7] Deploying Somnifans...");
        Somnifans somnifans = new Somnifans(address(hypeToken), address(oracle));
        console.log("[8] Somnifans deployed at:", address(somnifans));

        vm.stopBroadcast();
    }
}
