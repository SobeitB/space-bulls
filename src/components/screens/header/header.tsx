import { ConnectWallet } from "../../shared/ConnectBtn/ConnectBtn"
import {
   HeaderComp,
   Container,
   ContainerHeader,
   Logo,
   FlexContBtn,
   ConnectDs,
   DsImg,
   DsImgLogo,
   ImgAvatar
} from "./header.styled"
import logo from '../../../assets/img/logo.png'
import { Link, useLocation } from "react-router-dom"
import {useMoralis} from "react-moralis";
import {url_auth2} from "../../../shared/variable";

export const Header = () => {
   const {pathname} = useLocation();
   const {isWeb3Enabled, user} = useMoralis()

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

               <FlexContBtn>
                  {isWeb3Enabled && user && !user.attributes?.discord_name  &&
                      <a style={{textDecoration:"none"}} href={url_auth2} >
                         <ConnectDs>
                            <DsImg>
                               <DsImgLogo />
                            </DsImg>

                            <span>Connect</span>
                         </ConnectDs>
                      </a>
                  }


                  {user && user.attributes?.discord_name &&
                      <a style={{textDecoration:"none"}} href={url_auth2} >
                          <ConnectDs>
                              <ImgAvatar
                                  src={`https://cdn.discordapp.com/avatars/${user.attributes?.discord_id}/${user.attributes?.idAvatar}.png`}
                              />

                              <span>{
                                 user.attributes?.discord_name.length >= 7 ?
                                    user.attributes?.discord_name.substring(0, 7) + '...'
                                    :
                                    user.attributes?.discord_name
                              }</span>
                          </ConnectDs>
                      </a>
                  }

                  <ConnectWallet />
               </FlexContBtn>
            </ContainerHeader>
         </Container>
      </HeaderComp>
   )
}