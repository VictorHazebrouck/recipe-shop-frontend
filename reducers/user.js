import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: { firstname: null, email: null, token: null, preference: {}, favoriterecipes: {}, myRecipes: {}, regime:[] }, 
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
   },
   modifyRegime: (state, action) =>{
    state.value.regime = action.payload
   }
 },
});

export const { addUser, choicePlanning, modifyRegime  } = userSlice.actions;
export default userSlice.reducer; 