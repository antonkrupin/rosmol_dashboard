
import { configureStore } from '@reduxjs/toolkit';

// import dataReducer from '../slices/dataReducer';
import areasReducer from '../slices/areasReducer';
import namesReducer from '../slices/namesReducer';
import criteriaReducer from '../slices/criteriaReducer';

export default configureStore({
	reducer: {
		// data: dataReducer,
		areas: areasReducer,
		names: namesReducer,
		criteria: criteriaReducer,
	},
});