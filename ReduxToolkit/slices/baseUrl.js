import {createSlice} from '@reduxjs/toolkit';

const BaseUrlSlice = createSlice({
  initialState: 'http://3.111.211.154:8080',
  name: 'baseUrl',
  reducers: {
    updateBaseUrl: function (state, action) {
      const newState = action.payload;
      return newState;
    },
  },
});

export const {updateBaseUrl} = BaseUrlSlice.actions;
export default BaseUrlSlice;
