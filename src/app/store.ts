import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import stakingSlice from './state/staking/stakingSlice'

export const store = configureStore({
  reducer: {
    staking:stakingSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
