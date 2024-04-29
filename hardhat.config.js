require('@nomicfoundation/hardhat-toolbox');
require('hardhat-deploy');
require('hardhat-gas-reporter');
require('dotenv').config();
require('@nomicfoundation/hardhat-verify');

module.exports = {
    defaultNetwork: 'hardhat',
    networks: {
        localhost: {
            url: process.env.HARDHAT_RPC_URL || 'http://127.0.0.1:8545/',
            chainId: 31337,
        },
        sepiola: {
            url:
                process.env.SEPIOLA_RPC_URL ||
                'https://eth-sepolia.g.alchemy.com/v2/hGwG29nyhBngb5QbD_4SP3CAvNFjE5n3',
            chainId: 11155111,
            accounts: [
                process.env.PRIVATE_KEY ||
                    '3153b8ba7005381bbb3c87be1ba3e715ec869c68b31e86d758a1435ab92a038a',
            ],
            blockConfirmations: 6,
        },
    },
    etherscan: {
        apiKey:
            process.env.ETHERSCAN_API_KEY ||
            '4TT9RIQJJ4RFTE7U2HVDJ1UINYYN3U3J4X',
    },
    gasReporter: {
        enabled: true,
        currency: 'INR',
        outputFile: 'report/gas_report.txt',
        noColors: true,
        coinmarketcap:
            process.env.COINMARKETCAP_API_KEY ||
            'ca2014a8-5967-459f-ac6e-baa3c8ef417e',
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
    solidity: '0.8.7',
};
