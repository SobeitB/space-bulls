import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface StakingState {
   nftNotStaking: any[];
   nftStaking: any[];
   page:number;
   allPages:number;
}

const initialState: StakingState = {
   nftNotStaking: [],
   nftStaking: [],
   page:0,
   allPages:0
}

export const counterSlice = createSlice({
   name: 'staking',
   initialState,
   reducers: {
      setNftStaking: (state, action: PayloadAction<any[]>) => {
         state.nftStaking = action.payload
      },

      setNftNotStaking: (state, action: PayloadAction<any[]>) => {
         state.nftNotStaking = action.payload
      },

      setPage: (state, action: PayloadAction<number>) => {
         state.page = action.payload
      },

      setAllPage: (state, action: PayloadAction<number>) => {
         state.allPages = action.payload
      },
   },
})

export const { 
   setNftStaking, 
   setNftNotStaking, 
   setPage,
   setAllPage
 } = counterSlice.actions

export default counterSlice.reducer