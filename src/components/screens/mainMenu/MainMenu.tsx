import { useCallback } from "react";
import {
   ContainerInfo,
   InfoBlock,
   InfoText,
   Pagination,
   PaginationTabs,
   Tabs,
   InfoBlockBody, BodyMenu,
} from "../../../pages/stakaing/Staking.styled";
import {useLocation, useNavigate} from 'react-router-dom'
import {useMoralisQuery} from 'react-moralis'
import { useAppSelector } from "../../../app/hooks";
import {useWeb3ExecuteFunction, useMoralis, useMoralisCloudFunction} from 'react-moralis'
import { useEffect, useState } from "react"

import {address_antimatter, address_staking} from '../../../shared/variable'
import abi_antimatter from '../../../shared/abi/Antimatter.json'
import abi_staking from '../../../shared/abi/SpaceStaking.json'
import {Modal} from 'web3uikit';
import {useModal} from '../../../pages/stakaing/hooks/onModal'
import {useValidPairs} from '../../../pages/stakaing/hooks/validPairs'
import LimitedOffers from "../../../pages/LimitedOffers/LimitedOffers";

export const MainMenu = () => {
   const nftStaking = useAppSelector(state => state.staking.nftStaking)
   const {pathname} = useLocation();
   const balance = useWeb3ExecuteFunction();
   const {Moralis, account, user} = useMoralis()
   const [balanceMatter, setBalanceMatter] = useState(0)
   const [unclaimedbalanceMatter, setUnclaimedbalanceMatter] = useState(0)
   const [stakeNftCount, setStakeNftCount] = useState(0)
   const getSignedTokenIds = useMoralisCloudFunction("getSignedTokenIds");

   const {
      isModalWarning,
      onModal
   } = useModal();
   useValidPairs(onModal);

   useEffect(() => {
      if(account) {
         const asyncGet = () => {
            const options = {
               contractAddress: address_antimatter,
               functionName: "balanceOf",
               abi: abi_antimatter.abi,
               params: {
                  account:account
               }
            }
            
            balance.fetch({
               params: options,
               onSuccess: (res: any) => {
                  setBalanceMatter(Number(Moralis.Units.FromWei(res)))
               }, 
               onError: (err:any) => {
                  console.log(err)
               }
            })
   
            const getAsyncFunc = async () => {
               const resSignedTokenIds:any = await getSignedTokenIds.fetch({
                  params:{
                     address:account
                  }
               })
         
               // Claimable
               const optionsClaimableCheck = {
                  contractAddress: address_staking,
                  functionName: "claimable",
                  abi: abi_staking.abi,
                  params:{
                     signedTokenIds:resSignedTokenIds.signedTokenIds,
                     sender:account,
                  }
               }
         
               balance.fetch({
                  params: optionsClaimableCheck,
                  onSuccess:(res:any) => {
                     setUnclaimedbalanceMatter(Number(Moralis.Units.FromWei(res.amount)))
                  },
         
                  onError(error:Error) {
                     console.log(error)
                  },
               })
            }

            getAsyncFunc()
   
            // retrieve
            const optionsRetrieve = {
               contractAddress: address_staking,
               functionName: "retrieve",
               abi: abi_staking.abi,
               params: {
                  owner:account,
                  offset:0, 
                  limit:1000
               }
            }
      
            balance.fetch({
               params: optionsRetrieve,
               onSuccess: (res: any) => {
                  setStakeNftCount(res.items.length)
               }, 
               onError: (err:any) => {
                  console.log(err)
               }
            })
         }

         asyncGet()
      }
   }, [Moralis, account])
   
   const {data} = useMoralisQuery("_User", query => 
      query
      .equalTo("isAdmin", true)
   )

   const navigate = useNavigate()
   const staking = useAppSelector(state => state.staking)
   const onNavigate = useCallback((to:string) => () => {
      navigate(to)
   }, [navigate])

   return(
   <>
      <Modal 
         isVisible={isModalWarning} 
         onCloseButtonPressed={onModal('warning')} 
         onCancel={onModal('warning')}
         onOk={onModal('warning')}
         title="WARNING"
         children={
            <div>
               <p style={{"margin": "15px 0"}}>If you proceed to claim $Antimatter collected so far, the total yield will be {
                  nftStaking.length && nftStaking.reduce((prev, {reward}: {reward: number}) => (
                     prev + (reward * 50) 
                  ), 0)
               }</p>
            </div>
         }
      />

      <BodyMenu>
         <ContainerInfo>
            <InfoBlockBody>
               <InfoText>Staked</InfoText>
               <InfoBlock>{stakeNftCount}</InfoBlock>
            </InfoBlockBody>

            <InfoBlockBody>
               <InfoText>Unstaked</InfoText>
               <InfoBlock>{staking.nftNotStaking.length}</InfoBlock>
            </InfoBlockBody>

            <InfoBlockBody>
               <InfoText>Balance</InfoText>
               <InfoBlock>{balanceMatter.toFixed(1)}</InfoBlock>
            </InfoBlockBody>

            <InfoBlockBody style={{
               "position": "relative",
               "top":`${document.documentElement.clientWidth === 769 ? '0px' : '-8px'}`
            }}>
               <InfoText>Unclaimed $Antimatter</InfoText>
               <InfoBlock>{unclaimedbalanceMatter.toFixed(1)}</InfoBlock>
            </InfoBlockBody>

            <InfoBlockBody>
               <InfoText>Daily yield</InfoText>
               <InfoBlock>
                  {
                     nftStaking.length && nftStaking.reduce((prev, {reward}: {reward: number}) => (
                        prev + (reward * 50)
                     ), 0)
                  }
               </InfoBlock>
            </InfoBlockBody>
         </ContainerInfo>

         <Pagination>
            <PaginationTabs>
               <Tabs
                  onClick={onNavigate("staking")}
                  active={pathname === "/staking"}
               >Staking</Tabs>

               <Tabs
                  onClick={onNavigate("marketPlace")}
                  active={pathname === "/marketPlace"}
               >Space store</Tabs>

               <Tabs
                  onClick={onNavigate("create_product")}
                  active={pathname === "/create_product"}
               >Create a product</Tabs>

               <Tabs
                  onClick={onNavigate("claim")}
                  active={pathname === "/claim"}
               >space Vault</Tabs>

               <Tabs
                  onClick={onNavigate("limited-offers")}
                  active={pathname === "/limited-offers"}
               >Limited Offers</Tabs>

               {data.length > 0 &&
                   <Tabs
                       onClick={onNavigate("admin_panel")}
                       active={pathname === "/admin_panel"}
                   >Admin Panel</Tabs>
               }


               {/* <Tabs
               onClick={onNavigate("rewards")}
               active={pathname === "/rewards"}
            >Rewards</Tabs> */}
            </PaginationTabs>
         </Pagination>
      </BodyMenu>
   </>
   )
}