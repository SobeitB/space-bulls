import {OtherProvider} from './providers/index'
import {useMoralis, useChain} from 'react-moralis'
import {useEffect, useState} from 'react';
import { useLocation } from 'react-router';
import { Header } from './components/screens/header/header';
import {networks, serv} from './shared/variable'
import {Modal} from 'web3uikit'
import {useNavigate} from "react-router-dom";

function App() {
    const {pathname, search} = useLocation();
    const navigate = useNavigate();
    const { switchNetwork } = useChain();
    const [isModal, setIsModal] = useState<boolean>(false)
    const onModal = () => {
      setIsModal(!isModal)
    }

  const {
    enableWeb3, 
    isAuthenticated, 
    isWeb3Enabled,
    chainId,
    user
  } = useMoralis()

    useEffect(() => {
        if (!isWeb3Enabled && isAuthenticated) enableWeb3();
    }, [isWeb3Enabled, isAuthenticated]);

    useEffect(() => {
        const asyncFunc = async () => {
            const fetchServ = await fetch(`${serv}authorize${search}`, {
                method: 'POST',
                mode:'no-cors'
            })

            let json = await fetchServ.json()
            console.log(fetchServ)

            const isHolder = json.roles.some((role:string) => role !== 'stranger');
            if(!isHolder) {
                onModal()
            }

            if(user !== null) {
                user.set('discord_name', json.username);
                user.set('roles', json.roles);
                user.set('discord_id', json.userId);
                user.set('ds_IdDiscriminator', json.userIdDiscriminator);
                user.set('idAvatar', json.idAvatar)

                await user.save()
                navigate('/staking')
            }
        }

        if(search && user && !user.attributes?.discord_name) {
            asyncFunc()
        }
    }, [search, user])

    useEffect(() => {
    
    // if(chainId !== networks.POL_BYTE) {
    //   switchNetwork(networks.POL_BYTE);
    // }

  }, [chainId, switchNetwork])

  return (
    <div className={`App ${pathname === '/' && 'AppHome'}`}>
      <Header />
      <Modal
        isVisible={isModal}
        onCloseButtonPressed={onModal}
        onCancel={onModal}
        onOk={onModal}
        title=""
        children={
            <div>
                <p style={{"marginTop": "5px", "marginBottom": '15px'}}>It appears you didn't pass holder verification in our Discord. Please pass verification and reconnect your account.</p>
            </div>
        }
      />
      <OtherProvider />
    </div>
  );
}

export default App;