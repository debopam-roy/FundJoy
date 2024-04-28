const { ethers } = require("hardhat");
const { assert } = require("chai");

describe("FundJoy", () => {
  let FundJoyFactory, fundJoyStorage;

  beforeEach(async function () {
    FundJoyFactory = await ethers.getContractFactory("FundJoy");
    fundJoyStorage = await FundJoyFactory.deploy();
  });
  ``;

  it("Should start with a favourite number of 0", async function () {
    const expectedValue = await fundJoyStorage.totalFund();
    assert.equal(expectedValue.toString(), "0");
  });
});
