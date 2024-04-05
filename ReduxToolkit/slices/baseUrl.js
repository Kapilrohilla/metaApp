import {createSlice} from '@reduxjs/toolkit';

const BaseUrlSlice = createSlice({
  initialState: 'http://35.154.68.218:8080',
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
