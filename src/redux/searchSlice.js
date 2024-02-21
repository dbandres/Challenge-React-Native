import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  autocomplete: [],
  loading: false,
  error: null,
};

export const autocompleteSearch = createAsyncThunk('autocompleteSearch', async (search) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 700));
    const response = await axios.get(`https://api.openbrewerydb.org/v1/breweries/autocomplete?query=${search}`);
    const autocompleteData = response.data;
    const breweryDetailPromises = autocompleteData.map(brewery => axios.get(`https://api.openbrewerydb.org/v1/breweries/${brewery.id}`));
    const breweryDetailResponses = await Promise.all(breweryDetailPromises);
    const breweryDetails = breweryDetailResponses.map(response => response.data);
    return breweryDetails
  } catch (error) {
    throw error;
  }
});

export const searchAutocomplete = createSlice({
  name: 'search',
  initialState,
  reducers:{
    resetState: (state) => {
      state.autocomplete = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(autocompleteSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(autocompleteSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.autocomplete = action.payload;
      })
      .addCase(autocompleteSearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const {resetState} = searchAutocomplete.actions
const searchAutocompleteReducer = searchAutocomplete.reducer;
export default searchAutocompleteReducer;