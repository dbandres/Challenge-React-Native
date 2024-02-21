import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoritos: [], // Array donde se guardarán los datos
};

const favoritosSlice = createSlice({
  name: 'favoritos',
  initialState,
  reducers: {
    addData: (state, action) => {
      const newData = {
        ...action.payload, 
        fav: true 
      };
      state.favoritos.push(newData);
    },
    removeData: (state, action) => {
      state.favoritos = state.favoritos.filter(item => item.id !== action.payload);
    },
    clearData: (state) => {
      state.favoritos = []; 
    },
  },
});

export const { addData, removeData, clearData } = favoritosSlice.actions;
export default favoritosSlice.reducer;
