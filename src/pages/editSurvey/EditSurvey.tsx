import React, { useEffect, useState } from 'react';
import './EditSurvey.scss';
import EditSurveyCard from '../../atoms/editSurveyCards/EditSurveyCard';
import { surveyDetail } from '../../redux/slice/survey/surveyDetail';
import { useAppDispatch } from '../../redux/store';

export interface Detail {
	id: number;
	createdAt: Date;
	surveyName: string | null;
	isActive: boolean;
	surveyId: string; // Make sure surveyId is present as well
	surveyStatus: string;
}

const EditSurvey: React.FC = () => {
	const dispatch = useAppDispatch();
	const [surveyData, setSurveyData] = useState<Detail[]>([]); // Initialize as an empty array of type Detail

	useEffect(() => {
		const fetchSurveyDetails = async () => {
			const response = await dispatch(surveyDetail());
			// Ensure the payload exists and has data before updating state
			if (response?.payload?.data) {
				setSurveyData(response.payload.data); // Set survey data here
				console.log(response.payload.data, 'nikhil'); // Log fetched survey data
			}
		};

		fetchSurveyDetails(); // Call the fetch function
	}, [dispatch]);

	return (
		<div className='edit-container'>
			{surveyData.map((survey) => (
				<EditSurveyCard
					key={survey.id} // Set the key prop here to avoid warnings
					id={survey.id}
					active={survey.isActive ? 'Active' : 'Inactive'} // Show status
					status={survey.surveyStatus}
					surveyName={survey.surveyName}
					updatedDate={survey.createdAt.toLocaleString()} // Convert date to a user-friendly string
					issue={'Add Questions'} // Display survey name
				/>
			))}
		</div>
	);
};

export default EditSurvey;
