import { useMoralis } from "react-moralis";
import { useEffect } from "react";
import {useAppDispatch} from '../app/hooks';
import {setUser} from '../app/state/user/user.sliced'

interface props {
   children:React.ReactNode;
}

export const AuthProvider = ({children}: props) => {
   const dispatch = useAppDispatch();
   const {user, isInitializing} = useMoralis();
   
   useEffect(() => {
      if(isInitializing) {
         dispatch(setUser(user?.attributes.ethAddress));
      }
   }, [user, dispatch, isInitializing])

   return(
      <>
         {children}
      </>
   )
}