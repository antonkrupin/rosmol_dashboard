import axios from 'axios';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import routes from '../routes';

const initialState = {
  names: [],
  areas: [],
  criteria: [],
  status: null,
  error: null,
  test: null,
  filtersNames: [],
  filtersAreas: [],
  filtersCriteria: [],
};

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const responseNames = await axios.get(routes.names());
      const responseAreas = await axios.get(routes.areas());
      const responseCriteria = await axios.get(routes.criteria());
      // const { results } = response.data;

      const names = responseNames.data.results;
      const areas = responseAreas.data.results;
      const criteria = responseCriteria.data.results;

      return {names, areas, criteria};
    } catch (error) {
      return rejectWithValue(error.response.status);
    }
  },
);

/* export const fetchAreas = createAsyncThunk(
  'names/fetchAreas',
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

export const fetchCriteria = createAsyncThunk(
  'names/fetchCriteria',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(routes.criteria());
      const { results } = response.data;
      return results;
    } catch (error) {
      return rejectWithValue(error.response.status);
    }
  },
); */

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setNameFilter: (state, action) => {
      state.filtersNames.push(action.payload);
    },
    removeNameFilter: (state, action) => {
      const { id } = action.payload;
      state.filtersNames.forEach((filter, index) => {
        if (filter['id'] === id) {
          state.filtersNames.splice(index, 1)
        }
     });
    },
    setAreaFilter: (state, action) => {
      state.filtersAreas.push(action.payload);
    },
    removeAreaFilter: (state, action) => {
      const { id } = action.payload;
      state.filtersAreas.forEach((filter, index) => {
        if (filter['id'] === id) {
          state.filtersAreas.splice(index, 1)
        }
     });
    },
    setCriteriaFiler: (state, action) => {
      state.filtersCriteria.push(action.payload);
    },
    removeCriteriaFilter: (state, action) => {
      const { id } = action.payload;
      state.filtersCriteria.forEach((filter, index) => {
        if (filter['id'] === id) {
          state.filtersCriteria.splice(index, 1)
        }
     });
    },
  },
  extraReducers: {
    [fetchData.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchData.fulfilled]: (state, action) => {
      state.status = 'resolved';
      const { names, areas, criteria } = action.payload;
      state.names = names;
      state.areas = areas;
      state.criteria = criteria;
    },
    [fetchData.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    /* [fetchAreas.pending]: (state) => {
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
    },*/
  },
});

export const {
  setNameFilter,
  removeNameFilter,
  setAreaFilter,
  removeAreaFilter,
  setCriteriaFiler,
  removeCriteriaFilter,
} = dataSlice.actions;

export default dataSlice.reducer;