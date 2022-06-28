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
    SpaceBags, SpaceBags__factory
} from "../typechain";


const RECEIVER_MAGIC_VALUE = "0x150b7a02";
const GAS_MAGIC_VALUE = 20000;


let antimatter__factory: Antimatter__factory;
let antimatter: Antimatter;
let spaceBags__factory: SpaceBags__factory;
let spaceBags: SpaceBags;

const createTestSuite = ({ contract, constructorArgs }: { contract: string, constructorArgs: Array<number|string> }) =>
    function () {
        before(async () => {
            antimatter__factory = await ethers.getContractFactory("Antimatter") as Antimatter__factory;
            spaceBags__factory = await ethers.getContractFactory(contract) as SpaceBags__factory;
        });
        context(`${contract}`, function () {

            beforeEach(async function () {
                antimatter = await upgrades.deployProxy(antimatter__factory, ["Antimatter", "ANT"]) as Antimatter;
                await antimatter.deployed();
                spaceBags = await upgrades.deployProxy(spaceBags__factory, constructorArgs) as SpaceBags;
                await spaceBags.deployed();

                this.receiver = await deployContract("ERC721ReceiverMock", [RECEIVER_MAGIC_VALUE]);
                const [owner, addr1, addr2, signer] = await ethers.getSigners();
                this.owner = owner;
                this.addr1 = addr1;
                this.addr2 = addr2;
                this.signer = signer;

                await antimatter.grantRole(await antimatter.TRANSFERER_ROLE(), spaceBags.address);
                await antimatter.grantRole(await antimatter.TRANSFERER_ROLE(), ZERO_ADDRESS);
                await antimatter.sudoMint(this.addr2.address, parseEther("10000"));
                await spaceBags.sudoUpdateToken(antimatter.address);
            });

            context("pack", async function() {
                it("pack 5000 to NFT class #1", async function() {
                    await antimatter.connect(this.addr2).approve(spaceBags.address, parseEther("5000"));
                    await spaceBags.connect(this.addr2).pack(parseEther("5000"));
                    let owner2 = await spaceBags.ownerOf(1)
                    expect(owner2).to.be.equal(this.addr2.address);
                    expect(await spaceBags.bagsAmount(1)).to.be.equal(parseEther("5000"));
                });
                it("pack 5555", async function() {
                    await antimatter.connect(this.addr2).approve(spaceBags.address, parseEther("5555"));
                    await expect(spaceBags.connect(this.addr2).pack(parseEther("5555"))).to.be.revertedWith("ERR_WRONG_AMOUNT");
                });
            });
            context("unpack", async function() {
                it("unpack 5000 to NFT class #1", async function() {
                    await antimatter.connect(this.addr2).approve(spaceBags.address, parseEther("5000"));
                    await spaceBags.connect(this.addr2).pack(parseEther("5000"));
                    let balance1 = await antimatter.balanceOf(this.addr2.address);
                    let owner1 = await spaceBags.ownerOf(1);
                    await spaceBags.connect(this.addr2).unpack(1);
                    let balance2 = await antimatter.balanceOf(this.addr2.address);
                    expect(balance1).to.be.equal(parseEther("5000"));
                    expect(balance2).to.be.equal(parseEther("10000"));
                    await expect(spaceBags.ownerOf(1)).to.be.revertedWith("OwnerQueryForNonexistentToken()");
                    await expect(spaceBags.connect(this.addr2).unpack(1)).to.be.revertedWith("OwnerQueryForNonexistentToken()");
                });
            });
        });
    };

describe("SpaceBags", createTestSuite({ contract: "SpaceBags", constructorArgs: ["SpaceBags", "ANTBags"] }));


