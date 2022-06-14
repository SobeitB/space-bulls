import {OtherProvider} from './providers/index'
import {useMoralis} from 'react-moralis'
import { useEffect } from 'react';
import { Header } from './components/header/header';
function App() {
  const {
    enableWeb3, 
    isAuthenticated, 
    isWeb3Enabled
  } = useMoralis()

  useEffect(() => {
    if (!isWeb3Enabled && isAuthenticated) enableWeb3();
  }, [isWeb3Enabled, isAuthenticated]);

  return (
    <div className="App">
      <Header />
      <OtherProvider />
    </div>
  );
}

export default App;