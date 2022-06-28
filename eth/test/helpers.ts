/**
 * @type import('hardhat/config').HardhatUserConfig
 */
import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";


export let deployContract = async function (contractName: string, constructorArgs: Array<string|number>) {
  let factory;
  try {
    factory = await ethers.getContractFactory(contractName);
  } catch (e) {
    factory = await ethers.getContractFactory(contractName + 'UpgradeableWithInit');
  }
  let contract = await factory.deploy(...(constructorArgs || []));
  await contract.deployed();
  return contract;
};

export let getCurrentTimestamp = async () => {
    // getting timestamp
    const blockNumBefore = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumBefore);
    return blockBefore.timestamp;
}
