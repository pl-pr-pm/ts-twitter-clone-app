import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface USER {
  displayName: string;
  photoUrl: string;
}


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
      console.log("login invoked!")
      state.user = action.payload;
    },
    //action
    logout: (state) => {
      console.log("logout invoked!")
      state.user = {uid:"", photoUrl:"", displayName:""};
    },
    updateUserProfile: (state, action:PayloadAction<USER>) => {
      state.user.displayName = action.payload.displayName;
      state.user.photoUrl = action.payload.photoUrl;
    }
  },
});

export const { login, logout,  updateUserProfile} = userSlice.actions;

// ReactコンポーネントからのIF、stateを返却する
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
