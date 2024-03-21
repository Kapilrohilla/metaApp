import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    populateUser(state, action) {
      // console.log(action.payload, '<<-- userinfo');
      return action.payload;
    },
    updateMargin(state, action) {
      return {
        ...state,
        margin: action.payload,
      };
    },
  },
});
export default userSlice;
export const {populateUser, updateMargin} = userSlice.actions;
