import React, { useEffect, useState } from 'react';

// Define the type for options
interface Option {
	optionId: number; // Assuming optionId is a string
	optionText: string;
}

// Define the type for the question
interface Question {
	questionId: string; // Assuming questionId is a string
	questionName?: string;
	questionType: number; // Type of question (1, 2, 3, 4, 5, or 6)
	options: Option[];
}

// Props type for the component
interface QuestionPreviewProps {
	questions: Question;
}

const QuestionPreview: React.FC<QuestionPreviewProps> = ({ questions }) => {
	const { questionId, questionName, questionType, options } = questions;

	// State to hold selected values
	const [selectedValue, setSelectedValue] = useState<string | null>(null); // For dropdown
	const [selectedCheckboxes, setSelectedCheckboxes] = useState<number[]>([]); // For checkboxes
	const [selectedRadio, setSelectedRadio] = useState<number | null>(null); // For radio buttons
	const [textInputValue, setTextInputValue] = useState<string>(''); // For text input
	const [textareaValue, setTextareaValue] = useState<string>(''); // For textarea
	const [aggrigateData, setAggrigateData] = useState<any[]>([]);
	// Handle dropdown change
	const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		console.log('SelectedValue', event.target.value);
		setSelectedValue(event.target.value);
	};

	// Handle checkbox change
	const handleCheckboxChange = (optionId: number) => {
		console.log('SelectedCheckboxes', optionId);
		setSelectedCheckboxes((prev) => {
			const newSelection = prev.includes(optionId)
				? prev.filter((id) => id !== optionId) // Remove the option if it's already selected
				: [...prev, optionId]; // Add the option if it's not selected
			return newSelection; // Return the updated array
		});
	};
	// Handle text input change
	const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTextInputValue(event.target.value);
	};

	// Handle textarea change
	const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTextareaValue(event.target.value);
	};
	const createDataObject = () => {
		// Define the type of the options mapping
		const optionsMapping: Record<number, number | string | null | number[]> = {
			2: selectedValue,
			3: Array.from(selectedCheckboxes),
			5: selectedRadio,
			1: textInputValue,
			4: textareaValue,
		};

		const dataObject = {
			questionId,
			questionType,
			options: optionsMapping[questionType] || [], // Default to an empty array if questionType is not found
		};

		console.log(aggrigateData, 'Data to be sent to server:', dataObject);
		// You can now send dataObject to your server using fetch or axios
	};

	// Handle form submission
	const handleSubmit = () => {
		// event.preventDefault();
		const data = createDataObject(); // Call function to create data object
		// setAggrigateData([...aggrigateData, data]);
	};
	console.log(handleSubmit());
	// Handle radio change
	const handleRadioChange = (optionId: number) => {
		console.log('SelectedRadio', optionId);
		setSelectedRadio(optionId);
	};
	console.log('SelectedCheckboxes', selectedCheckboxes);
	// Render function for dropdown
	const renderDropdown = () => (
		<select className='preview-dropdown' value={selectedValue || ''} onChange={handleDropdownChange}>
			{options
				.filter((option) => option.optionText.trim() !== '')
				.map((option, idx) => (
					<option key={idx} value={option.optionId}>
						{option.optionText}
					</option>
				))}
		</select>
	);

	// Render function for checkboxes
	const renderCheckboxes = () => (
		<>
			{options
				.filter((option) => option.optionText.trim() !== '')
				.map((option, idx) => (
					<div key={idx}>
						<input
							type='checkbox'
							id={`mc-${questionId}-${idx}`}
							checked={selectedCheckboxes.includes(option.optionId)} // Determine if checked
							onChange={() => handleCheckboxChange(option.optionId)}
						/>
						<label htmlFor={`mc-${questionId}-${idx}`}>{option.optionText}</label>
					</div>
				))}
		</>
	);

	// Render function for radio buttons
	const renderRadios = () => (
		<>
			{options
				.filter((option) => option.optionText.trim() !== '')
				.map((option, idx) => (
					<div key={idx}>
						<input
							type='radio'
							name={`radio-${questionId}`}
							id={`radio-${questionId}-${idx}`}
							checked={selectedRadio === option.optionId} // Determine if checked
							onChange={() => handleRadioChange(option.optionId)}
						/>
						<label htmlFor={`radio-${questionId}-${idx}`}>{option.optionText}</label>
					</div>
				))}
		</>
	);

	// Render function for text inputs
	const renderTextInput = () => (
		<input
			type='text'
			placeholder='Text input preview'
			value={textInputValue} // Controlled input
			onChange={handleTextInputChange} // Update state on change
		/>
	);

	// Render function for textarea
	const renderTextarea = () => (
		<textarea
			placeholder='Textarea input preview'
			value={textareaValue} // Controlled textarea
			onChange={handleTextareaChange} // Update state on change
		/>
	);

	// Function to render the appropriate question type
	const renderQuestionType = () => {
		switch (questionType) {
			case 1:
				return renderTextInput();
			case 2:
				return renderDropdown();
			case 3:
				return renderCheckboxes();
			case 4:
				return renderTextarea();
			case 5:
				return renderRadios();
			case 6:
				return renderCheckboxes(); // Assuming type 6 uses checkboxes
			default:
				return null;
		}
	};

	return (
		<div key={questionId} className='question-preview'>
			<strong>Question: {questionId}</strong> {questionName || 'No question text provided'}
			<div className='options-preview'>{renderQuestionType()}</div>
		</div>
	);
};

export default QuestionPreview;
