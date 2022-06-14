import { Route, Routes} from "react-router-dom";
import {Suspense, lazy} from 'react';
import {Loader} from '../../components/Loader'
const Staking = lazy(() => import ('../../pages/stakaing/StakingHome'));
// const Rewards = lazy(() => import ('../../pages/rewards/Rewards'));
// const MarketPlace = lazy(() => import ('../../pages/marketPlace/MarketPlace'));

export const Router = () => {
   return (
      <Routes>
         <Route 
            path="/"
            element={
               <Suspense fallback={
                  <div className="mainLoader"><Loader /></div>
               }>
                  <main className='main'>
                     <Staking />
                  </main>
               </Suspense>
            }  
         />

         {/* <Route 
            path="/rewards"
            element={
               <Suspense fallback={
                  <div className="mainLoader"><Loader /></div>
               }>
                  <main className='main'>
                     <Rewards />
                  </main>
               </Suspense>
            }  
         />

         <Route 
            path="/marketPlace"
            element={
               <Suspense fallback={<div className="mainLoader"><Loader /></div>}>
                  <main className='main'>
                     <MarketPlace />
                  </main>
               </Suspense>
            }  
         />  */}
      </Routes>
   );
}