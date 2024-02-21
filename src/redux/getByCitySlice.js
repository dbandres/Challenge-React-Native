import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cities: [],
  loading: false,
  error: null,
};

// Acción asíncrona para obtener las cervecerías
export const getByCity = createAsyncThunk('getByCity',async (city) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const response = await axios.get(`https://api.openbrewerydb.org/v1/breweries?by_city=${city}&per_page=10`);

    return response.data;
  } catch (error) {
    throw error;
  }
});

export const getByCitySlice = createSlice({
  name: 'cities',
  initialState,
    extraReducers: (builder) => {
      builder
        .addCase(getByCity.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getByCity.fulfilled, (state, action) => {
          state.loading = false;
          state.cities = action.payload;
        })
        .addCase(getByCity.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    }
});

const getByCityReducer = getByCitySlice.reducer;
export default getByCityReducer;