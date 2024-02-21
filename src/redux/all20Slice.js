import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  all: [],
  loading: false,
  error: null,
};

// Acción asíncrona para obtener las cervecerías
export const getBreweries = createAsyncThunk('getBreweries',async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const response = await axios.get(`https://api.openbrewerydb.org/v1/breweries?per_page=40`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const all20Slice = createSlice({
  name: 'all',
  initialState,
  reducers:{
    resetStateAll: (state) => {
      state.all = [];
      state.loading = false;
      state.error = null;
    },
  },
    extraReducers: (builder) => {
      builder
        .addCase(getBreweries.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getBreweries.fulfilled, (state, action) => {
          state.loading = false;
          state.all = action.payload;
        })
        .addCase(getBreweries.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    }
});

export const {resetStateAll} = all20Slice.actions
const all20Reducer = all20Slice.reducer;
export default all20Reducer;
