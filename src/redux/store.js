import { configureStore } from "@reduxjs/toolkit";
import all20Reducer from './all20Slice'
import searchAutocompleteReducer from "./searchSlice";
import getByCityReducer from "./getByCitySlice";
import favoritosSlice from "./favoritosSlice";

export const store = configureStore({
  reducer:{
    all: all20Reducer,
    search: searchAutocompleteReducer,
    cities: getByCityReducer,
    favoritos: favoritosSlice
  }
})