import {
   Item,
   Img,
   Network,
   BodyText,
   Claim,
   OpenseaLink,
   DeleteOffer,
} from '../../components/shared/UI/items.styled'
import {
   StakingNft,
} from "../stakaing/Staking.styled";

import Pagination from '../../components/screens/Pagination/Pagination'
import {useNotification} from 'web3uikit';
import { useCallback, useEffect, useState } from 'react';
import { useMoralis, useWeb3ExecuteFunction, useMoralisQuery } from 'react-moralis';
import {address_market, address_antimatter, address_staking, address_spaceBags, networks} from '../../shared/variable'
import abi_market from '../../shared/abi/SpaceMarket.json'
import abi_bags from '../../shared/abi/SpaceBags.json'
import abi_antimatter from '../../shared/abi/Antimatter.json'
import Countdown from 'react-countdown';

import oneK from '../createProduct/img/1K.png'
import fiveK from '../createProduct/img/5K.png'
import tenK from '../createProduct/img/10K.png'
import {useGetMatterBalance} from "../../hooks/getMatterBalance";
import { NoSaSles } from '../LimitedOffers/LimitedOffer.styled';

export interface valueTimer {
   days: number;
   hours:number;
   minutes:number;
   seconds:number;
}

interface itemMatter {
   tokenId: number;
   price: number | string;
   amountMatters: number | string;
   addressOwner:string;
}

