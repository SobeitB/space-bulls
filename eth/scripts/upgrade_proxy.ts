import { exit } from 'process';
import { ethers, upgrades } from "hardhat";

const NETWORK = process.env.HARDHAT_NETWORK;

async function main() {
    let PROXY_ADDRESS;

    if(NETWORK == "rinkeby") {
        PROXY_ADDRESS = "0x472528EB8F9669c81bf9Eb0005B1569f63b02c63";
    } else {
        console.error(`${NETWORK} not deployed yet`);
        exit(1);
    }

    const ArtisantFactory = await ethers.getContractFactory("Artisant");
    const artisant = await upgrades.upgradeProxy(PROXY_ADDRESS, ArtisantFactory);
    await artisant.deployed();
    console.log("Artisant has been upgraded to:", artisant.address);
}

main();
