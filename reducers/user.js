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
  position: {
    lat: 3.092952,
    lon: 50.631881,
  },
};

// création de planningChecked en attendant de gérer les préférences

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.value = action.payload;
    },
    modifyPlanning: (state, action) => {
      state.preferences.planningChecked = action.payload;
    },
    modifyRegime: (state, action) => {
      state.preferences.regime = action.payload;
    },
    modifyExcludeIngredients: (state, action) => {
      state.preferences.excludeAliments = action.payload;
    },
    modifyCurrentRecipe: (state, action) => {
      state.plannedRecipes.currentRecipes = action.payload;
    },
    modifyHistory: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.plannedRecipes.historyRecipes.push(...action.payload);
      } else {
        state.plannedRecipes.historyRecipes.push(action.payload);
      }
    },
    removeFavoriteRecipes: (state, action) => {
      state.personalRecipes.favoriteRecipes =
        state.personalRecipes.favoriteRecipes.filter(
          (e) => action.payload._id !== e._id
        );
    },
    addFavoriteRecipes: (state, action) => {
      state.personalRecipes.favoriteRecipes = [
        ...state.personalRecipes.favoriteRecipes,
        action.payload,
      ];
    },
    chooseFavoriteStore: (state, action) => {
      state.preferences.favoriteStore = action.payload;
    },
    setPosition: (state, action) => {
      state.position = { lat: action.payload.lat, lon: action.payload.lon };
    },
    initUser: (state, action) => {
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
    },
    setLogin: (state, action) => {
      state.isLoggedIn = true;
    },
    setLogout: (state, action) => {
      state.isLoggedIn = false;
    },
  },
});

export const {
  addUser,
  modifyPlanning,
  modifyRegime,
  initUser,
  setLogin,
  setLogout,
  modifyExcludeIngredients,
  modifyCurrentRecipe,
  modifyHistory,
  addFavoriteRecipes,
  removeFavoriteRecipes,
  chooseFavoriteStore,
  setPosition,
} = userSlice.actions;
export default userSlice.reducer;
