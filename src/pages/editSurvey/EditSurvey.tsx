/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './EditSurvey.scss';
import EditSurveyCard from '../../atoms/editSurveyCards/EditSurveyCard';
import { surveyDetail } from '../../redux/slice/survey/surveyDetail';
import { useAppDispatch } from '../../redux/store';
import Pagination from '../pagination/Pagination';
export interface Detail {
	id: number;
	createdAt: Date;
	surveyName: string;
	isActive: boolean;
	surveyId: string; // Make sure surveyId is present as well
	surveyStatus: string;
}

const EditSurvey: React.FC = () => {
	const dispatch = useAppDispatch();
	const [surveyData, setSurveyData] = useState<Detail[]>([]);
	const [totalCount, setTotalCount] = useState<number>(0);
	const [currentPage, setCurrentpage] = useState<number>(1);
	useEffect(() => {
		const fetchSurveyDetails = async () => {
			const queryData = { currentPage };
			const response = await dispatch(surveyDetail(queryData));

			const Count = response.payload.data.totalCount;

			setSurveyData(response.payload.data.surveys);
			setTotalCount(response.payload.data.totalCount);
		};
		fetchSurveyDetails();
	}, [currentPage]);

	return (
		<>
			<div className='edit-container'>
				{surveyData.map((survey) => (
					<EditSurveyCard
						key={survey.id}
						id={survey.id}
						active={survey.isActive ? 'Active' : 'Inactive'}
						status={survey.surveyStatus}
						surveyName={survey.surveyName}
						updatedDate={survey.createdAt.toLocaleString()}
						issue={'Add Questions'}
					/>
				))}
			</div>
			<div className='pagination-container'>
				<Pagination Count={totalCount} currentPage={currentPage} setCurrentpage={setCurrentpage} />
			</div>
		</>
	);
};

export default EditSurvey;
