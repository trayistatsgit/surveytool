import React, { useEffect, useState } from 'react';
import './CreateSurvey.scss';
import { minus, plus } from '../../assets/common-img';
import NewPage from './Partials/NewPage';
import { Button, Div } from '../../blocks';
import LogoCreateSurvey from './Partials/LogoCreateSurvey';
import { useNavigate } from 'react-router-dom';
import NewTextEditor from '../../components/textEditorForm/NewTextEditor';
import { createQuestionType } from '../../redux/slice/questionType/questionType';

import { useAppDispatch } from '../../redux/store';
//import { useSelector } from 'react-redux';

export interface Question {
	questionId: number;
	questionText: string;
	questionType: 'text' | 'dropdown' | 'multipleChoice' | 'textarea' | 'image' | 'video' | 'radio' | 'checkbox';
	options?: IQuestionName[];
}
interface IQuestionName {
	id?: string | number;
	optionName?: string;
}
interface CreateSurveyFormProps {
	onSubmit?: (responses: Question[]) => void;
}
interface QuestionType {
	id: number;
	name: string;
}

// Define the structure for the response of the getQuestionTypesApi function
interface QuestionTypesResponse {
	questionTypes: QuestionType[];
}
const surveyInitialData = {
	surveyName: 'Untitle',
	description: 'Untitle',
	logo: '',
	pageNo: 1,
	surveyId: '',
	question: [
		{
			questionType: '',
			questionId: 1,
			questionText: '',
			options: [
				{
					optionId: 1,
					optionName: '',
				},
			],
		},
	],
};
const CreateSurvey: React.FC<CreateSurveyFormProps> = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [questions, setQuestions] = useState<Question[]>([]);
	const [newQuestions, setNewQuestions] = useState<Question[]>([]);
	const [questionType, setQuestionType] = useState<Question['questionType']>('text');
	const [questionText, setQuestionText] = useState<string>('');
	const [options, setOptions] = useState<string[]>(['']);
	const [isFormVisible, setIsFormVisible] = useState<boolean>(true);
	const [areButtonsVisible, setAreButtonsVisible] = useState(true);
	const [uploadedLogo, setUploadedLogo] = useState<string | null>();
	const [isTitle, setIsTitle] = useState<boolean>(false);
	const [isDescription, setIsDescription] = useState<boolean>(false);
	const [surveyForm, setSurveyForm] = useState(surveyInitialData);
	const [questionTypes, setQuestionTypes] = useState<QuestionTypesResponse[]>([]);
	// Question type change handler
	// const questionTypes = useSelector((state: any) => state.questionTypes.questionTypes);
	//console.log(questionTypes);
	console.log(questionTypes);
	const handleQuestionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newType = e.target.value as Question['questionType'];
		setQuestionType(newType);
		setAreButtonsVisible(true);
		setOptions(newType === 'dropdown' || newType === 'multipleChoice' || newType === 'radio' || newType === 'checkbox' ? ['', '', ''] : []);
	};

	// Question text input change handler
	const handleQuestionTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setQuestionText(e.target.value);
	};

	const handlePreviewSurvey = () => {
		navigate('/survey-preview', { state: { questions, uploadedLogo } });
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

	// Submit a single question
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!questionText) {
			return;
		}
		console.log('options>>><><>', options);
		const filteredOptions = options
			.filter((option) => option.trim() !== '') // Filter out empty or whitespace-only options
			.map((option) => ({ optionId: '', optionName: option })); // Map each option to the desired format

		const newQuestion: Question = {
			questionId: 1,
			questionText,
			questionType,
			options:
				questionType === 'dropdown' || questionType === 'multipleChoice' || questionType === 'radio' || questionType === 'checkbox'
					? filteredOptions
					: [],
		};
		setSurveyForm((prev: any) => ({
			...prev,
			question: [...prev.question, newQuestion],
		}));
		setOptions([]);
		setQuestions([]);
		setQuestionText('');
		setQuestionType('text');
		setNewQuestions([]);
		setIsFormVisible(false);
		// resetForm();
		// setAreButtonsVisible(false);
	};
	//console.log('questions', questions);
	// const resetForm = () => {
	// 	setQuestionText('');
	// 	setOptions(
	// 		questionType === 'dropdown' || questionType === 'multipleChoice' || questionType === 'radio' || questionType === 'checkbox'
	// ? ['', '', ''] : []
	// 	);
	// };

	const handleAddNewQuestion = () => {
		setQuestions([]);
		setIsFormVisible(true);
		setAreButtonsVisible(true);
	};

	const handleCancel = () => {
		// resetForm();
		setAreButtonsVisible(false);
	};
	const handleSurveyEditButton = () => {
		setIsTitle((prev) => !prev);
	};
	const handlePageTitleEdit = () => {
		setIsDescription((prev) => !prev);
	};
	const onSavePageHeading = (lavel: string) => {
		setSurveyForm((prev) => ({
			...prev,
			surveyName: lavel,
		}));
		setIsTitle((prev) => !prev);
	};
	const onCanclePageHeading = () => {
		setIsTitle((prev) => !prev);
	};
	const onSavePageTitle = (lavel: string) => {
		setSurveyForm((prev) => ({
			...prev,
			description: lavel,
		}));
		setIsDescription((prev) => !prev);
	};
	const onCanclePageTitle = () => {
		setIsDescription((prev) => !prev);
	};
	//console.log('surveyForm', surveyForm);
	const getQuestions = async () => {
		const res = await dispatch(createQuestionType());
		//	console.log(res);
		setQuestionTypes(res.payload.data);
	};
	useEffect(() => {
		getQuestions();
	}, []);

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
										{isDescription ? (
											<NewTextEditor label={surveyForm.description} onSave={onSavePageTitle} onCancel={onCanclePageTitle} />
										) : (
											<div className='surveyTitle'>
												<h1>
													<span>{surveyForm.description}</span>
												</h1>
												<Button className='editBtn' label='Edit' onClick={handlePageTitleEdit} />
											</div>
										)}
									</div>

									{/*  priview question div add a new routes i am not created a routes  */}

									<div>
										<h3>Questions Preview:</h3>
										{surveyForm.question.map((q) => (
											<div key={q.questionId} className='question-preview'>
												<strong>Question: {q.questionId}</strong> {q.questionText || 'No question text provided'}
												<div className='options-preview'>
													{q.questionType === 'dropdown' && q.options && (
														<select className='preview-dropdown'>
															{q.options
																.filter((option) => option.optionName.trim() !== '')
																.map((option, idx) => (
																	<option key={idx} value={option.optionName}>
																		{option.optionName}
																	</option>
																))}
														</select>
													)}

													{q.questionType === 'multipleChoice' &&
														q.options &&
														q.options
															.filter((option) => option.optionName.trim() !== '')
															.map((option, idx) => (
																<div key={idx}>
																	<input type='checkbox' id={`mc-${q.questionId}-${idx}`} />
																	<label htmlFor={`mc-${q.questionId}-${idx}`}>{option.optionName}</label>
																</div>
															))}

													{q.questionType === 'radio' &&
														q.options &&
														q.options
															.filter((option) => option.optionName.trim() !== '')
															.map((option, idx) => (
																<div key={idx}>
																	<input type='radio' name={`radio-${q.questionId}`} id={`radio-${q.questionId}-${idx}`} />
																	<label htmlFor={`radio-${q.questionId}-${idx}`}>{option.optionName}</label>
																</div>
															))}

													{q.questionType === 'checkbox' &&
														q.options &&
														q.options
															.filter((option) => option.optionName.trim() !== '')
															.map((option, idx) => (
																<div key={idx}>
																	<input type='checkbox' id={`cb-${q.questionId}-${idx}`} />
																	<label htmlFor={`cb-${q.questionId}-${idx}`}>{option.optionName}</label>
																</div>
															))}

													{q.questionType === 'text' && <input type='text' placeholder='Text input preview' />}
													{q.questionType === 'textarea' && <textarea placeholder='Textarea input preview'></textarea>}
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
														{questionTypes.map((type) => (
															<option key={type.id} value={type.name}>
																{type.name}
															</option>
														))}
													</select>
												</label>

												<div className='question-text-container'>
													<label className='question-text-label'>
														Question Text:
														<input type='text' value={questionText} onChange={handleQuestionTextChange} className='question-text-input' />
													</label>
												</div>
											</div>

											{(questionType === 'dropdown' ||
												questionType === 'multipleChoice' ||
												questionType === 'radio' ||
												questionType === 'checkbox') && (
												<div className='question-options-section'>
													<label className='question-options-label'>
														Options:
														{options.map((option, index) => (
															<div key={index} className='question-option-item'>
																{questionType === 'radio' ? (
																	<>
																		<input type='radio' name={`radio-group-${index}`} checked={false} disabled className='radio-input' />
																		<input
																			type='text'
																			value={option}
																			onChange={(e) => handleOptionTextChange(e, index)}
																			className='option-input-field'
																		/>
																	</>
																) : questionType === 'checkbox' ? (
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
																	<img src={plus} alt='Add option' className='add-option-icon' onClick={handleAddOption} />
																	{options.length > 1 && (
																		<img src={minus} alt='Remove option' className='remove-option-icon' onClick={() => handleRemoveOption(index)} />
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
