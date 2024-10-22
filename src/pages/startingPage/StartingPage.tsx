import React from 'react';
import CardAtom from '../../atoms/cardAtom/CardAtom';
import './StartingPage.scss';
import { createSurveyId } from '../../redux/slice/survey/createSurvey';
import { useAppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';

const StartingPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const apiCall = async () => {
		const res: any = await dispatch(createSurveyId());
		const { error, data, status } = res?.payload;
		if (status === 200 && !error) {
			navigate(`/create-survey/${data.surveyId}`);
		}
	};
	return (
		<div>
			<div className='CardAtom'>
				<CardAtom
					imgScr='https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D'
					Heading='Start from scratch'
					Description='Begin with a blank survey or form. Then add your questions, text, and images.'
					onClick={apiCall} // Pass the apiCall function
				/>
			</div>
		</div>
	);
};

export default StartingPage;
