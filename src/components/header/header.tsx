import { ConnectWallet } from "../ConnectBtn"
import { 
   HeaderComp,
   Container,
   ContainerHeader,
   Logo
} from "./header.styled"
import logo from '../../assets/img/logo.png'

export const Header = () => {

   return(
      <HeaderComp>
         <Container>
            <ContainerHeader>
               <Logo 
                  src={logo}
                  alt=""
               />
               
               <ConnectWallet />
            </ContainerHeader>
         </Container>
      </HeaderComp>
   )
}