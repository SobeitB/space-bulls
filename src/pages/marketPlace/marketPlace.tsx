import {
   Item,
   Img,
   Network,
   BodyText,
   Claim,
   OpenseaLink,
} from '../../components/shared/UI/items.styled'
import {
   StakingNft,
} from "../stakaing/Staking.styled";

import Pagination from '../../components/screens/Pagination/Pagination'
import {useNotification} from 'web3uikit';
import { notifyType} from 'web3uikit/dist/components/Notification/types';
import { TIconType } from 'web3uikit/dist/components/Icon/collection';
import { useCallback, useEffect, useState } from 'react';
import { useMoralis, useWeb3ExecuteFunction, useMoralisQuery } from 'react-moralis';
import {address_market, address_antimatter, address_staking} from '../../shared/variable'
import abi_market from '../../shared/abi/SpaceMarket.json'
import abi_antimatter from '../../shared/abi/Antimatter.json'
import {networks} from '../../shared/variable'
import Countdown from 'react-countdown';

export interface valueTimer {
   days: number;
   hours:number;
   minutes:number;
   seconds:number;
}

const MarketPlace = () => {
   const {chainId, Moralis, account} = useMoralis();
   const {fetch} = useWeb3ExecuteFunction();
   const [pages, setPages] = useState(1)
   const [allPages, setAllPages] = useState(1)
   const [items, setItems] = useState<any[]>([])
   const dispatchNotification = useNotification();
   const { data } = useMoralisQuery("raffle")

   useEffect(() => {
      async function getSlotsNft() {
         const optionsViewAllPages = {
            contractAddress:address_market,
            functionName: "totalActive",
            abi: abi_market,
         }

         await fetch({
            params: optionsViewAllPages,
            onSuccess: (res:any) => {
               setAllPages(Number(res))
            },
            onError: (err:any) => {
               console.log(err)
            }
         })

         const optionsView = {
            contractAddress:address_market,
            functionName: "retrieve",
            abi: abi_market,
            params: {
               offset:pages,
               limit:10,
            }
         }
   
         await fetch({
            params: optionsView,
            onSuccess: async (res:any) => {
               const MarketPlace = Moralis.Object.extend("MarketPlace");
               const query = new Moralis.Query(MarketPlace);
               const objAll = await query.find();

               res.items.forEach((itemOffer:any) => {
                  objAll.forEach((item:any) => {
                     if(Number(item?.attributes.token_id) === Number(itemOffer.nftTokenId)) {
                        setItems((prev:any) => {
                           return [
                              ...prev,
                              {
                                 ...itemOffer,
                                 img:item?.attributes.img_url,
                                 name:item?.attributes.collection_name
                              }
                           ]
                        })    
                     }
                  })
               })
            },
            
            onError: (err:Error) => {
               console.log(err.message)
            }
         })
      }

      getSlotsNft()
   }, [])

   const handleNewNotification = (
      type: notifyType,
      icon?: TIconType,
   ) => {
      dispatchNotification({
         type,
         message: type === "error" ? 'An error has occurred!' : 'You have successfully made a purchase!',
         title: type,
         icon,
         position: 'topR',
      });
   };

   const buyOffer = useCallback((id:number, price:string, addressContract:string, type:string, network:string) => async () => {
      if(type === 'matter') {
         // if(networks.POL_BYTE !== chainId) {
            // dispatchNotification({
            //    type:'error',
            //    message: 'Change the network to polygon!',
            //    title: 'error',
            //    icon:'info',
            //    position: 'topR',
            // });
         //    return;
         // }

         // покупка нфт
      } else {
         // if(network !== chainId) {
         //    dispatchNotification({
         //       type:'error',
         //       message: `Change the network to ${network === networks.ETH_BYTE ? 'mainnet' : 'polygon'}!`,
         //       title: 'error',
         //       icon:'info',
         //       position: 'topR',
         //    });
         //    return;
         // }

         // разрешение покупки
         const optionsAllowance = {
            contractAddress:address_antimatter,
            functionName: "increaseAllowance",
            abi: abi_antimatter.abi,
            params: {
               spender:address_market,
               addedValue:Moralis.Units.ETH(price),
            }
         }

         console.log(optionsAllowance)
         await fetch({
            params: optionsAllowance,
            onSuccess: (res:any) => {
               console.log(res)
            },

            onError: (err:any) => {
               console.log(err)
            }
         })

         // покупка nft
         const optionsBuy = {
            contractAddress:address_market,
            functionName: "execute",
            abi: abi_market,
            params: {
               nftContract:addressContract,
               tokenId:id,
               execute:Number(Moralis.Units.ETH(0))
            }
         }
         
         await fetch({
            params: optionsBuy,
            onSuccess: async (res:any) => {

               const MarketPlace = Moralis.Object.extend("MarketPlace");
               const query = new Moralis.Query(MarketPlace);
               const thisOffer = await query
               .equalTo("token_id", id)
               .first();

               if(thisOffer) {
                  thisOffer.destroy()
               }

               handleNewNotification('success')
               console.log(res)
            },

            onError: (err:any) => {
               console.log(err)
               if(err.message.includes('"message":"execution reverted: ERC20: insufficient allowance"')) {
                  dispatchNotification({
                     type:'error',
                     message: `There is not enough Antimatter on the balance!`,
                     title: 'error',
                     icon:'info',
                     position: 'topR',
                  });
               }
            }
         })
      }
   }, [chainId, Moralis])

   const signUpRaffle = (
      Name:string, 
      price:string,
      Duration:string,
      url_opensea:string,
      url_img:string,
      users:string[],
      isRegister:boolean
   ) => async () => {

      if(isRegister) {
         dispatchNotification({
            type:'warning',
            message: `You are already registered!`,
            title: 'warning',
            icon:'info',
            position: 'topR',
         });
         return;
      }
      
      const optionsBalanceOf = {
         contractAddress: address_antimatter,
         functionName: "balanceOf",
         abi: abi_antimatter.abi,
         params: {
            account:account
         }
      }
      
      let balance = 0;
      await fetch({
         params: optionsBalanceOf,
         onSuccess: (res: any) => {
            console.log(Number(Moralis.Units.FromWei(res)))
            balance = Number(Moralis.Units.FromWei(res))
         }, 
         onError: (err:any) => {
            console.log(err)
         }
      })

      if(balance >= Number(price)) {
         const options = {
            contractAddress:address_antimatter,
            functionName: "transfer",
            abi: abi_antimatter.abi,
            params: {
               to:address_staking,
               amount:String(Number(price)*(10**18)),
            }
         }
   
         console.log(options)
         await fetch({
            params:options,
            onSuccess:async (res:any) => {
               const Raffle = Moralis.Object.extend("raffle");
               const query = new Moralis.Query(Raffle);
               query.equalTo("raffle_nft_name", Name);
               const raffle = await query.first();
               
               if(raffle) {
                  raffle.set("raffle_nft_name", Name);
                  raffle.set("Duration", Duration);
                  raffle.set("entry_cost", price);
                  raffle.set("url_opensea", url_opensea);
                  raffle.set("url_img", url_img);
                  raffle.set("users", [...users, account]);
            
                  raffle.save().then((res:any) => console.log(res))
               }
            },
            onError: (err:any) => {
               console.log(err)
            }
         })
      } else {

         dispatchNotification({
            type:'error',
            message: `Not enough $Antimatter`,
            title: 'Error',
            icon:'info',
            position: 'topR',
         });
      }
   }

   return(
      <>
         <StakingNft heigth={true}>
            {items.length ? items.map((item:any, index:number) => {
               return(
                  <Item key={index}>
                     <Img 
                        alt=""
                        src={
                           item.img.includes('http://tsb.imgix.net/ipfs//') ? 
                           `${item.img}?w=330&h=200&fit=crop` :
                           item.img
                        }
                     />
                     <BodyText>
                        {item?.name && 
                           <Network>Name: {item.name}</Network>
                        }
                        <Network>TokenId: {Number(item.nftTokenId)}</Network>
                        <Network>Price: {Moralis.Units.FromWei(item.price)} antimatter</Network>
                     </BodyText>
                     <Claim onClick={
                        buyOffer(Number(item.nftTokenId), 
                        Moralis.Units.FromWei(item.price), 
                        item.nftContract, 
                        "nft", 
                        networks.POL_BYTE
                     )}>Buy</Claim>
                  </Item>
               )
            })
            :
               ''
               // <h1 className="nothing_title">There are no sales at the moment.</h1>
            }

            {data.length && data.map((item:any) => {
               
               return(
                  <Item key={item.id}>
                     <Img 
                        alt=""
                        src={item.attributes.url_img}
                     />
                     <BodyText>
                        <Network>{item.attributes.raffle_nft_name}</Network>
                        <Network>{item.attributes.entry_cost} antimatter</Network>
                        <Network>
                           <Countdown 
                              date={Number(item.attributes.start_duration) + Number(item.attributes.Duration)} 
                           />
                        </Network>
                        <OpenseaLink href={item.attributes.url_opensea}>OpenSea</OpenseaLink>
                     </BodyText>

                     <Claim onClick={signUpRaffle(
                        item.attributes.raffle_nft_name, 
                        item.attributes.entry_cost,
                        item.attributes.Duration,
                        item.attributes.url_opensea,
                        item.attributes.url_img,
                        item.attributes.users,
                        item.attributes?.users ? item.attributes.users.some((item:any) => item === account) : []
                     )}>
                        {item.attributes.users.some((item:any) => item === account) ? 'Raffle entered' : 'Buy a ticket'} 
                     </Claim>
                  </Item>
               )
            })}
         </StakingNft>

         <Pagination 
            pages={pages - 1}
            allPages={allPages + 1}
            setPages={setPages}
         />
      </>
   )
}

export default MarketPlace;