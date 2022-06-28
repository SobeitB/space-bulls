import { Route, Routes} from "react-router-dom";
import {Suspense, lazy} from 'react';
import { LayoutLoader } from "../../components/shared/LayoutPages/LayoutPages";
import { LayoutPage } from "../../components/shared/LayoutPages/LayoutPages";
import { 
   Container,
} from "../../pages/stakaing/Staking.styled";
import {useLocation, useNavigate} from 'react-router-dom'
import {useMoralis} from 'react-moralis'
import {useEffect} from 'react'

import { MainMenu } from "../../components/screens/mainMenu/MainMenu";
import { IsAdminProvider } from "../isAdmin";
const Home = lazy(() => import ('../../pages/home/Home'));
const StakingOnly = lazy(() => import ('../../pages/stakaing/StakingOnly'));
const Rewards = lazy(() => import ('../../pages/rewards/Rewards'));
const MarketPlace = lazy(() => import ('../../pages/marketPlace/marketPlace'));
const AdminPanel = lazy(() => import ('../../pages/admin_panel/Admin_panel'));
const CreateProduct = lazy(() => import ('../../pages/createProduct/createProduct'));

export const Router = () => {
   const {pathname} = useLocation();
   const navigate = useNavigate()
   const {account} = useMoralis()

   useEffect(() => {
      if(!account) {
         navigate('/')
      }
   }, [account, navigate])

   return (
      <Container>
         {
         (
            pathname === '/rewards' ||
            pathname === '/marketPlace' ||
            pathname === '/create_product' ||
            pathname === '/staking' 
         )
         && 
            <MainMenu />
         }

         <Routes>
            <Route 
               path="/"
               element={
                  <Suspense fallback={ <LayoutLoader /> }>
                     <LayoutPage>
                        <Home />
                     </LayoutPage>
                  </Suspense>
               }  
            />

            <Route 
               path="/staking"
               element={
                  <Suspense fallback={ <LayoutLoader /> }>
                     <LayoutPage>
                        <StakingOnly />
                     </LayoutPage>
                  </Suspense>
               }  
            />

            <Route 
               path="/create_product"
               element={
                  <Suspense fallback={ <LayoutLoader /> }>
                     <LayoutPage>
                        <CreateProduct />
                     </LayoutPage>
                  </Suspense>
               }  
            />

            <Route 
               path="/admin_panel"
               element={
                  <Suspense fallback={ <LayoutLoader /> }>
                     <LayoutPage>
                        <IsAdminProvider>
                           <AdminPanel />
                        </IsAdminProvider>
                     </LayoutPage>
                  </Suspense>
               }  
            />

            {/* <Route 
               path="/rewards"
               element={
                  <Suspense fallback={ <LayoutLoader /> }>
                     <LayoutPage>
                        <Rewards />
                     </LayoutPage>
                  </Suspense>
               }  
            /> */}

            <Route 
               path="/marketPlace"
               element={
                  <Suspense fallback={ <LayoutLoader /> }>
                     <LayoutPage>
                        <MarketPlace />
                     </LayoutPage>
                  </Suspense>
               }  
            /> 
         </Routes>
      </Container>
   );
}