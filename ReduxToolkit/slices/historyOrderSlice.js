import {createSlice} from '@reduxjs/toolkit';

const HistoryOrderSlice = createSlice({
  initialState: [],
  name: 'historyOrder',
  reducers: {
    populateOrderHistory: function (state, action) {
      // console.log('position updated');
      return action.payload;
    },
    symbolSort: function (state, action) {
      // console.log('soritng started');
      const sortedState = state.sort((a, b) => {
        const symbol1 = a?.symbol;
        const symbol2 = b?.symbol;
        // console.log(symbol1, symbol2);
        return symbolSort ? symbol1.localeCompare(symbol2) : symbol2.localeCompare(symbol1);
      });
      // console.log(sortedState);
      // sortedState.map(s => {
      //   console.log(s.symbol);
      // });
      return sortedState;
    },
    ticketOrderSort: function (state, action) {
      const sortedData = state.sort((a, b) => {
        const ticket1 = Number(a?.ticket);
        const ticket2 = Number(b?.ticket);
        // return ticket1 - ticket2 : ticket2 - ticket1;
        return ticket1 - ticket2;
      });

      return sortedData;
    },
    typeOrderSort: function (state, action) {
      const sortedData = state.sort((a, b) => {
        const type1 = a?.type;
        const type2 = b?.type;

        // return typeSort ? type1 - type2 : type2 - type1;
        return -type1 + type2;
      });

      return sortedData;
    },
    volumeOrderSort: function (state, action) {
      const sortedData = state.sort((a, b) => {
        const volume1 = Number(a?.volume); // previously currentVolume was used
        const volume2 = Number(b?.volume); // previously currentVolume was used

        // return volumeSort ? volume1 - volume2 : volume2 - volume1;
        return volume1 - volume2;
      });
      // sortedData.map(d => {
      // console.log(d?.currentVolume);
      // });
      return sortedData;
    },
    openTimeOrderSort: function (state, action) {
      const sortedData = state.sort((a, b) => {
        const time1 = new Date(a?.createdAt).getTime();
        const time2 = new Date(b?.createdAt).getTime();
        return time1 - time2;
        // return openTimeSort ? time1 - time2 : time2 - time1;
      });
      return sortedData;
    },
    closeTimeOrderSort: function (state, action) {
      const sortedData = state.sort((a, b) => {
        const time1 = new Date(a?.updatedAt).getTime();
        const time2 = new Date(b?.updatedAt).getTime();
        return time1 - time2;
        // return closeTimeSort ? time1 - time2 : time2 - time1;
      });
      return sortedData;
    },
    profitOrderSort: function (state, action) {
      const sortedData = state.sort((a, b) => {
        const profit1 = a?.profit;
        const profit2 = b?.profit;
        return profit1 - profit2;
      });
      return sortedData;
    },
  },
});

export const {
  populateOrderHistory,
  symbolSort,
  ticketOrderSort,
  typeOrderSort,
  volumeOrderSort,
  openTimeOrderSort,
  closeTimeOrderSort,
  profitOrderSort,
} = HistoryOrderSlice.actions;

export default HistoryOrderSlice;
