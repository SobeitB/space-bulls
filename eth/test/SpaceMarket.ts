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
    SpaceMarket, SpaceMarket__factory
} from "../typechain";

const Web3 = require("web3");
const web3 = new Web3(network.provider);

const RECEIVER_MAGIC_VALUE = "0x150b7a02";
const GAS_MAGIC_VALUE = 20000;


let antimatter__factory: Antimatter__factory;
let antimatter: Antimatter;
let polyBulls__factory: PolyBulls__factory;
let polyBulls: PolyBulls;
let spaceMarket__factory: SpaceMarket__factory;
let spaceMarket: SpaceMarket;

const createTestSuite = ({ contract, constructorArgs }: { contract: string, constructorArgs: Array<number|string> }) =>
    function () {
        before(async () => {
            polyBulls__factory = await ethers.getContractFactory("PolyBulls") as PolyBulls__factory;
            antimatter__factory = await ethers.getContractFactory("Antimatter") as Antimatter__factory;
            spaceMarket__factory = await ethers.getContractFactory(contract) as SpaceMarket__factory;
        });
        context(`${contract}`, function () {

            beforeEach(async function () {
                polyBulls = await upgrades.deployProxy(polyBulls__factory, ["PolyBulls", "Poly"]) as PolyBulls;
                await polyBulls.deployed();
                antimatter = await upgrades.deployProxy(antimatter__factory, ["Antimatter", "ANT"]) as Antimatter;
                await antimatter.deployed();
                spaceMarket = await upgrades.deployProxy(spaceMarket__factory, constructorArgs) as SpaceMarket;
                await spaceMarket.deployed();

                this.receiver = await deployContract("ERC721ReceiverMock", [RECEIVER_MAGIC_VALUE]);
                const [owner, addr1, addr2, signer] = await ethers.getSigners();
                this.owner = owner;
                this.addr1 = addr1;
                this.addr2 = addr2;
                this.signer = signer;

                await antimatter.grantRole(await antimatter.TRANSFERER_ROLE(), spaceMarket.address);
                await antimatter.grantRole(await antimatter.TRANSFERER_ROLE(), ZERO_ADDRESS);
                await antimatter.sudoMint(this.addr2.address, parseEther("10000"));
                await polyBulls.sudoMint(this.addr1.address, 10);
                await spaceMarket.sudoUpdateToken(antimatter.address);
                await polyBulls.connect(this.addr1).setApprovalForAll(spaceMarket.address, true);
            });

            context("create", async function() {
                it("create nft sale", async function() {
                    await polyBulls.connect(this.addr1).approve(spaceMarket.address, 1);
                    let owner1 = await polyBulls.ownerOf(1);
                    await spaceMarket.connect(this.addr1).create(polyBulls.address, 1, this.addr1.address, parseEther("500"));
                    let owner2 = await polyBulls.ownerOf(1);
                    expect(owner1).to.be.equal(owner2);
                });
            });

            context("cancel", async function() {
                it("cancel nft sale", async function() {
                    await polyBulls.connect(this.addr1).approve(spaceMarket.address, 1);
                    let owner1 = await polyBulls.ownerOf(1);
                    let tx = await spaceMarket.connect(this.addr1).create(polyBulls.address, 1, this.addr1.address, parseEther("500"));
                    let itemId = 1;
                    let itemInfo1 = await spaceMarket.itemsInfo(itemId);
                    let owner2 = await polyBulls.ownerOf(1);
                    await spaceMarket.connect(this.addr1).cancel(polyBulls.address, 1);
                    let owner3 = await polyBulls.ownerOf(1);
                    let itemInfo2 = await spaceMarket.itemsInfo(itemId);
                    expect(itemInfo1).to.not.equal(itemInfo2);
                    expect(owner1).to.be.equal(owner2);
                    expect(owner1).to.be.equal(owner3);

                    await expect(
                        spaceMarket.connect(this.addr1)
                        .cancel(polyBulls.address, 1)
                    ).to.be.revertedWith("ERR_NOT_FOUND");

                    await expect(
                        spaceMarket.connect(this.addr2)
                        .execute(polyBulls.address, 1)
                    ).to.be.revertedWith("ERR_NOT_FOUND");
                });
            });

            context("execute", async function() {
                it("buy", async function() {
                    await polyBulls.connect(this.addr1).approve(spaceMarket.address, 1);
                    let owner1 = await polyBulls.ownerOf(1);
                    await spaceMarket.connect(this.addr1)
                        .create(polyBulls.address, 1, this.addr1.address, parseEther("500"));
                    let itemId = 1;
                    let itemInfo1 = await spaceMarket.itemsInfo(itemId);
                    let owner2 = await polyBulls.ownerOf(1);

                    await antimatter.connect(this.addr2)
                        .increaseAllowance(spaceMarket.address, parseEther("20000"));

                    await spaceMarket.connect(this.addr2)
                        .execute(polyBulls.address, 1);

                    let owner3 = await polyBulls.ownerOf(1);
                    let itemInfo2 = await spaceMarket.itemsInfo(itemId);
                    expect(itemInfo1).to.not.equal(itemInfo2);
                    expect(owner1).to.be.equal(this.addr1.address);
                    expect(owner2).to.be.equal(this.addr1.address);
                    expect(owner3).to.be.equal(this.addr2.address);

                    await expect(
                        spaceMarket.connect(this.addr1)
                        .cancel(polyBulls.address, 1)
                    ).to.be.revertedWith("ERR_APPROVE");
                    await expect(
                        spaceMarket.connect(this.addr1)
                        .create(polyBulls.address, 1, this.addr1.address, parseEther("500"))
                    ).to.be.revertedWith("ERR_APPROVE");

                    await polyBulls.connect(this.addr2).approve(spaceMarket.address, 1);
                    await spaceMarket.connect(this.addr2)
                        .create(polyBulls.address, 1, this.addr2.address, parseEther("500"));
                });
            });
        });
    };

describe("SpaceMarket", createTestSuite({ contract: "SpaceMarket", constructorArgs: [] }));


