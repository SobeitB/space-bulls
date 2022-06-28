/**
 * @type import('hardhat/config').HardhatUserConfig
 */
import * as fs from 'fs';

import * as BN from 'bn.js';
import _ from 'lodash';
// @ts-ignore
import * as Confirm from 'prompt-confirm';
import { types, task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "@openzeppelin/hardhat-upgrades";
import "@typechain/hardhat";
// import "@tenderly/hardhat-tenderly";
import "hardhat-tracer";
import "hardhat-dependency-compiler";
import "hardhat-deploy";

if (process.env.REPORT_GAS) {
    require('hardhat-gas-reporter');
}

if (process.env.REPORT_COVERAGE) {
    require('solidity-coverage');
}

require('dotenv').config();

let { 
    ETHERSCAN_TOKEN,
    PRIVATE_KEY,
} = process.env;

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

task("nft:airdrop", "Airdrop NFTs")
    .addParam("address", "NFT721 Contract address", "", types.string)
    .addParam("file", "File with drop targets", "", types.inputFile)
    .addParam("resume", "Resume file", "", types.string)
    .addParam("amount", "amount to send for each recipient", 1, types.int)
    .addOptionalParam("chunk", "Max trasnfers per tx", 100, types.int)
    .addFlag('retry', 'Force retry')
    .addParam("id", "token id", -1, types.string)
    .setAction(async (args, hre) => {
        if(!PRIVATE_KEY) {
            console.error('PRIVATE_KEY_SENDER=0x.p.r.i.v.a.t.e.k.e.y npx hardhat run scripts/airdrop.ts ...')
            return 2;
        }
        class State {
            filename: string
            retry: string[] = [];
            completed: string[] = [];
            error: string[] = [];

            constructor(filename: string, retry: boolean) {
                this.filename = filename
                if(fs.existsSync(filename)) {
                    let state = JSON.parse(fs.readFileSync(filename).toString())
                    this.completed = state.completed
                    this.retry = state.retry
                    if(retry) {
                        this.retry = _(state.retry).concat(state.error).uniq().value()
                    } else {
                        this.error = state.error
                    }
                }
            }

            private save() {
                let state = {
                    error: this.error,
                    completed: this.completed,
                    retry: this.retry
                }
                fs.writeFileSync(this.filename, Buffer.from(JSON.stringify(state)))
            }

            public markError(addresses: string[]) {
                this.error = _(this.error).concat(
                    this.retry.filter(item=>addresses.includes(item))
                ).uniq().value()
                this.retry = _(
                    this.retry.filter(item=>!addresses.includes(item))
                ).concat(
                    addresses.filter(item=>!this.error.includes(item))
                ).uniq().value()
                this.save()
            }

            public markCompleted(addresses: string[]) {
                this.retry = this.retry.filter(item=>!addresses.includes(item))
                this.completed = _(this.completed).concat(addresses).uniq().value()
                this.save()
            }
        }
        let ethers = hre.ethers

        let state = new State(args.resume, args.retry)

        let targets = fs.readFileSync(args.file)
            .toString().split("\n")
        targets = _(targets).uniq()
            .filter(el=>!!el && !(state.completed.includes(el) || state.error.includes(el)))
            .value()

        // let provider = ethers.getDefaultProvider();
        let provider = new ethers.providers.AlchemyProvider(hre.network.name, 'qrWAbEiirqd7Kor5sskykV24j0tTMrAl');

        let alice = new ethers.Wallet(PRIVATE_KEY, provider)
        const NFTFactory = await ethers.getContractFactory("Artisant");
        const nft = NFTFactory.attach(args.address).connect(alice);
        console.log(nft);
        let fn = nft['safeBatchTransferFrom']
        let gasAmount = targets.length*32000 + 42000 * (targets.length/parseInt(args.chunk))
        console.info(
            `Info:\n` +
            `Skip from resume: ${state.completed.length + state.error.length}\n` +
            `Estimations transactions: ${(targets.length/parseInt(args.chunk)).toFixed()}\n` +
            `Estimations gas: ${gasAmount} (${(gasAmount * (1e-9) * 5).toFixed()} BNB)`
        )
        if(targets.length==0) {
            console.info('No targets to send')
            return
        }
        let prompt = new Confirm(`Do you want to start airdropping of ${args.address}:${args.id} to ${targets.length} destinations?`); 
        let result = await prompt.run()
        if(!result) {
            console.error("sorry, not today")
            return
        }
        console.log(`Sending amount ${parseInt(args.amount) * targets.length} (${args.amount} per target)` + 
            ` token ${args.address}:${args.id} to ${targets.length} addresses` + 
            ` from ${alice.address}`)
        
        if(args.chunk == 1) {
            for(const a of targets) {
                try {
                    let tx = await fn(
                        alice.address,
                        a,
                        [args.id],
                        [args.amount],
                        "0x",
                        {gasPrice: 0x736fe094f}
                    )
                    await tx.wait()
                    state.markCompleted([a])
                } catch(err) {
                    console.error(err)
                    state.markError([a])
                }
            }
        } else {

            // for(const chunk of _(targets).chunk(100).value()) {
            //     try {
            //         let tx = await fn(
            //             alice.address,
            //             chunk,
            //             new Array(chunk.length).fill(args.id),
            //             new Array(chunk.length).fill(args.amount),
            //             ""
            //         )
            //         await tx.wait()
            //         state.markCompleted(chunk)
            //     } catch(err) {
            //         console.error(err)
            //         state.markError(chunk)
            //     }
            // }
        }
        console.log(`Succesfully sent ${state.completed.length}` +
                    `, need retry: ${state.retry.length}` +
                    `, error: ${state.error.length}`);
    })



task("accounts", "Prints the list of accounts", async (args, { ethers }) => {
    const accounts = await ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
let networks;

if(PRIVATE_KEY) {
    let accounts = [
        PRIVATE_KEY,
    ]
    networks = {
        hardhat: {},
        matic: {
            url: "https://polygon-mainnet.g.alchemy.com/v2/qrWAbEiirqd7Kor5sskykV24j0tTMrAl",
            gasPrice: 0x736fe094f,
            chainId: 137,
            accounts
        },
        rinkeby: {
            url: "https://eth-rinkeby.alchemyapi.io/v2/v92DVe9FFvr2lzRB4wjtk-z4DdsQjBhs",
            gasPrice: 'auto',
            chainId: 4,
            accounts
        },
    };
} else {
    networks = {
        hardhat: {},
    };
}
module.exports = {
    solidity: {
        version: "0.8.15",
        settings: {
            optimizer: {
                enabled: true,
                runs: 1337
            }
        }
    },
    defaultNetwork: "hardhat",
    networks: networks,
    etherscan: {
        apiKey: ETHERSCAN_TOKEN,
        customChains: [
            {
                network: "rinkeby",
                chainId: 4,
                urls: {
                    apiURL: "https://api-rinkeby.etherscan.io/api",
                    browserURL: "https://rinkeby.etherscan.io"
                }
            }
        ]
    },
    dependencyCompiler: {
    },
    namedAccounts: {
        deployer: 0,
        admin1: 1,    // '0x51d9255fBb24238d8E8a841Dcb47ea67c95C98ca',
    },
    abiExporter: {
        path: './artifacts/abi',
        clear: true,
        flat: true,
        only: [':PolyBulls', ':Antimatter', ':SpaceStaking', ':SpaceMarket'],
        spacing: 2
    },
    gasReporter: {
        currency: 'USD',
        coinmarketcap: '46d51164-a690-4982-9c92-996297cc484b',
        gasPrice: 25,
        showTimeSpent: true,
    },
    plugins: ['solidity-coverage'],
    typechain: {
        outDir: './typechain',
        target: 'ethers-v5',
        alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
        externalArtifacts: ['externalArtifacts/*.json'], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
    },
};


