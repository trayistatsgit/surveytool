import React, { useState} from 'react';
import './CreateSurvey.scss';
import '../surveyForm/partials/SurveyPage.scss';
import PopupComponent from '../../atoms/popup/Popup';
import DragAndDrop from '../../components/dragAndDrop/DragAndDrop';
import { minus, plus } from '../../assets/common-img';
import SurveyTitle from './Partials/SurveyTitle';
import PageTitle from './Partials/PageTitle';
// import { flushSync } from 'react-dom';

export interface Question {
    id: number;
    questionText: string;
    questionType: 'text' | 'dropdown' | 'multipleChoice' | 'textarea' | 'image' | 'video' | 'radio' | 'checkbox';
    options?: string[];
}

interface SurveyFormProps {
    onSubmit: (responses: Question[]) => void;
}

const CreateSurvey: React.FC<SurveyFormProps> = () => {
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [questionType, setQuestionType] = useState<Question['questionType']>('text');
    const [questionText, setQuestionText] = useState<string>('');
    const [options, setOptions] = useState<string[]>(['']);
    const [isFormVisible, setIsFormVisible] = useState<boolean>(true);
    const [areButtonsVisible, setAreButtonsVisible] = useState(false);
    // Correct way to declare state for uploadedLogo
    const [uploadedLogo, setUploadedLogo] = useState(null);
    //SurveyTitle 

    const [showSurveyTitle, setShowSurveyTitle] = useState(false);

    const [savedValue, setSavedValue] = useState<string>(()=>{
        return localStorage.getItem('savedValue')||''
    })
    const [alignment, setAlignment] = useState<string>(()=>{
        return localStorage.getItem('alignment')||''
    });

    //PageTitle

    const [showPageTitle,setShowPageTitle] = useState<boolean>(false);
    const [valueSave,setValueSave] = useState<string>('');
    const [pageValue,setPageValue] = useState<string>('');




     // function for PageTitle
     

     const handlePageTitle = ()=>{
        setShowPageTitle(true);
     }

     const handlePageTitleCancel = ()=>{
        setShowPageTitle(false);
     }

     const handlePageTitleSave = (title:string,description:string)=>{
        setValueSave(description);
        setShowPageTitle(false);
        setPageValue(title);
     }


    const handleSave = (value: string, alignment: string) => {
        setSavedValue(value);
        setAlignment(alignment)// Toggle visibility
        //setIsEditing(false);
        setShowSurveyTitle(false);
        localStorage.setItem('savedValue', value); // Persist the value
        localStorage.setItem('alignment', alignment);

      

    };

    const handleEdit = () => {
       // setIsEditing(true);
        setShowSurveyTitle(true);
    };

    const handleCancelTitle =()=>{
        setShowSurveyTitle(false);
    }

   


    // Popup functions
    const showPopup = () => setIsPopUpVisible(true);
    const closePopup = () => setIsPopUpVisible(false);

    const handleFileUpload = (fileURL: any) => {
        setUploadedLogo(fileURL);
        closePopup(); // Close the popup after uploading
    };

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
        setIsFormVisible(false); // Hide the form after submitting
        resetForm(); // Reset the form for the next question
        setAreButtonsVisible(false);
    };

    // Reset form fields
    const resetForm = () => {
        setQuestionText('');
        setOptions(questionType === 'dropdown' || questionType === 'multipleChoice' || questionType === 'radio' || questionType === 'checkbox' ? ['', '', ''] : []);
    };

    // Show form for adding a new question
    const handleAddNewQuestion = () => {
        setIsFormVisible(true);
        setAreButtonsVisible(true);
    };

    // Cancel the question form
    const handleCancel = () => {
        resetForm();
        setAreButtonsVisible(false);
    };

    return (
        <section className='mainContainer'>
            <section className='containerCreateSurvey'>
                {/* Logo Popup Section */}
                <div className='addLogoHere'>
                    {uploadedLogo ? (
                        <img src={uploadedLogo} alt='Uploaded Logo' className='uploadedLogo' />
                    ) : (
                        <button className='addLogoBtn' onClick={showPopup}>
                            Logo
                        </button>
                    )}
                </div>

                {isPopUpVisible && (
                    <PopupComponent showBottomCancel={true} onClose={closePopup} width={600} height={400}>
                        <DragAndDrop onFileUpload={handleFileUpload} /> {/* Pass the handler */}
                    </PopupComponent>
                )}

                {/* Survey Form Section */}
                <section className='surveyPage'>

                    <div>
                        <div className='surveyTitle' onClick={handleEdit} >

                            <h1   >
                                    {savedValue||'Untitled'}
                                {savedValue && <span className={`${alignment}`}> </span> }

                            </h1>
                           
                            {/* {!isEditing && <button onClick={handleEdit}>Edit</button>} */}
                            <button onClick={handleEdit} className='editBtn'>Edit</button>
                           
                    
                        </div>
                       

                        {showSurveyTitle &&  <SurveyTitle
                                onSave={handleSave}
                                initialValue={savedValue}
                                initialAlignment={alignment}
                                onCancel = {handleCancelTitle}
                                
                                
                               
                            />}

                    </div>

                    <div className='surveyPageTitle' onClick={handlePageTitle} >
                        <button className='pageTitle'>{pageValue||'PAGE TITLE'}</button>
                
                        <button className='editPageBtn'>EDIT</button>
                    </div>
                    <div className="page-des">
                            {valueSave}
                         </div>
                    {showPageTitle
                     && <PageTitle
                       onCancel={handlePageTitleCancel}
                       onSave = {handlePageTitleSave}
                    />}

                    {/* Question Form */}
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

                            {/* Options Section for relevant question types */}
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

                            {/* Show Save and Cancel buttons only when visible */}
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

                    <div>
                        <h3>Questions Preview:</h3>
                        {questions.map((q) => (
                            <div key={q.id} className='question-preview'>
                                <strong>Question:</strong> {q.questionText || 'No question text provided'}
                                <div className='options-preview'>
                                    {q.questionType === 'dropdown' && q.options && (
                                        <select>
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
                        <button className='createPreviewButton'>Preview Survey</button>
                    </div>
                </section>
            </section>
        </section>
    );
};

export default CreateSurvey;