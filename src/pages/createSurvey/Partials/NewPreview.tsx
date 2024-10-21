import React, { useEffect, useState } from 'react';
import '../CreateSurvey.scss';
import { minus, plus } from '../../../assets/common-img';
import NewPage from '../Partials/NewPage';
import { Button, Div } from '../../../blocks';
import LogoCreateSurvey from '../Partials/LogoCreateSurvey';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import NewTextEditor from '../../../components/textEditorForm/NewTextEditor';
import { createQuestionType } from '../../../redux/slice/questionType/questionType';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { upsertSurveyQuestionThunk } from '../../../redux/slice/survey/upsertSurveyQuestion';
import { updateSurveyThunk } from '../../../redux/slice/survey/updateSurvey';
import { getSurveyByIdThunk } from '../../../redux/slice/survey/getSurveyById';
//import { useSelector } from 'react-redux';

export interface Question {
	questionId: number | null;
	questionName: string;
	questionType: number;
	options?: IQuestionName[];
}
interface IQuestionName {
	id?: string | number;
	optionText?: string;
}
interface CreateSurveyFormProps {
	onSubmit?: (responses: Question[]) => void;
}
interface QuestionType {
	id: number;
	name: string;
}

// Define the structure for the response of the getQuestionTypesApi function

const NewPreview: React.FC<CreateSurveyFormProps> = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { surveyId } = useParams();
	const surveyInitialData = {
		surveyName: 'Untitle',
		surveyDescription: 'Untitle',
		logo: '',
		pageNo: 1,
		surveyId: surveyId,
		surveyQuestions: [
			{
				questionType: 4,
				questionId: 1,
				questionName: '',
				options: [
					{
						optionId: 1,
						optionText: '',
					},
				],
			},
		],
	};
	const [surveyForm, setSurveyForm] = useState(surveyInitialData);
	// Question text input change handle
	const { data } = useAppSelector((state) => state.getSurveyByIdSlice);
	const handlePreviewSurvey = () => {
		window.open(`/survey-preview/${surveyId}`, '_blank');
		// navigate('/survey-preview', { state: { questions, uploadedLogo } });
	};
	// const handleSubmit = async (e: React.FormEvent) => {
	// 	e.preventDefault();
	// 	if (!questionName) {
	// 		return;
	// 	}
	// 	const filteredOptions = options.filter((option) => option.trim() !== '').map((option) => ({ optionId: '', optionText: option }));
	// 	const newQuestion: Question = {
	// 		questionId: null,
	// 		questionName,
	// 		questionType,
	// 		options: questionType === 2 || questionType === 3 || questionType === 5 || questionType === 6 ? filteredOptions : [],
	// 	};
	// 	dispatch(upsertSurveyQuestionThunk({ surveyId: '29f9d348-3f91-4188-a61d-86b3b58e98c0', ...newQuestion }));
	// 	setSurveyForm((prev: any) => ({
	// 		...prev,
	// 		surveyQuestions: [...prev.surveyQuestions, newQuestion],
	// 	}));
	// 	setOptions([]);
	// 	setQuestions([]);
	// 	setQuestionText('');
	// 	setQuestionType(1);
	// 	setNewQuestions([]);
	// 	setIsFormVisible(false);
	// 	// resetForm();
	// 	// setAreButtonsVisible(false);
	// };
	useEffect(() => {
		dispatch(getSurveyByIdThunk('29f9d348-3f91-4188-a61d-86b3b58e98c0'));
	}, []);
	useEffect(() => {
		const surveyData = data?.data?.[0];
		const cloneData = JSON.stringify(surveyData);
		const parseData = JSON.parse(cloneData);
		setSurveyForm(parseData);
	}, [data]);
	return (
		<Div>
			<div className='newContaner'>
				<>
					<div className='containernew'>
						<section className='mainContainer'>
							<section className='containerCreateSurvey'>
								{/* Logo Popup Section */}
								<div>{/* <LogoCreateSurvey onLogoUpload={setUploadedLogo} /> */}</div>

								<section className='surveyPage'>
									<div className='surveyTitle'>
										<h1>
											<span>{surveyForm.surveyName}</span>
										</h1>
									</div>

									<div className='surveyPage'>
										<div className='surveyTitle'>
											<h1>
												<span>{surveyForm.surveyDescription}</span>
											</h1>
										</div>
									</div>
									<div>
										<h3>Questions Preview:</h3>
										{surveyForm.surveyQuestions.map((q) => (
											<div key={q.questionId} className='question-preview'>
												<strong>Question: {q.questionId}</strong> {q.questionName || 'No question text provided'}
												<div className='options-preview'>
													{q.questionType === 2 && q.options && (
														<select className='preview-dropdown'>
															{q.options
																.filter((option) => option.optionText.trim() !== '')
																.map((option, idx) => (
																	<option key={idx} value={option.optionText}>
																		{option.optionText}
																	</option>
																))}
														</select>
													)}

													{q.questionType === 3 &&
														q.options &&
														q.options
															.filter((option) => option.optionText.trim() !== '')
															.map((option, idx) => (
																<div key={idx}>
																	<input type='checkbox' id={`mc-${q.questionId}-${idx}`} />
																	<label htmlFor={`mc-${q.questionId}-${idx}`}>{option.optionText}</label>
																</div>
															))}

													{q.questionType === 5 &&
														q.options &&
														q.options
															.filter((option) => option.optionText.trim() !== '')
															.map((option, idx) => (
																<div key={idx}>
																	<input
																		type='radio'
																		name={`radio-${q.questionId}`}
																		id={`radio-${q.questionId}-${idx}`}
																	/>
																	<label htmlFor={`radio-${q.questionId}-${idx}`}>{option.optionText}</label>
																</div>
															))}

													{q.questionType === 6 &&
														q.options &&
														q.options
															.filter((option) => option.optionText.trim() !== '')
															.map((option, idx) => (
																<div key={idx}>
																	<input type='checkbox' id={`cb-${q.questionId}-${idx}`} />
																	<label htmlFor={`cb-${q.questionId}-${idx}`}>{option.optionText}</label>
																</div>
															))}

													{q.questionType === 1 && <input type='text' placeholder='Text input preview' />}
													{q.questionType === 4 && <textarea placeholder='Textarea input preview'></textarea>}
												</div>
											</div>
										))}
									</div>
								</section>
								{/* prievw div closed  */}
								<section className='surveyPage'>
									{/* <div className='createDoneContainer'>
										<span>
											<button className='createEditButton'>EDIT</button>
										</span>
									</div> */}

									<div className='createFooterContainer'>
										<div className='createFooterDivOne'>
											<p className='createFooterParaOne'>Powered by</p>
											<b className='createFooterBold'>Survey Programming Tool</b>
											<p className='createFooterParaTwo'>
												See how easy it is to <a href=''>create survey and forms</a>
											</p>
										</div>
										{/* <div>
											<button className='createFooterDivTwo'>Hide Footer</button>
										</div> */}
									</div>

									<div className='createPreviewContainer'>
										<button className='createPreviewButton' onClick={handlePreviewSurvey}>
											Update the Survey
										</button>
									</div>
								</section>
							</section>
						</section>
					</div>
				</>
			</div>
		</Div>
	);
};

export default NewPreview;
