import React, { useEffect, useState } from 'react';
import './Surveys.scss';
import EditSurveyCard from '../../atoms/editSurveyCards/EditSurveyCard';
import { surveyDetailThunk } from '../../redux/slice/survey/surveyDetail';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import Pagination from '../pagination/Pagination';
import { useNavigate } from 'react-router-dom';

export interface Detail {
	id: number;
	createdAt: Date;
	surveyName: string;
	isActive: boolean;
	surveyId: string;
	surveyStatus: string;
}

const Surveys: React.FC = () => {
	const dispatch = useAppDispatch();
	const [surveyData, setSurveyData] = useState<Detail[]>([]);
	const [totalCount, setTotalCount] = useState<number>(0);
	const [currentPage, setCurrentpage] = useState<number>(1);
	const navigate = useNavigate();
	const { data } = useAppSelector((state) => state.surveyDetailSlice);
	useEffect(() => {
		const queryData = { currentPage };
		dispatch(surveyDetailThunk(queryData));
	}, [currentPage, dispatch]);
	useEffect(() => {
		if (data) {
			setSurveyData(data?.data?.surveys);
			setTotalCount(data?.data?.totalCount);
		}
	}, [data]);
	const redirectSurvey = (surveyId: string) => {
		navigate(`/create-survey/${surveyId}`);
	};
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
						redirectSurvey={() => redirectSurvey(survey?.surveyId)}
					/>
				))}
			</div>
			<div className='pagination-container'>
				<Pagination Count={totalCount} currentPage={currentPage} setCurrentpage={setCurrentpage} />
			</div>
		</>
	);
};

export default Surveys;
