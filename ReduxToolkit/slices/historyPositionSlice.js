import {createSlice} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import store from '../store';

const HistoryPositionSlice = createSlice({
  initialState: [],
  name: 'historyPosition',
  reducers: {
    populatePositionHistory: function (state, action) {
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
    ticketPositionSort: function (state, action) {
      const sortedData = state.sort((a, b) => {
        const ticket1 = Number(a?.ticket);
        const ticket2 = Number(b?.ticket);
        // return ticket1 - ticket2 : ticket2 - ticket1;
        return ticket1 - ticket2;
      });

      return sortedData;
    },
    typePositionSort: function (state, action) {
      const sortedData = state.sort((a, b) => {
        const type1 = a?.type;
        const type2 = b?.type;

        // return typeSort ? type1 - type2 : type2 - type1;
        return -type1 + type2;
      });

      return sortedData;
    },
    volumePositionSort: function (state, action) {
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
    openTimePositionSort: function (state, action) {
      const sortedData = state.sort((a, b) => {
        const time1 = new Date(a?.createdAt).getTime();
        const time2 = new Date(b?.createdAt).getTime();
        return time1 - time2;
        // return openTimeSort ? time1 - time2 : time2 - time1;
      });
      return sortedData;
    },
    closeTimePositionSort: function (state, action) {
      const sortedData = state.sort((a, b) => {
        const time1 = new Date(a?.updatedAt).getTime();
        const time2 = new Date(b?.updatedAt).getTime();
        return time1 - time2;
        // return closeTimeSort ? time1 - time2 : time2 - time1;
      });
      return sortedData;
    },
    profitPositionSort: function (state, action) {
      const sortedData = state.sort((a, b) => {
        const profit1 = a?.profit;
        const profit2 = b?.profit;
        return profit1 - profit2;
      });
      return sortedData;
    },
    // time based sorting
    // timeBasedSort: function (state, action) {
    //   const today = moment().format('l');
    //   const lastweek = moment().subtract(7, 'days').format('l');
    //   const lastMonth = moment().subtract(1, 'month').calendar();
    //   const last3Month = moment().subtract(3, 'month').calendar();

    //   switch (action.type) {
    //     case 'today':
    //       let filteredArray = [];
    //       for (let i = 0; i < state.length; i++) {
    //         if (
    //           new Date(state[i]?.createdAt).toDateString() ===
    //           new Date(today.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, '$3-$1-$2')).toDateString()
    //         ) {
    //           // console.log('found');
    //           filteredArray.push(positionData[i]);
    //         } else {
    //           console.log('not found');
    //           console.log(new Date(positionData[i].createdAt).toDateString());
    //           console.log(new Date(today).toDateString());
    //         }
    //       }
    //       break;
    //     case 'lastweek':
    //       break;
    //     case 'last3month':
    //       break;
    //     case 'customPeriod':
    //       break;
    //     default:
    //       'Invalid type';
    //       return state;
    //   }
    // },
  },
});

export const {
  populatePositionHistory,
  symbolSort,
  ticketPositionSort,
  typePositionSort,
  volumePositionSort,
  openTimePositionSort,
  closeTimePositionSort,
  profitPositionSort,
} = HistoryPositionSlice.actions;

export default HistoryPositionSlice;
