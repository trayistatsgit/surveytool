import React from 'react';
import './EditSurvey.scss';
import EditSurveyCard from '../../atoms/editSurveyCards/EditSurveyCard';

const EditSurvey: React.FC = () => {
	const surveyData = [
		{ id: 1, status: 'Draft', updatedDate: '09/23/2024', issue: 'Add question' },
		{ id: 1, status: 'Draft', updatedDate: '09/23/2024', issue: 'Add question' },
		{ id: 1, status: 'Draft', updatedDate: '09/23/2024', issue: 'Add question' },
		{ id: 1, status: 'Draft', updatedDate: '09/23/2024', issue: 'Add question' },
		{ id: 1, status: 'Draft', updatedDate: '09/23/2024', issue: 'Add question' },
		{ id: 1, status: 'Draft', updatedDate: '09/23/2024', issue: 'Add question' },
		{ id: 1, status: 'Draft', updatedDate: '09/23/2024', issue: 'Add question' },
		{ id: 1, status: 'Draft', updatedDate: '09/23/2024', issue: 'Add question' },
	];

	return (
		<div className='edit-container'>
			{surveyData.map((survey) => (
				<EditSurveyCard key={survey.id} status={survey.status} updatedDate={survey.updatedDate} issue={survey.issue} />
			))}
		</div>
	);
};

export default EditSurvey;
