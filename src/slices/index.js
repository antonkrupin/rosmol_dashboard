
import { configureStore } from '@reduxjs/toolkit';

import dataReducer from '../slices/dataReducer.js';

export default configureStore({
	reducer: {
		data: dataReducer,
	},
});