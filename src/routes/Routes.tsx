import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MasterLayout from '../layout/MasterLayout';
import SignUp from '../pages/auth/SignUp';
import LogIn from '../pages/auth/Login';
import ForgotPassword from '../pages/auth/ForgotPassword/ForgotPassword';

const router = createBrowserRouter([
	{
		path: '/',
		element: <MasterLayout />,  
		children: [
		
			
			
			
		],
	},
	{
		path: '/sign-up',
		element: <SignUp />,
	},
	{
		path: '/login',
		element: <LogIn />,
	},
	{
		path: '/forgot-password',
		element: <ForgotPassword />,
	},
]);

export default router;
