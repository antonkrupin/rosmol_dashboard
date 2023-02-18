import axios from 'axios';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import routes from '../routes';

const initialState = {
  names: [],
  areas: [],
  criteria: [],
  status: null,
  error: null,
  filtersNames: [],
  filtersAreas: [],
  filtersCriteria: [],
  data: [],
};

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const responseNames = await axios.get(routes.names());
      const responseAreas = await axios.get(routes.areas());
      const responseCriteria = await axios.get(routes.criteria());

      const names = responseNames.data.results;
      const areas = responseAreas.data.results;
      const criteria = responseCriteria.data.results;

      return {names, areas, criteria};
    } catch (error) {
      return rejectWithValue(error.response.status);
    }
  },
);

export const filterData = createAsyncThunk(
  'data/filterData',
  async (attr, { rejectWithValue }) => {
    const { namesF, criteriaF, areasF, month, year} = attr;
    try {
      const response = await axios.post(routes.reformatter(), {
        "name_filter": namesF.map((name) => name.id),
        "crit_equal": criteriaF.map((criteria) => criteria.id), 
        "area_equal": areasF.map((area) => String(area.id)),
        "date_equal": [{"month": month, "year": year}]
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.status);
    }
  }
)

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
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
    [filterData.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [filterData.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.data = action.payload;
    },
    [filterData.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
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