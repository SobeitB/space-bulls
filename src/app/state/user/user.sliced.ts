import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  address: string;
}

const initialState: UserState = {
   address: '',
}

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setUser: (state, action: PayloadAction<string>) => {
         state.address = action.payload
      },
   },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer