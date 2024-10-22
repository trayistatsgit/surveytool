import React, { useEffect, useState } from 'react';
import './CreateSurvey.scss';
import { minus, plus } from '../../assets/common-img';
import NewPage from './Partials/NewPage';
import { Button, Div } from '../../blocks';
import LogoCreateSurvey from './Partials/LogoCreateSurvey';
import { useParams } from 'react-router-dom';
import NewTextEditor from '../../components/textEditorForm/NewTextEditor';
import { createQuestionType } from '../../redux/slice/questionType/questionType';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { upsertSurveyQuestionThunk } from '../../redux/slice/survey/upsertSurveyQuestion';
import { updateSurveyThunk } from '../../redux/slice/survey/updateSurvey';
import { getSurveyByIdThunk } from '../../redux/slice/survey/getSurveyById';
import { Question, QuestionTypesResponse, SurveyInitialData } from './type';

const CreateSurvey: React.FC = () => {
	const dispatch = useAppDispatch();
	const [questionType, setQuestionType] = useState<Question['questionType']>(1);
	const [questionName, setQuestionText] = useState<string>('');
	const [options, setOptions] = useState<string[]>(['']);
	const [isFormVisible, setIsFormVisible] = useState<boolean>(true);
	const [areButtonsVisible, setAreButtonsVisible] = useState(true);
	const [uploadedLogo, setUploadedLogo] = useState<File | null>(null);
	const [isTitle, setIsTitle] = useState<boolean>(false);
	const [isSurveyDescription, setIsSurveyDescription] = useState<boolean>(false);
	const [questionTypes, setQuestionTypes] = useState<QuestionTypesResponse[]>([]);
	const { surveyId } = useParams();
	const surveyInitialData = {
		surveyName: 'Untitle',
		surveyDescription: 'Untitle',
		logo: null,
		pageNo: 1,
		surveyId: surveyId ?? '',
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
	const [surveyForm, setSurveyForm] = useState<SurveyInitialData>(surveyInitialData);
	const [logoData, setLogoData] = useState<string | null>(null);
	const handleQuestionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newType = parseInt(e.target.value, 10);
		setQuestionType(newType);
		setAreButtonsVisible(true);
		setOptions(newType === 2 || newType === 3 || newType === 5 || newType === 6 ? ['', '', ''] : []);
	};
	const handleQuestionTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setQuestionText(e.target.value);
	};
	const { data } = useAppSelector((state) => state.getSurveyByIdSlice);
	const handlePreviewSurvey = () => {
		window.open(`/survey-preview/${surveyId}`, '_blank');
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
		const filteredOptions = options.filter((option) => option.trim() !== '').map((option) => ({ optionId: null, optionText: option }));
		const newQuestion: Question = {
			questionId: null,
			questionName,
			questionType,
			options: questionType === 2 || questionType === 3 || questionType === 5 || questionType === 6 ? filteredOptions : [],
		};
		if (surveyId) {
			dispatch(upsertSurveyQuestionThunk({ surveyId: surveyId, ...newQuestion }));
		}
		setSurveyForm((prev: SurveyInitialData) => ({
			...prev,
			surveyQuestions: [...prev.surveyQuestions, newQuestion],
		}));
		setOptions([]);
		setQuestionText('');
		setQuestionType(1);
		setIsFormVisible(false);
	};
	useEffect(() => {
		if (uploadedLogo && surveyId) {
			dispatch(
				updateSurveyThunk({
					surveyId: surveyId || '',
					logo: uploadedLogo,
					surveyName: '',
					surveyDescription: '',
				})
			);
		}
	}, [uploadedLogo]);
	const handleAddNewQuestion = () => {
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
		setLogoData(parseData?.logo);
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
								<div>
									<LogoCreateSurvey onLogoUpload={setUploadedLogo} surveyLogo={logoData} />
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
									<div>
										<h3>Questions Preview:</h3>
										{surveyForm.surveyQuestions.map((q: Question) => (
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
													<button type='submit' className='save-question-button'>
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
								<section className='surveyPage'>
									<div className='addNewQuesContainer'>
										<button onClick={handleAddNewQuestion} className='add-new-question-button'>
											Add New Question
										</button>
									</div>
									<div className='createDoneContainer'>
										<span>
											<button className='createDoneButton'>Done</button>
										</span>
										<span>
											<button className='createEditButton'>EDIT</button>
										</span>
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
