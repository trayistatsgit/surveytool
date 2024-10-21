import React, { useEffect, useState } from 'react';
import './CreateSurvey.scss';
import { minus, plus } from '../../assets/common-img';
import NewPage from './Partials/NewPage';
import { Button, Div } from '../../blocks';
import LogoCreateSurvey from './Partials/LogoCreateSurvey';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import NewTextEditor from '../../components/textEditorForm/NewTextEditor';
import { createQuestionType } from '../../redux/slice/questionType/questionType';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { upsertSurveyQuestionThunk } from '../../redux/slice/survey/upsertSurveyQuestion';
import { updateSurveyThunk } from '../../redux/slice/survey/updateSurvey';
import { getSurveyByIdThunk } from '../../redux/slice/survey/getSurveyById';
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

const CreateSurvey: React.FC<CreateSurveyFormProps> = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [questions, setQuestions] = useState<Question[]>([]);
	const [newQuestions, setNewQuestions] = useState<Question[]>([]);
	const [questionType, setQuestionType] = useState<Question['questionType']>(1);
	const [questionName, setQuestionText] = useState<string>('');
	const [options, setOptions] = useState<string[]>(['']);
	const [isFormVisible, setIsFormVisible] = useState<boolean>(true);
	const [areButtonsVisible, setAreButtonsVisible] = useState(true);
	const [uploadedLogo, setUploadedLogo] = useState<string | null>();
	const [isTitle, setIsTitle] = useState<boolean>(false);
	const [isSurveyDescription, setIsSurveyDescription] = useState<boolean>(false);
	const [questionTypes, setQuestionTypes] = useState<QuestionTypesResponse[]>([]);
	const [searchParams] = useSearchParams();
	const { surveyId } = useParams();
	console.log('>>>>>>si', surveyId);
	interface QuestionTypesResponse {
		questionTypes: QuestionType[];
	}
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
	const handleQuestionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newType = parseInt(e.target.value, 10);
		setQuestionType(newType);
		setAreButtonsVisible(true);
		setOptions(newType === 2 || newType === 3 || newType === 5 || newType === 6 ? ['', '', ''] : []);
	};
	// Question text input change handler
	const handleQuestionTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setQuestionText(e.target.value);
	};
	const { data } = useAppSelector((state) => state.getSurveyByIdSlice);
	const handlePreviewSurvey = () => {
		window.open(`/survey-preview/${surveyId}`, '_blank');
		// navigate('/survey-preview', { state: { questions, uploadedLogo } });
	};

	// Option input change handler
	const handleOptionTextChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		const newOptions = [...options];
		newOptions[index] = e.target.value;
		setOptions(newOptions);

		// Add new option if the current option is filled
		if (index === options.length - 1 && e.target.value.trim() !== '') {
			handleAddOption();
		}
	};

	// Add a new empty option
	const handleAddOption = () => {
		setOptions([...options, '']);
	};

	// Remove an option
	const handleRemoveOption = (index: number) => {
		const newOptions = options.filter((_, i) => i !== index);
		setOptions(newOptions);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!questionName) {
			return;
		}
		const filteredOptions = options.filter((option) => option.trim() !== '').map((option) => ({ optionId: '', optionText: option }));
		const newQuestion: Question = {
			questionId: null,
			questionName,
			questionType,
			options: questionType === 2 || questionType === 3 || questionType === 5 || questionType === 6 ? filteredOptions : [],
		};
		if (surveyId) {
			dispatch(upsertSurveyQuestionThunk({ surveyId: surveyId, ...newQuestion }));
		}
		setSurveyForm((prev: any) => ({
			...prev,
			surveyQuestions: [...prev.surveyQuestions, newQuestion],
		}));
		setOptions([]);
		setQuestions([]);
		setQuestionText('');
		setQuestionType(1);
		setNewQuestions([]);
		setIsFormVisible(false);
		// resetForm();
		// setAreButtonsVisible(false);
	};

	const handleAddNewQuestion = () => {
		setQuestions([]);
		setIsFormVisible(true);
		setAreButtonsVisible(true);
	};
	const handleCancel = () => {
		setAreButtonsVisible(false);
	};
	const handleSurveyEditButton = () => {
		setIsTitle((prev) => !prev);
	};
	const handlePageTitleEdit = () => {
		setIsSurveyDescription((prev) => !prev);
	};
	const onSavePageHeading = (lavel: string) => {
		setSurveyForm((prev) => ({
			...prev,
			surveyName: lavel,
		}));
		if (surveyId) {
			dispatch(updateSurveyThunk({ surveyId: surveyId || '', surveyName: lavel, surveyDescription: surveyForm.surveyDescription }));
		}
		setIsTitle((prev) => !prev);
	};
	const onCanclePageHeading = () => {
		setIsTitle((prev) => !prev);
	};
	const onSavePageTitle = (lavel: string) => {
		setSurveyForm((prev) => ({
			...prev,
			surveyDescription: lavel,
		}));
		if (surveyId) {
			dispatch(updateSurveyThunk({ surveyId: surveyId || '', surveyName: surveyForm.surveyName, surveyDescription: lavel }));
		}

		setIsSurveyDescription((prev) => !prev);
	};
	const onCanclePageTitle = () => {
		setIsSurveyDescription((prev) => !prev);
	};
	const getQuestions = async () => {
		const res = await dispatch(createQuestionType());
		setQuestionTypes(res.payload.data);
	};
	useEffect(() => {
		getQuestions();
	}, []);
	useEffect(() => {
		if (surveyId) {
			dispatch(getSurveyByIdThunk(surveyId || ''));
		}
	}, []);
	useEffect(() => {
		const surveyData = data?.data?.[0];
		const cloneData = JSON.stringify(surveyData);
		const parseData = JSON.parse(cloneData);
		setSurveyForm(parseData);
	}, [data]);
	const handleQuestionSave = (): void => {};
	return (
		<Div>
			<div className='newContaner'>
				<>
					<div className='containernew'>
						<section className='mainContainer'>
							<section className='containerCreateSurvey'>
								{/* Logo Popup Section */}
								<div>
									<LogoCreateSurvey onLogoUpload={setUploadedLogo} />
								</div>

								<section className='surveyPage'>
									{isTitle ? (
										<NewTextEditor label={surveyForm.surveyName} onSave={onSavePageHeading} onCancel={onCanclePageHeading} />
									) : (
										<div className='surveyTitle'>
											<h1>
												<span>{surveyForm.surveyName}</span>
											</h1>
											<Button className='editBtn' label='Edit' onClick={handleSurveyEditButton} />
										</div>
									)}

									<div className='surveyPage'>
										{isSurveyDescription ? (
											<NewTextEditor
												label={surveyForm.surveyDescription}
												onSave={onSavePageTitle}
												onCancel={onCanclePageTitle}
											/>
										) : (
											<div className='surveyTitle'>
												<h1>
													<span>{surveyForm.surveyDescription}</span>
												</h1>
												<Button className='editBtn' label='Edit' onClick={handlePageTitleEdit} />
											</div>
										)}
									</div>

									{/*  priview question div add a new routes i am not created a routes  */}

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
									{/* )} */}
									{isFormVisible && (
										<form onSubmit={handleSubmit}>
											<div className='questionAndDropdown'>
												<label className='question-type-label'>
													Select Question Type:
													<select value={questionType} onChange={handleQuestionTypeChange} className='question-type-select'>
														{questionTypes?.map((type) => (
															<option key={type.id} value={type.id}>
																{type.name}
															</option>
														))}
													</select>
												</label>

												<div className='question-text-container'>
													<label className='question-text-label'>
														Question Text:
														<input
															type='text'
															value={questionName}
															onChange={handleQuestionTextChange}
															className='question-text-input'
														/>
													</label>
												</div>
											</div>

											{(questionType === 2 || questionType === 3 || questionType === 5 || questionType === 6) && (
												<div className='question-options-section'>
													<label className='question-options-label'>
														Options:
														{options.map((option, index) => (
															<div key={index} className='question-option-item'>
																{questionType === 5 ? (
																	<>
																		<input
																			type='radio'
																			name={`radio-group-${index}`}
																			checked={false}
																			disabled
																			className='radio-input'
																		/>
																		<input
																			type='text'
																			value={option}
																			onChange={(e) => handleOptionTextChange(e, index)}
																			className='option-input-field'
																		/>
																	</>
																) : questionType === 6 ? (
																	<>
																		<input type='checkbox' checked={false} disabled className='checkbox-input' />
																		<input
																			type='text'
																			value={option}
																			onChange={(e) => handleOptionTextChange(e, index)}
																			className='option-input-field'
																		/>
																	</>
																) : (
																	<input
																		type='text'
																		value={option}
																		onChange={(e) => handleOptionTextChange(e, index)}
																		className='option-input-field'
																	/>
																)}

																<div className='option-control-icons'>
																	<img
																		src={plus}
																		alt='Add option'
																		className='add-option-icon'
																		onClick={handleAddOption}
																	/>
																	{options.length > 1 && (
																		<img
																			src={minus}
																			alt='Remove option'
																			className='remove-option-icon'
																			onClick={() => handleRemoveOption(index)}
																		/>
																	)}
																</div>
															</div>
														))}
													</label>
												</div>
											)}

											{areButtonsVisible && (
												<div className='form-buttons-container'>
													<button type='submit' className='save-question-button' onClick={handleQuestionSave}>
														Save Question
													</button>
													<button type='button' className='cancel-question-button' onClick={handleCancel}>
														Cancel
													</button>
												</div>
											)}
										</form>
									)}
								</section>
								{/* prievw div closed  */}
								<section className='surveyPage'>
									<div className='addNewQuesContainer'>
										{/* Add New Question button shown only if there are saved questions */}
										{/* {questions.length > 0 && ( */}
										<button onClick={handleAddNewQuestion} className='add-new-question-button'>
											Add New Question
										</button>
										{/* )} */}
										<a className='demoText' href=''>
											Copy and paste questions
										</a>
									</div>

									<div className='createDoneContainer'>
										<span>
											<button className='createDoneButton'>Done</button>
										</span>
										<span>
											<button className='createEditButton'>EDIT</button>
										</span>
									</div>
									<div className='createFooterContainer'>
										<div className='createFooterDivOne'>
											<p className='createFooterParaOne'>Powered by</p>
											<b className='createFooterBold'>Survey Programming Tool</b>
											<p className='createFooterParaTwo'>
												See how easy it is to <a href=''>create survey and forms</a>
											</p>
										</div>
										<div>
											<button className='createFooterDivTwo'>Hide Footer</button>
										</div>
									</div>

									<div className='createPreviewContainer'>
										<button className='createPreviewButton' onClick={handlePreviewSurvey}>
											Preview Survey
										</button>
									</div>
								</section>
							</section>
						</section>
					</div>
				</>
			</div>
			<div className='newpage-container-copy'>
				<NewPage />
			</div>
		</Div>
	);
};

export default CreateSurvey;
