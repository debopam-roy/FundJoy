const { network } = require('hardhat');
const { verify } = require('../utils/verify');

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const dummyJoy = await deploy('FundJoy', {
        from: deployer,
        args: [],
        log: true,
        waitConfirmation: network.config.blockConfirmation || 6,
    });

    if (network.config.chainId == 11155111 && process.env.ETHERSCAN_API_KEY) {
        await verify(dummyJoy.address, []);
    }
};
module.exports.tags = ['FundJoy'];
