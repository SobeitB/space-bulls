import { Router } from "./router/router"
import { AuthProvider } from "./authProvider"
import {BrowserRouter} from "react-router-dom";

export const OtherProvider = () => {
   return(
      <BrowserRouter>
         <AuthProvider>
            <Router />
         </AuthProvider>
      </BrowserRouter>
   )
}