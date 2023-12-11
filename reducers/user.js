import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: { firstname: null, email: null, token: null, preference: {}, favoriterecipes: {}, muRecipes: {} },
};

export const addUserSlice = createSlice({
 name: 'user',

  initialState,
 reducers: {
   addUser: (state, action) => {
     state.value=action.payload;
   },
 },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer; 