import { run, ethers, upgrades } from "hardhat";
import fs from 'fs';


const DEPLOYMENT_FILE = 'deployment-addresses.json';

function updateDeployment(key: string, value: object) {
    let buf;
    try {
        buf = JSON.parse(fs.readFileSync(DEPLOYMENT_FILE).toString());
    } catch (e) {
        buf = {};
    }

    buf[key] = value;
    fs.writeFileSync(DEPLOYMENT_FILE, JSON.stringify(buf));
}

async function deploy(contract: string, contract_args: string[]) {
    const factory = await ethers.getContractFactory(contract);
    const nft = await upgrades.deployProxy(
        factory,
        contract_args,
        { initializer: 'initialize' }
    );
    await nft.deployed();
    const addresses = {
        proxy: nft.address,
        admin: await upgrades.erc1967.getAdminAddress(nft.address), 
        implementation: await upgrades.erc1967.getImplementationAddress(nft.address)
    };

    try { 
        await run('verify', { address: addresses.implementation });
    } catch (e) {
    }

    updateDeployment(contract, addresses);
    console.log(`${contract} has been deployed to:`, nft.address);
}

async function main() {
    await deploy("PolyBulls", ["PolyBulls", "BULLS"]);
    await deploy("Antimatter", ["Antimatter", "ANT"]);
    await deploy("SpaceStaking", []);
    await deploy("SpaceMarket", []);
    await deploy("SpaceBags", ["Antimatter SpaceBags", "ANTBAGS"]);
}

main();
