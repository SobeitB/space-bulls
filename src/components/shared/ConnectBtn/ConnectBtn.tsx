//@ts-nocheck

import {chainIdConnectWallet} from '../../../shared/variable'
import {Modal} from 'web3uikit';
import {useMoralis} from 'react-moralis';
import metamask from '../../../assets/img/metamask.png'
import walletConnect from '../../../assets/img/walletconnect.png'
import { useCallback, useState } from "react";
import {ConnectWalletBtn, BodyConnectWallet} from './ConnectBtn.styled'

export const ConnectWallet = () => {
   const {account, authenticate, logout} = useMoralis();
   const [isModalWallet, setModalWallet] = useState<boolean>(false)

   const onModal = useCallback( () => {
      setModalWallet(!isModalWallet);
   }, [isModalWallet])


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
                        await authenticate({chainId:chainIdConnectWallet})
                        setModalWallet(!isModalWallet);
                     }}
                  >
                     <img src={metamask} alt={'metamask'}/>
                     <p>Metamask</p>
                  </BodyConnectWallet>

                  <BodyConnectWallet 
                     onClick={async () => {

                        await authenticate({
                           provider: "walletConnect",
                           chainId: chainIdConnectWallet,
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