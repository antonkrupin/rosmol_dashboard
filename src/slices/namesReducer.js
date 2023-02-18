import axios from 'axios';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import routes from '../routes';

const initialState = {
  names: [],
  status: null,
  error: null,
  test: null,
  filters: [],
};

export const fetchNames = createAsyncThunk(
  'names/fetchNames',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(routes.names());
      const { results } = response.data;
      return results;
    } catch (error) {
      return rejectWithValue(error.response.status);
    }
  },
);

const namesSlice = createSlice({
  name: 'names',
  initialState,
  reducers: {
    setNameFilter: (state, action) => {
      state.filters.push(action.payload);
    },
    removeNameFilter: (state, action) => {
      const { id } = action.payload;
      state.filters.forEach((filter, index) => {
        if (filter['id'] === id) {
          state.filters.splice(index, 1)
        }
     });
    },
  },
  extraReducers: {
    [fetchNames.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchNames.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.names = action.payload;
    },
    [fetchNames.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export const {
  setNameFilter,
  removeNameFilter,
} = namesSlice.actions;

export default namesSlice.reducer;