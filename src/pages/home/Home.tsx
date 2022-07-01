import {
   Body,
   BodyLogo,
   Logo,
   Title,
   Text,
} from './Home.styled'
import hub from './Hub.png'
import { ConnectWallet } from "../../components/shared/ConnectBtn"
import {useNavigate} from 'react-router-dom'
import {useMoralis} from 'react-moralis'
import { useEffect } from 'react'

const Home = () => {
   const navigate = useNavigate()
   const {account, isWeb3Enabled, isAuthenticated} = useMoralis()

   useEffect(() => {
      if(account && isWeb3Enabled && isAuthenticated) {
         navigate('/staking')
      }
   }, [account, navigate, isWeb3Enabled, isAuthenticated])

   return(
      <Body>
         <BodyLogo>
            <Logo 
               src={hub}
               alt=""
            />
         </BodyLogo>
         <Title>SPACE HUB</Title>
         <Text>
            Welcome to the Moon! Space Hub is the gathering place for all ambitious SpaceBulls who look forward to conquer the final frontier of Outer Space! In order to do that, they utilize $Antimatter that can be harvested, traded, or awarded right here in Space Hub. So let's get you set up
         </Text>
         
         <ConnectWallet />
      </Body>
   );
}

export default Home;