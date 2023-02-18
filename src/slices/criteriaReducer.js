import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from 'axios';

import routes from "../routes";

const initialState = {
  criteria: [],
  status: null,
  error: null,
  filters: [],
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
    setCriteriaFiler: (state, action) => {
      state.filters.push(action.payload);
    },
    removeCriteriaFilter: (state, action) => {
      const { id } = action.payload;
      state.filters.forEach((filter, index) => {
        if (filter['id'] === id) {
          state.filters.splice(index, 1)
        }
     });
    },
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

export const {
  setCriteriaFiler,
  removeCriteriaFilter,
} = criteriaSlice.actions;


export default criteriaSlice.reducer;