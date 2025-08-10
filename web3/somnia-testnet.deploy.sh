#!/bin/bash

# Carrega variáveis de ambiente do arquivo .env se existir
if [ -f ".env" ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Somnia Testnet Configuration (configurações oficiais corretas)
RPC_URL="${RPC_URL:-https://dream-rpc.somnia.network}"
CHAIN_ID="${CHAIN_ID:-50311}"  # Chain ID correto da Somnia Testnet
VERIFIER_URL="${VERIFIER_URL:-https://somniascan.io/api}"

# Private key - DEVE ser definida como variável de ambiente
if [ -z "$PRIVATE_KEY" ]; then
    echo "❌ Erro: PRIVATE_KEY não está definida como variável de ambiente!"
    echo "💡 Crie um arquivo .env baseado no .env.example e defina sua chave privada"
    echo "💡 Ou execute: export PRIVATE_KEY=sua_chave_privada"
    exit 1
fi

echo "🚀 Deploying Somnifans contracts to Somnia Testnet..."
echo "RPC URL: $RPC_URL"
echo "Chain ID: $CHAIN_ID"
echo "Deploying: HypeToken, Oracle, Somnifans"
echo ""

# Limpar cache e recompilar
echo "🧹 Cleaning and rebuilding contracts..."
forge clean
forge build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix compilation errors."
    exit 1
fi

echo "✅ Build successful!"
echo ""

# Deploy usando forge script com configurações corretas
echo "📡 Starting deployment..."
forge script script/Deploy.s.sol:DeployScript \
    --rpc-url "$RPC_URL" \
    --private-key $PRIVATE_KEY \
    --broadcast \
    --chain-id $CHAIN_ID \
    --gas-estimate-multiplier 120 \
    --skip-simulation \
    -vvvv

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Deploy completed successfully!"
    echo "📋 Contract addresses are shown above."
    echo "🔍 Verify transactions on Somnia Explorer: https://somniascan.io"
else
    echo ""
    echo "❌ Deploy failed. Check the error messages above."
    echo "💡 Try running individual contract deployments for debugging."
    exit 1
fi
echo ""
echo "✅ Deploy completed!"
echo "📋 Check the output above for contract addresses and transaction hashes."
echo "🔍 You can verify the transactions on Somnia Explorer: https://somniascan.io"