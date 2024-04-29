const { ethers, getNamedAccounts, deployments } = require('hardhat');
const { assert, expect } = require('chai');

describe('FundJoy Contract', async function () {
    let deployer;
    let fundJoy;
    let sendVal = ethers.utils.parseEther('1');
    beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer;
        await deployments.fixture();
        const FundJoy = await ethers.getContractFactory('FundJoy');
        fundJoy = await FundJoy.deploy();
    });
    describe('Donate', async function () {
        it("Fails if you don't send enough ether", async function () {
            await expect(fundJoy.donateFund('dummy', '')).to.be.revertedWith(
                'Not enough ether sent'
            );
        });

        it('Updates the value on successful ether transaction', async function () {
            await fundJoy.donateFund('dummy', '', { value: sendVal });

            const response = await fundJoy.addressToAmountFunded(deployer);

            assert.equal(response.toString(), sendVal.toString());
        });
    });
});
