require('@nomicfoundation/hardhat-toolbox');
require('hardhat-deploy');
require('hardhat-gas-reporter');
require('dotenv').config();
require('@nomicfoundation/hardhat-verify');

module.exports = {
    defaultNetwork: 'hardhat',
    networks: {
        sepiola: {
            url: process.env.SEPIOLA_RPC_URL,
            chainId: 11155111,
            accounts: [process.env.PRIVATE_KEY],
            blockConfirmations: 6,
        },
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        currency: 'INR',
        outputFile: 'report/gas_report.txt',
        noColors: true,
        coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
    solidity: '0.8.7',
};
