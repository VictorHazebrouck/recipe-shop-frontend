import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: { firstname: null, email: null, token: null, preference: {}, favoriterecipes: {}, myRecipes: {} }, 
 planningChecked:false,
};

// création de planningChecked en attendant de gérer les préférences

export const userSlice = createSlice({
 name: 'user',

  initialState,
 reducers: {
   addUser: (state, action) => {
     state.value=action.payload;
   },
   choicePlanning:(state, action) => {
      state.planningChecked=action.payload;
   }
 },
});

export const { addUser, choicePlanning  } = userSlice.actions;
export default userSlice.reducer; 