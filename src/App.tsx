import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
// import AppRoutes from './routes/Routes';
import { RouterProvider } from 'react-router-dom';
import router from './routes/Routes';

const App = () => {
	return (
		<>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<RouterProvider router={router} />
				</PersistGate>
			</Provider>
		</>
	);
};

export default App;
