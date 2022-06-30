export enum networks{
   ETH_BYTE = '0x1', // 0x4
   ETH_NAME = 'eth', // rinkeby

   POL_BYTE = '0x89', // 0x13881
   POL_NAME = 'matic' // mumbai
}

export enum address_bulls{
   THREE_D = '0x07a8ba3F4fd4Db7f3381C07ee5a309c1aacE9C59', // 0x07a8ba3F4fd4Db7f3381C07ee5a309c1aacE9C59
   TWO_D = '0x152f18F676576F78aCC29D88A43F8fcDE996c567', // 0xfa7a1979f2e330178578ca87ffc1b6cdabd8f1e3
}

export const address_staking = '0x515655176B9788385E0c30E479e9455eE7101e6c';
export const address_antimatter = '0x7fB7C61fc74eA1AD084C1dB4ad839550B81bFA01';
export const address_spaceBags = '0x3A135607B53924ACEC2E9e0b00fEa5e695d208CB';
export const address_market = '0xdd468705ddbc72802a72243f3aee4d5434236e33';

export function meta_bull2D (id:string) {
   return `https://opensea.mypinata.cloud/ipfs/bafybeibhfvxvbfoh7ikdfkw7nyeldgic2nprjvnoz6ym5kmablbohz7pia/${id}.json`
}

