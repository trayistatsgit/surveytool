import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MasterLayout from '../layout/MasterLayout';
import SignUp from '../pages/auth/SignUp';
import LogIn from '../pages/auth/Login';
import ForgotPassword from '../pages/auth/ForgotPassword/ForgotPassword';
import CreateSurvey from '../pages/createSurvey/CreateSurvey';
import StartingPage from '../pages/startingPage/StartingPage';
import SurveyPreview from '../pages/createSurvey/Partials/SurveyPreview';

const router = createBrowserRouter([
	{
		path: '/',
		element: <MasterLayout />,  
		children: [
			{
				path: '/start',
				element: <StartingPage />,
			},
			{
				path:'create-survey',
				element:<CreateSurvey />
			},
			{
				path:'survey-preview',
				element:<SurveyPreview />
			}
			
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
