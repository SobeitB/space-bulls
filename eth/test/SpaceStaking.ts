import { expect } from 'chai';
// @ts-ignore
import { constants } from  "@openzeppelin/test-helpers";
const { ZERO_ADDRESS } = constants;
import "@openzeppelin/hardhat-upgrades";
import "@nomiclabs/hardhat-web3";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import { ethers, network, upgrades } from "hardhat";
const { parseEther, formatEther } = ethers.utils;
const { deployContract, getCurrentTimestamp } = require("./helpers");
import { 
    Antimatter, Antimatter__factory,
    PolyBulls, PolyBulls__factory,
    SpaceStaking, SpaceStaking__factory
} from "../typechain";

const Web3 = require("web3");
const web3 = new Web3(network.provider);

const RECEIVER_MAGIC_VALUE = "0x150b7a02";
const GAS_MAGIC_VALUE = 20000;


let antimatter__factory: Antimatter__factory;
let antimatter: Antimatter;
let polyBulls__factory: PolyBulls__factory;
let polyBulls: PolyBulls;
let spaceStaking__factory: SpaceStaking__factory;
let spaceStaking: SpaceStaking;

const createTestSuite = ({ contract, constructorArgs }: { contract: string, constructorArgs: Array<number|string> }) =>
    function () {
        before(async () => {
            polyBulls__factory = await ethers.getContractFactory("PolyBulls") as PolyBulls__factory;
            antimatter__factory = await ethers.getContractFactory("Antimatter") as Antimatter__factory;
            spaceStaking__factory = await ethers.getContractFactory(contract) as SpaceStaking__factory;
        });
        context(`${contract}`, function () {

            beforeEach(async function () {
                polyBulls = await upgrades.deployProxy(polyBulls__factory, ["PolyBulls", "Poly"]) as PolyBulls;
                await polyBulls.deployed();
                antimatter = await upgrades.deployProxy(antimatter__factory, ["Antimatter", "ANT"]) as Antimatter;
                await antimatter.deployed();
                spaceStaking = await upgrades.deployProxy(spaceStaking__factory, constructorArgs) as SpaceStaking;
                await spaceStaking.deployed();

                this.receiver = await deployContract("ERC721ReceiverMock", [RECEIVER_MAGIC_VALUE]);
                const [owner, addr1, addr2, signer] = await ethers.getSigners();
                this.owner = owner;
                this.addr1 = addr1;
                this.addr2 = addr2;
                this.signer = signer;

                await antimatter.grantRole(await antimatter.TRANSFERER_ROLE(), spaceStaking.address);
                await antimatter.sudoMint(spaceStaking.address, parseEther("20000000"));
                await polyBulls.sudoMint(this.addr1.address, 10);
                await spaceStaking.sudoUpdateToken(antimatter.address);
                await spaceStaking.sudoUpdateNFT(polyBulls.address);
                await spaceStaking.sudoUpdateSigner(signer.address);
                await polyBulls.connect(this.addr1).setApprovalForAll(spaceStaking.address, true);
            });

            context("stake", async function() {
                it("stake exists tokens", async function() {
                    await spaceStaking.connect(this.addr1).stake([1,2,3,4,5,6,7,8,9,10]);
                });
                it("stake additional tokens", async function() {
                    await spaceStaking.connect(this.addr1).stake([1,2,3,4,5]);
                    let claimable1 = await spaceStaking.claimable(this.addr1.address, [1,2,3,4,5]);
                    let time1 = await spaceStaking.stakedEffectiveTime(this.addr1.address);
                    await network.provider.send("hardhat_mine", ["0xa", '0x15180']);
                    let claimable2 = await spaceStaking.claimable(this.addr1.address, [1,2,3,4,5]);
                    let time2 = await spaceStaking.stakedEffectiveTime(this.addr1.address);
                    await spaceStaking.connect(this.addr1).stake([6,7,8,9,10]);
                    let claimable3 = await spaceStaking.claimable(this.addr1.address, [1,2,3,4,5,6,7,8,9,10]);
                    let time3 = await spaceStaking.stakedEffectiveTime(this.addr1.address);
                    await network.provider.send("hardhat_mine", ["0xa", '0x15180']);
                    let claimable4 = await spaceStaking.claimable(this.addr1.address, [1,2,3,4,5,6,7,8,9,10]);
                    let time4 = await spaceStaking.stakedEffectiveTime(this.addr1.address);
                    let claimable5 = await spaceStaking.claimable(this.addr1.address, []);
                    expect(formatEther(claimable1.amount)).to.be.match(/^0\./);
                    expect(formatEther(claimable2.amount)).to.be.match(/^4500\./);
                    expect(formatEther(claimable3.amount)).to.be.match(/^4500\./);
                    expect(formatEther(claimable4.amount)).to.be.match(/^13500\./);
                    expect(formatEther(claimable5.amount)).to.be.match(/^6750\./);
                });
                it("stake not exists tokens", async function() {
                    await expect(spaceStaking.connect(this.addr1).stake([1,2,3,4,5,6,7,8,9,10,11])).to.be.revertedWith("OwnerQueryForNonexistentToken()");
                });
                it("stake duplicate tokens", async function() {
                    await expect(spaceStaking.connect(this.addr1).stake([1,2,3,4,5,6,7,8,9,10,10])).to.be.revertedWith("TransferFromIncorrectOwner()");
                });
            });

            context("claim", async function() {
                it("claim tokens", async function() {
                    await spaceStaking.connect(this.addr1).stake([1,2,3,4,5,6,7,8,9,10]);
                    await network.provider.send("hardhat_mine", ["0xa", '0x15180']);
                    let encoded = web3.utils.encodePacked(
                        {value: this.addr1.address.toUpperCase(), type: "string"},
                        {value: 1, type: "uint256"},
                        {value: [1,2,3,4,5,6,7,8,9,10], type: "uint256[]"}
                    );
                    let message = Buffer.from(encoded.toString().slice(2), 'hex');
                    let signature = this.signer.signMessage(message);
                    let balance1 = await antimatter.balanceOf(this.addr1.address);
                    let time1 = await spaceStaking.stakedEffectiveTime(this.addr1.address);
                    await spaceStaking.connect(this.addr1).claim(
                        [1,2,3,4,5,6,7,8,9,10],
                        1,
                        signature
                    );
                    let time2 = await spaceStaking.stakedEffectiveTime(this.addr1.address);
                    let balance2 = await antimatter.balanceOf(this.addr1.address);
                    expect(formatEther(balance1)).to.be.match(/^0\./);
                    expect(formatEther(balance2)).to.be.match(/^9000\./);
                });
            });

            context("unstake", async function() {
                it("unstake non exists tokens", async function() {
                    await spaceStaking.connect(this.addr1).stake([1,2,3,4,5,6,7,8,9,10]);
                    let encoded = web3.utils.encodePacked(
                        {value: this.addr1.address.toUpperCase(), type: "string"},
                        {value: 1, type: "uint256"},
                        {value: [1,2,3,4,5,6,7,8,9,10,11], type: "uint256[]"}
                    );
                    let message = Buffer.from(encoded.toString().slice(2), 'hex');
                    let signature = this.signer.signMessage(message);
                    await expect(spaceStaking.connect(this.addr1).unstake(
                        [1,2,3,4,5,6,7,8,9,10,11],
                        [1,2,3,4,5,6,7,8,9,10,11],
                        1,
                        signature
                    )).to.be.revertedWith("ERR_TOO_MUCH");
                });

                it("unstake exists tokens", async function() {
                    await spaceStaking.connect(this.addr1).stake([1,2,3,4,5,6,7,8,9,10]);
                    let encoded = web3.utils.encodePacked(
                        {value: this.addr1.address.toUpperCase(), type: "string"},
                        {value: 1, type: "uint256"},
                        {value: [1,2,3,4,5,6,7,8,9,10], type: "uint256[]"}
                    );
                    let message = Buffer.from(encoded.toString().slice(2), 'hex');
                    let claimable = await spaceStaking.connect(this.addr1).claimable(
                        this.addr1.address,
                        [1,2,3,4,5,6,7,8,9,10],
                    );
                    let signature = this.signer.signMessage(message);
                    await spaceStaking.connect(this.addr1).unstake(
                        [1,2,3,4,5,6,7,8,9,10],
                        [1,2,3,4,5,6,7,8,9,10],
                        1,
                        signature
                    );
                });
            });
        });
    };

describe("SpaceStaking", createTestSuite({ contract: "SpaceStaking", constructorArgs: [] }));


