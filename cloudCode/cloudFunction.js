Moralis.Cloud.define("Hello", async (request) => {
   const Items = Moralis.Object.extend("Rewards");
   const query = new Moralis.Query(Items);
   const objAll = await query.find();
   return objAll;
});

Moralis.Cloud.define("getSignedTokenIdsDebug", async (request) => {
    const nonce = Math.floor(new Date().getTime()/1000);
    const web3 = await Moralis.ethersByChain("0x89");
    const trustedSigner = new web3.ethers.Wallet("13b72212fe1a76853e75b68c2f52ac527731f1738b047bf295f03b1802f359cc");
    const msg = web3.ethers.utils.solidityPack(
        ['string', 'uint256', 'uint256[]'],
        [request.params.address.toUpperCase(), nonce, request.params.token_ids]
    );
    const signature = await trustedSigner.signMessage(web3.ethers.utils.arrayify(msg));
    return {
        signer: trustedSigner.address,
        signedTokenIds: request.params.token_ids,
        nonce,
        signature,
    };
});

Moralis.Cloud.define("getSignedTokenIds", async (request) => {
    const options = { 
        chain: "mainnet",
        address: request.params.address,
        token_address: "0x07a8ba3f4fd4db7f3381c07ee5a309c1aace9c59",
    };
    const nonce = Math.floor(new Date().getTime()/1000);
    const nfts = await Moralis.Web3API.account.getNFTsForContract(options);
    const signedTokenIds = nfts.result.map(el => parseInt(el.token_id));
    const web3 = await Moralis.ethersByChain("0x89");
    //const trustedSigner = new web3.ethers.Wallet("debfff33f712964133a8eb366e9c0b980ed08b8357c33735b23ceb1af7928cfd");
    //0x31337098F6c4E398e19d49659835F3b7b375d60f
    const trustedSigner = new web3.ethers.Wallet("13b72212fe1a76853e75b68c2f52ac527731f1738b047bf295f03b1802f359cc");
    const msg = web3.ethers.utils.solidityPack(
        ['string', 'uint256', 'uint256[]'],
        [request.params.address.toUpperCase(), nonce, signedTokenIds]
    );
    const signature = await trustedSigner.signMessage(web3.ethers.utils.arrayify(msg));
    return {
        signer: trustedSigner.address,
        signedTokenIds,
        nonce,
        signature,
    };
});