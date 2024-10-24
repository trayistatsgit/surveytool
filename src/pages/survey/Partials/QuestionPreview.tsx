import React, { useState } from 'react';

interface Option {
  optionId: number;
  optionText: string;
}

export interface Question {
  questionId: number;
  questionName?: string;
  questionType: number;
  options: Option[];
}

interface AggregateData {
  questionId: number;
  questionType: number;
  options: number | string | number[];
}

interface QuestionPreviewProps {
  questions: Question;
  setAggrigateData: React.Dispatch<React.SetStateAction<AggregateData[]>>;
  qNumber: number;
}

const QuestionPreview: React.FC<QuestionPreviewProps> = ({ questions, setAggrigateData, qNumber }) => {
  const { questionId, questionName, questionType, options = [] } = questions;

  // State to hold selected values
  const [selectedValue, setSelectedValue] = useState<string | null>(null); // For dropdown
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<number[]>([]); // For checkboxes
  const [selectedRadio, setSelectedRadio] = useState<number | null>(null); // For radio buttons
  const [textInputValue, setTextInputValue] = useState<string>(''); // For text input
  const [textareaValue, setTextareaValue] = useState<string>(''); // For textarea

  // Create the data object for submission
  const createDataObject = (updatedValue: number | string | number[]): AggregateData => ({
    questionId,
    questionType,
    options: updatedValue,
  });

  // Handle form submission
  const handleSubmit = (updatedValue: number | string | number[]) => {
    const data = createDataObject(updatedValue);

    setAggrigateData((prevData) => {
      const existingEntryIndex = prevData.findIndex((entry) => entry.questionId === questionId);

      if (existingEntryIndex !== -1) {
        const updatedData = prevData.map((entry, index) => (index === existingEntryIndex ? data : entry));
        return updatedData;
      } else {
        // Add new entry if it doesn't exist
        return [...prevData, data];
      }
    });
  };

  // Handle dropdown change
  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    handleSubmit(value);
  };

  // Handle checkbox change
  const handleCheckboxChange = (optionId: number) => {
    setSelectedCheckboxes((prev) => {
      const newSelection = prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId];
      handleSubmit(newSelection);
      return newSelection;
    });
  };

  // Handle text input change
  const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTextInputValue(value);
    handleSubmit(value);
  };

  // Handle textarea change
  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setTextareaValue(value);
    handleSubmit(value);
  };

  // Handle radio change
  const handleRadioChange = (optionId: number) => {
    setSelectedRadio(optionId);
    handleSubmit(optionId);
  };

  // Render function for dropdown
  const renderDropdown = () => (
    <select className='preview-dropdown' value={selectedValue || ''} onChange={handleDropdownChange}>
      <option value='' disabled>
        Select an option
      </option>
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
              checked={selectedCheckboxes.includes(option.optionId)}
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
              checked={selectedRadio === option.optionId}
              onChange={() => handleRadioChange(option.optionId)}
            />
            <label htmlFor={`radio-${questionId}-${idx}`}>{option.optionText}</label>
          </div>
        ))}
    </>
  );

  // Render function for text inputs
  const renderTextInput = () => <input type='text' placeholder='Text input preview' value={textInputValue} onChange={handleTextInputChange} />;

  // Render function for textarea
  const renderTextarea = () => <textarea placeholder='Textarea input preview' value={textareaValue} onChange={handleTextareaChange} />;

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
        return renderCheckboxes();
      default:
        return null;
    }
  };

  return (
    <div key={questionId} className='question-preview'>
      <strong>Question: {qNumber}</strong> {questionName || 'No question text provided'}
      <div className='options-preview'>{renderQuestionType()}</div>
    </div>
  );
};

export default QuestionPreview;
