import { ConnectWallet } from "../../shared/ConnectBtn"
import { 
   HeaderComp,
   Container,
   ContainerHeader,
   Logo
} from "./header.styled"
import logo from '../../../assets/img/logo.png'
import { Link, useLocation } from "react-router-dom"

export const Header = () => {
   const {pathname} = useLocation();

   return(
      <HeaderComp>
         <Container>
            <ContainerHeader>
               <Link to={`${pathname === '/' ? '/' : '/staking'} `}>
                  <Logo 
                     src={logo}
                     alt=""
                  />
               </Link>
               
               <ConnectWallet />
            </ContainerHeader>
         </Container>
      </HeaderComp>
   )
}