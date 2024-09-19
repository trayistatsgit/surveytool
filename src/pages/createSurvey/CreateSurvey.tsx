import React, { useState } from 'react';
import './CreateSurvey.scss';
import '../surveyForm/partials/SurveyPage.scss';
import PopupComponent from '../../atoms/popup/Popup';
import DragAndDrop from '../../components/dragAndDrop/DragAndDrop';
import { minus, plus } from '../../assets/common-img';

export interface Question {
	id: number;
	questionText: string;
	questionType: 'text' | 'dropdown' | 'multipleChoice' | 'textarea' | 'image' | 'video' | 'radio' | 'checkbox';
	options?: string[];
}

interface SurveyFormProps {
	onSubmit: (responses: Question[]) => void;
}

const CreateSurvey: React.FC<SurveyFormProps> = ({ onSubmit }) => {
	const [isPopUpVisible, setIsPopUpVisible] = useState(false);
	const [questions, setQuestions] = useState<Question[]>([]);
	const [questionType, setQuestionType] = useState<Question['questionType']>('text');
	const [questionText, setQuestionText] = useState<string>('');
	const [options, setOptions] = useState<string[]>(['']);
	const [isFormVisible, setIsFormVisible] = useState<boolean>(true);

	// Popup functions
	const showPopup = () => setIsPopUpVisible(true);
	const closePopup = () => setIsPopUpVisible(false);

	// Question type change handler
	const handleQuestionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newType = e.target.value as Question['questionType'];
		setQuestionType(newType);
		setOptions(newType === 'dropdown' || newType === 'multipleChoice' || newType === 'radio' || newType === 'checkbox' ? ['', '', ''] : []);
	};

	// Question text input change handler
	const handleQuestionTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setQuestionText(e.target.value);
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

		const filteredOptions = options.filter(option => option.trim() !== '');

		const newQuestion: Question = {
			id: Date.now(),
			questionText,
			questionType,
			options: questionType === 'dropdown' || questionType === 'multipleChoice' || questionType === 'radio' || questionType === 'checkbox' ? filteredOptions : undefined,
		};

		setQuestions([...questions, newQuestion]);
		setIsFormVisible(false); // Hide the form after submitting
		resetForm(); // Reset the form for the next question
	};

	// Reset form fields
	const resetForm = () => {
		setQuestionText('');
		setOptions(questionType === 'dropdown' || questionType === 'multipleChoice' || questionType === 'radio' || questionType === 'checkbox' ? ['', '', ''] : []);
	};

	// Show form for adding a new question
	const handleAddNewQuestion = () => {
		setIsFormVisible(true);
	};

	// Cancel the question form
	const handleCancel = () => {
		resetForm();
		setIsFormVisible(false);
	};

	// Submit all questions at once
	const handleFinalSubmit = () => {
		onSubmit(questions);
		setQuestions([]);
	};

	return (
		<section className="mainContainer">
			<section className="containerCreateSurvey">
				{/* Logo Popup Section */}
				<div className="addLogoHere">
					<button className="addLogoBtn" onClick={showPopup}>
						Logo
					</button>
				</div>

				{isPopUpVisible && (
					<PopupComponent showBottomCancel={true} onClose={closePopup} width={600} height={400}>
						<DragAndDrop />
					</PopupComponent>
				)}

				{/* Survey Form Section */}
				<section className="surveyPage">
					<div className="surveyTitle">
						<h1>
							<span>Untitled</span>
						</h1>
						<button className="editBtn">EDIT</button>
					</div>

					<div className="surveyPageTitle">
						<button className="pageTitle">PAGE TITLE</button>
						<button className="editPageBtn">EDIT</button>
					</div>

					{/* Question Form */}
					{isFormVisible && (
						<form onSubmit={handleSubmit}>
							<label>
								Select Question Type:
								<select value={questionType} onChange={handleQuestionTypeChange}>
									<option value="text">Text</option>
									<option value="dropdown">Dropdown</option>
									<option value="multipleChoice">Multiple Choice</option>
									<option value="textarea">Text Area</option>
									<option value="radio">Radio Buttons</option>
									<option value="checkbox">Checkboxes</option>
								</select>
							</label>

							<div>
								<label>
									Question Text:
									<input type="text" value={questionText} onChange={handleQuestionTextChange} />
								</label>
							</div>

							{/* Options Section for relevant question types */}
							{(questionType === 'dropdown' || questionType === 'multipleChoice' || questionType === 'radio' || questionType === 'checkbox') && (
								<div className="options-section">
									<label>
										Options:
										{options.map((option, index) => (
											<div key={index} className="option-item">
												{questionType === 'radio' ? (
													<>
														<input type="radio" name={`radio-group-${index}`} checked={false} disabled />
														<input type="text" value={option} onChange={(e) => handleOptionTextChange(e, index)} className="option-input" />
													</>
												) : questionType === 'checkbox' ? (
													<>
														<input type="checkbox" checked={false} disabled />
														<input type="text" value={option} onChange={(e) => handleOptionTextChange(e, index)} className="option-input" />
													</>
												) : (
													<input type="text" value={option} onChange={(e) => handleOptionTextChange(e, index)} className="option-input" />
												)}

												<div className="option-controls">
													<img src={plus} alt="Add option" className="add-option-icon" onClick={handleAddOption} />
													{options.length > 1 && <img src={minus} alt="Remove option" className="remove-option-icon" onClick={() => handleRemoveOption(index)} />}
												</div>
											</div>
										))}
									</label>
								</div>
							)}

							<div className="form-buttons">
								<button type="submit">Save Question</button>
								<button type="button" onClick={handleCancel}>Cancel</button>
							</div>
						</form>
					)}

					{/* Add and Submit buttons */}
					<footer className="footer">
						<button onClick={handleAddNewQuestion}>Add New Question</button>
						<button onClick={handleFinalSubmit}>Submit All Questions</button>
					</footer>

					{/* Questions Preview */}
					<div>
						<h3>Questions Preview:</h3>
						{questions.map((q) => (
							<div key={q.id} className="question-preview">
								<strong>Question:</strong> {q.questionText || 'No question text provided'}
								<div className="options-preview">
									{q.questionType === 'dropdown' && q.options && (
										<select>
											{q.options.filter(option => option.trim() !== '').map((option, idx) => (
												<option key={idx} value={option}>
													{option}
												</option>
											))}
										</select>
									)}

									{q.questionType === 'multipleChoice' && q.options && q.options.filter(option => option.trim() !== '').map((option, idx) => (
										<div key={idx}>
											<input type="checkbox" id={`mc-${q.id}-${idx}`} />
											<label htmlFor={`mc-${q.id}-${idx}`}>{option}</label>
										</div>
									))}

									{q.questionType === 'radio' && q.options && q.options.filter(option => option.trim() !== '').map((option, idx) => (
										<div key={idx}>
											<input type="radio" id={`radio-${q.id}-${idx}`} />
											<label htmlFor={`radio-${q.id}-${idx}`}>{option}</label>
										</div>
									))}

									{q.questionType === 'checkbox' && q.options && q.options.filter(option => option.trim() !== '').map((option, idx) => (
										<div key={idx}>
											<input type="checkbox" id={`checkbox-${q.id}-${idx}`} />
											<label htmlFor={`checkbox-${q.id}-${idx}`}>{option}</label>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</section>
				<section className='surveyPage'>

						<div>
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
							<button className='createPreviewButton'>Preview Survey</button>
						</div>
					</section>
			</section>
		</section>
	);
};

export default CreateSurvey;
