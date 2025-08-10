// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Oracle} from "../Oracle.sol";
import {HypeToken} from "../HypeToken.sol";
import {SomnifansError} from "./Somnifans.error.sol";
import {SomnifansEvents} from "./Somnifans.events.sol";

/**
 * @title SomnifansStorage
 * @dev Contrato base que define a estrutura de dados e constantes do sistema Somnifans
 *
 * Este contrato trabalha em conjunto com o Oracle refatorado que possui as seguintes etapas:
 * - Hype agora é representado de 0 a 10000 (duas casas decimais)
 * 1. Scheduled - Jogo criado e agendado
 * 2. Open - Aberto para apostas
 * 3. Closed - Fechado para apostas (jogo em andamento)
 * 4. Finished - Jogo finalizado
 */
abstract contract SomnifansStorage is SomnifansError, SomnifansEvents {
    // Contratos externos
    HypeToken public immutable token; // Contrato do token HYPE
    Oracle public immutable oracle; // Contrato Oracle refatorado
    address public immutable owner; // Endereço do owner do contrato

    /**
     * @dev Estrutura para rastrear apostas dos usuários
     * @param amount Quantidade de HYPE apostada
     * @param teamA true para Time A, false para Time B
     */
    struct Bet {
        uint256 amount; // Amount of HYPE bet
        bool teamA; // true for Team A, false for Team B
    }

    // Mappings para armazenar dados do sistema
    mapping(bytes4 => mapping(address => Bet)) public bets; // Apostas por match e usuário
    mapping(bytes4 => uint256) public prizePoolA; // Pool de prêmios para Time A
    mapping(bytes4 => uint256) public prizePoolB; // Pool de prêmios para Time B
    mapping(bytes4 => uint256) public houseProfit; // Lucro da casa por match

    // Taxa da casa (5%)
    uint256 public constant HOUSE_FEE = 5e16; // 5% = 0.05 * 1e18

    /**
     * @dev Construtor que inicializa os contratos externos
     * @param _token Endereço do contrato HypeToken
     * @param _oracle Endereço do contrato Oracle refatorado
     */
    constructor(address _token, address _oracle) {
        token = HypeToken(_token);
        oracle = Oracle(_oracle);
        owner = msg.sender;
    }
}
