//@ts-nocheck

import {networks} from '../../shared/variable'
import {Modal} from 'web3uikit';
import {useMoralis} from 'react-moralis';
import styled from 'styled-components'
import metamask from '../../assets/img/metamask.png'
import walletConnect from '../../assets/img/walletconnect.png'
import { useCallback, useState } from "react";
import WalletConnectProvider from "@maticnetwork/walletconnect-provider"

const ConnectWalletBtn = styled.button`
   width:170px;
   height:40px;
   color: #322342;
   border:none;
   border-radius:10px;
   background-color: #81e6d9;
   font-size:12px;
   padding:0 3px;
   cursor:pointer;
   margin-right:10px;
` 

const BodyConnectWallet = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   cursor:pointer;
` 

export const ConnectWallet = () => {
   const {account, authenticate, logout} = useMoralis();
   const [isModalWallet, setModalWallet] = useState<boolean>(false)

   const onModal = useCallback( () => {
      setModalWallet(!isModalWallet);
   }, [isModalWallet])

   let chainId = networks.POL_BYTE === '0x89' ? 89 : 13881

   return(
      <div className='ConnectButton'>
         <Modal 
            isVisible={isModalWallet}
            onCloseButtonPressed={onModal}
            onCancel={onModal}
            onOk={onModal}
            title="Connect wallet"
            children={
               <div>
                  <BodyConnectWallet
                     onClick={async () => {
                        await authenticate({chainId:chainId})
                        setModalWallet(!isModalWallet);
                     }}
                  >
                     <img src={metamask} alt={'metamask'}/>
                     <p>Metamask</p>
                  </BodyConnectWallet>

                  <BodyConnectWallet 
                     onClick={async () => {
                        await authenticate({
                           provider: "walletconnect",
                           chainId: 137,
                        
                        });
                        setModalWallet(!isModalWallet)
                     }}
                  >
                     <img src={walletConnect} alt={'walletconnect'}/>
                     <p>WalletConnect</p>
                  </BodyConnectWallet>
               </div>
            }
         /> 
         
         {!account ?
            <ConnectWalletBtn onClick={onModal}>Connect Wallet</ConnectWalletBtn>
            :
            <ConnectWalletBtn onClick={() => logout()}>Disconnect Wallet</ConnectWalletBtn>
         }
      </div>
   );
}