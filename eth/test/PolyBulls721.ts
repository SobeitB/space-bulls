import { ethers, upgrades } from "hardhat";
import { expect } from 'chai';
// @ts-ignore
import { constants } from  "@openzeppelin/test-helpers";
const { ZERO_ADDRESS } = constants;
import "@openzeppelin/hardhat-upgrades";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
const { parseEther, formatEther } = ethers.utils;
const { deployContract, getCurrentTimestamp } = require("./helpers");
import { PolyBulls, PolyBulls__factory } from "../typechain";

const RECEIVER_MAGIC_VALUE = "0x150b7a02";
const GAS_MAGIC_VALUE = 20000;


let polyBulls__factory: PolyBulls__factory;
let polyBulls: PolyBulls;

const createTestSuite = ({ contract, constructorArgs }: { contract: string, constructorArgs: Array<number|string> }) =>
    function () {
        before(async () => {
            polyBulls__factory = await ethers.getContractFactory(contract) as PolyBulls__factory;
        });
        context(`${contract}`, function () {

            beforeEach(async function () {
                polyBulls = await upgrades.deployProxy(polyBulls__factory, constructorArgs) as PolyBulls;
                await polyBulls.deployed();
                this.receiver = await deployContract("ERC721ReceiverMock", [RECEIVER_MAGIC_VALUE]);
                const [owner, addr1, addr2] = await ethers.getSigners();
                this.owner = owner;
                this.addr1 = addr1;
                this.addr2 = addr2;
            });

            context("with no minted tokens", async function () {
                it("has 0 totalSupply", async function () {
                    const supply = await polyBulls.totalSupply();
                    expect(supply).to.equal(0);
                });

                it("has 0 totalMinted", async function () {
                    const totalMinted = await polyBulls.totalMinted();
                    expect(totalMinted).to.equal(0);
                });
            });

            context("ownership", async function() {
                it("default", async function() {
                    expect(await polyBulls.owner()).to.be.equal(this.owner.address);
                });

                it("change", async function() {
                    await polyBulls.transferOwnership(this.addr1.address);
                    await expect(polyBulls.transferOwnership(this.addr1.address)).to.be.reverted;
                    expect(await polyBulls.owner()).to.be.equal(this.addr1.address);
                });
            });

            context("sudoMint", async function () {

                it("in valid range and batch size", async function () {
                    expect(await polyBulls.balanceOf(this.owner.address)).to.equal("0");
                    expect(await polyBulls.totalMinted()).to.equal("0");
                    await polyBulls.sudoMint(this.owner.address, 5);
                    expect(await polyBulls.balanceOf(this.owner.address)).to.equal("5");
                    expect(await polyBulls.totalMinted()).to.equal("5");
                    await polyBulls.sudoMint(this.owner.address, 10);
                    expect(await polyBulls.balanceOf(this.owner.address)).to.equal("15");
                    expect(await polyBulls.totalMinted()).to.equal("15");
                });

                it("from wrong user", async function () {
                    await expect(polyBulls.connect(this.addr1).sudoMint(this.addr1.address, 20)).to.be.revertedWith("Ownable: caller is not the owner");
                    expect(await polyBulls.balanceOf(this.addr1.address)).to.equal("0");
                });

                it("transfer to another user", async function () {
                    await polyBulls.sudoMint(this.owner.address, 5);
                    await polyBulls.setApprovalForAll(this.addr1.address, true);
                    expect(await polyBulls.balanceOf(this.owner.address)).to.equal("5");
                    expect(await polyBulls.ownerOf("2")).to.equal(this.owner.address);
                    this.transferTx = await polyBulls.connect(this.addr1).transferFrom(this.owner.address, this.addr1.address, 2);
                    expect(await polyBulls.balanceOf(this.owner.address)).to.equal("4");
                    expect(await polyBulls.ownerOf("2")).to.equal(this.addr1.address);
                    expect(await polyBulls.balanceOf(this.addr1.address)).to.equal("1");
                });
            });
        });
    };

describe("PolyBulls", createTestSuite({ contract: "PolyBulls", constructorArgs: ["PolyBulls", "POLY"] }));


