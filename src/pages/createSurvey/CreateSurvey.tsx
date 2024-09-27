import React, { useState } from 'react';
import './CreateSurvey.scss';
import { minus, plus } from '../../assets/common-img';
import NewPage from './Partials/NewPage';
import { Div } from '../../blocks';
import LogoCreateSurvey from './Partials/LogoCreateSurvey';
import { useNavigate } from 'react-router-dom';
 
export interface Question {
    id: number;
    questionText: string;
    questionType: 'text' | 'dropdown' | 'multipleChoice' | 'textarea' | 'image' | 'video' | 'radio' | 'checkbox';
    options?: string[];
}
 
interface CreateSurveyFormProps {
    onSubmit?: (responses: Question[]) => void;
}
 
const CreateSurvey: React.FC<CreateSurveyFormProps> = () => {
	const navigate = useNavigate();

	const [questions, setQuestions] = useState<Question[]>([]);
	const [questionType, setQuestionType] = useState<Question['questionType']>('text');
	const [questionText, setQuestionText] = useState<string>('');
	const [options, setOptions] = useState<string[]>(['']);
	const [isFormVisible, setIsFormVisible] = useState<boolean>(true);
	const [areButtonsVisible, setAreButtonsVisible] = useState(false);
	const[uploadedLogo,setUploadedLogo]=useState<string|null>()

	// Question type change handler
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
		navigate('/survey-preview', { state: { questions,uploadedLogo } });
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
		if (!questionText) return;

		const filteredOptions = options.filter((option) => option.trim() !== '');

		const newQuestion: Question = {
			id: Date.now(),
			questionText,
			questionType,
			options: questionType === 'dropdown' || questionType === 'multipleChoice' || questionType === 'radio' || questionType === 'checkbox' ? filteredOptions : undefined,
		};

		setQuestions([...questions, newQuestion]);
		setIsFormVisible(false);
		resetForm();
		setAreButtonsVisible(false);
	};

	const resetForm = () => {
		setQuestionText('');
		setOptions(questionType === 'dropdown' || questionType === 'multipleChoice' || questionType === 'radio' || questionType === 'checkbox' ? ['', '', ''] : []);
	};

	const handleAddNewQuestion = () => {
		setIsFormVisible(true);
		setAreButtonsVisible(true);
	};

	const handleCancel = () => {
		resetForm();
		setAreButtonsVisible(false);
	};

	return (
		<Div>
			<div className='newContaner'>
			{isFormVisible&&(
				<><div className='containernew'>
					<section className='mainContainer'>
						<section className='containerCreateSurvey'>
							{/* Logo Popup Section */}
								<div>
									<LogoCreateSurvey onLogoUpload={setUploadedLogo}/>
								</div>
						

							<section className='surveyPage'>
								<div className='surveyTitle'>
									<h1>
										<span>Untitled</span>
									</h1>
									<button className='editBtn'>EDIT</button>
								</div>

								<div className='surveyPageTitle'>
									<button className='pageTitle'>PAGE TITLE</button>
									<button className='editPageBtn'>EDIT</button>
								</div>

								{isFormVisible && (
									<form onSubmit={handleSubmit}>
										<div className='questionAndDropdown'>
											<label className='question-type-label'>
												Select Question Type:
												<select value={questionType} required onChange={handleQuestionTypeChange} className='question-type-select'>
													<option value='' selected>
														Select a type
													</option>
													<option value='text'>Text</option>
													<option value='dropdown'>Dropdown</option>
													<option value='multipleChoice'>Multiple Choice</option>
													<option value='textarea'>Text Area</option>
													<option value='radio'>Radio Buttons</option>
													<option value='checkbox'>Checkboxes</option>
												</select>
											</label>

											<div className='question-text-container'>
												<label className='question-text-label'>
													Question Text:
													<input type='text' value={questionText} onChange={handleQuestionTextChange} className='question-text-input' />
												</label>
											</div>
										</div>

										{(questionType === 'dropdown' || questionType === 'multipleChoice' || questionType === 'radio' || questionType === 'checkbox') && (
											<div className='question-options-section'>
												<label className='question-options-label'>
													Options:
													{options.map((option, index) => (
														<div key={index} className='question-option-item'>
															{questionType === 'radio' ? (
																<>
																	<input type='radio' name={`radio-group-${index}`} checked={false} disabled className='radio-input' />
																	<input type='text' value={option} onChange={(e) => handleOptionTextChange(e, index)} className='option-input-field' />
																</>
															) : questionType === 'checkbox' ? (
																<>
																	<input type='checkbox' checked={false} disabled className='checkbox-input' />
																	<input type='text' value={option} onChange={(e) => handleOptionTextChange(e, index)} className='option-input-field' />
																</>
															) : (
																<input type='text' value={option} onChange={(e) => handleOptionTextChange(e, index)} className='option-input-field' />
															)}

															<div className='option-control-icons'>
																<img src={plus} alt='Add option' className='add-option-icon' onClick={handleAddOption} />
																{options.length > 1 && <img src={minus} alt='Remove option' className='remove-option-icon' onClick={() => handleRemoveOption(index)} />}
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
								{/*  priview question div add a new routes i am not created a routes  */}
								<div>
									<h3>Questions Preview:</h3>
									{questions.map((q) => (
										<div key={q.id} className='question-preview'>
											<strong>Question:</strong> {q.questionText || 'No question text provided'}
											<div className='options-preview'>
												{q.questionType === 'dropdown' && q.options && (
													<select className='preview-dropdown'>
														{q.options
															.filter((option) => option.trim() !== '')
															.map((option, idx) => (
																<option key={idx} value={option}>
																	{option}
																</option>
															))}
													</select>
												)}

												{q.questionType === 'multipleChoice' &&
													q.options &&
													q.options
														.filter((option) => option.trim() !== '')
														.map((option, idx) => (
															<div key={idx}>
																<input type='checkbox' id={`mc-${q.id}-${idx}`} />
																<label htmlFor={`mc-${q.id}-${idx}`}>{option}</label>
															</div>
														))}

												{q.questionType === 'radio' &&
													q.options &&
													q.options
														.filter((option) => option.trim() !== '')
														.map((option, idx) => (
															<div key={idx}>
																<input type='radio' name={`radio-${q.id}`} id={`radio-${q.id}-${idx}`} />
																<label htmlFor={`radio-${q.id}-${idx}`}>{option}</label>
															</div>
														))}

												{q.questionType === 'checkbox' &&
													q.options &&
													q.options
														.filter((option) => option.trim() !== '')
														.map((option, idx) => (
															<div key={idx}>
																<input type='checkbox' id={`cb-${q.id}-${idx}`} />
																<label htmlFor={`cb-${q.id}-${idx}`}>{option}</label>
															</div>
														))}

												{q.questionType === 'text' && <input type='text' placeholder='Text input preview' />}
												{q.questionType === 'textarea' && <textarea placeholder='Textarea input preview'></textarea>}
											</div>
										</div>
									))}
								</div>
							</section>
							{/* prievw div closed  */}
							<section className='surveyPage'>
								<div className='addNewQuesContainer'>
									{/* Add New Question button shown only if there are saved questions */}
									{questions.length > 0 && (
										<button onClick={handleAddNewQuestion} className='add-new-question-button'>
											Add New Question
										</button>
									)}
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
				</div><div className='newpage-container-copy'>
						<NewPage />
					</div></>
			)}
			</div>
			
			
		</Div>
	);
};
 
export default CreateSurvey;