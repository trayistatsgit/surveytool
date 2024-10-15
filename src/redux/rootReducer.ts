// rootReducer.ts
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import reducer from './slice/reducer';

// Root persist configuration
const rootPersistConfig = {
	key: 'root',
	storage,
	keyPrefix: 'redux-',
};
// Combining reducers
const rootReducer = combineReducers({
	...reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export { rootPersistConfig, rootReducer };
