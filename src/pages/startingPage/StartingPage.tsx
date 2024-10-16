import React, { useEffect } from 'react';
import CardAtom from '../../atoms/cardAtom/CardAtom';
import './StartingPage.scss';
import { createSurveyId } from '../../redux/slice/survey/createSurvey';
import { useAppDispatch, useAppSelector } from '../../redux/store';

const StartingPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const data = useAppSelector((state) => state);
	console.log('data', data);
	const apiCall = () => {
		console.log('API Call Triggered');
		dispatch(createSurveyId());
	};

	return (
		<div>
			<div className='CardAtom'>
				<CardAtom
					imgScr='https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D'
					Heading='Start from scratch'
					Description='Begin with a blank survey or form. Then add your questions, text, and images.'
					linkTo='/create-survey' // Specify the path you want to navigate to
					onClick={apiCall} // Pass the apiCall function
				/>
			</div>
		</div>
	);
};

export default StartingPage;
