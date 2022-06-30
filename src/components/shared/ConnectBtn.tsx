import {ConnectButton} from 'web3uikit'
import {networks} from '../../shared/variable'

export const ConnectWallet = () => {
   
   return(
      <div className='ConnectButton'>
         <ConnectButton chainId={networks.POL_BYTE === '0x89' ? 89 : 13881} />
      </div>
   );
}