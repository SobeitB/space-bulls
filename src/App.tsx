import {OtherProvider} from './providers/index'
import {useMoralis, useChain} from 'react-moralis'
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Header } from './components/screens/header/header';
import {networks} from './shared/variable'

function App() {
  const {pathname} = useLocation();
  const { switchNetwork } = useChain();

  const {
    enableWeb3, 
    isAuthenticated, 
    isWeb3Enabled,
    chainId
  } = useMoralis()

  useEffect(() => {
    if (!isWeb3Enabled && isAuthenticated) enableWeb3();
  }, [isWeb3Enabled, isAuthenticated]);

  useEffect(() => {
    const chainIdDefault = networks.POL_BYTE === '0x13881' ? networks.ETH_BYTE : networks.POL_BYTE
    
    if(chainId !== chainIdDefault) {
      switchNetwork(networks.POL_BYTE);
    }
  }, [chainId, switchNetwork])

  
  return (
    <div className={`App ${pathname === '/' && 'AppHome'}`}>
      <Header />
      <OtherProvider />
    </div>
  );
}

export default App;