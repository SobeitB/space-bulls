import { Router } from "./router/router"
import {NotificationProvider} from "web3uikit";


export const OtherProvider = () => {
   return(
      <NotificationProvider>
         <Router />
      </NotificationProvider>
   )
}