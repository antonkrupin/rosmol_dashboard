import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from 'axios';

import routes from "../routes";

const initialState = {
  criteria: [],
  status: null,
  error: null,
};

export const fetchCriteria = createAsyncThunk(
  'criteria/fetchCriteria',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(routes.criteria());
      const { results } = response.data;
      return results;
    } catch (error) {
      return rejectWithValue(error.response.status);
    }
  },
);

const criteriaSlice = createSlice({
  name: 'criteria',
  initialState,
  reducers: {
    
  },
  extraReducers: {
    [fetchCriteria.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchCriteria.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.criteria = action.payload;
    },
    [fetchCriteria.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export default criteriaSlice.reducer;