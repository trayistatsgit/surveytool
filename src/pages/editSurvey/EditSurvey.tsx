import React, { useEffect, useState } from 'react';
import './EditSurvey.scss';
import EditSurveyCard from '../../atoms/editSurveyCards/EditSurveyCard';
import { detailSurveyThunk } from '../../redux/slice/survey/detailSurvey';
import { useAppDispatch } from '../../redux/store';

const EditSurvey: React.FC = () => {
	const dispatch = useAppDispatch();
	const [surveyData, setSurveyData] = useState<any[]>([]); // State to store survey data

	// Fetch questions from the backend
	const getQuestions = async () => {
		try {
			const res = await dispatch(detailSurveyThunk());
			console.log(res, 'ram');
			setSurveyData(res.payload.data); // Set the fetched data into state
		} catch (error) {
			console.error('Error fetching survey data:', error);
		}
	};

	useEffect(() => {
		getQuestions();
	}, []);

	return (
		<div className='edit-container'>
			{surveyData.map((survey) => (
				<EditSurveyCard key={survey.id} status={survey.status} updatedDate={survey.updatedDate} issue={survey.issue} />
			))}
		</div>
	);
};

export default EditSurvey;
