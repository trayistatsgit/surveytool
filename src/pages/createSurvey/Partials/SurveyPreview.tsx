// SurveyPreview.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Question } from '../CreateSurvey';
 
const SurveyPreview: React.FC = () => {
    const location = useLocation();
    const { questions }: { questions: Question[] } = location.state || { questions: [] };
    const { uploadedLogo } = location.state || {};
 
    return (
        <div>
            {uploadedLogo && <img src={uploadedLogo} alt='Survey Logo' className='preview-logo' />}
 
            <h3>Questions Preview:</h3>
            {questions.map((q) => (
                <div key={q.id} className='question-preview'>
                    <strong>Question:</strong> {q.questionText || 'No question text provided'}
                    <div className='options-preview'>
                        {/* Dropdown */}
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
 
                        {/* Multiple Choice */}
                        {q.questionType === 'multipleChoice' && q.options && (
                            <div className='options-list'>
                                {q.options
                                    .filter((option) => option.trim() !== '')
                                    .map((option, idx) => (
                                        <div key={idx}>
                                            <input type='checkbox' id={`mc-${q.id}-${idx}`} />
                                            <label htmlFor={`mc-${q.id}-${idx}`}>{option}</label>
                                        </div>
                                    ))}
                            </div>
                        )}
 
                        {/* Radio Buttons */}
                        {q.questionType === 'radio' && q.options && (
                            <div className='options-list'>
                                {q.options
                                    .filter((option) => option.trim() !== '')
                                    .map((option, idx) => (
                                        <div key={idx}>
                                            <input type='radio' name={`radio-${q.id}`} id={`radio-${q.id}-${idx}`} />
                                            <label htmlFor={`radio-${q.id}-${idx}`}>{option}</label>
                                        </div>
                                    ))}
                            </div>
                        )}
 
                        {/* Checkboxes */}
                        {q.questionType === 'checkbox' && q.options && (
                            <div className='options-list'>
                                {q.options
                                    .filter((option) => option.trim() !== '')
                                    .map((option, idx) => (
                                        <div key={idx}>
                                            <input type='checkbox' id={`cb-${q.id}-${idx}`} />
                                            <label htmlFor={`cb-${q.id}-${idx}`}>{option}</label>
                                        </div>
                                    ))}
                            </div>
                        )}
 
                        {/* Text Input */}
                        {q.questionType === 'text' && <input type='text' className='preview-text-input' placeholder='Text input preview' />}
 
                        {/* Text Area */}
                        {q.questionType === 'textarea' && <textarea className='preview-textarea' placeholder='Textarea input preview'></textarea>}
                    </div>
                </div>
            ))}
        </div>
    );
};
 
export default SurveyPreview;