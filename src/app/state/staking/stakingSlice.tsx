import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface StakingState {
   nftNotStaking: any[];
   nftStaking: any[];
   nftStakingId: number[];
}

const initialState: StakingState = {
   nftNotStaking: [],
   nftStaking: [],
   nftStakingId:[],
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

      setNftStakingId: (state, action: PayloadAction<number[]>) => {
         state.nftStakingId = action.payload
      },
   },
})

export const { setNftStaking, setNftNotStaking, setNftStakingId } = counterSlice.actions

export default counterSlice.reducer