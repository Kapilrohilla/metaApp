import {configureStore} from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import watchlistSlice from './slices/watchlistslice';
import BaseUrlSlice from './slices/baseUrl';
import HistoryPositionSlice from './slices/historyPositionSlice';
import HistoryOrderSlice from './slices/historyOrderSlice';
import HistoryTypeSlice from './slices/HistoryTypeSlice';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    watchlist: watchlistSlice.reducer,
    baseUrl: BaseUrlSlice.reducer,
    historyPosition: HistoryPositionSlice.reducer,
    historyOrder: HistoryOrderSlice.reducer,
    historyType: HistoryTypeSlice.reducer,
  },
});

export default store;
