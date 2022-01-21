import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

// sliceを定義
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {uid: "", photoUrl:"", displayName:""}
  },
  //reducer
  reducers: {
    //action
    login: (state, action) => {
      state.user = action.payload;
    },
    //action
    logout: (state) => {
      state.user = {uid:"", photoUrl:"", displayName:""};
    },
  },
});

export const { login, logout } = userSlice.actions;

// ReactコンポーネントからのIF、stateを返却する
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
