// mainnet
export enum networks{
   ETH_BYTE = '0x1',
   ETH_NAME = 'rinkeby',

   POL_BYTE = '0x89',
   POL_NAME = 'matic'
}

export enum address_bulls{
   THREE_D = '0x07a8ba3F4fd4Db7f3381C07ee5a309c1aacE9C59',
   TWO_D = '0x152f18F676576F78aCC29D88A43F8fcDE996c567',
}

export const address_staking = '0x9e5A06b38F0Bf7742fa4F406124503D03AdDF79E';
export const address_antimatter = '0xF1eF55Ca14A6D2b5C812a386Ea45bf20980CC54C';
export const address_spaceBags = '0x6583d13d0742b337811B41c72421fC68AE2365bf';
export const address_market = '0xE2844Ed5E521CE707fA4FaC15D13BcbD66E05c2f';

export const serv = 'http://localhost:5000/' // https://spacebullsserver.fun/
export const url_auth2 = 'https://discord.com/api/oauth2/authorize?client_id=994047048284373004&redirect_uri=https%3A%2F%2Fapp.thespacebulls.com%2Fstaking&response_type=code&scope=identify%20email%20guilds%20guilds.members.read'
export const serverUrl = 'https://mcyppafmgype.usemoralis.com:2053/server'
export const appId = 'kFxaD7mClqJil1JZWN6sEkYopAFr6B1AVqFcLbu5'

// TESTNET
// export enum networks{
//    ETH_BYTE = '0x4',
//    ETH_NAME = 'eth',
//
//    POL_BYTE = '0x13881',
//    POL_NAME = 'mumbai'
// }
//
// export const url_auth2 = 'https://discord.com/api/oauth2/authorize?client_id=994047048284373004&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fstaking&response_type=code&scope=identify%20email%20guilds%20guilds.members.read'
// export enum address_bulls{
//    THREE_D = '0x07a8ba3F4fd4Db7f3381C07ee5a309c1aacE9C59',
//    TWO_D = '0xfA7A1979f2e330178578ca87fFC1b6CdABd8F1e3',
// }
//
// export const address_staking = '0x515655176B9788385E0c30E479e9455eE7101e6c';
// export const address_antimatter = '0x7fB7C61fc74eA1AD084C1dB4ad839550B81bFA01';
// export const address_spaceBags = '0x58E6495d3F2C3Bc492Bcd58E7B1a06c15531aFF3';
// export const address_market = '0xDd468705dDBC72802a72243F3AeE4D5434236E33';
//
// export const serv = 'http://localhost:5000/'
// export const serverUrl = 'https://nttm33uutcfx.usemoralis.com:2053/server'
// export const appId = 'MvjpxdAgsgvufjo4RXshdO8yQMsr0LjwsZsMjbok'



export function meta_bull2D (id:string) {
   return `https://opensea.mypinata.cloud/ipfs/bafybeibhfvxvbfoh7ikdfkw7nyeldgic2nprjvnoz6ym5kmablbohz7pia/${id}.json`
}

