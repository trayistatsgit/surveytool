import React, { useState } from 'react';
import '../surveyForm/partials/SurveyPage.scss';
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

const SurveyForm: React.FC<SurveyFormProps> = ({ onSubmit }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionType, setQuestionType] = useState<'text' | 'dropdown' | 'multipleChoice' | 'textarea' | 'image' | 'video' | 'radio' | 'checkbox'>('text');
  const [questionText, setQuestionText] = useState<string>('');
  const [options, setOptions] = useState<string[]>(['']);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(true);

  const handleQuestionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as 'text' | 'dropdown' | 'multipleChoice' | 'textarea' | 'image' | 'video' | 'radio' | 'checkbox';
    setQuestionType(newType);
    setOptions(newType === 'dropdown' || newType === 'multipleChoice' || newType === 'radio' || newType === 'checkbox' ? ['', '', ''] : []);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuestionText(e.target.value);
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);

    if (index === options.length - 1 && e.target.value.trim() !== '') {
      handleAddOption();
    }
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

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
    setIsFormVisible(false);
    setQuestionText('');
    setOptions(questionType === 'dropdown' || questionType === 'multipleChoice' || questionType === 'radio' || questionType === 'checkbox' ? ['', '', ''] : []);
  };

  const handleAddNewQuestion = () => {
    setIsFormVisible(true); 
  };

  const handleCancel = () => {
    setQuestionText('');
    setOptions(questionType === 'dropdown' || questionType === 'multipleChoice' || questionType === 'radio' || questionType === 'checkbox' ? ['', '', ''] : []);
    setIsFormVisible(false);
  };

  const handleFinalSubmit = () => {
    onSubmit(questions);
    setQuestions([]);
  };

  return (
    <div className='container'>
      {isFormVisible ? (
        <form onSubmit={handleSubmit}>
          <label>
            Select Question Type:
            <select value={questionType} onChange={handleQuestionTypeChange}>
              <option value='text'>Text</option>
              <option value='dropdown'>Dropdown</option>
              <option value='multipleChoice'>Multiple Choice</option>
              <option value='textarea'>Text Area</option>
              <option value='radio'>Radio Buttons</option>
              <option value='checkbox'>Checkboxes</option>
            </select>
          </label>

          <div>
            <label>
              Question Text:
              <input type='text' value={questionText} onChange={handleInputChange} />
            </label>
          </div>

          {(questionType === 'dropdown' || questionType === 'multipleChoice' || questionType === 'radio' || questionType === 'checkbox') && (
            <div className='options-section'>
              <label>
                Options:
                {options.map((option, index) => (
                  <div key={index} className='option-item'>
                    {questionType === 'radio' ? (
                      <>
                        <input
                          type='radio'
                          name={`radio-group-${index}`}
                          checked={false}
                          className='radio-input'
                          disabled
                        />
                        <input type='text' value={option} onChange={(e) => handleOptionChange(e, index)} className='option-input' />
                      </>
                    ) : questionType === 'checkbox' ? (
                      <>
                        <input
                          type='checkbox'
                          checked={false}
                          className='checkbox-input'
                          disabled
                        />
                        <input type='text' value={option} onChange={(e) => handleOptionChange(e, index)} className='option-input' />
                      </>
                    ) : (
                      <input type='text' value={option} onChange={(e) => handleOptionChange(e, index)} className='option-input' />
                    )}

                    <div className='option-controls'>
                      <img src={plus} alt='Add option' className='add-option-icon' onClick={handleAddOption} />
                      {options.length > 1 && <img src={minus} alt='Remove option' className='remove-option-icon' onClick={() => handleRemoveOption(index)} />}
                    </div>
                  </div>
                ))}
              </label>
            </div>
          )}

          <div className='form-buttons'>
            <button type='submit'>Save Question</button>
            <button type='button' onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      ) : null}

      <footer className='footer'>
        <button onClick={handleAddNewQuestion}>Add New Question</button>
        <button onClick={handleFinalSubmit}>Submit All Questions</button>
      </footer>

      <div>
        <h3>Questions Preview:</h3>
        {questions.map((q) => (
          <div key={q.id} className='question-preview'>
            <strong>Question:</strong> {q.questionText || 'No question text provided'}
            <div className='options-preview'>
              {q.questionType === 'dropdown' && q.options && (
                <select>
                  {q.options.filter(option => option.trim() !== '').map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}

              {q.questionType === 'multipleChoice' &&
                q.options &&
                q.options.filter(option => option.trim() !== '').map((option, idx) => (
                  <div key={idx}>
                    <input type='checkbox' id={`mc-${q.id}-${idx}`} />
                    <label htmlFor={`mc-${q.id}-${idx}`}>{option}</label>
                  </div>
                ))}

              {q.questionType === 'radio' &&
                q.options &&
                q.options.filter(option => option.trim() !== '').map((option, idx) => (
                  <div key={idx}>
                    <input type='radio' name={`radio-${q.id}`} id={`radio-${q.id}-${idx}`} />
                    <label htmlFor={`radio-${q.id}-${idx}`}>{option}</label>
                  </div>
                ))}

              {q.questionType === 'checkbox' &&
                q.options &&
                q.options.filter(option => option.trim() !== '').map((option, idx) => (
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
    </div>
  );
};

export default SurveyForm;
