import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from 'axios';

import routes from '../routes';

const initialState = {
  areas: [],
  status: null,
  error: null,
};

export const fetchAreas = createAsyncThunk(
  'areas/fetchAreas',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(routes.areas());
      const { results } = response.data;
      return results;
    } catch (error) {
      return rejectWithValue(error.response.status);
    }
  },
);

const areasSlice = createSlice({
  name: 'areas',
  initialState,
  reducers: {
    
  },
  extraReducers: {
    [fetchAreas.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchAreas.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.areas = action.payload;
    },
    [fetchAreas.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

/* export const {
  setTest,
} = namesSlice.actions; */

export default areasSlice.reducer;