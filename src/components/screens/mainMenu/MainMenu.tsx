import { useCallback } from "react";
import { 
   ContainerInfo,
   InfoBlock,
   InfoText,
   Pagination,
   PaginationTabs,
   Tabs,
   InfoBlockBody, 
} from "../../../pages/stakaing/Staking.styled";
import {useLocation, useNavigate} from 'react-router-dom'
import {useMoralisQuery} from 'react-moralis'
import { useAppSelector } from "../../../app/hooks";
import {useWeb3ExecuteFunction, useMoralis} from 'react-moralis'
import { useEffect, useState } from "react"

import {address_antimatter} from '../../../shared/variable'
import abi_antimatter from '../../../shared/abi/Antimatter.json'

export const MainMenu = () => {
   const {pathname} = useLocation();
   const balance = useWeb3ExecuteFunction();
   const {Moralis, account} = useMoralis()
   const [balanceMatter, setBalanceMatter] = useState(0)

   useEffect(() => {
      if(account) {
         const options = {
            contractAddress: address_antimatter,
            functionName: "balanceOf",
            abi: abi_antimatter.abi,
            params: {
               account:account // testnet. eth - account
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
      <ContainerInfo>
         <InfoBlockBody>
            <InfoText>Staked</InfoText>
            <InfoBlock>{staking.nftStaking.length}</InfoBlock>
         </InfoBlockBody>

         <InfoBlockBody>
            <InfoText>Unstaked</InfoText>
            <InfoBlock>{staking.nftNotStaking.length}</InfoBlock>
         </InfoBlockBody>

         <InfoBlockBody>
            <InfoText>Balance</InfoText>
            <InfoBlock>{balanceMatter}</InfoBlock>
         </InfoBlockBody>

         <InfoBlockBody>
            <InfoText>Daily yield</InfoText>
            <InfoBlock>
               {
                  staking.nftStaking.length && staking.nftStaking.reduce((prev, {reward}: {reward: number}) => (
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
            >MarketPlace</Tabs>

            <Tabs
               onClick={onNavigate("create_product")}  
               active={pathname === "/create_product"}
            >Create a product</Tabs>

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
   </>
   )
}