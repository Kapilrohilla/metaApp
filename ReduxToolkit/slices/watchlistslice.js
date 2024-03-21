import {createSlice} from '@reduxjs/toolkit';

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: [],
  reducers: {
    populateWatchlist: function (state, action) {
      return action.payload;
    },
    // extractsDigitAsPerSymbol: function (state, action) {
    //   return state.map(symbolData => {
    //     return {
    //       symbol: symbolData?.symbol,
    //       digit: symbolData?.digits,
    //     };
    //   });
    // },
  },
});

export default watchlistSlice;
export const {populateWatchlist} = watchlistSlice.actions;
