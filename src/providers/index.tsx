import { Router } from "./router/router"
import {BrowserRouter} from "react-router-dom";
import {NotificationProvider} from "web3uikit";


export const OtherProvider = () => {
   return(
      <BrowserRouter>
         <NotificationProvider>
            <Router />
         </NotificationProvider>
      </BrowserRouter>
   )
}