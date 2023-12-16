import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  credentials: { firstname: "", email: "", token: "" },
  preferences: {
    planningChecked: false,
    regime: [],
    excludeAliments: [],
    favoriteStore: "",
    postCode: null,
  },
  personalRecipes: { favoriteRecipes: [], myRecipes: [] },
  plannedRecipes: { currentRecipes: [], historyRecipes: [] },
};

// création de planningChecked en attendant de gérer les préférences

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.value = action.payload;
    },
    choicePlanning: (state, action) => {
      state.planningChecked = action.payload;
    },
    modifyRegime: (state, action) => {
      state.preferences.regime = action.payload;
    },

    //working
    logIn: (state, action) => {
      const {
        name,
        email,
        token,
        favoriteRecipes,
        myRecipes,
        preference,
        currentRecipes,
        historyRecipes,
      } = action.payload;

      state.credentials = {
        name: name,
        email: email,
        token: token,
      };
      state.preferences = {
        planningChecked: preference.planningDisplay,
        regime: preference.regime,
        excludeAliments: preference.excludeAliments,
        favoriteStore: preference.favoriteStore,
        postCode: preference.postCode,
      };
      state.personalRecipes = {
        favoriteRecipes: favoriteRecipes,
        myRecipes: myRecipes,
      };
      state.plannedRecipes = {
        currentRecipes: currentRecipes,
        historyRecipes: historyRecipes,
      };
      state.isLoggedIn = true;
    },
  },
});

export const { addUser, choicePlanning, modifyRegime, logIn } =
  userSlice.actions;
export default userSlice.reducer;
