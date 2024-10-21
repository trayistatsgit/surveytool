import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MasterLayout from '../layout/MasterLayout';
import SignUp from '../pages/auth/SignUp';
import LogIn from '../pages/auth/Login';
import ForgotPassword from '../pages/auth/ForgotPassword/ForgotPassword';
import CreateSurvey from '../pages/createSurvey/CreateSurvey';
import StartingPage from '../pages/startingPage/StartingPage';
import SurveyPreview from '../pages/createSurvey/Partials/SurveyPreview';
import EditSurvey from '../pages/editSurvey/EditSurvey';
import Summary from '../pages/summery/Summery';
import DesignSurvey from '../pages/designsurvey/DesignSurvey';
import CollectResponse from '../pages/collectresponse/CollectResponse';
import AnalyzeResults from '../pages/analyzeresults/AnalyzerResult';
import PresentResult from '../pages/presentresult/PresentResult';
import NewPreview from '../pages/createSurvey/Partials/NewPreview';
import AttemptSurvey from '../pages/createSurvey/Partials/AttemptSurvey';

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
				path: '/create-survey/:surveyId',
				element: <CreateSurvey />,
			},
			{
				path: '/my-surveys',
				element: <EditSurvey />,
			},
			{
				path: '/summary',
				element: <Summary />,
			},
			{
				path: '/design-survey',
				element: <DesignSurvey />,
			},
			{},
			{
				path: '/collect-responses',
				element: <CollectResponse />,
			},
			{
				path: '/analyze-results',
				element: <AnalyzeResults />,
			},
			{
				path: '/present-results',
				element: <PresentResult />,
			},
		],
	},
	{
		path: '/survey-preview/:surveyId',
		element: <NewPreview />,
	},
	{
		path: '/survey-attempt/:surveyId',
		element: <AttemptSurvey />,
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
