import {useMoralis} from 'react-moralis'
import {Navigate} from 'react-router-dom';
import {useEffect, useState} from 'react';

interface props {
   children:React.ReactChild | React.ReactNode;
}

export const IsAdminProvider = ({children}:props) => {
   const [isAdmin, setIsAdmin] = useState<boolean | string>('loading');
   const {Moralis} = useMoralis();

   useEffect(() => {
      async function getIsAdmin() {
         const User = Moralis.Object.extend("_User");
         const query = new Moralis.Query(User);
         const user = await query
         .equalTo("isAdmin", true)
         .first();
         
         setIsAdmin(user !== undefined) 
      }

      getIsAdmin()
   }, [])

   return(
      <>
         {isAdmin && isAdmin !== 'loading' && children}
         {!isAdmin && <Navigate to="/" />}
      </>
   );
}