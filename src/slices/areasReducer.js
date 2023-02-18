import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from 'axios';

import routes from '../routes';

const initialState = {
  areas: [],
  status: null,
  error: null,
  filters: [],
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
    setAreaFilter: (state, action) => {
      state.filters.push(action.payload);
    },
    removeAreaFilter: (state, action) => {
      const { id } = action.payload;
      state.filters.forEach((filter, index) => {
        if (filter['id'] === id) {
          state.filters.splice(index, 1)
        }
     });
    },
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

export const {
  setAreaFilter,
  removeAreaFilter,
} = areasSlice.actions;

export default areasSlice.reducer;