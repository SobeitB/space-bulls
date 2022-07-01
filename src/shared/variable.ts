export enum networks{
   ETH_BYTE = '0x4', // 0x1
   ETH_NAME = 'eth', // eth

   POL_BYTE = '0x13881', // 0x89
   POL_NAME = 'mumbai' // matic
}

export enum address_bulls{
   THREE_D = '0x07a8ba3F4fd4Db7f3381C07ee5a309c1aacE9C59', // 0x07a8ba3F4fd4Db7f3381C07ee5a309c1aacE9C59
   TWO_D = '0xfA7A1979f2e330178578ca87fFC1b6CdABd8F1e3', // 0x152f18F676576F78aCC29D88A43F8fcDE996c567
}

export const address_staking = '0x515655176B9788385E0c30E479e9455eE7101e6c'; // 0x9e5A06b38F0Bf7742fa4F406124503D03AdDF79E
export const address_antimatter = '0x7fB7C61fc74eA1AD084C1dB4ad839550B81bFA01'; // 0xF1eF55Ca14A6D2b5C812a386Ea45bf20980CC54C
export const address_spaceBags = '0x3A135607B53924ACEC2E9e0b00fEa5e695d208CB'; // 0x6583d13d0742b337811B41c72421fC68AE2365bf
export const address_market = '0xdd468705ddbc72802a72243f3aee4d5434236e33'; // 0xE2844Ed5E521CE707fA4FaC15D13BcbD66E05c2f

export function meta_bull2D (id:string) {
   return `https://opensea.mypinata.cloud/ipfs/bafybeibhfvxvbfoh7ikdfkw7nyeldgic2nprjvnoz6ym5kmablbohz7pia/${id}.json`
}

