import {OtherProvider} from './providers/index'
import {useMoralis} from 'react-moralis'
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Header } from './components/screens/header/header';

function App() {
  const {pathname} = useLocation();

  const {
    enableWeb3, 
    isAuthenticated, 
    isWeb3Enabled,
  } = useMoralis()

  useEffect(() => {
    if (!isWeb3Enabled && isAuthenticated) enableWeb3();
  }, [isWeb3Enabled, isAuthenticated]);

  
  return (
    <div className={`App ${pathname === '/' && 'AppHome'}`}>
      <Header />
      <OtherProvider />
    </div>
  );
}

export default App;