const MarketPlace = () => {
   const {Moralis, account, chainId} = useMoralis();
   const {fetch} = useWeb3ExecuteFunction();
   const [pages, setPages] = useState(0)
   const [allPages, setAllPages] = useState(0)
   const [items, setItems] = useState<itemMatter[] | string>('loading')
   const dispatchNotification = useNotification();
   const { data } = useMoralisQuery("raffle")
   const dataMatter = useGetMatterBalance()

   useEffect(() => {
      const getItems = async () => {
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
               offset:pages * 10,
               limit:10,
            }
         }

         await fetch({
            params: optionsView,
            onSuccess: (res:any) => {
               console.log(res)
               const testArrItems:itemMatter[] = []
               
               res.items.forEach(async (matterOffer:any) => {
                  const optionsBagsAmount = {
                     contractAddress:address_spaceBags,
                     functionName: "bagsAmount",
                     abi: abi_bags.abi,
                     params: {
                        '':Number(matterOffer.nftTokenId)
                     }
                  }

                  const amountMatter:any = await fetch({
                     params: optionsBagsAmount
                  })

                  if(matterOffer.status !== 3) {
                     testArrItems.push({
                        tokenId: Number(matterOffer.nftTokenId),
                        price: Moralis.Units.FromWei(matterOffer.price),
                        amountMatters: Number(amountMatter).toLocaleString('fullwide', {useGrouping:false}),
                        addressOwner:matterOffer.owner
                     })
                  }
               })

               setItems(testArrItems)
            }
         })

      }

      getItems()
   }, [pages])

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

      if(
         dataMatter &&
         dataMatter?.length !== 0 &&
         dataMatter[0] && Number(Moralis.Units.FromWei(dataMatter[0].balance)) < Number(price)
      ) {
         return dispatchNotification({
            type:'error',
            message: `You don't have enough $Antimatter`,
            title: 'Error',
            icon:'info',
            position: 'topR',
         });
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
               amount:Moralis.Units.ETH(price),
            }
         }
   
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
            
                  await raffle.save().then((res:any) => {
                     dispatchNotification({
                        type:'success',
                        message: `You have successfully purchased a ticket!`,
                        title: 'Success',
                        icon:'info',
                        position: 'topR',
                     });
                     console.log(res)
                  })
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

   const buyMatter = useCallback((tokenId:number, price:string | number) => async () => {
      if(
         dataMatter &&
         dataMatter?.length !== 0 &&
         dataMatter[0] && Number(Moralis.Units.FromWei(dataMatter[0].balance)) < Number(price)
      ) {
         return dispatchNotification({
            type:'error',
            message: `You don't have enough $Antimatter`,
            title: 'Error',
            icon:'info',
            position: 'topR',
         });
      }

      const optionsExecuteAndUnpack:any = {
         contractAddress:address_market,
         functionName: "executeAndUnpack",
         abi: abi_market,
         params: {
            nftContract:address_spaceBags,
            tokenId,
         },
         msgValue: Moralis.Units.ETH(price),
      }

      await fetch({
         params: optionsExecuteAndUnpack,
         onSuccess: (res: any) => {
            dispatchNotification({
               type:'success',
               message: `You have successfully bought antimatter, it will come to your wallet in the near future!`,
               title: 'Success',
               icon:'info',
               position: 'topR',
            });
         }, 
         onError: (err:any) => {
            console.log(err)
            if(err.includes('ERR_WRONG_SPACE_BAG')) {
               dispatchNotification({
                  type:'error',
                  message: `This antimatter has already been purchased.`,
                  title: 'Error',
                  icon:'info',
                  position: 'topR',
               });
               
            }
         }
      })
   }, [])

   const cancelOffer = useCallback((tokenId:number) => async () => {
      const optionsCancelAndUnpack:any = {
         contractAddress:address_market,
         functionName: "cancelAndUnpack",
         abi: abi_market,
         params: {
            nftContract:address_spaceBags,
            tokenId,
         },
      }

      console.log(optionsCancelAndUnpack)
      await fetch({
         params: optionsCancelAndUnpack,
         onSuccess: (res: any) => {
            dispatchNotification({
               type:'success',
               message: `You have successfully deleted your offer`,
               title: 'Success',
               icon:'info',
               position: 'topR',
            });
         }, 
         onError: (err:any) => {
            console.log(err)
         }
      })
   }, [])

   return (
      <>
         <StakingNft heigth={true}>
            {data.length ? data.map((item: any) => {

               if (
                  Date.now() <= Number(item.attributes.Duration) + Number(item.attributes.start_duration)
               ) {
                  return (
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
                           item.attributes?.users ? item.attributes.users.some((item: any) => item === account) : []
                        )}>
                           {item.attributes.users.some((item: any) => item === account) ? 'Raffle entered' : 'Buy a ticket'}
                        </Claim>
                     </Item>
                  )
               }
            }) : ''}

            {items === 'loading' && <NoSaSles>Loading...</NoSaSles>}

            {chainId === networks.INIT_NFT &&
               items.length &&
               typeof items !== "string" ?
               items.map((offer: itemMatter,) => {

               return (
                  <Item key={offer.tokenId}>
                     <Img
                        alt=""
                        src={
                           (offer.amountMatters === '1000000000000000000000' && oneK) ||
                           (offer.amountMatters === '5000000000000000000000' && fiveK) ||
                           (offer.amountMatters === '10000000000000000000000' ? tenK : '')
                        }
                     />
                     <BodyText>
                        <Network>
                           Amount: {
                           (offer.amountMatters === '1000000000000000000000' && '1.000') ||
                           (offer.amountMatters === '5000000000000000000000' && '5.000') ||
                           (offer.amountMatters === '10000000000000000000000' ? '10.000' : '')
                        } antimatter
                        </Network>
                        <Network>Price: {offer.price} matic</Network>
                     </BodyText>

                     {account === offer.addressOwner.toLowerCase() &&
                         <DeleteOffer onClick={cancelOffer(offer.tokenId)}>Cancel offer</DeleteOffer>
                     }

                     <Claim onClick={buyMatter(offer.tokenId, offer.price)}>Buy</Claim>
                  </Item>
               )
            }) : ''}

            {chainId !== networks.INIT_NFT && <NoSaSles>Reconnect to the Polygon network!</NoSaSles>}
         </StakingNft>

         {chainId === networks.INIT_NFT &&
             <Pagination
                 pages={pages}
                 allPages={allPages === 0 ? allPages + 1 : allPages}
                 setPages={setPages}
             />
         }
      </>
   );
}

export default MarketPlace;