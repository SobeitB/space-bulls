import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface StakingState {
   nftNotStaking: any[];
   nftStaking: any[];
}

const initialState: StakingState = {
   nftNotStaking: [],
   nftStaking: [],
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
   },
})

export const { setNftStaking, setNftNotStaking } = counterSlice.actions

export default counterSlice.reducer