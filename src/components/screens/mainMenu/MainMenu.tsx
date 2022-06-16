import { useState, useCallback } from "react";
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
import { useAppSelector } from "../../../app/hooks";

export const MainMenu = () => {
   const {pathname} = useLocation();
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
            <InfoBlock>2222</InfoBlock>
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
               onClick={onNavigate("rewards")}  
               active={pathname === "/rewards"}
            >Rewards</Tabs>
         </PaginationTabs>
      </Pagination>
   </>
   )
}