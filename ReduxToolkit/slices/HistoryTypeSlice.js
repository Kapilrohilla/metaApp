import {createSlice} from '@reduxjs/toolkit';

const HistoryTypeSlice = createSlice({
  initialState: 1,
  name: 'HistoryType',
  reducers: {
    changeType: function (_state, action) {
      return action.payload;
    },
  },
});

export default HistoryTypeSlice;
export const {changeType} = HistoryTypeSlice.actions;
